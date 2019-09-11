const http = require('http')
const url = require('url')
const { resolve } = require('path')
const crypto = require('crypto')
const fs = require('fs-extra')

const defaultOptions = {
  urlSecret: 'make-me-strong',
  instances: [
    { name: 'I1', url: 'http://localhost:3000' }
  ],
  preferences: {
    'fontSize': 25,
    'background': '#fc0'
  }
}

module.exports = function (moduleOptions) {
  const options = {
    ...defaultOptions,
    ...this.options['settings-module'],
    ...this.options.settings,
    ...moduleOptions,
    preferencesPath: this.nuxt.options.srcDir + '/.nuxt.preferences.json'
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'settings-module.js',
    options
  })

  registerRoutes.call(this, options)

  /**
   * create default preferences
   */
  if (!fs.existsSync(options.preferencesPath)) {
    writePreferences(options.preferencesPath, options.preferences)
  }
}

function registerRoutes (options) {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    routes.push({
      name: 'preferences',
      path: '/preferences/' + options.urlSecret,
      component: 'lib/pages/admin.vue',
      meta: options
    })
  })
  let currentVersion = '1'
  this.addServerMiddleware({
    path: '/preferences/sync/' + options.urlSecret,
    handler: (req, res, next) => {
      const requestUrl = new url.URL(req.url, 'http://localhost')
      const queryHash = requestUrl.searchParams.get('hash')
      if (queryHash === currentVersion) {
        res.end(currentVersion)
        return
      }
      req.on('data', (chunk) => {
        try {
          const data = chunk.toString('utf8')
          const prefs = JSON.parse(data)
          const hash = queryHash || crypto.createHash('md5').update(data).digest('hex')
          if (hash === currentVersion) {
            res.end(currentVersion)
            return
          }
          currentVersion = hash

          writePreferences(options.preferencesPath, prefs)

          if (!queryHash) {
            options.instances.map(({ name, url }) => {
              sync(name, url + '/preferences/sync/' + options.urlSecret + '?hash=' + hash, prefs)
            })
          }

          res.end(currentVersion)
        } catch (e) {
          res.end(e.message)
        }
      })
    }
  })
}

function sync (name, url, prefs) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(prefs)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const req = http.request(url, options, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d)
      })
      resolve()
    })
    req.on('error', (error) => {
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

async function writePreferences (path, prefs) {
  await fs.writeFile(
    path,
    JSON.stringify(prefs),
    { flag: 'w' }
  )
}

module.exports.meta = require('../package.json')

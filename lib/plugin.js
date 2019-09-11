import Store from '~/.nuxt.preferences.json'

export default async function (ctx, inject) {
    inject('prefs', Store)
}

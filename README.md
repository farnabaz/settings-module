# settings-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Nuxtjs Settingd

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

1. Add `settings-module` dependency to your project

```bash
yarn add settings-module # or npm install settings-module
```

2. Add `settings-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'settings-module',

    // With options
    ['settings-module', { /* module options */ }]
  ]
}
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Ahad Birang <farnabaz@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/settings-module/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/settings-module

[npm-downloads-src]: https://img.shields.io/npm/dt/settings-module.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/settings-module

[circle-ci-src]: https://img.shields.io/circleci/project/github/.svg?style=flat-square
[circle-ci-href]: https://circleci.com/gh/

[codecov-src]: https://img.shields.io/codecov/c/github/.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/

[license-src]: https://img.shields.io/npm/l/settings-module.svg?style=flat-square
[license-href]: https://npmjs.com/package/settings-module

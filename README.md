<p align="center">
  <a href="https://github.com/facebook/jest/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Jest is released under the MIT license." />
  </a>
</p>

<!-- A spacer -->
<p>&nbsp;</p>

<p align="center"><img src="public/readme-icon.png" width="25%"/></p>

<h2 align="center">Chrome Extension Template</h2>

**⚡ Fast Development**: Chrome Extension Template provides a starting point for developers to quickly create new Chrome extensions using the latest Manifest V3.

The template includes all the necessary files and directories for a basic extension, such as:

- manifest.json
- background script
- content script
- popup window

It also includes a basic configuration for permissions, icons, and options page, along with a sample code for message passing between different parts of the extension.

**✨ Hassle-free Setup**: Developers can simply clone or download the project and start modifying the code to suit their specific needs, without having to worry about the initial setup and boilerplate.

**✊ Out-of-box Support**: [TypeScript](https://www.typescriptlang.org/), [React 18](https://reactjs.org/) & [MUI](https://mui.com/).

## Getting Started

**Generate a new repository:**

<a href="https://github.com/dhuyy/chrome-extension-template/generate"><img src="public/generate-readme.png" width="30%"/></a>

**Install dependecies using [`yarn`](https://yarnpkg.com/en/package/jest) or [`npm`](https://www.npmjs.com/package/jest):**

```bash
yarn
# or
npm i
```

**Local Development:**

```bash
yarn start
```

- Access [localhost:3000](http://localhost:3000/) and choose to edit **Popup** or **Options** page.

**Build & Package:**

```bash
yarn build
```

- It generates a `zip` file on the project root. Simply drag and drop it on the `chrome://extensions` page.
  - _You must have **Developer Mode** option enabled_.

## License

Chrome Extension Template is [MIT licensed](./LICENSE).
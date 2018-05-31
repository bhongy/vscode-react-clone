# Visual Studio Code React Clone

When I think of projects with best UX, VSCode always come to mind first. This is a project to clone VSCode using React (reactive view) - for my own learning in architectural/design for large, complex, interactive application (and the extension model).

## Development

```base
yarn start
```

Webpack is used to develop and build primarily because I want HMR when working on UI (components and styles).

Note: currently the folder structure as `main` versus `renderer` is dictated by `electron-webpack`. I'll probably find time to fork it at some point so that I can fully customize webpack.

## Ideas

## Todos

- [ ] Organize project by features (e.g. editor, quickopen) rather than by types (e.g. components, services)

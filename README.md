# Dent Doc Web

## Installation

follow these steps:

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
touch .env
# open .env and modify the environment variables (if needed)
```

## 📑 Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Linting](#linting)

## 🪶 Features

- **React**: [React](https://reactjs.org/)
- **React Redux**: [Redux](https://react-redux.js.org/)
- **Axios**: [Axios](https://www.npmjs.com/package/axios) for api calls
- **Webpack**: [Webpack](https://webpack.js.org/) for module bundling
- **Form Validation**: with [Formik](https://formik.org/) and [Yup](https://www.npmjs.com/package/yup)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## 🪟 Commands

Running locally:

```bash
yarn run dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Linting:

```bash
# run ESLint
yarn lint

```

## 👽 Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
     END_POINT_URL*
     BUCKET_URL*
```

## 🚧 Project Structure

```
app\
 |--components\     # components are in there
 |--assets\         # images, fonts and icons
 |--container\      # for app related things
 |--redux\          # redux stuff
 |--hoc\            # higher order components
 |--routes\         # app routes
 |--styles\         # app global styles
 |--utils\          # app utilities
 |--public\         # single html file for rendering whole stuff
 |--index.js        # App entry point

```

## 🪝 Validation

Form data is validated using [Formik](https://formik.org/) and [Yup](https://www.npmjs.com/package/yup).
The validation schemas are defined in the `index.js` file of every component.

## ☑️ Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

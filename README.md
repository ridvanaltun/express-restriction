# Express Restriction <!-- omit in toc -->

[![npm version](https://img.shields.io/npm/v/express-restriction.svg)](https://npmjs.com/package/express-restriction)
[![npm downloads](https://img.shields.io/npm/dt/express-restriction.svg)](https://npmjs.com/package/express-restriction)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Build Status](https://travis-ci.com/ridvanaltun/express-restriction.svg?branch=master)](https://travis-ci.com/ridvanaltun/express-restriction)
[![Coverage Status](https://coveralls.io/repos/github/ridvanaltun/express-restriction/badge.svg?branch=master)](https://coveralls.io/github/ridvanaltun/express-restriction?branch=master)
[![license](https://img.shields.io/npm/l/express-restriction.svg)](https://github.com/ridvanaltun/express-restriction/blob/master/LICENSE)

> **Secure your APIs like Google**

# Table of Contents <!-- omit in toc -->

- [How It Works?](#how-it-works)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
  - [Available Scripts](#available-scripts)
- [License](#license)

# How It Works?

Google offers a security layer for their APIs, for an example, you can restrict all HTTP requests over your API except a selected Android App. This project aims to make the same thing in Express.JS.

**READ MORE:** https://developers.google.com/maps/api-security-best-practices

# Installation

```bash
npm install express-restriction --save
```

# Documentation

Documentation is automatically created with [JSDoc](https://github.com/jsdoc/jsdoc) after each new release.

[You can find the documentation here!](https://ridvanaltun.github.io/express-restriction/)

# Development

```bash
# clone the repository
git clone https://github.com/ridvanaltun/express-restriction.git

# go to the project and install dependencies
cd express-restriction & npm i
```

## Available Scripts

```bash
# commit your changes with commitizen
npm run commit

# check eslint issues
npm run lint

# fix eslint issues
npm run lint:fix

# run eslint-nibble
npm run lint:active

# run all tests
npm run test

# travis uses this script, it handles creating new releases
npm run semantic-release

# travis uses this script, it creates documentation with jsdoc
npm run docs
```

# License

[MIT](https://github.com/ridvanaltun/express-restriction/blob/master/LICENSE)

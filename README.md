# This is a playground project (On going) - current version: 0.0.4.

## This project will use the following:

- React
- Cookies via Redis
- Node w/ Express
- Apollo
- Graphql
- URQL
- Postgresql
- Mikroorm
- Typescript
- Next.js
- TypeGraphQL
- Chakra

## Getting Started

1. Install Postgresql. Installing sql server differs for operating system but is as easy as running the installer.
2. Intall Reddis. Follow this link: https://redis.io/topics/quickstart.
3. Install nvm. Follow this link: https://github.com/nvm-sh/nvm.
4. Use nvm to install node.
5. Cd to the project and do npm install.

## Trying it out

1. Run this to generate dist files:

```shell
    yarn watch
```

2. Run this to serve the dist files locally

```shell
    yarn dev
```

3. See console logs for errors or outputs.

## Versions

### 0.0.1

1. Contains basic CRUD functionalities you can access through graphql.

### 0.0.2

1. Implemented redis and cookies.

### 0.0.5

1. Added login and register page (with functionalities).
2. Added Navbar to home page.
3. Added cors settings for all routes.
4. Added logout function.
5. Implemented updating of cache when login, register, and logout route is called.
6. Removed cookie whenever user is logged out.
7. Refactored some by adding global variables and fragments.

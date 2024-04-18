<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod

#run every services
$ pnpm run start:all
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Important before contributing

```bash
$ Use Try and Catch

$ Always throw StrictRpcException from Services.

$ Follow the existing file/folder structure.

$ If there are any common resources shared by different services put them in ./libs folder


```

## .env

```bash
#admin
$ ADMIN_PASSWORD=

# postgres
$ DATA_BASE_TYPE=postgres
$ DATA_BASE_HOST_DEVELOPMENT=
# DATA_BASE_HOST_PRODUCTION=
$ DATA_BASE_PORT=
$ DATA_BASE_USER=
$ DATA_BASE_PASSWORD=
$ DATA_BASE_NAME=

$ HTTP_ENABLE=

#Services
$ MICRO_SERVICE_ADMIN_SERVICE_PORT=
$ MICRO_SERVICE_USER_VENDOR_SERVICE_PORT=
$ MICRO_SERVICE_CUSTOMER_SERVICE_PORT=

#DEBUGGER
$ DEBUGGER_WRITE_INTO_FILE=
$ DEBUGGER_MAX_FILE=
$ DEBUGGER_MAX_SIZE=

#auth
$ JWT_SECRET_KEY=
$ GOOGLE_CLIENT_ID=
$ GOOGLE_CLIENT_SECRET=
$ GOOGLE_CALL_BACK_URI=
```

## DataBase Dump

```
# Command for Database Dump
  `pg_dump -F t -h ${dbHost}, -U ${dbUsername} ${dbName} > ${fileName}`

   Where
      -F stands for "format", the t indicates that the backup should be in "tar" format.
      -h stands for Host of the database (Where data base is either localhost or in some server).
      -U stands for User name that will be used to connect to the database.
      -{dbHost} variable that indicates database host (server address)
      -{dbUsername} variable that indicates database user name.
      -{dbName} variable that indicates database name.
      -{fileName} variable that indicates what the name of file should be and where should be it located (folder path/file).

```

## DataBase Tables Dump

```
# Command for Database tables Dump
  `pg_dump -F t -h ${dbHost} -U ${dbUsername} ${tableOptions} ${dbName} > ${fileName}`

   Where
      -F stands for "format", the t indicates that the backup should be in "tar" format.
      -h stands for Host of the database (Where data base is either localhost or in some server).
      -U stands for User name that will be used to connect to the database.
      -{dbHost} variable that indicates database host (server address)
      -{dbUsername} variable that indicates database user name.
      -{tableOptions} variable that indicates what tables of the database should be selected for dump (back up)
      -{dbName} variable that indicates database name

```

## Database Restore

```
# Command for database restore
  `pg_restore  -h ${hostName} -p ${Port} -U {databaseUserName} -d ${databaseName} -1 ${dumpFileName}`

   Where
      -h stands for Host of the database (Where data base is either localhost or in some server).
      -p stands for port
      -U stands for User name that will be used to connect to the database.
      -1 This option is used to instruct `pg_restore` to restore the database in a single transaction.
```

## Database Tables Restore

```
#Command for restoring database table while creating table
    pg_restore -h ${hostName} -p ${Port} -U ${databaseUserName} -d {dataBaseName} -1 -t ${tableName} ${dumpFileName}

#Command for restoring only data of table (Restoring Value into existing table)
    pg_restore -h ${hostName} -p ${Port} -U ${databaseUserName} -d {dataBaseName} -1 -t ${tableName} --data-only ${dumpFileName}
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

# TestCICD4
Nest is [MIT licensed](LICENSE).

<!-- pnpm migration:generate libs/database/migrations/customer-update -->

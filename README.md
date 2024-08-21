# Express Crud TEST Venbo by Angel Morante

This is a littel CRUD implementation for show knowledge about express server creation.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
You can will find the values env var inside env.example file.

`PORT` Port of applycation

`MONGODB_URI`Mongo db url

`JWT_SECRET` Secret for JWT generation

`USERNAME` Unique user for access to software

`PASSWORD` Password of user for access

## Run Locally

Clone the project

```bash
  git clone https://github.com/theangelmorante/venbo-test-server.git
```

Go to the project directory

```bash
  cd venbo-test-server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev:all
```

#### Pay Attention Here:

For this implementations we need to run start:dev:all because I have an externalApiMock.js to simulate credit api validation, and that mock need to run concurrently with the main server.
The External Api Mock, to simulate the behavior of a credit evaluation, when sending a numeric string as identification, it is converted to a number and if the number is even, the credit is valid, otherwise, it is not.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Tech Stack

**Server:** Node, Express

**Relevant Packages:** bcryptjs, dotenv, mongoose, swagger-jsdoc, concurrently, and more...

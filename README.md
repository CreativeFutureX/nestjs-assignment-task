
## Description

This is a backend application that provides a RESTful API for cat adoption agencies.

## System Requirements

Node.js version `18.17.0` is required for this application.

## Configuration Instructions

Before launching the application, ensure to create a `.env` file based on the provided `.env-template` file. Fill in the required information according to the environment in which the application will be executed.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Summary of Applied Technologies

This project employs several technologies and practices to enhance performance and security. Below is a detailed overview of the key elements implemented:

### Additional Elements:

1. **`.env` File**: A `.env` file is used to ensure that sensitive data, such as database credentials and API keys, are not hardcoded into the codebase or stored in the repository. This practice enhances security and makes the configuration more flexible.

2. **Bcrypt Library**: The bcrypt library is integrated for secure password handling. It helps in safely storing user passwords by hashing them before they are saved in the database, a crucial measure to protect user data from potential breaches.

3. **Import Aliases and Jest Configuration**: The development process is streamlined by using import aliases. This setup, combined with Jest configuration, allows for the automatic use of aliases defined in the `tsconfig` file by Jest, simplifying the code structure and improving maintainability.

### Future Enhancements:

- **Docker Integration for Database**: Incorporation of Docker for database management is planned. This will aid in creating a more consistent and isolated environment for the database, improving both the development and deployment processes.

- **Separate Databases for Testing and Development**: The establishment of distinct databases for testing and development purposes is aimed for. This separation will ensure that development activities do not interfere with test environments, leading to more reliable testing and development workflows.

- **Distinct Configuration for Tests and Development**: Work is underway to separate the configurations for testing and development. This will enhance the project structure by providing tailored environments for different stages of the development cycle.

- **Implementation of Refresh JWT Tokens**: The implementation of refresh JWT tokens is a future goal to improve the security and usability of the authentication system. This addition will enhance the robustness of user authentication.
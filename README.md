# CRUD API

---

## Quick start

1. Clone this repo using:

```shell
$ git clone https://github.com/prouzad/nodejs-crud-api.git
```

2. To install:

```shell
$ yarn
```

3. Run project in Dev mode

```shell
$ npm run start:dev
```

4. Run project in production mode

```shell
$ npm run start:prod
```

5. Run project in multi mode

```shell
$ npm run start:multi
```

---

## How to use

If you don't create `.env` file, server will start in PORT 4000.
You need to create `.env` file in root project and write there your PORT.

```shell
$ PORT = your_port_number
```

To test the API, you can use Postman or any other similar tool.

#### API Endpoints

| Methods | Urls         | Description              |
| ------- | ------------ | ------------------------ |
| GET     | api/users    | Get all users            |
| GET     | api/users/id | Get a specific user      |
| POST    | api/users    | Create a new user        |
| PUT     | api/users/id | Update an existing users |
| DELETE  | api/users/id | Delete an existing users |

to create an user object, use `json` (all properties are required):

```
- "username": string,
- "age": number,
- "hobbies": Array of string (string[]) or empty Array []
```

to update an existing user you have to write all properties except ID

```
{
 "username": update_name,
 "age": update_age,
 "hobbies": ["update_hobby"],
}
```

---

## Testing

Implemented 3 test scenarios for the API:

```shell
$ npm run test
```

Run test in coverage mode:

```shell
$ npm run test:cover
```

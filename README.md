## Installation

```bash
$ npm install
```

## .env
Add .env to root folder file from the link provided

## Running the app

```bas
# watch mode
$ npm run start:dev
```

## Description
Application have 2 `GET` endpoints `/destination` to get status by provided path and `/route` to find the correct path to the next
status of the given transition.

- Example of `/destination` call:
```
curl --location --request GET 'http://localhost:3000/destination?action=SEND&rule=ADMIN&type=SINGLE'
```

- Example of `/route` call:
```
curl --location -g --request GET 'http://localhost:3000/route?action=SEND&rule=PARTNER&type=SINGLE&status[]=4&status[]=5&status[]=1'
```



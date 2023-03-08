# Project - CloudNotes Backend

#### Make sure to check :

## Frontened Repo :  
https://github.com/insh007/CloudNotes-Frontened

## Deploy Link :


## Key points

This project is divided into 2 features namely User and Notes. In this project we are sending token with a request as x-api-key or any name which you preferred. you need to use Authorization header and send the JWT token as ax-api-key or any name. Create a database in mongodb with a suitable name to perform CRUD operations on notes and to store user credentials.

# Model

## User Model

```
{ 
  name: {string, mandatory},
  email: {string, mandatory, unique},
  password: {string, mandatory}, // encrypted password
  date : {date, default}
}
```

# User APIs

## POST/register

Create a user document from request body. Save password in encrypted format (use bcrypt). 
Response format On success - Return HTTP status 201. Also return the user document like below:

```

{
    "status": true,
    "data": {
        "name": "John",
        "email": "johndoe@mailinator.com",
        "password": "$2b$10$DpOSGb0B7cT0f6L95RnpWO2P/AtEoE6OF9diIiAEP7QrTMaV29Kmm",
        "date" : 2023-02-12T09:17:30.082+00:00
        "_id": "6162876abdcb70afeeaf9cf5",
        "__v": 0
    }
}

```

On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure
```

{
  status: false,
  msg: ""
}

```


## POST /login

Allow an user to login with their email and password. On a successful login attempt return a JWT token containing the userId, iat.

Response format On success - Return HTTP status 200 and JWT token in response body. The response should be a JSON object like below: 

```

{
    "status": true,
    "token": {
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTYyODc2YWJkY2I3MGFmZWVhZjljZjUiLCJpYXQiOjE2MzM4NDczNzYsImV4cCI6MTYzMzg4MzM3Nn0.PgcBPLLg4J01Hyin-zR6BCk7JHBY-RpuWMG_oIK7aV8"
    }
}

```

On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure
```
{
  status: false,
  msg: ""
}

```

## Note Model

```
{ 
  userId : {object Id, ref : user model}
  title: {string, mandatory},
  description: {string, mandatory},
  tag : {string, default : "General"}
  date : {date, default}
}
```

# Note APIs

# POST /api/notes/createNotes (Add note)
###### authentication required

Create a note for the user from request body if it does not exist and also authenticate user before creating any notes.Response format On success - Return HTTP status 201. Also return the user document like below :

```
{
    "_id": "640742f4616da245ceac3bf5",
    "userId": "64074275616da245ceac3be9",
    "title": "No Time to Die",
    "description" : "An action James Bond Movie"
    "tag": "action",
    date : 2023-03-07T13:58:12.455+00:00,
    "__v": 0
}


```

# GET /api/notes/fetchNotes (Fetch Notes)
###### authentication required

Fetch the notes related to the user by auhtenticate them.
Response format On success - Return HTTP status 200. Also return the user document like below :

```
{
    "status": true,
    "data": {
        "_id": "640742f4616da245ceac3bf5",
        "userId": "64074275616da245ceac3be9",
        "title": "No Time to Die",
        "description" : "An action James Bond Movie"
        "tag": "action",
        date : 2023-03-07T13:58:12.455+00:00,
        "__v": 0
    }
}
```

# PUT /api/notes/updateNotes/:noteId (Upate Note)
###### authentication and authorization required

Update the notes related to the user by auhtenticate and authorized them. You can take the note id in the request parameter.
Response format On success - Return HTTP status 200. Also return the user document like below :

```
{
    "status": true,
    "data": {
        "_id": "640742f4616da245ceac3bf5",
        "userId": "64074275616da245ceac3be9",
        "title": "No Time to Die",
        "description" : "An action James Bond Movie"
        "tag": "action",
        date : 2023-03-07T13:58:12.455+00:00,
        "__v": 0
    }
}
```

# DELETE /api/notes/deleteNotes/:noteId (Delete Note)
###### authentication and authorization required

Delete the notes related to the user by auhtenticate and authorized them. You can take the note id in the request parameter.


## Error respose to API's should be like this:
On error - Return a suitable error message with a valid HTTP status code. The response should be a JSON object like below :

Error Response structure
```
{
  status: false,
  msg: ""
}

```
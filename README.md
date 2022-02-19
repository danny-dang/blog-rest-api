# Blog REST API server (No database)

## API docs

Swagger API docs is at `/api/docs` (comming soon)
## APIs

Blogs:
|Endpoint        |Description                    |
|----------------|-------------------------------|
|GET `/api/blogs`|Get blogs|
|GET `/api/blogs/:id`|Get blog by id|
|POST `/api/blogs` (Protected, Owner)|Create a new blog|
|PUT `/api/blogs/:id` (Protected, Owner)|Edit blog by id|
|DELETE `/api/blogs:/:id` (Protected, Owner, Admin)|Delete blog by id|

Users
|Endpoint        |Description                    |
|----------------|-------------------------------|
|GET `/api/users` (Protected, Admin)|Get all users|
|GET `/api/users/login`|Login|
|POST `/api/users/register`|Register a new user|
|PUT `/api/usres/profile` (Protected)|Get profile of the current logged in user|
## Postman

Postman collection is available at `Blog Rest API.postman_collection.json`. Just import the file to Postman Collection

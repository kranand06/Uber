# User Signup API

## Endpoint
POST   `/api/users/signup`

---

## Description
This endpoint is used to register a new user.

- Stores user in MongoDB
- Password is hashed using bcrypt
- Returns JWT token after successful signup

---

## Request Body

### Required Fields

| Field     | Type   | Description                         |
|----------|--------|-------------------------------------|
| name     | String | User's full name                    |
| email    | String | Valid email address (must be unique)|
| password | String | Minimum 6 characters                |

### Example Request

```json
{
  "name": "Kumar Anand",
  "email": "anand@example.com",
  "password": "123456"
} 
```


### Example Response

```json
{
    "user": {
        "name": "Kumar Anand",
        "email": "anand@example.com",
        "password": "$2b$10$SxPw/qJThtSZvIXJmLVyuiTSBnIQ9K4mG7WC6v6DTQDQnKy9SGe9C",
        "_id": "69bd00ec0318fb521dae975c",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5xsrbumkihgtMxOGZiNTIxZGFlOTc1YyIsImlhdCI6MTc3Mzk5NDIyMH0.bNIJQlgsqLqPKemM7ie-G-6F3D34y3JzyrX2SDnYytg"
}
```
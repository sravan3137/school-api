# School Management API

A Node.js + Express.js + MySQL REST API system to manage school data and retrieve schools sorted by proximity to a user-specified location.

---

## Objective

This project provides APIs to:
- Add new schools to a database
- Retrieve all schools sorted by distance from a user’s location

Distance is calculated using geographical coordinates (latitude & longitude).

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- dotenv

---

## Database Setup

Create a MySQL table named `schools`:

```sql id="dbtable"
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```
## API Endpoints

1.Base url
https://school-api-4uy2.onrender.com

2.Add school 
 - Endpoint: /addSchool 
 - Description: Adds a new school to the database after validating input data.
 - Example Request Body:
  ```json
  {
    "name": "ABC School",
    "address": "MG Road",
    "latitude": 17.3850,
    "longitude": 78.4867
  }
  ```

3.List Schools (Sorted by Proximity)
 - Endpoint: /listSchools
 - Query Parameters: latitude=<user_latitude>&longitude=<user_longitude>
 - example: /listSchools?latitude=17.3850&longitude=78.4867
 - Description: Fetches all schools from the database and returns them sorted by distance from the user's location.



## Distance Calculation Logic

The distance between user location and each school is calculated using the Haversine formula, which determines the great-circle distance between two points on the Earth.

## Run in development
Create a .env file in the root directory
```env
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306

PORT=3000
```
## Run
```powershell
npm install
npm start
```

This System uses Railway for SQL Cloud Database: https://railway.com/

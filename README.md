# Freshtech API

## Overview

The Freshtech API is a RESTful API built with Node.js, Express, and MongoDB. It includes endpoints for user authentication, accessing dashboard information, and converting airtime to cash.

## Features

- **User Authentication**: Allows users to log in and obtain a JWT token.
- **Dashboard Access**: Provides user-specific dashboard information including balance and transactions.
- **Airtime to Cash Conversion**: Allows users to convert airtime to cash, updating their balance accordingly.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- `npm` or `yarn`

### Installation

1. **Clone the repository**

   git clone https://github.com/Freshtech_endPoint-API.git
   cd Freshtech_endPoint-AP

2. **Install dependencies
   npm install

3. **Set up environment variables

   Create a .env file in the root directory and add the following environment variables:
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>

4. **Start the server

   npm start

### API Endpoints

1. **Login

   Endpoint: POST /api/auth/login

   Request Body:
   ```json```
   {
  "username": "yourusername",
  "password": "yourpaswrd"
   }

  Response:
  
  {
  "token": "<your-jwt-token>"
  }

2. **Dashboard

   Endpoint: GET /api/dashboard

   Headers:
  <Authorization: Bearer <your-jwt-token>>

  Response:

  {
  "balance": yourbal,
  "transactions": [
    // List of transactions
  ]
  }

3. **Airtime to Cash

   Endpoint: POST /api/airtime-to-cash

   Request Body:

   {
  "amount": $
  }

   Headers:

   Authorization: Bearer <your-jwt-token>
   Content-Type: application/json

  Response:
 
  {
  "message": "Conversion successful",
  "newBalance": $
 }




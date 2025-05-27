# Request System

A simple Test Task using RESTful API for handling anonymous requests, built with Node.js, Express, TypeScript, and MongoDB (Mongoose).

---

## Features

- Create a new request with subject and text
- Update request status: New, In progress, Completed, Canceled
- Add solution text or cancellation reason
- List requests with optional date filtering (by date or date range)
- Cancel all requests that are "In progress"
- All requests are anonymous (no user accounts)
- **API documentation with Swagger (OpenAPI)**

---

## Project Structure

```
request-system
├── src
│   ├── controllers          # Request handling logic
│   ├── models               # Mongoose models
│   ├── routes               # API route definitions
│   ├── services             # Business logic
│   ├── utils                # Utility functions (e.g., DB connection, Error handling, Swagger)
│   ├── middleware           # Middleware functions (e.g., validation)
│   ├── types                # TypeScript types
│   ├── validators           # Zod validation schemas
│   └── app.ts               # Application entry point
├── .env                     # Environment variables (MongoDB URI, etc.)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
└── README.md                # This file
```

---

## Setup & Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/FahimJadid/request-system.git
   cd request-system
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=3000
     ```
   - For local MongoDB, use:  
     `MONGODB_URI=mongodb://127.0.0.1:27017/request-system`

4. **Start MongoDB**
   - If using local MongoDB, ensure it is running:
     ```sh
     mongod
     ```
   - Or use Docker:
     ```sh
     docker run -d -p 27017:27017 --name mongodb mongo
     ```

5. **Run the application**
   ```sh
   npm run dev
   ```
   The server will start on the port specified in `.env` (default: 3000).

---

## API Documentation

**Swagger UI is available at:**  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

You can use this interactive documentation to explore and test all API endpoints, view request/response schemas, and see example payloads.

### How to Test with Swagger

1. Start your server (`npm run dev`).
2. Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.
3. Expand any endpoint, click **"Try it out"**, fill in parameters or body, and click **"Execute"**.
4. See the live response from your API.

---

## API Endpoints

- **Create a new request**
  - `POST /requests`
  - Body:  
    ```json
    {
      "subject": "Subject",
      "text": "Text"
    }
    ```

- **Take a request to work**
  - `PATCH /requests/:id/take`

- **Finish processing a request**
  - `PATCH /requests/:id/finish`
  - Body:  
    ```json
    {
      "solution": "Solution text"
    }
    ```

- **Cancel a request**
  - `PATCH /requests/:id/cancel`
  - Body:  
    ```json
    {
      "reason": "Cancellation reason"
    }
    ```

- **List requests (optionally filter by date or date range)**
  - `GET /requests`
  - Query params (optional):  
    - `startDate=YYYY-MM-DD`
    - `endDate=YYYY-MM-DD`

- **Cancel all "In progress" requests**
  - `DELETE /requests/cancel-in-progress`
  
---

## Testing the API with Postman

1. **Start your server** (`npm run dev`).

2. **Import the following requests into Postman:**

### Create a Request
- **POST** `http://localhost:3000/requests`
- **Body (JSON):**
  ```json
  {
    "subject": "Test Subject",
    "text": "This is a test request."
  }
  ```

### Take a Request to Work
- **PATCH** `http://localhost:3000/requests/<id>/take`

### Finish a Request
- **PATCH** `http://localhost:3000/requests/<id>/finish`
- **Body (JSON):**
  ```json
  {
    "solution": "This is the solution text."
  }
  ```

### Cancel a Request
- **PATCH** `http://localhost:3000/requests/<id>/cancel`
- **Body (JSON):**
  ```json
  {
    "reason": "No longer needed."
  }
  ```

### Get All Requests
- **GET** `http://localhost:3000/requests`

### Get Requests by Date Range
- **GET** `http://localhost:3000/requests?startDate=2025-05-01&endDate=2025-05-31`

### Get Requests by Start Date Only
- **GET** `http://localhost:3000/requests?startDate=2025-05-27`

### Get Requests by End Date Only
- **GET** `http://localhost:3000/requests?endDate=2025-05-27`

### Cancel All In-Progress Requests
- **DELETE** `http://localhost:3000/requests/cancel-in-progress`

---

**Tips:**
- Always set `Content-Type: application/json` in the Headers for POST/PATCH requests.
- Use the response from the create request to get the `id` for other operations.
- Dates should be in `YYYY-MM-DD` format.
- For full API details and schemas, use the [Swagger UI](http://localhost:3000/api-docs).

---

## License

MIT License
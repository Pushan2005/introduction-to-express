# Project Setup Instructions

To get started with this project, follow these steps:

1. Create a MongoDB database (either locally or on the cloud)
2. Get the connection string to the database
3. Create a file named `.env` in the root of the directory.
4. Add the connection string (URI) in the following format within the `.env` file as follows: `MONGO_URI=<paste the URI here>`
5. Install dependencies:

    ```bash
    npm install
    ```

6. Start the development server:

    ```bash
    npm run dev
    ```

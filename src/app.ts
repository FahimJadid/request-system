import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import setRoutes from './routes/requestRoutes';
import connectDB from './utils/db';
import { errorHandler } from './utils/errorHandler';
import { swaggerSpec, swaggerUi } from './utils/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(setRoutes());


// Error handler middleware (should be after all routes)
app.use(errorHandler);

// Only start the server after successful DB connection
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database. Server not started.');
        process.exit(1);
    }
};

startServer();
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { ModuleRoutes } from './routes';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', ModuleRoutes);

// const testID = async () => {
//   const id = await generateFacultyId();
//   console.log(id);
// };

// testID();

// Global Error Handler
app.use(globalErrorHandler);

export default app;

import express from 'express';
import dotenv from 'dotenv';
import searchRoutes from './main/routes/SearchRoutes';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const router = express.Router();
searchRoutes(router);
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

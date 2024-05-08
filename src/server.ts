
import express from 'express';
import { connectDB } from './db';
import router from './routes';
import bodyparser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 8080;

app.use(cors({
  origin: "*"
}));

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  connectDB();
  return console.log(`Express is listening at http://localhost:${port}`);
});

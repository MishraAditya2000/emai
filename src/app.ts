import "dotenv/config"
import express from 'express';
import router from './services/routes.js';
// import cors from 'cors';

const app = express();
// app.use(cors())
app.use(express.json())
const port =process.env.PORT||8080;

app.get('/health', (req, res) => {
 res.json({status:"ok",time:new Date().toISOString()})
});
app.use("/api/v1",router)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

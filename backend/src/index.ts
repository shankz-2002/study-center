import app from "./app.js";
import "dotenv/config";
import { Connection } from "./database/connectDb.js";
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await Connection();
    console.log(`server is running at https://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

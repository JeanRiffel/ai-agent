import express from "express";
import { runAgent } from "../agent/core/agent";

const app = express();
app.use(express.json());

app.post("/agent", async (req, res) => {
  const { message } = req.body;
  const result = await runAgent(message);
  res.json({ response: result });
});

app.listen(3000, () => console.log("Agent running on http://localhost:3000"));

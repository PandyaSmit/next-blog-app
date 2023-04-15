// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mogodb";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(403).json({ error: "unauthorized" });
}

export default connectDB(handler);

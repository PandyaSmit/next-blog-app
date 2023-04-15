// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mogodb";
import { BlogsController } from "../../../src/controllers/BlogsController";
import { AuthController } from "../../../src/controllers/AuthController";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const dev = process.env.NODE_ENV === "production";
  const server = dev ? process.env.PROD_URL : process.env.URL;

  if (method === "GET") {
    if (!(await AuthController.auth(req, res))) {
      return NextResponse.redirect(`${server}/api/unauthorized`);
    }

    return [, BlogsController.getBlogs(req, res)];
  } else if (method === "POST") {
    return BlogsController.createBlog(req, res);
  } else {
    return res.status(404);
  }
}

export default connectDB(handler);

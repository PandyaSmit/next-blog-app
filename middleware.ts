import { NextRequest, NextResponse } from "next/server";

async function authToken(
  req: NextRequest,
  res: NextResponse
): Promise<boolean> {
  const auth = req.headers.get("authorization");

  // if (!auth) return false;

  return true;
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  const dev = process.env.NODE_ENV === "production";
  const server = dev ? process.env.PROD_URL : process.env.URL;

  if (!(await authToken(req, res))) {
    return NextResponse.redirect(`${server}/api/unauthorized`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:api/blogs"],
};

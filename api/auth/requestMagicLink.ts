import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { jwtSecret } from '@/lib/env-values'

import { saveToken, getUserByEmail } from "@/lib/database";

export async function POST(req: Request, res: Response) {
  const { email } = await req.json();

  const user = await getUserByEmail(email);

  if (!user) {
    return Response.json({ message: "User note found" });
  }

  // Create a magic link token
  const token = jwt.sign({ email }, jwtSecret, {
    expiresIn: "1h",
  });

  // Save token in your database with an expiration time
  await saveToken(user.id, token);

  // Set up email transporter and send the magic link
  return Response.json({ message: "Magic link sent!" });
}
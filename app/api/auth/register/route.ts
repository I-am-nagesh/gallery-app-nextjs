import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { registeredUsers } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const existingUser = await db
    .select()
    .from(registeredUsers)
    .where(eq(registeredUsers.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db
    .insert(registeredUsers)
    .values({ name, email, password: hashedPassword });

  return NextResponse.json({
    success: true,
    message: "User registered successfully",
  });
}

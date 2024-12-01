import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { registeredUsers } from "@/db/schema/users";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await db
      .select({
        id: registeredUsers.id,
        email: registeredUsers.email,
        password: registeredUsers.password,
      })
      .from(registeredUsers)
      .where(eq(registeredUsers.email, email))
      .limit(1);
    console.log("Fetched user:", user);
    if (user.length === 0 || !user[0].password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const userPassword = user[0].password;
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

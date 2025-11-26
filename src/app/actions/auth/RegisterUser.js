"use server";

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt"; // Make sure bcrypt is installed

export const RegisterUser = async (user) => {
  //   console.log("server action", user);

  const userCollection = dbConnect(collectionNamesObj.usersCollection);

  // Check if user already exists
  const existsUser = await userCollection.findOne({ email: user.email });
  if (existsUser) {
    return { success: false, message: "User already exists" };
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  // Store user with hashed password
  const result = await userCollection.insertOne({
    ...user,
    password: hashedPassword,
  });

  return { success: true, insertedId: result.insertedId.toString() };
};

"use server";

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const LoginUser = async (credentials) => {
  const { email, password } = credentials;

  const userCollection = dbConnect(collectionNamesObj.usersCollection);

  // Find user by email
  const user = await userCollection.findOne({ email });

  if (!user) {
    return null;
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    null;
  }

  // Convert _id to string to pass to Client Component safely
  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  // return { success: true, user: safeUser };
};

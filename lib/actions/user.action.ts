'use server';

import User from '../models/user.modal';
import { connect } from '../db';

export async function createUser(user: any) {
  try {
    await connect();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    await connect();

    const user = await User.findOne({ clerkId });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}

import { User } from "../models";

async function saveUser(user: any) {
  const userDoc = new User({
    ...user,
  });

  await userDoc.save();

  return {
    _id: userDoc._id,
  };
}

async function getUserByEmail(email: string) {
  const userDoc = await User.findOne({
    email,
  });

  if (!userDoc) return null;

  return userDoc;
}

export { saveUser, getUserByEmail };

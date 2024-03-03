import { User } from "../models";
import { NotFound } from "../utils/exceptions";

async function getProfileService(req: any) {
  const user = req.user;

  const userDoc = User.findById(user._id, {
    email: 1,
    firstName: 1,
    lastName: 1,
  });

  if (!userDoc) throw new NotFound("profile");

  return userDoc;
}

async function updateProdfileService(req: any) {
  const user = req.user;

  const { firstName, lastName } = req.body;

  const userDoc = await User.findById(user._id);

  if (!userDoc) throw new NotFound("profile");

  userDoc.firstName = firstName;
  userDoc.lastName = lastName;

  await userDoc.save();

  return null;
}

export { getProfileService, updateProdfileService };

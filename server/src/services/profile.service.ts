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

export { getProfileService };

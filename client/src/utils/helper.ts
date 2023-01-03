import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

async function getReferenceUser(id: string) {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, where("id", "==", id));
  const userDoc = await (await getDocs(q)).docs[0];

  return userDoc;
}

export { getReferenceUser };

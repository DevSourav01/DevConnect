import { arrayRemove, arrayUnion, doc, writeBatch } from "firebase/firestore";
import useAuth from "./useAuth";
import { db } from "../Lib/firebase";

const useFollow = () => {
  const { currentUser } = useAuth();

  const toggleFollow = async (targetUid: string, isFollowing: boolean) => {
    if (!currentUser) return;
    const myRef = doc(db, "users", currentUser.uid);
    const targetRef = doc(db, "users", targetUid);
    const batch = writeBatch(db);

    if (isFollowing) {
      // unfollow- remove from both
      batch.update(myRef, { following: arrayRemove(targetUid) });
      batch.update(targetRef, { followers: arrayRemove(currentUser.uid) });
    } else {
      // follow - add to both
      batch.update(myRef, { following: arrayUnion(targetUid) });
      batch.update(targetRef, { followers: arrayUnion(currentUser.uid) });
    }
    // commit both updates as the same time
    await batch.commit()
  };
  return {toggleFollow}
};

export default useFollow;

import { useCallback } from "react"; // 🔥 ADD THIS
import { arrayRemove, arrayUnion, doc, writeBatch } from "firebase/firestore";
import useAuth from "./useAuth";
import { db } from "../Lib/firebase";

const useFollow = () => {
  const { currentUser } = useAuth();

  const toggleFollow = useCallback(
    async (targetUid: string, isFollowing: boolean) => {
      if (!currentUser) throw new Error("Not logged in");

      try {
        const myRef = doc(db, "users", currentUser.uid);
        const targetRef = doc(db, "users", targetUid);
        const batch = writeBatch(db);

        if (isFollowing) {
          // Unfollow
          batch.update(myRef, { following: arrayRemove(targetUid) });
          batch.update(targetRef, { followers: arrayRemove(currentUser.uid) });
        } else {
          // Follow
          batch.update(myRef, { following: arrayUnion(targetUid) });
          batch.update(targetRef, { followers: arrayUnion(currentUser.uid) });
        }

        await batch.commit();
      } catch (error: unknown) {
        console.error("Follow error:", error);

        // 🔥 Type-safe error message
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        alert(`Follow failed: ${errorMessage}`);
        throw error;
      }
    },
    [currentUser],
  ); 

  return { toggleFollow }; 
};

export default useFollow;

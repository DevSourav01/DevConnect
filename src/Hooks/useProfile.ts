import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Lib/firebase";
import type { User } from "../Types";

const useProfile = (uid: string | undefined) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) return;

    const fetchProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
          setProfile(snap.data() as User);
        } else {
          setError("User not found");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uid]);

  return { profile, loading, error };
};

export default useProfile;

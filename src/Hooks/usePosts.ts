import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Lib/firebase";
import type { Post } from "../Types";
import useAuth from "./useAuth";

const usePosts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // real-time listener — updates feed instantly
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Post[];

      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // create a new post
  const createPost = async (content: string) => {
    if (!currentUser || !content.trim()) return;

    await addDoc(collection(db, "posts"), {
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarURL,
      content: content.trim(),
      likes: [],
      createdAt: serverTimestamp(),
    });
  };

  // delete a post (only your own)
  const deletePost = async (postId: string) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  return { posts, loading, createPost, deletePost };
};

export default usePosts;

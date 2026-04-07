import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Lib/firebase";
import type { Comment } from "../Types";
import useAuth from "./useAuth";

const useComments = (postId: string) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);

  // real-time listener on subcollection
  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate() || new Date(),
      })) as Comment[];
      setComments(data);
    });

    return () => unsubscribe();
  }, [postId]);

  // add comment
  const addComment = async (text: string) => {
    if (!currentUser || !text.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarURL,
      text: text.trim(),
      createdAt: serverTimestamp(),
    });
  };

  //delete comment

  const deleteComment = async (commentId: string) => {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
  };

  return { comments, addComment, deleteComment };
};

export default useComments;

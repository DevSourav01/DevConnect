import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import usePosts from "../Hooks/usePosts";
import useComments from "../Hooks/useComments";
import type { Post } from "../Types";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { currentUser } = useAuth();
  const { deletePost, toggleLike } = usePosts();
  const { comments, addComment, deleteComment } = useComments(post.id);

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isOwner = currentUser?.uid === post.authorId;
  const isLiked = currentUser ? post.likes.includes(currentUser.uid) : false;

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    await addComment(commentText);
    setCommentText("");
    setSubmitting(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
      {/* author row */}
      <div className="flex items-center justify-between mb-3">
        <Link
          to={`/profile/${post.authorId}`}
          className="flex items-center gap-3 hover:opacity-80"
        >
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-9 h-9 rounded-full border border-gray-100"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {post.authorName}
            </p>
          </div>
        </Link>

        {isOwner && (
          <button
            onClick={() => deletePost(post.id)}
            className="text-xs text-red-400 hover:text-red-600"
          >
            Delete
          </button>
        )}
      </div>

      {/* content */}
      <p className="text-sm text-gray-800 leading-relaxed mb-4">
        {post.content}
      </p>

      {/* like + comment buttons */}
      <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
        {/* like button */}
        <button
          onClick={() => toggleLike(post.id, post.likes)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            isLiked
              ? "text-[#D4537E] font-medium"
              : "text-gray-400 hover:text-[#D4537E]"
          }`}
        >
          {isLiked ? "♥" : "♡"}
          <span>{post.likes.length}</span>
        </button>

        {/* comment button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#534AB7] transition-colors"
        >
          ◯ <span>{comments.length}</span>
        </button>
      </div>

      {/* comments section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-50">
          {/* existing comments */}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-2 mb-3">
              <img
                src={c.authorAvatar}
                alt={c.authorName}
                className="w-7 h-7 rounded-full border border-gray-100 shrink-0"
              />
              <div className="bg-gray-100 rounded-xl px-3 py-2 flex-1">
                <p className="text-xs font-medium text-gray-700 mb-0.5">
                  {c.authorName}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {c.text}
                </p>
                {c.authorId === currentUser?.uid && (
                  <button
                    onClick={() => deleteComment(c.id)}
                    className="text-xs text-red-400 hover:text-red-700 mt-1"
                  >
                    delete
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* add comment input */}
          <div className="flex gap-2 mt-2">
            <img
              src={currentUser?.avatarURL}
              alt="you"
              className="w-7 h-7 rounded-full border border-gray-100 shrink-0"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button
                onClick={handleComment}
                disabled={submitting || !commentText.trim()}
                className="bg-[#534AB7] disabled:opacity-40 text-white text-xs px-3 py-1.5 rounded-xl hover:bg-[#3C3489] transition-colors"
              >
                {submitting ? "..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;

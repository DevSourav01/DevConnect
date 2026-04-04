import useAuth from "../Hooks/useAuth";
import usePosts from "../Hooks/usePosts";
import type { Post } from "../Types";
import { Link } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const { currentUser } = useAuth();
  const { deletePost } = usePosts();
  const isOwner = currentUser?.uid === post.authorId;

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

      {/* post content */}
      <p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>

      {/* likes count */}
      <div className="mt-3 pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </span>
      </div>
    </div>
  );
};

export default PostCard;

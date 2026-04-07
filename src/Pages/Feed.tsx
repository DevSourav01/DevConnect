import { useState }   from 'react'
import usePosts       from '../Hooks/usePosts'
import useAuth        from '../Hooks/useAuth'
import PostCard from '../Components/PostCard'

const Feed = () => {
  const { currentUser }           = useAuth()
  const { posts, loading, createPost } = usePosts()
  const [content, setContent]     = useState('')
  const [posting, setPosting]     = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return
    setPosting(true)
    await createPost(content)
    setContent('')
    setPosting(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* create post box */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6">
        <div className="flex gap-3">
          <img
            src={currentUser?.avatarURL}
            alt="you"
            className="w-9 h-9 rounded-full border border-gray-100 shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share something with the dev community..."
              rows={3}
              maxLength={1000}
              className="w-full text-sm text-gray-800 resize-none
                         focus:outline-none placeholder-gray-400"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-300">
                {content.length}/1000
              </span>
              <button
                onClick={handlePost}
                disabled={posting || !content.trim()}
                className="bg-[#534AB7] hover:bg-[#3C3489] disabled:opacity-40
                           text-white text-sm font-medium px-5 py-1.5
                           rounded-lg transition-colors"
              >
                {posting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* feed */}
      {loading ? (
        <p className="text-center text-gray-400 text-sm py-10">
          Loading feed...
        </p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-10">
          No posts yet. Be the first to post!
        </p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}

    </div>
  )
}

export default Feed
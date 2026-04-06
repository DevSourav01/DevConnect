import useAuth  from '../Hooks/useAuth'
import usePosts from '../Hooks/usePosts'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const { posts }       = usePosts()

  // count only your posts
  const myPosts = posts.filter(p => p.authorId === currentUser?.uid)

  return (
    <div>
      <h1 className="text-xl font-semibold mb-1">
        Welcome back, {currentUser?.displayName} 👋
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Here's what's happening on DevConnect
      </p>

      {/* stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-3">
          <p className="text-xs text-gray-400 mb-2">Your posts</p>
          <p className="text-3xl font-semibold text-[#534AB7]">
            {myPosts.length}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-3">
          <p className="text-xs text-gray-400 mb-2">Connections</p>
          <p className="text-3xl font-semibold text-[#1D9E75]">
            {currentUser?.followers?.length || 0}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-3">
          <p className="text-xs text-gray-400 mb-2">Total likes</p>
          <p className="text-3xl font-semibold text-[#BA7517]">
            {myPosts.reduce((acc, p) => acc + p.likes.length, 0)}
          </p>
        </div>
      </div>

      {/* recent posts */}
      <h2 className="text-sm font-medium text-gray-500 mb-4">Recent activity</h2>
      {posts.slice(0, 3).map(post => (
        <div key={post.id}
          className="bg-white border border-gray-100 rounded-2xl p-4 mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">
            {post.authorName}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">
            {post.content}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
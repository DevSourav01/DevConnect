import Skeleton from "./Skeleton"

const PostCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton width="36px" height="36px" rounded="rounded-full" />
      <div className="flex-1">
        <Skeleton width="120px" height="14px" className="mb-2" />
        <Skeleton width="80px"  height="12px" />
      </div>
    </div>
    <Skeleton height="14px" className="mb-2" />
    <Skeleton height="14px" width="80%" className="mb-2" />
    <Skeleton height="14px" width="60%" />
  </div>
)

export default PostCardSkeleton
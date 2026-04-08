import Skeleton from "./Skeleton"

const DevCardSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5">
    <div className="flex items-center gap-3 mb-3">
      <Skeleton width="44px" height="44px" rounded="rounded-full" />
      <div className="flex-1">
        <Skeleton width="130px" height="14px" className="mb-2" />
        <Skeleton width="80px"  height="12px" />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton width="60px"  height="22px" rounded="rounded-full" />
      <Skeleton width="80px"  height="22px" rounded="rounded-full" />
      <Skeleton width="70px"  height="22px" rounded="rounded-full" />
    </div>
  </div>
)

export default DevCardSkeleton
import { useState } from "react";
import { Link } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import useFollow from "../Hooks/useFollow";
import useAuth from "../Hooks/useAuth";
import DevCardSkeleton from "../Components/DevCardSkeleton";

const Connections = () => {
  const { currentUser } = useAuth();
  const { users, loading } = useUsers();
  const { toggleFollow } = useFollow();

  const [search, setSearch] = useState("");
  const [activeSkill, setActiveSkill] = useState("");
  const [loadingId, setLoadingId] = useState("");

  // all unique skills across all users for filter pills
  const allSkills = [...new Set(users.flatMap((u) => u.skills))].slice(0, 10);

  // filter by search + skill
  const filtered = users.filter((u) => {
    const matchSearch = u.displayName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchSkill = activeSkill ? u.skills.includes(activeSkill) : true;
    return matchSearch && matchSkill;
  });

  const handleFollow = async (targetUid: string, isFollowing: boolean) => {
    setLoadingId(targetUid);
    await toggleFollow(targetUid, isFollowing);
    setLoadingId("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-1">Developers</h1>
      <p className="text-sm text-gray-400 mb-6">
        Connect with developers in the community
      </p>

      {/* search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5
                   text-sm mb-4 focus:outline-none focus:ring-2
                   focus:ring-purple-300 bg-white"
      />

      {/* skill filter pills */}
      {allSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveSkill("")}
            className={`px-3 py-1 rounded-full text-xs border transition-colors
              ${
                !activeSkill
                  ? "bg-[#534AB7] text-white border-[#534AB7]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
          >
            All
          </button>

          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setActiveSkill(activeSkill === skill ? "" : skill)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors
                ${
                  activeSkill === skill
                    ? "bg-[#534AB7] text-white border-[#534AB7]"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
            >
              {skill}
            </button>
          ))}
        </div>
      )}

      {/* loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DevCardSkeleton />
          <DevCardSkeleton />
          <DevCardSkeleton />
          <DevCardSkeleton />
        </div>
      )}

      {/* developer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((user) => {
          const isFollowing =
            currentUser?.following?.includes(user.uid) || false;
          const isLoading = loadingId === user.uid;

          return (
            <div
              key={user.uid}
              className="bg-white border border-gray-100 rounded-2xl p-5"
            >
              {/* top row */}
              <div className="flex items-start justify-between mb-3">
                <Link
                  to={`/profile/${user.uid}`}
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <img
                    src={user.avatarURL}
                    alt={user.displayName}
                    className="w-11 h-11 rounded-full border border-gray-100"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.followers?.length || 0} followers
                    </p>
                  </div>
                </Link>

                {/* follow button */}
                <button
                  onClick={() => handleFollow(user.uid, isFollowing)}
                  disabled={isLoading}
                  className={`text-xs font-medium px-4 py-1.5 rounded-lg
                    border transition-colors disabled:opacity-50
                    ${
                      isFollowing
                        ? "bg-gray-50 border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-400 hover:border-red-200"
                        : "bg-[#EEEDFE] border-[#AFA9EC] text-[#3C3489] hover:bg-[#534AB7] hover:text-white"
                    }`}
                >
                  {isLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>

              {/* bio */}
              {user.bio && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* skills */}
              {user.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {user.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-[#EEEDFE] text-[#3C3489]
                                 text-xs rounded-full border border-[#AFA9EC]"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skills.length > 4 && (
                    <span className="text-xs text-gray-400">
                      +{user.skills.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* empty state */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-10">
          No developers found
        </p>
      )}
    </div>
  );
};

export default Connections;

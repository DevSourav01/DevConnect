import useGithub  from '../Hooks/useGithub'

interface Props {
  username: string
}

// simple language color map
const langColor: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python:     '#3572A5',
  CSS:        '#563D7C',
  HTML:       '#E34C26',
  Java:       '#B07219',
  Go:         '#00ADD8',
  Rust:       '#DEA584',
}

const GithubRepos = ({ username }: Props) => {
  const { repos, loading, error } = useGithub(username)

  if (loading) return (
    <div className="mt-6">
      <p className="text-sm font-medium text-gray-500 mb-3">GitHub repos</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i}
            className="h-24 bg-gray-100 rounded-xl animate-pulse"/>
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className="mt-6">
      <p className="text-sm font-medium text-gray-500 mb-2">GitHub repos</p>
      <p className="text-sm text-red-400">{error}</p>
    </div>
  )

  if (repos.length === 0) return null

  return (
    <div className="mt-6 pt-6 border-t border-gray-100">

      <div className="flex items-center gap-2 mb-4">
    {/* github icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
          className="text-gray-700">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <p className="text-sm font-medium text-gray-700">
          GitHub repos
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank" rel="noreferrer"
          className="text-xs text-[#534AB7] hover:underline ml-auto"
        >
          View all on GitHub
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="block border border-gray-100 rounded-xl p-4
                       hover:border-[#AFA9EC] hover:bg-[#FAFAFE]
                       transition-colors group"
          >
            <p className="text-sm font-medium text-gray-900
                        group-hover:text-[#534AB7] mb-1 truncate">
              {repo.name}
            </p>

            {repo.description && (
              <p className="text-xs text-gray-400 mb-3 line-clamp-2
                          leading-relaxed">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-3 text-xs text-gray-400">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    style={{ background: langColor[repo.language] || '#888' }}
                    className="w-2.5 h-2.5 rounded-full inline-block"
                  />
                  {repo.language}
                </span>
              )}
              <span>★ {repo.stargazers_count}</span>
              <span>⑂ {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>

    </div>
  )
}

export default GithubRepos
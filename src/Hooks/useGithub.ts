import { useState, useEffect } from "react";
import type { GithubRepo } from "../Types";

const useGithub = (username: string | undefined) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // don't fetch if no username set on profile
    if (!username?.trim()) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        );

        if (!res.ok) {
          throw new Error("GitHub user not found");
        }

        const data = await res.json();
        setRepos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
};

export default useGithub;

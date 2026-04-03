import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Register() {
  const [displayName, setDisplayname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        bio: "",
        skills: [],
        avatarURL: `https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`,
        githubUsername: "",
        followers: [],
        following: [],
        createdAt: serverTimestamp(),
      });
      navigate("/login");
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

  return (
    <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4">
      <div className="bg-white rounded-[20px] border border-gray-100 p-9 w-full max-w-md">
        <div className="flex items-center gap-2 mb-7">
          <div className="w-8 h-8 rounded-[10px] bg-[#534AB7] flex items-center justify-center">
            {/* your logo or initials */}
          </div>
          <span className="font-medium text-base">DevConnect</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Join DevConnect
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Connect with developers worldwide
        </p>
        {/* error message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayname(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
           focus:outline-none focus:ring-2 focus:ring-purple-400
           focus:border-purple-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
           focus:outline-none focus:ring-2 focus:ring-purple-400
           focus:border-purple-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="min 6 characters"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm
           focus:outline-none focus:ring-2 focus:ring-purple-400
           focus:border-purple-400 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#534AB7] hover:bg-[#3C3489] disabled:opacity-50
           text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#534AB7] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

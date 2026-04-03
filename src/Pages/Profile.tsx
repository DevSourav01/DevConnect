import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../Lib/firebase'
import useProfile from "../Hooks/useProfile"
import useAuth from '../Hooks/useAuth'

const Profile = () => {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const { profile, loading, error } = useProfile(id)
  console.log(profile?.githubUsername)

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // edit form state
  const [bio, setBio] = useState('')
  const [github, setGithub] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState('')

  // is this the logged-in user's own profile?
  const isOwner = currentUser?.uid === id

  const startEditing = () => {
    // pre-fill form with current profile values
    setBio(profile?.bio || '')
    setGithub(profile?.githubUsername || '')
    setSkills(profile?.skills || [])
    setIsEditing(true)
  }

  const addSkill = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault()
      const newSkill = skillInput.trim().replace(',', '')
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill])
      }
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleSave = async () => {
    if (!id) return
    setSaving(true)
    try {
      await updateDoc(doc(db, 'users', id), {
        bio,
        githubUsername: github,
        skills,
      })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-400">Loading profile...</p>
    </div>
  )

  if (error || !profile) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-400">User not found</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        {/* avatar + name row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatarURL}
              alt={profile.displayName}
              className="w-16 h-16 rounded-full border-2 border-gray-100 shadow-sm"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.displayName}
              </h1>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>

          {isOwner && !isEditing && (
            <button
              onClick={startEditing}
              className="text-sm font-medium border border-gray-200 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Edit profile
            </button>
          )}
        </div>

        {!isEditing ? (
          /* ── VIEW MODE ── */
          <>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 mb-3">Bio</p>
              <p className="text-gray-700 text-base leading-relaxed max-w-2xl">
                {profile.bio || 'No bio yet'}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills?.length > 0 ? (
                  profile.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No skills added yet</p>
                )}
              </div>
            </div>

            {profile.githubUsername && (
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">GitHub</p>
                <a
                  href={`https://github.com/${profile.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                >
                  github.com/{profile.githubUsername}
                </a>
              </div>
            )}
          </>
        ) : (
          /* ── EDIT MODE ── */
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-500 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={4}
                placeholder="Tell developers about yourself..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-500 mb-2">
                Skills <span className="font-normal text-gray-400">(press Enter or comma to add)</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-purple-600 hover:text-red-500 text-xs font-bold transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="e.g. React, TypeScript, Node.js..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-500 mb-2">
                GitHub username
              </label>
              <input
                type="text"
                value={github}
                onChange={e => setGithub(e.target.value)}
                placeholder="your-github-username"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm px-8 py-3 rounded-xl shadow-sm transition-all duration-200 flex-1 sm:flex-none"
              >
                {saving ? 'Saving...' : 'Save changes'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="border border-gray-200 hover:bg-gray-50 disabled:opacity-50 text-sm font-medium px-8 py-3 rounded-xl transition-all duration-200 flex-1 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
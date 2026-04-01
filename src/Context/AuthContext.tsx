import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged }  from 'firebase/auth'
import { doc, getDoc }        from 'firebase/firestore'
import { auth, db }           from '../Lib/firebase'
import type { User } from "../Types/index"

// shape of what context provides
interface AuthContextType {
  currentUser:  User | null
  loading:      boolean
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading:     true,
})

// Provider — wrap your whole app in this
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    // Firebase calls this every time auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // user is logged in → fetch their Firestore profile
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
        if (snap.exists()) {
          setCurrentUser(snap.data() as User)
        }
      } else {
        // user logged out
        setCurrentUser(null)
      }
      setLoading(false)
    })

    // cleanup listener when component unmounts
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// export the context itself for useAuth hook
export default AuthContext
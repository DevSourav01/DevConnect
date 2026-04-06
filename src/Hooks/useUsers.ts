import { useState, useEffect }   from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db }                      from '../Lib/firebase'
import type { User }               from '../Types'
import useAuth                      from './useAuth'

const useUsers = () => {
  const { currentUser }     = useAuth()
  const [users, setUsers]   = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser?.uid) return 
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snap) => {
        const data = snap.docs
          .map(d => d.data() as User)
          // filter out yourself
          .filter(u => u.uid !== currentUser?.uid)

        setUsers(data)
        setLoading(false)
      }
    )
    return () => unsubscribe()
  }, [currentUser?.uid])

  return { users, loading }
}

export default useUsers
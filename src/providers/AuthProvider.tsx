import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type AuthData = {
  session: Session | null,
  loading: boolean
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
})

export default function AuthProvider({children}: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // console.log('auth proveder is mounted')
    // fetch user session from supabase
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false)
    }
    // console.log('fetching session');

    fetchSession()
    // subscribe to session changes
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('setting session to', session);
      setSession(session);
    });
  }, [])

  return (
    <AuthContext.Provider value={{session, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

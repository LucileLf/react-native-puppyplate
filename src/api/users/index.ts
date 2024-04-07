import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';

// READ


export const useProfile = (id: number) =>  {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', id);
      // replace column names
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}


// export const fetchProfile = async () => {
//   if (!session) return;

//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', session.user.id)
//     .single();

//   if (error) {
//     console.error('Error fetching profile:', error);
//   } else {
//     setProfile(data);
//   }
// };

// fetchProfile();

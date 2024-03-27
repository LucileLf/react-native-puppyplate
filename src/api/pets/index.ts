import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';

// READ

export const usePetList = () =>  {
  return useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pets').select('*');
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}

export const usePet = (id: number) => {
  return useQuery({
    queryKey: ['pets', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// CREATE

export const useInsertPet = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newPet } = await supabase.from('pets').insert({
        name: data.name,
        image: data.image,
        price: data.price
      })
      .single()

      if (error) {
        throw new Error(error.message);
      }
      return newPet;
    },
    //invalidate the query cache for the 'Pets' key --> query get executed again
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey: ['pets']});
    },
  })
}

// UPDATE

export const useUpdatePet = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedPet } = await supabase.from('pets').update({
        name: data.name,
        image: data.image,
        price: data.price
      })
      .eq('id', data.id)
      .select()
      .single()

      if (error) {
        throw new Error(error.message);
      }
      return updatedPet;
    },
    //invalidate the query cache for the 'Pets' key --> query get executed again
    async onSuccess(_, data) {
      await queryClient.invalidateQueries({queryKey:['pets']});
      await queryClient.invalidateQueries({queryKey:['pets', data.id]});
    },
    //  onError(error) {

    // }
  })
}

// DELETE

export const useDeletePet = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(id: number) {
      const {error} = await supabase.from('pets').delete().eq('id', id)
      if (error) {
        throw new Error(error.message)
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({queryKey:['pets']});
    },
  })
}

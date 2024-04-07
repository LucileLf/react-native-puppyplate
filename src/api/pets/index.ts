import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { weights } from '@assets/data/pets';
import { NutritionalNeeds, Pet, Weight } from '@/types';

// READ PET
export const usePetList = () =>  {
  return useQuery({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pets').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const usePet = (id: string | string[]) => {
  console.log('looking for pet with id', id);
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

// READ BREED
export const useBreedList = () =>  {
  console.log("hi from breed list hook");

  return useQuery({
    queryKey: ['breeds'],
    queryFn: async () => {
      const { data, error } = await supabase.from('breeds').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const usePetBreed = (id: string, { enabled = true } = {}) => {
  console.log('enabled?', enabled);
  console.log('api looking from breed with id', id);

  return useQuery({
    queryKey: ['breed', id],
    queryFn: async () => {
      if (!enabled || !id) {
        return null;
      }
      const { data, error } = await supabase
        .from('breeds')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      // console.log('data', data);

      return data;
    }
  });
}

//READ ACTIVITY
export const useActivityList = () =>  {
  console.log("hi from activity list hook");

  return useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('activities').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const useActivity = (id: string, { enabled = true }) => {
  console.log('api looking from activity level with id', id);
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      if (!enabled|| !id) {
        return null;
      }
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);

      return data;
    }
  });
}

// READ STADE DE VIE
export const useStageList = () =>  {
  console.log("hi from stages list hook");

  return useQuery({
    queryKey: ['stages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('stages').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const useStage = (id: string, { enabled = true }) => {
  console.log('api looking from stade de vie with id', id);
  return useQuery({
    queryKey: ['stage', id],
    queryFn: async () => {
      if (!enabled|| !id) {
        return null;
      }
      const { data, error } = await supabase
        .from('stages')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);

      return data;
    }
  });
}

// READ ENVIRONMENT
export const useEnvList = () =>  {
  console.log("hi from env list hook");

  return useQuery({
    queryKey: ['environments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('environments').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const useEnv = (id: string, { enabled = true }) => {
  console.log('api looking from environment with id', id);
  return useQuery({
    queryKey: ['environment', id],
    queryFn: async () => {
      if (!enabled|| !id) {
        return null;
      }
      const { data, error } = await supabase
        .from('environments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);
      return data;
    }
  });
}

// READ VEG QUANTITY
export const useVegList = () =>  {
  console.log("hi from veg list hook");

  return useQuery({
    queryKey: ['veg_quantities'],
    queryFn: async () => {
      const { data, error } = await supabase.from('veg_quantities').select('*');
      // add condition based on user id instead of policy ?
      if (error) {
        throw new Error(error.message)
      }
      return data;
    }
  })
}
export const useVeg = (id: string, { enabled = true }) => {
  console.log('api looking from veg quantity with id', id);
  return useQuery({
    queryKey: ['veg_quantities', id],
    queryFn: async () => {
      if (!enabled|| !id) {
        return null;
      }
      const { data, error } = await supabase
        .from('veg_quantities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);
      return data;
    }
  });
}

// READ NUTRITIONAL NEEDS
export const usePetNutritionalNeeds = (pet_id: string, { enabled = true }) => {
  console.log('api looking from nutritional needs with pet_id', pet_id);
  return useQuery({
    queryKey: ['nutritional_needs', pet_id],
    queryFn: async () => {
      if (!enabled|| !pet_id) {
        return null;
      }
      const { data, error } = await supabase
        .from('nutritional_needs')
        .select('*')
        .eq('pet_id', pet_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      console.log('data', data);
      return data;
    }
  });
}
// READ WEIGHTS
export const usePetWeights = (petId: string, { enabled = true }) => {
  console.log('api looking from weights with pet_id', petId);
  return useQuery({
    queryKey: ['weights', petId],
    queryFn: async () => {
      if (!enabled|| !petId) {
        return null;
      }
      const { data, error } = await supabase
        .from('weights')
        .select('*')
        .eq('pet_id', petId)

      if (error) {
        throw new Error(error.message);
      }
      console.log('weightdata', data);
      return data;
    }
  });
}

// CREATE PET
export const useInsertPet = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({petData, user_id}: any) {
      // console.log('petData from insert pet hook', petData)
      // console.log('userId from insert pet hook', user_id)
      const { error, data: newPet } = await supabase.from('pets').insert({
        user_id: user_id,
        name: petData.name,
        breed: petData.breed.id,
        weight: petData.weight,
        ideal_weight: petData.ideal_weight,
        activity: petData.activity.id,
        life_stage: petData.life_stage.id,
        sterilized: petData.sterilized,
        environment: petData.lieu_de_vie.id,
        veg_quantity: petData.quantite_legumes.id,
        sex: petData.sexe,// TODO retrict to F or M
        // nutritional_needs_id
        // image: data.image,
      })
      .select()
      .single()
      if (error) {
        throw new Error(error.message);
      }
      console.log('newPet from insert pet', newPet);
      return newPet;
    },
    onSuccess: () => {
      //console.log('data after success', newPet);
      // invalidate the query cache for the 'Pets' key --> query get executed again

      console.log("pet inserted");
        queryClient.invalidateQueries({queryKey: ['pets']});


    },

      // console.log('new pet from insertpet hook', newPet);

  },
)}

// CREATE NUTRITIONAL NEEDS
export const useInsertNutritionalNeeds = () =>  {
  // const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(pet_nutri_needs: NutritionalNeeds) {
      console.log('inserting NN', pet_nutri_needs)
      const { error, data: newNN } = await supabase.from('nutritional_needs').insert({
        pet_id: pet_nutri_needs.pet_id,
        calories: pet_nutri_needs.calories,
        rpc: pet_nutri_needs.rpc,
        calcium: pet_nutri_needs.calcium
      })
      .single()
      console.log('newNN', newNN);
      console.log('error', error);

      if (error) {
        throw new Error(error.message);
      }
      console.log(`inserted nutritional needs for pet with id ${pet_nutri_needs.pet_id}`, pet_nutri_needs );

      return newNN;
    },
    //invalidate the query cache for the 'Pets' key --> query get executed again
    // async onSuccess() {
    //   await queryClient.invalidateQueries({queryKey: ['pets']});
    //   console.log("pet inserted");

    // },
  })
}

// CREATE WEIGHT ON PET CREATION
export const useInsertPetWeight = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(newPet: any, date: any) {
      console.log('inserting weight for', newPet)
      const { error, data: newWeight } = await supabase.from('weights').insert({
        pet_id: newPet.id,
        weight: newPet.weight,
        measurement_date: date
      })
      .select()
      .single()
      console.log('newWeight', newWeight);
      console.log('error', error);

      if (error) {
        console.log('error from insertpetweight', error);

        throw new Error(error.message);
      }
      console.log('inserted weight', newWeight );

      return newWeight;
    },
    onSuccess: (newWeight) => {
      //console.log('data after success', newPet);
      // invalidate the query cache for the 'Pets' key --> query get executed again
      console.log("newWeight after success", newWeight);
      console.log("weight inserted");
        queryClient.invalidateQueries({queryKey: ['weights', newWeight.pet_id]});
    },
    //invalidate the query cache for the 'Pets' key --> query get executed again
    // async onSuccess() {
    //   await queryClient.invalidateQueries({queryKey: ['pets']});
    //   console.log("pet inserted");

    // },
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

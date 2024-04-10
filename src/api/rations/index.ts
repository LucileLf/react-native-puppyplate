import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { NutritionalNeeds, Pet, Weight } from '@/types';


// READ PET RATIONS
export const usePetRations = (petId: string, { enabled = true }) => {
  console.log('api looking from rations with pet_id', petId);
  return useQuery({
    queryKey: ['rations', petId],
    queryFn: async () => {
      if (!enabled|| !petId) {
        return null;
      }
      const { data, error } = await supabase
        .from('rations')
        .select('*')
        .eq('pet_id', petId)
      if (error) {
        throw new Error(error.message);
      }
      console.log('rations fetched', data);
      return data;
    }
  });
}

// SELECT PET CURRENT RATION
export const useCurrentPetRation = (petId: string, { enabled = true }) => {
  console.log('api looking from rations with pet_id', petId);
  return useQuery({
    queryKey: ['rations', petId],
    queryFn: async () => {
      if (!enabled|| !petId) {
        return null;
      }
      const { data, error } = await supabase
        .from('rations')
        .select('*')
        .eq('pet_id', petId)
        .eq('current', true)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      console.log('rations fetched', data);
      return data;
    }
  });
}

export const useRation = (id: string | string[]) => {
  console.log('looking for ration with id', id);
  return useQuery({
    queryKey: ['rations', id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('rations')
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

export const useRationIngredients = (id: string | string[]) => {
  console.log('looking for ingredients with ration_id', id);
  return useQuery({
    queryKey: ['ration_ingredients', id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('ration_ingredients')
        .select('*')
        .eq('ration_id', id)
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useIngredient = (ingredientId: string, { enabled = true } = {}) => {
  console.log('looking for ingredient with ids', ingredientId);
  return useQuery({
    queryKey: ['ingredients', ingredientId],
    queryFn: async () => {
      if (!enabled|| !ingredientId ) {
        return null;
      }
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('id', ingredientId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useIngredients = (ingredientIds: string[], { enabled = true } = {}) => {
  console.log('looking for ingredients with ids', ingredientIds);
  return useQuery({
    queryKey: ['ingredients', ingredientIds],
    queryFn: async () => {
      if (!enabled|| !ingredientIds || ingredientIds.length === 0) {
        return null;
      }
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .in('id', ingredientIds);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: enabled && ingredientIds.length > 0,
  });
};

export const useUpdateRationToCurrent = ( id: string | string[] ) =>  {
  const queryClient = useQueryClient();
  console.log("hi from update ration to current");

  return useMutation({
    mutationFn: async () => {
      const { error: errorUpdatingTarget, data: updatedRation } = await supabase
        .from('rations')
        .update({ current: true })
        .eq('id', id)
        // .select()
        .single();

        console.log("errorUpdatingTarget:", errorUpdatingTarget);
      if (errorUpdatingTarget) throw new Error(errorUpdatingTarget.message);

      const { error: errorUpdatingOthers } = await supabase
      .from('rations')
      .update({ current: false })
      .not('id', 'eq', id);

      console.log("error updating others", errorUpdatingOthers);
      if (errorUpdatingOthers) throw new Error(errorUpdatingOthers.message);

      return updatedRation;
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey:['rations']});
      if (typeof id === 'string') {
        // Invalidate specific ration query if a single id was provided
        await queryClient.invalidateQueries({queryKey: ['rations', id]});
      }
    },
     onError: (error) => {
      console.error('Failed to update ration', error);
    }
  })
}

export const useUpdateRationToNotCurrent = ( id: string | string[] ) =>  {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error, data: updatedRation } = await supabase
        .from('rations')
        .update({ current: false })
        .eq('id', id)
        // .select()
        .single()
      if (error) {
        throw new Error(error.message);
      }
      console.log("updatedRation", updatedRation)
      return updatedRation;
    },
    //invalidate the query cache for the 'products' key --> query get executed again
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey:['rations']});
      await queryClient.invalidateQueries({queryKey:['rations', id]});
    },
    //  onError(error) => {
    //   console.error('Failed to update ration', error);

    // }
  })
}

  // fetch type_r
  // fetch cm
  // fetch mode


  // fetch Viandes, Oeufs, Laitages, Légumes, Féculents, Huiles
export const useIngredientSubGroup = (subgroup: string) => {
  const subgroups = ['viandes cuites', 'viandes crues', 'charcuteries et assimilés', 'autres produits à base de viande', 'poissons cuits', 'poissons crus', 'mollusques et crustacés cuits', 'mollusques et crustacés crus', 'produits à base de poissons et produits de la mer', 'substitus de produits carnés']
  // console.log('looking for ingredients with ids', subgroup);
  return useQuery({
    queryKey: ['ingredients', subgroup],
    queryFn: async () => {
      if (!subgroup || subgroups.length === 0) {
        return null;
      }
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .in('alim_ssgrp_nom_fr', subgroups);
      if (error) {
        throw new Error(error.message);
      }
      // console.log(`${data.length}ingredients in subgroup ${subgroup}`);

      return data;
    },
  });
};

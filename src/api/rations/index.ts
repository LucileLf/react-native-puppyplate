import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { NutritionalNeeds, Pet, Weight } from '@/types';
import { PetDetails } from '@/components/PetDetails';

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

export const useRationIngredients = (rationId: string | string[]) => {
  console.log('looking for ingredients with ration_id', rationId);
  return useQuery({
    queryKey: ['ration_ingredients', rationId],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('ration_ingredients')
        .select('*')
        .eq('ration_id', rationId)
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



export const useIngredientsByName = (ingredientsName: string, { enabled = true } = {}) => {
  console.log('looking for ingredients like', ingredientsName);
  return useQuery({
    queryKey: ['ingredients', ingredientsName],
    queryFn: async () => {
      if (!enabled|| !ingredientsName || ingredientsName.length === 0) {
        return null;
      }
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .ilike('title', `%${ingredientsName}%`);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: enabled && ingredientsName.length > 0,
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
      await queryClient.invalidateQueries({ queryKey: ['currentRation', id] });

      // await queryClient.invalidateQueries({ queryKey: ['pets', id, 'rations'] });
      // if (typeof id === 'string') {
      //   await queryClient.invalidateQueries({queryKey: ['rations', id]});
      // }
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

export const useIngredientSubGroup = (subgroup: string) => {
  let subgroups: String[]
    switch(subgroup) {
      case 'viande':
        subgroups = ['viandes cuites', 'viandes crues', 'charcuteries et assimilés', 'autres produits à base de viande', 'poissons cuits', 'poissons crus', 'mollusques et crustacés cuits', 'mollusques et crustacés crus', 'produits à base de poissons et produits de la mer', 'substitus de produits carnés']
        break;
      case 'oeuf':
        subgroups = ['oeufs']
        break;
      case 'laitage':
        subgroups = ['laits', 'produits laitiers frais et assimilés', 'fromages et assimilés', 'crèmes et spécialités à base de crème']
        break;
      case 'legume':
        subgroups = ['légumes']
        break;
      case 'feculent':
        subgroups = ['légumineuses', 'pommes de terre et autres tubercules', 'pâtes, riz et céréales']
        break;
      case 'huile':
        subgroups = ['huiles et graisses végétales', 'huiles de poissons', 'autres matières grasses']
        break;
    }
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

// CREATE RATION (NO NUTRITION INFO)
export const useInsertPetRation = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({petId, data}: any) {
      console.log(`inserting new ration for pet with id ${petId}`, data )
      const { error, data: newRation } = await supabase.from('rations').insert({
        pet_id: petId,
        title: data.title,
        comment: data.comment,
        type: data.type_r,
        cmv: data.cmv,
        mode: data.mode
      })
      .select()
      .single()
      console.log('new pet ration inserted', newRation);
      console.log('error', error);

      if (error) {
        console.log('error from insertpetration', error);
        throw new Error(error.message);
      }
      console.log('inserted ration', newRation );

      return newRation;
    },
    onSuccess: (newRation) => {
      //console.log('data after success', newPet);
      // invalidate the query cache for the 'Pets' key --> query get executed again
      console.log("newRation after success", newRation);
      console.log("ration inserted");
      queryClient.invalidateQueries({queryKey: ['rations', newRation.pet_id]});
    }
  })
}

// INSERT RATION INGREDIENT
export const useInsertRationIngredient = () =>  {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({rationId, ingredientId, quantity}: any) {
      console.log(`inserting ingredient ${ingredientId} to ration ${rationId}`, )
      const { error, data: newRationIngredient } = await supabase.from('ration_ingredients').insert({
        ration_id: rationId,
        ingredient_id: ingredientId,
        quantity_g: quantity
      })
      .select()
      .single()
      console.log('newWeight inserted', newRationIngredient);
      console.log('error', error);

      if (error) {
        console.log('error from insertpetweight', error);

        throw new Error(error.message);
      }
      console.log('inserted weight', newRationIngredient );

      return newRationIngredient;
    },
    onSuccess: (newRationIngredient) => {
      //console.log('data after success', newPet);
      // invalidate the query cache for the 'Pets' key --> query get executed again
      console.log("newRationIngredient after success", newRationIngredient);
      console.log("ration ingredient inserted");
        queryClient.invalidateQueries({queryKey: ['ration_ingredients', newRationIngredient.ration_id]});
    },
    //invalidate the query cache for the 'Pets' key --> query get executed again
    // async onSuccess() {
    //   await queryClient.invalidateQueries({queryKey: ['pets']});
    //   console.log("pet inserted");

    // },
  })
}

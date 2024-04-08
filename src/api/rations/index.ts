import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase';
import { NutritionalNeeds, Pet, Weight } from '@/types';

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

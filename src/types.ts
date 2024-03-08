export type Pet = {
  id: number;
  user_id: number;
  name: string;
  image: string | null;
  animal: string;
  breed: string;
  weight: number;
  ideal_weight: number;
  activity: string;
  life_stage: string;
  sterilized: boolean;
  lieu_de_vie: string;
  quantite_legumes: string;
  sexe: string,
  nutritional_needs: NutritionalNeeds | null
};

export type NutritionalNeeds = {
  pet_id: number,
  calories: number;
  rpc: number;
  calcium: number;
  // Add more nutritional properties
};

export type Ingredient = {
  id: number;
  name: string,
  type: string,
  calories: number,
  proteins: number,
  lipids: number,
  carbs: number,
  cendres: number,
  fibres: number,
  calcium: number,
  phosphorus: number,
  potassium: number,
}

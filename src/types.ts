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

export type Weight = {
    pet_id: number,
    weight: number,
    measurement_date: Date
}

export type Ration = {
  id: number,
  pet_id: number,
  type_r: string,
  cmv: string,
  mode: string,
  proteines: number,
  lipides: number,
  glucides: number,
  cendres: number,
  fibres: number,
  ca: number,
  p: number,
  titre: string,
  commentaire: string,
  // viande: number,
  // oeuf_id: number,
  // laitage_id: number,
  // legume_id: number,
  // feculent_id: number,
  // huile_id: number,
  current: boolean,
}


export type RationIngredient = {
  id: number,
  ration_id: number,
  ingredient_id: number,
  quantity_g: number
}

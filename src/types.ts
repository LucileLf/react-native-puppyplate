export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string; // Optional if not all profiles have an avatar
}

export type ProfileImages = {
  [key: string]: any;
  defaultImage: any; // Same here
};

export type Pet = {
  id: string;
  user_id: number;
  name: string;
  image: string | null;
  animal: string;
  breed: string; // FK breeds
  weight: number;
  ideal_weight: number;
  activity: string; // FK activities
  life_stage: string; // FK stages
  sterilized: boolean;
  environment: string; // FK environments
  veg_quantity: string; // FK veg_quantities
  sexe: string, // FK
  nutritional_needs: NutritionalNeeds | null // FK
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

export type FetchedWeightData = {
  id: string,
  pet_id: string,
  weight: number,
  measurement_date: string // coming as a string from the database
};


export type Weight = {
  id: string,
  pet_id: number,
  weight: number,
  measurement_date: Date
}

export type Ration = {
  id: number,
  pet_id: number,
  type_r: string, 
  cmv: string, 
  mode: string, // ARRAY
  proteines: number,
  lipides: number,
  glucides: number,
  cendres: number,
  fibres: number,
  ca: number,
  p: number,
  titre: string,
  commentaire: string
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

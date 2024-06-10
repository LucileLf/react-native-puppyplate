
import { Ingredient, Ration, RationIngredient } from '@/types';


export const ingredients: Ingredient[] = [
  {
    id: 1,
    name: 'Viande blanche, cuite',
    type: 'viande',
    calories: 173,
    proteins: 28.1,
    lipids: 6.55,
    carbs: 0.26,
    cendres: 1.3,
    fibres: 0.0009,
    calcium: 9.43,
    phosphorus: 233,
    potassium: 376
  },
  {
    id: 2,
    name: 'Haricot vert, cuit',
    type: 'légume',
    calories: 29.4,
    proteins: 2,
    lipids: 0.17,
    carbs: 3,
    cendres: 0.69,
    fibres: 4,
    calcium: 55.3,
    phosphorus: 36,
    potassium: 174
  },
  {
    id: 3,
    name: 'Riz complet, cuit, non salé',
    type: 'féculent',
    calories: 158,
    proteins: 3.21,
    lipids: 1,
    carbs: 32.6,
    cendres: 0.44,
    fibres: 2.3,
    calcium: 13,
    phosphorus: 120,
    potassium: 43
  },
  {
    id: 4,
    name: 'Lait entier UHT',
    type: 'laitage',
    calories: 65.1,
    proteins: 3.32,
    lipids: 3.63,
    carbs: 4.85,
    cendres: 0.7,
    fibres: 0,
    calcium: 120,
    phosphorus: 97,
    potassium: 160
  },
  {
    id: 5,
    name: 'Oeuf, dur',
    type: 'oeuf',
    calories: 134,
    proteins: 13.5,
    lipids: 8.62,
    carbs: 0.26,
    cendres: 0.88,
    fibres: 0,
    calcium: 41,
    phosphorus: 172,
    potassium: 120
  },
  {
    id: 6,
    name: 'Huile végétale',
    type: 'huile',
    calories: 900,
    proteins: 0.21,
    lipids: 99.9,
    carbs: 0,
    cendres: 0.11,
    fibres: 0,
    calcium: 0.29,
    phosphorus: 0.13,
    potassium: 0.19
  },
];



export const ingredientSubgroups = {
  'viande': [
    'viandes cuites', 'viandes crues', 'charcuteries et assimilés', 'autres produits à base de viande',
    'poissons cuits', 'poissons crus', 'mollusques et crustacés cuits', 'mollusques et crustacés crus',
    'produits à base de poissons et produits de la mer', 'substitus de produits carnés'
  ],
  'oeuf': ['oeufs'],
  'laitage': ['laits', 'produits laitiers frais et assimilés', 'fromages et assimilés', 'crèmes et spécialités à base de crème'],
  'legume': ['légumes'],
  'feculent': ['légumineuses', 'pommes de terre et autres tubercules', 'pâtes, riz et céréales'],
  'huile': ['huiles et graisses végétales', 'huiles de poissons', 'autres matières grasses'],
};

// export const rations: Ration[] = [
//   {
//     id: 1,
//     pet_id: 1,
//     type_r: "PRO BARF",
//     cmv: "Vit'i5 Orange (pot 600g)",
//     mode: "100% ration ménagère",
//     proteines: 100,
//     lipides: 100,
//     glucides: 100,
//     cendres: 100,
//     fibres: 100,
//     ca: 100,
//     p: 100,
//     titre: "Riz haricots viande blanche",
//     commentaire: "La recette pref de Frida",
//     // viande_id: 1,
//     // oeuf_id: 5,
//     // laitage_id: 4,
//     // legume_id: 2,
//     // feculent_id: 3,
//     // huile_id: 6,
//     current: true,
//   },
//   {
//     id: 2,
//     pet_id: 1,
//     type_r: "PRO BARF",
//     cmv: "Vit'i5 Orange (pot 600g)",
//     mode: "100% ration ménagère",
//     proteines: 100,
//     lipides: 100,
//     glucides: 100,
//     cendres: 100,
//     fibres: 100,
//     ca: 100,
//     p: 100,
//     titre: "Riz haricots viande blanche aussi",
//     commentaire: "La même chose mais différent",
//     // viande_id: 1,
//     // oeuf_id: 5,
//     // laitage_id: 4,
//     // legume_id: 2,
//     // feculent_id: 3,
//     // huile_id: 6,
//     current: false,
//   },
//   {
//     id: 3,
//     pet_id: 1,
//     type_r: "PRO BARF",
//     cmv: "Vit'i5 Orange (pot 600g)",
//     mode: "100% ration ménagère",
//     proteines: 100,
//     lipides: 100,
//     glucides: 100,
//     cendres: 100,
//     fibres: 100,
//     ca: 100,
//     p: 100,
//     titre: "Riz haricots viande blanche également",
//     commentaire: "C'est encore la même chose",
//     // viande_id: 1,
//     // oeuf_id: 5,
//     // laitage_id: 4,
//     // legume_id: 2,
//     // feculent_id: 3,
//     // huile_id: 6,
//     current: false,
//   }
// ]

export const rations_ingredients: RationIngredient[] = [
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 1, //viande
    quantity_g: 60
  },
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 5, //oeuf
    quantity_g: 50
  },
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 4, //laitage
    quantity_g: 30
  },
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 2, //legume
    quantity_g: 100
  },
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 2, //feculent
    quantity_g: 50
  },
  {
    id: 1,
    ration_id: 1,
    ingredient_id: 6, //huile
    quantity_g: 5
  },
  // same for ration 2 and 3

]

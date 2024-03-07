
import { Pet } from '@/types';
import fridaImage from '@assets/images/frida.jpg';
import gastonImage from '@assets/images/gaston.webp';
import bellaImage from '@assets/images/bella.webp';
import leoImage from '@assets/images/leo.webp';
import maxImage from '@assets/images/max.jpg';

const pets: Pet[] = [
  {
    id: 1,
    user_id: 1,
    name: "Frida",
    image: fridaImage,
    animal: "Chien",
    breed: "Dalmatien",
    weight: 12,
    ideal_weight: 12,
    activity: "Normal",
    life_stage: "Adulte (2 à 7 ans)",
    sterilized: true,
    lieu_de_vie: "Exterieur",
    quantite_legumes: "Normale",
    sexe: "Femelle"
  },
  {
    id: 2,
    user_id: 2,
    name: "Gaston",
    image: gastonImage,
    animal: "Chat",
    breed: "Siamois",
    weight: 5,
    ideal_weight: 5,
    activity: "Elevé",
    life_stage: "Senior (> 7 ans)",
    sterilized: false,
    lieu_de_vie: "Interieur",
    quantite_legumes: "Faible",
    sexe: "Male"
  },
  {
    id: 3,
    user_id: 3,
    name: "Bella",
    image: bellaImage,
    animal: "Chien",
    breed: "Labrador",
    weight: 25,
    ideal_weight: 24,
    activity: "Elevé",
    life_stage: "Jeune (moins de 2 ans)",
    sterilized: true,
    lieu_de_vie: "Exterieur",
    quantite_legumes: "Normale",
    sexe: "Femelle"
  },
  {
    id: 4,
    user_id: 4,
    name: "Léo",
    animal: "Chat",
    image: leoImage,
    breed: "Maine Coon",
    weight: 7,
    ideal_weight: 7,
    activity: "Normal",
    life_stage: "Adulte (2 à 7 ans)",
    sterilized: true,
    lieu_de_vie: "Interieur et Exterieur",
    quantite_legumes: "Faible",
    sexe: "Male"
  },
  {
    id: 5,
    user_id: 5,
    name: "Max",
    image: maxImage,
    animal: "Chien",
    breed: "Beagle",
    weight: 10,
    ideal_weight: 11,
    activity: "Normal",
    life_stage: "Senior (> 7 ans)",
    sterilized: false,
    lieu_de_vie: "Exterieur",
    quantite_legumes: "Normale",
    sexe: "Male"
  },
  {
    id: 6,
    user_id: 6,
    name: "Zoé",
    image: null,
    animal: "Chat",
    breed: "Persan",
    weight: 4,
    ideal_weight: 4.5,
    activity: "Faible",
    life_stage: "Jeune (moins de 2 ans)",
    sterilized: false,
    lieu_de_vie: "Interieur",
    quantite_legumes: "Faible",
    sexe: "Femelle"
  }
];


export default pets;

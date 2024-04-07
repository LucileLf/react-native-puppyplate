
import { Pet, Weight } from '@/types';
// import fridaImage from '@assets/images/Frida.jpg';
import gastonImage from '@assets/images/gaston.webp';
import bellaImage from '@assets/images/bella.webp';
import leoImage from '@assets/images/leo.webp';
import maxImage from '@assets/images/max.jpg';

// export const pets: Pet[] = [
//   {
//     id: 1,
//     user_id: 1,
//     name: "Frida",
//     image: '@assets/images/Frida.jpg',
//     animal: "Chien",
//     breed: "Dalmatien",
//     weight: 12,
//     ideal_weight: 12,
//     activity: "Normal",
//     life_stage: "Adulte (2 à 7 ans)",
//     sterilized: true,
//     lieu_de_vie: "Exterieur",
//     quantite_legumes: "Normale",
//     sexe: "Femelle",
//     nutritional_needs: {
//       pet_id: 1,
//       calories: 2821.0,
//       rpc: 75.0,
//       calcium: 3.52625
//     }
//   },
//   {
//     id: 2,
//     user_id: 2,
//     name: "Gaston",
//     image: gastonImage,
//     animal: "Chat",
//     breed: "Siamois",
//     weight: 5,
//     ideal_weight: 5,
//     activity: "Elevé",
//     life_stage: "Senior (> 7 ans)",
//     sterilized: false,
//     lieu_de_vie: "Interieur",
//     quantite_legumes: "Faible",
//     sexe: "Male",
//     nutritional_needs: null
//   },
//   {
//     id: 3,
//     user_id: 3,
//     name: "Bella",
//     image: bellaImage,
//     animal: "Chien",
//     breed: "Labrador",
//     weight: 25,
//     ideal_weight: 24,
//     activity: "Elevé",
//     life_stage: "Jeune (moins de 2 ans)",
//     sterilized: true,
//     lieu_de_vie: "Exterieur",
//     quantite_legumes: "Normale",
//     sexe: "Femelle",
//     nutritional_needs: null
//   },
//   {
//     id: 4,
//     user_id: 4,
//     name: "Léo",
//     animal: "Chat",
//     image: leoImage,
//     breed: "Maine Coon",
//     weight: 7,
//     ideal_weight: 7,
//     activity: "Normal",
//     life_stage: "Adulte (2 à 7 ans)",
//     sterilized: true,
//     lieu_de_vie: "Interieur et Exterieur",
//     quantite_legumes: "Faible",
//     sexe: "Male",
//     nutritional_needs: null
//   },
//   {
//     id: 5,
//     user_id: 5,
//     name: "Max",
//     image: maxImage,
//     animal: "Chien",
//     breed: "Beagle",
//     weight: 10,
//     ideal_weight: 11,
//     activity: "Normal",
//     life_stage: "Senior (> 7 ans)",
//     sterilized: false,
//     lieu_de_vie: "Exterieur",
//     quantite_legumes: "Normale",
//     sexe: "Male",
//     nutritional_needs: null
//   },
//   {
//     id: 6,
//     user_id: 6,
//     name: "Zoé",
//     image: null,
//     animal: "Chat",
//     breed: "Persan",
//     weight: 4,
//     ideal_weight: 4.5,
//     activity: "Faible",
//     life_stage: "Jeune (moins de 2 ans)",
//     sterilized: false,
//     lieu_de_vie: "Interieur",
//     quantite_legumes: "Faible",
//     sexe: "Femelle",
//     nutritional_needs: null
//   }
// ];

// export const weights: Weight[] = [
//   {
//     pet_id: 1,
//     weight: 22.2,
//     measurement_date: new Date('2023-11-15')
//   },
//   {
//     pet_id: 1,
//     weight: 23,
//     measurement_date: new Date('2023-12-15')
//   },
//   {
//     pet_id: 1,
//     weight: 21.9,
//     measurement_date: new Date('2024-01-15')
//   }
// ]

// export const breeds: string[] = [
//   "Akita Américain",
//   "Akita Inu",
//   "Basset Hound",
//   "Barzoï",
//   "Basenji",
//   "Beagle",
//   "Beagle Harrier",
//   "Bearded Collie",
//   "Beauceron",
//   "Berger Allemand",
//   "Berger Australien",
//   "Berger Belge Malinois",
//   "Berger Blanc Canadien",
//   "Berger Blanc Suisse",
//   "Berger de l'Atlas",
//   "Berger de Majorque",
//   "Berger des Appenzell",
//   "Berger des Ardennes",
//   "Berger des Pyrénées",
//   "Berger des Pyrénées à face rase",
//   "Berger des Shetland",
//   "Berger Picard",
//   "Berger Yougoslave de Charplanina",
//   "Bichon Frisé",
//   "Bichon Havanais",
//   "Bichon Maltais",
//   "Border Collie",
//   "Boston Terrier",
//   "Bouledogue Anglais",
//   "Bouledogue Français",
//   "Bouledogue",
//   "Bouvier Australien",
//   "Bouvier Bernois",
//   "Bouvier des Appenzell",
//   "Bouvier des Ardennes",
//   "Bouvier des Flandres",
//   "Boxer",
//   "Braque Allemand",
//   "Bulldog Anglais",
//   "Bulldog",
//   "Bull Terrier",
//   "Cairn Terrier",
//   "Cane Corso",
//   "Chien-loup de l'Est-Sibérien",
//   "Chien-loup de Saarloos",
//   "Chien-loup de Tamaskan",
//   "Chien-loup Tchécoslovaque",
//   "Chihuahua",
//   "Colley à poil court",
//   "Cocker Américain",
//   "Cocker Spaniel",
//   "Colley à poil long",
//   "Corgi Gallois de Cardigan",
//   "Corgi Gallois de Pembroke",
//   "Dalmatien",
//   "Dandie Dinmont Terrier",
//   "Doberman",
//   "Dogue Allemand",
//   "Dogue de Bordeaux",
//   "Épagneul Breton",
//   "Husky Sibérien",
//   "Jack Russell Terrier",
//   "Labrador Retriever",
//   "Leonberg",
//   "Lévrier Afghan",
//   "Lévrier Irlandais",
//   "Lévrier Whippet",
//   "Lhassa Apso",
//   "Malinois",
//   "Pembroke Welsh Corgi",
//   "Retriever de la Nouvelle-Écosse",
//   "Rhodesian Ridgeback",
//   "Rottweiler",
//   "Samoyède",
//   "Schnauzer nain",
//   "Scottish Terrier",
//   "Setter Irlandais",
//   "Shar Pei",
//   "Shih Tzu",
//   "Shiba Inu",
//   "Spitz Japonais",
//   "Spitz Moyen",
//   "Spitz Nain",
//   "Springer Spaniel Anglais",
//   "Staffordshire Bull Terrier",
//   "Teckel",
//   "Terre-Neuve",
//   "Terrier Gallois",
//   "Terrier Irlandais",
//   "Terrier Tibétain",
//   "Welsh Corgi Pembroke",
//   "Welsh Terrier",
//   "West Highland White Terrier",
//   "Yorkshire Terrier"
// ]

// export const activity: string[] = [
//   "Normal",
//   "Calme",
//   "TrèsCalme",
//   "Convalescence",
//   "ActifSportif (+1h30 de sortie)",
//   "HyperactifGrandSportif (+2h)"
// ]

// export const stades: string [] = [
//   "Senior (7 ans et +)",
//   "Adulte (2 à 7 ans)",
//   "Chiot (0 à 2 ans)"
// ]

// export const lieux: string [] = [
//   "Intérieur",
//   "Exterieur"
// ]

// export const q_legumes: string [] = [
//   "Normale",
//   "Augmentée",
//   "Réduite",
//   "Minimum"
// ]

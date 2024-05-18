// src/types/index.ts
// export interface Country {
//     name: {
//       common: string;
//       official: string;
//       nativeName?: {
//         [key: string]: {
//           official: string;
//           common: string;
//         };
//       };
//     };
//     population: number;
//     region: string;
//     subregion: string;
//     flags: {
//       png: string;
//       svg: string;
//     };
//     cca3: string;
//     capital?: string[];
//     languages?: { [key: string]: string };
//     borders?: string[];
//     tld?: string[];
//     currencies?: { [key: string]: Currency };
//   }
//   export interface Currency {
//     name: string;
//     symbol: string;
//   }

// src/types/index.ts

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

import mockDietData from './mockDietData';

export interface Nutrient {
  current: number;
  target: number;
  unit: string;
}

export interface Summary {
  calories: Nutrient;
  protein: Nutrient;
  fat: Nutrient;
  carbs: Nutrient;
  budget: Nutrient;
  [key: string]: Nutrient;
}

export interface Meals {
  [key: string]: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

export interface DietData {
  summary: Summary;
  allergies: string[];
  meals: Meals;
}

export function fetchDietData(): Promise<DietData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDietData as DietData);
    }, 500); // 0.5초 후 응답
  });
}

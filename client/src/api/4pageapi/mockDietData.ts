import { DietData } from './dietApi';

const mockDietData: DietData = {
  summary: {
    calories: { current: 1500, target: 2000, unit: 'kcal' },
    protein: { current: 85, target: 100, unit: 'g' },
    fat: { current: 23, target: 70, unit: 'g' },
    carbs: { current: 32.5, target: 250, unit: 'g' },
    budget: { current: 7500, target: 10000, unit: '원' },
  },
  allergies: ['땅콩', '새우', '우유', '계란'],
  meals: {
    breakfast: { protein: 25, fat: 8, carbs: 65 },
    lunch: { protein: 35, fat: 12, carbs: 95 },
    dinner: { protein: 30, fat: 15, carbs: 70 },
    snack: { protein: 10, fat: 5, carbs: 30 },
  },
};

export default mockDietData;

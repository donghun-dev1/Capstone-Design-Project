const mockDietData = {
  summary: {
    calories: { current: 1500, target: 2000 },
    protein: { current: 85, target: 100 },
    fat: { current: 23, target: 70 },
    carbs: { current: 32.5, target: 250 },
    budget: { current: 7500, target: 10000 },
  },
  allergies: ['땅콩', '새우', '우유', '계란'],
  meals: {
    breakfast: {
      calories: 450,
      protein: 25,
      fat: 8,
      carbs: 65,
    },
    lunch: {
      calories: 650,
      protein: 35,
      fat: 12,
      carbs: 95,
    },
    dinner: {
      calories: 550,
      protein: 30,
      fat: 15,
      carbs: 70,
    },
    snack: {
      calories: 200,
      protein: 10,
      fat: 5,
      carbs: 30,
    }
  }
};

export default mockDietData; 
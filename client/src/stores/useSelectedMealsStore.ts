import { create } from 'zustand';
import { Meal } from '@shared/schema';
import { useMealPlanStore } from './useMealPlanStore';

type SelectedMealsStore = {
  selectedMeals: (Meal | null)[];
  selectMeal: (meal: Meal, index?: number) => void;
  removeMeal: (index: number) => void;
  clearSelectedMeals: () => void;
  transferToMealPlan: () => void;
};

const useSelectedMealsStore = create<SelectedMealsStore>((set, get) => ({
  selectedMeals: [null, null, null],
  
  selectMeal: (meal, index) => set((state) => {
    const newSelectedMeals = [...state.selectedMeals];
    
    if (index !== undefined) {
      newSelectedMeals[index] = meal;
    } else {
      // 빈 슬롯 찾아서 추가
      const emptyIndex = newSelectedMeals.findIndex(item => item === null);
      if (emptyIndex !== -1) {
        newSelectedMeals[emptyIndex] = meal;
      }
    }
    
    return { selectedMeals: newSelectedMeals };
  }),
  
  removeMeal: (index) => set((state) => {
    const newSelectedMeals = [...state.selectedMeals];
    newSelectedMeals[index] = null;
    return { selectedMeals: newSelectedMeals };
  }),
  
  clearSelectedMeals: () => set({ selectedMeals: [null, null, null] }),
  
  transferToMealPlan: () => {
    const { selectedMeals } = get();
    const mealPlanStore = useMealPlanStore.getState();
    
    // 기존 식단 초기화
    mealPlanStore.resetMeals();
    
    // 선택한 식단들 영양소 및 유형에 따라 여러 슬롯에 분산하여 추가
    selectedMeals.forEach(meal => {
      if (meal) {
        // 식단 유형에 따라 슬롯 배정 (기본은 아침)
        const targetSlot = meal.type === 'lunch' ? 'lunch' : 
                          meal.type === 'dinner' ? 'dinner' : 'breakfast';
                          
        // 식단 추가
        mealPlanStore.addMeal(targetSlot, meal);
      }
    });
  },
}));

export default useSelectedMealsStore;

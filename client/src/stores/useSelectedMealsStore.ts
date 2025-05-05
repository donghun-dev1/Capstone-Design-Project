import { create } from 'zustand';
import { Meal } from '@shared/schema';

type SelectedMealsStore = {
  selectedMeals: (Meal | null)[];
  
  selectMeal: (meal: Meal, index?: number) => void; // 인덱스 지정 없으면 빈 슬롯에 자동 추가
  removeMeal: (index: number) => void;
  clearSelectedMeals: () => void;
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
}));

export default useSelectedMealsStore;

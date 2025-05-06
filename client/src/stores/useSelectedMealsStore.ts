import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Meal } from '@shared/schema';
import { useMealPlanStore } from './useMealPlanStore';

type SelectedMealsStore = {
  selectedMeals: (Meal | null)[];
  isInitialized: boolean;
  selectMeal: (meal: Meal, index?: number) => void;
  removeMeal: (index: number) => void;
  clearSelectedMeals: () => void;
  transferToMealPlan: () => void;
  initialize: () => void;
};

// 초기 상태는 모든 식단 슬롯이 비어있도록 설정
const initialState = {
  selectedMeals: [null, null, null],
  isInitialized: false
};

const useSelectedMealsStore = create(
  persist<SelectedMealsStore>(
    (set, get) => ({
      ...initialState,
      
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
      
      initialize: () => {
        // 이 함수는 앱이 시작될 때 한 번만 호출됨
        if (!get().isInitialized) {
          set({ ...initialState, isInitialized: true });
        }
      },
      
      transferToMealPlan: () => {
        const { selectedMeals } = get();
        const mealPlanStore = useMealPlanStore.getState();
        
        // 기존 식단 초기화
        mealPlanStore.resetMeals();
        
        // 선택한 식단들을 슬롯 순서대로 아침, 점심, 저녁에 배정
        const mealSlots = ['breakfast', 'lunch', 'dinner'] as const;
        
        console.log('transferToMealPlan 호출됨, 전달할 식단:', selectedMeals);
        
        // 비어있지 않은 식단만 필터링
        const validMeals = selectedMeals.filter(meal => meal !== null);
        
        // 각 슬롯에 식단을 고르게 분배
        validMeals.forEach((meal, index) => {
          if (meal) {
            // 인덱스에 따라 아침/점심/저녁 슬롯에 배정
            const targetSlot = mealSlots[index % mealSlots.length];
            
            // 식단 추가
            mealPlanStore.addMeal(targetSlot, meal);
            console.log(`${targetSlot} 슬롯에 식단 추가:`, meal.name);
          }
        });
      },
    }),
    {
      name: 'selected-meals-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useSelectedMealsStore;

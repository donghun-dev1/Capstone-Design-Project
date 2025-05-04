import { create } from 'zustand';
import { type DietRecommendation, type Meal } from '@shared/schema';

type RecommendStore = {
  recommendation: DietRecommendation | null;
  isLoading: boolean;
  error: string | null;
  
  setRecommendation: (recommendation: DietRecommendation) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

const useRecommendStore = create<RecommendStore>((set) => ({
  recommendation: null,
  isLoading: false,
  error: null,
  
  setRecommendation: (recommendation) => {
    set({ recommendation, isLoading: false, error: null });
  },
  
  setLoading: (isLoading) => {
    set({ isLoading });
  },
  
  setError: (error) => {
    set({ error, isLoading: false });
  },
  
  reset: () => {
    set({
      recommendation: null,
      isLoading: false,
      error: null,
    });
  },
}));

export default useRecommendStore;

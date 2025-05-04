import { create } from 'zustand';
import { type UserInfo } from '@shared/schema';

type UserInfoStore = {
  userInfo: Partial<UserInfo>;
  isFormValid: boolean;
  
  // Setters for each field
  setGender: (gender: UserInfo['gender']) => void;
  setHeight: (height: number | null) => void;
  setWeight: (weight: number | null) => void;
  setBodyFat: (bodyFat: number) => void;
  setGoal: (goal: UserInfo['goal']) => void;
  setActivityLevel: (activityLevel: UserInfo['activityLevel']) => void;
  setMealsPerDay: (mealsPerDay: number) => void;
  setAllergies: (allergies: string) => void;
  setBudget: (budget: number | null) => void;
  setTermsAgreed: (termsAgreed: boolean) => void;
  
  // Utility functions
  resetForm: () => void;
  validateForm: () => boolean;
};

const useUserInfoStore = create<UserInfoStore>((set, get) => ({
  userInfo: {
    bodyFat: 20,
    allergies: '',
    termsAgreed: false,
  },
  isFormValid: false,
  
  setGender: (gender) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, gender },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setHeight: (height) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, height },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setWeight: (weight) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, weight },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setBodyFat: (bodyFat) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, bodyFat },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setGoal: (goal) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, goal },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setActivityLevel: (activityLevel) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, activityLevel },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setMealsPerDay: (mealsPerDay) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, mealsPerDay },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setAllergies: (allergies) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, allergies },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setBudget: (budget) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, budget },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  setTermsAgreed: (termsAgreed) => {
    set((state) => {
      const newState = {
        userInfo: { ...state.userInfo, termsAgreed },
      };
      return {
        ...newState,
        isFormValid: validateUserInfo(newState.userInfo),
      };
    });
  },
  
  resetForm: () => {
    set({
      userInfo: {
        bodyFat: 20,
        allergies: '',
        termsAgreed: false,
      },
      isFormValid: false,
    });
  },
  
  validateForm: () => {
    const isValid = validateUserInfo(get().userInfo);
    set({ isFormValid: isValid });
    return isValid;
  },
}));

// Helper function to validate user info
function validateUserInfo(userInfo: Partial<UserInfo>): boolean {
  const { 
    gender, height, weight, bodyFat, goal, 
    activityLevel, mealsPerDay, budget, termsAgreed 
  } = userInfo;
  
  // Check required fields
  if (!gender || !height || !weight || bodyFat === undefined || 
      !goal || !activityLevel || !mealsPerDay || 
      !budget || !termsAgreed) {
    return false;
  }
  
  // Validate numeric ranges
  if (height < 100 || height > 220) return false;
  if (weight < 30 || weight > 200) return false;
  if (bodyFat < 5 || bodyFat > 50) return false;
  if (budget < 5000 || budget > 100000) return false;
  
  return true;
}

export default useUserInfoStore;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { UserInfo } from '@shared/schema';
import InputCard from '@/components/input/InputCard';
import TagInput from '@/components/input/TagInput';
import GenderInput from '@/components/input/GenderInput';
import NumberInput from '@/components/input/NumberInput';
import RangeInput from '@/components/input/RangeInput';
import SelectInput from '@/components/input/SelectInput';
import ButtonGroup from '@/components/input/ButtonGroup';
import TermsAgreement from '@/components/input/TermsAgreement';
import LoadingOverlay from '@/components/input/LoadingOverlay';
import ErrorModal from '@/components/input/ErrorModal';
import ImageGrid from '@/components/layout/ImageGrid';
import useUserInfoStore from '@/stores/useUserInfoStore';
import useRecommendStore from '@/stores/useRecommendStore';
import { getDietRecommendation } from '@/api/recommend';
import { useToast } from '@/hooks/use-toast';

/**
 * Main input page for collecting user information for diet recommendations
 */
const MainInputPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [requestTimeout, setRequestTimeout] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  // Get state and actions from stores
  const {
    userInfo,
    isFormValid,
    setGender,
    setHeight,
    setWeight,
    setBodyFat,
    setGoal,
    setActivityLevel,
    setMealsPerDay,
    setAllergies,
    setBudget,
    setTermsAgreed,
  } = useUserInfoStore();
  
  const { setRecommendation, setLoading: setRecommendLoading } = useRecommendStore();

  // Goal options
  const goalOptions = [
    { value: 'lose', label: '체중 감량' },
    { value: 'maintain', label: '체중 유지' },
    { value: 'gain', label: '체중 증가' },
    { value: 'muscle', label: '근육량 증가' },
  ];

  // Activity level options
  const activityOptions = [
    { value: 'sedentary', label: '거의 움직이지 않음' },
    { value: 'light', label: '가벼운 활동 (주 1-2회 운동)' },
    { value: 'moderate', label: '보통 활동 (주 3-5회 운동)' },
    { value: 'active', label: '활발한 활동 (주 6-7회 운동)' },
    { value: 'very_active', label: '매우 활발한 활동 (하루 2회 이상 운동)' },
  ];

  // Meals per day options
  const mealsOptions = [
    { value: 2, label: '2끼' },
    { value: 3, label: '3끼' },
  ];

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Check form validity again
      if (!isFormValid) {
        toast({
          title: "입력 오류",
          description: "모든 필수 항목을 올바르게 입력해주세요.",
          variant: "destructive",
        });
        return;
      }

      // Show loading overlay
      setIsLoading(true);
      setRecommendLoading(true);
      
      // Set timeout for long-running requests
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowErrorModal(true);
        setError("요청 시간이 너무 오래 걸립니다. 다시 시도해주세요.");
        setRecommendLoading(false);
      }, 8000);
      
      setRequestTimeout(timeout);
      
      // Get diet recommendations
      const recommendation = await getDietRecommendation(userInfo as any);
      
      // Clear timeout since request completed
      if (requestTimeout) {
        clearTimeout(requestTimeout);
        setRequestTimeout(null);
      }
      
      // Set recommendation in store and navigate to recommendation page
      setRecommendation(recommendation);
      setIsLoading(false);
      setRecommendLoading(false);
      navigate('/recommendations');
      
    } catch (err: any) {
      console.error("Error submitting form:", err);
      
      // Clear timeout if it exists
      if (requestTimeout) {
        clearTimeout(requestTimeout);
        setRequestTimeout(null);
      }
      
      setIsLoading(false);
      setRecommendLoading(false);
      
      if (err.message && err.message.includes('Validation error')) {
        toast({
          title: "유효성 검사 오류",
          description: "입력 정보를 확인해주세요.",
          variant: "destructive",
        });
      } else {
        setError("서버 연결 중 문제가 발생했습니다. 다시 시도해 주세요.");
        setShowErrorModal(true);
      }
    }
  };
  
  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (requestTimeout) {
        clearTimeout(requestTimeout);
      }
    };
  }, [requestTimeout]);
  
  return (
    <main className="min-h-screen pb-16 pt-10">
      <div className="main-input container mx-auto max-w-[640px] px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">맞춤형 식단 생성기</h1>
          <p className="text-gray-600">개인화된 식단 추천을 받기 위해 정보를 입력해주세요</p>
        </header>
        
        <form className="main-input__form" onSubmit={(e) => e.preventDefault()}>
          <div className="main-input__grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender Input */}
            <InputCard>
              <GenderInput 
                value={userInfo.gender} 
                onChange={setGender} 
              />
            </InputCard>
            
            {/* Height Input */}
            <InputCard>
              <NumberInput
                id="height"
                label="키 (cm)"
                value={userInfo.height}
                onChange={setHeight}
                min={100}
                max={220}
                placeholder="예: 170"
                errorMessage="100cm에서 220cm 사이의 값을 입력해주세요."
              />
            </InputCard>
            
            {/* Weight Input */}
            <InputCard>
              <NumberInput
                id="weight"
                label="몸무게 (kg)"
                value={userInfo.weight}
                onChange={setWeight}
                min={30}
                max={200}
                placeholder="예: 65"
                errorMessage="30kg에서 200kg 사이의 값을 입력해주세요."
              />
            </InputCard>
            
            {/* Body Fat Input */}
            <InputCard>
              <RangeInput
                id="bodyFat"
                label="체지방률 (%)"
                value={userInfo.bodyFat || 20}
                onChange={setBodyFat}
                min={5}
                max={50}
                step={1}
              />
            </InputCard>
            
            {/* Goal Input */}
            <InputCard>
              <SelectInput
                id="goal"
                label="목표"
                value={userInfo.goal}
                onChange={(value) => setGoal(value as UserInfo['goal'])}
                options={goalOptions}
                placeholder="목표를 선택하세요"
              />
            </InputCard>
            
            {/* Activity Level Input */}
            <InputCard>
              <SelectInput
                id="activityLevel"
                label="활동 수준"
                value={userInfo.activityLevel}
                onChange={(value) => setActivityLevel(value as UserInfo['activityLevel'])}
                options={activityOptions}
                placeholder="활동 수준을 선택하세요"
              />
            </InputCard>
            
            {/* Meals Per Day Input */}
            <InputCard>
              <ButtonGroup
                label="하루 끼니 수"
                options={mealsOptions}
                value={userInfo.mealsPerDay}
                onChange={setMealsPerDay}
              />
            </InputCard>
            
            {/* Allergies Input */}
            <InputCard>
              <TagInput
                id="allergies"
                label="알레르기 정보"
                tags={userInfo.allergies || []}
                onChange={setAllergies}
                placeholder="알레르기 추가 후 Enter"
                suggestions={["땅콩", "우유", "대두", "계란", "밀", "해산물", "조개류", "생선", "새우", "게", "견과류"]}
              />
            </InputCard>
            
            {/* Budget Input */}
            <InputCard>
              <NumberInput
                id="budget"
                label="하루 예산 (원)"
                value={userInfo.budget}
                onChange={setBudget}
                min={5000}
                max={100000}
                step={1000}
                placeholder="예: 15000"
                errorMessage="5,000원에서 100,000원 사이의 값을 입력해주세요."
              />
            </InputCard>
          </div>
          
          {/* Terms Agreement */}
          <div className="main-input__terms mt-8 bg-white p-5 rounded-xl shadow-sm">
            <TermsAgreement
              checked={userInfo.termsAgreed || false}
              onChange={setTermsAgreed}
            />
          </div>
          
          {/* Submit Button */}
          <div className="main-input__submit-container mt-8 flex justify-center">
            <button
              id="next-btn"
              type="button"
              className={`main-input__submit-btn ${!isFormValid ? 'main-input__submit-btn--disabled' : ''}`}
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              다음 단계로
            </button>
          </div>
        </form>
        
        {/* Loading Overlay */}
        <LoadingOverlay isVisible={isLoading} />
        
        {/* Error Modal */}
        <ErrorModal
          isVisible={showErrorModal}
          message={error || "오류가 발생했습니다. 다시 시도해주세요."}
          onRetry={() => {
            setShowErrorModal(false);
            handleSubmit();
          }}
          onClose={() => setShowErrorModal(false)}
        />
      </div>
      
      {/* Inspiration Image Grid */}
      <ImageGrid />
    </main>
  );
};

export default MainInputPage;

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
import SummaryModal from '@/components/input/SummaryModal';
import ImageGrid from '@/components/layout/ImageGrid';
import useUserInfoStore from '@/stores/useUserInfoStore';
import useRecommendStore from '@/stores/useRecommendStore';
import usePreviewStore from '@/stores/usePreviewStore';
import { getDietRecommendation, getNutritionSummary } from '@/api/recommend';
import { useToast } from '@/hooks/use-toast';
import StepNavigationBar from '@/components/ui/StepNavigationBar';
import { Separator } from "@/components/ui/separator";

/**
 * 체지방률 계산 함수 (BMI 기반)
 */
const calculateBodyFat = (height?: number, weight?: number, gender?: UserInfo['gender']) => {
  if (!height || !weight || !gender) return null;
  
  // BMI 계산
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // 체지방률 계산: BF% = 1.20·BMI + 0.23·age - 10.8·gender - 5.4
  // gender: male = 1, female = 0
  const genderMultiplier = gender === "male" ? 1 : 0;
  const assumedAge = 30; // 평균 나이 가정
  
  let bodyFat = 1.20 * bmi + 0.23 * assumedAge - 10.8 * genderMultiplier - 5.4;
  
  // 계산 결과 제한 (5%~50%)
  bodyFat = Math.max(5, Math.min(bodyFat, 50));
  
  return Math.round(bodyFat);
};

/**
 * U.S. Navy 둘레 공식을 사용한 체지방률 계산
 * 남성: 체지방률 = 495 / (1.0324 - 0.19077 * log10(허리 - 목) + 0.15456 * log10(키)) - 450
 * 여성: 체지방률 = 495 / (1.29579 - 0.35004 * log10(허리 + 엉덩이 - 목) + 0.22100 * log10(키)) - 450
 */
const calculateBodyFatNavy = (
  height?: number,
  gender?: UserInfo['gender'],
  neck?: number,
  waist?: number,
  hip?: number
) => {
  if (!height || !gender || !neck || !waist) return null;
  if (gender === "female" && !hip) return null;
  
  const log10 = (val: number) => Math.log(val) / Math.log(10);
  
  let bodyFat: number;
  
  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * log10(waist + hip! - neck) + 0.22100 * log10(height)) - 450;
  }
  
  // 계산 결과 제한 (5%~50%)
  bodyFat = Math.max(5, Math.min(bodyFat, 50));
  
  return Math.round(bodyFat);
};

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
    setNeckCircumference,
    setWaistCircumference,
    setHipCircumference,
  } = useUserInfoStore();
  
  const { setRecommendation, setLoading: setRecommendLoading } = useRecommendStore();
  const { summary, isVisible, setSummary, setVisible, reset: resetPreview } = usePreviewStore();

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

  // Handle summary request
  const handleRequestSummary = async () => {
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
      
      // Set timeout for long-running requests
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowErrorModal(true);
        setError("요청 시간이 너무 오래 걸립니다. 다시 시도해주세요.");
      }, 12000);
      
      setRequestTimeout(timeout);
      
      // Get nutrition summary
      const nutritionSummary = await getNutritionSummary(userInfo as UserInfo);
      
      // Clear timeout since request completed
      if (requestTimeout) {
        clearTimeout(requestTimeout);
        setRequestTimeout(null);
      }
      
      // Set summary in store and show modal
      setSummary(nutritionSummary);
      setVisible(true);
      setIsLoading(false);
      
    } catch (err: any) {
      console.error("Error getting nutrition summary:", err);
      
      // Clear timeout if it exists
      if (requestTimeout) {
        clearTimeout(requestTimeout);
        setRequestTimeout(null);
      }
      
      setIsLoading(false);
      
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
  
  // Handle proceeding to recommendation
  const handleProceedToRecommendation = async () => {
    try {
      // Hide summary modal and show loading
      setVisible(false);
      setIsLoading(true);
      setRecommendLoading(true);
      
      // Set timeout for long-running requests
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setShowErrorModal(true);
        setError("요청 시간이 너무 오래 걸립니다. 다시 시도해주세요.");
        setRecommendLoading(false);
      }, 12000);
      
      setRequestTimeout(timeout);
      
      // Get diet recommendations
      const recommendation = await getDietRecommendation(userInfo as UserInfo);
      
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
      console.error("Error getting recommendations:", err);
      
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
  
  // Handle form submission
  const handleSubmit = () => {
    // Request summary first
    handleRequestSummary();
  };
  
  // 키, 몸무게, 성별이 변경될 때 체지방률 자동 계산 (BMI 기반)
  useEffect(() => {
    // 기존 둘레 측정값이 있는지 확인 (있으면 계산하지 않음)
    const hasCircumferenceMeasurements = userInfo.gender === "male" 
      ? (userInfo.neckCircumference && userInfo.waistCircumference)
      : (userInfo.neckCircumference && userInfo.waistCircumference && userInfo.hipCircumference);
      
    if (hasCircumferenceMeasurements) return;
    
    // 기본 데이터 있을 때 자동 계산
    const calculatedBodyFat = calculateBodyFat(userInfo.height, userInfo.weight, userInfo.gender);
    
    if (calculatedBodyFat !== null && calculatedBodyFat !== userInfo.bodyFat) {
      setBodyFat(calculatedBodyFat);
    }
  }, [userInfo.height, userInfo.weight, userInfo.gender]);
  
  // 둘레 측정값이 변경될 때 체지방률 계산 (U.S. Navy 공식 기반)
  useEffect(() => {
    // 필요한 값이 모두 있는지 확인
    const hasRequiredValues = userInfo.gender === "male"
      ? (userInfo.height && userInfo.neckCircumference && userInfo.waistCircumference)
      : (userInfo.height && userInfo.neckCircumference && userInfo.waistCircumference && userInfo.hipCircumference);
      
    if (!hasRequiredValues) return;
    
    // U.S. Navy 둘레 공식으로 체지방률 계산
    const calculatedBodyFat = calculateBodyFatNavy(
      userInfo.height,
      userInfo.gender,
      userInfo.neckCircumference,
      userInfo.waistCircumference,
      userInfo.hipCircumference
    );
    
    if (calculatedBodyFat !== null && calculatedBodyFat !== userInfo.bodyFat) {
      setBodyFat(calculatedBodyFat);
    }
  }, [userInfo.height, userInfo.gender, userInfo.neckCircumference, userInfo.waistCircumference, userInfo.hipCircumference]);
  
  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (requestTimeout) {
        clearTimeout(requestTimeout);
      }
    };
  }, [requestTimeout]);
  
  return (
    <main className="min-h-screen pb-16 pt-10 bg-gradient-to-b from-background to-background/80 bg-grid-pattern">
      <div className="main-input container mx-auto max-w-[640px] px-4">
        {/* 세련된 헤더 디자인 */}
        <header className="mb-12 text-center relative">
          <div className="absolute -top-10 -left-20 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute -top-6 -right-16 w-32 h-32 bg-secondary/10 rounded-full filter blur-3xl opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            맞춤형 식단 생성기
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            당신의 건강 목표를 달성하기 위한 완벽한 영양 계획을 설계해 드립니다
          </p>
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
                placeholder="예: 173"
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
                placeholder="예: 73"
                errorMessage="30kg에서 200kg 사이의 값을 입력해주세요."
              />
            </InputCard>
            
            {/* Body Fat Input */}
            <InputCard>
              <div className="flex flex-col">
                <label htmlFor="bodyFat" className="main-input__label flex justify-between">
                  <span>체지방률 (%)</span>
                  <span className="font-medium text-primary">
                    {userInfo.bodyFat || 20}%
                    {userInfo.height && userInfo.weight && userInfo.gender && 
                      (
                        (userInfo.gender === "male" && userInfo.neckCircumference && userInfo.waistCircumference) || 
                        (userInfo.gender === "female" && userInfo.neckCircumference && userInfo.waistCircumference && userInfo.hipCircumference)
                      ) ? (
                        <span className="text-xs text-blue-500 ml-1">(U.S. Navy)</span>
                      ) : userInfo.height && userInfo.weight && userInfo.gender && (
                        <span className="text-xs text-gray-500 ml-1">(계산됨)</span>
                      )
                    }
                  </span>
                </label>
                <div className="mb-2">
                  <input
                    type="range"
                    id="bodyFat"
                    name="bodyFat"
                    className="main-input__range range-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min={5}
                    max={50}
                    step={1}
                    value={userInfo.bodyFat || 20}
                    onChange={(e) => setBodyFat(Number(e.target.value))}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>
            </InputCard>
            
            {/* U.S. Navy 둘레 공식 측정 입력 섹션 */}
            {userInfo.gender && (
              <div className="col-span-1 md:col-span-3 mt-2 mb-4">
                <Separator className="my-4" />
                <h3 className="text-md font-medium mb-3">U.S. Navy 둘레 공식 (정확한 체지방률 계산)</h3>
                <p className="text-sm text-gray-500 mb-6">더 정확한 체지방률 계산을 위해 아래 둘레 측정치를 입력해주세요 (선택사항)</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 목 둘레 */}
                  <InputCard>
                    <NumberInput
                      id="neckCircumference"
                      label="목 둘레 (cm)"
                      value={userInfo.neckCircumference}
                      onChange={setNeckCircumference}
                      min={20}
                      max={60}
                      placeholder="예: 38"
                      errorMessage="20cm에서 60cm 사이의 값을 입력해주세요."
                    />
                  </InputCard>
                  
                  {/* 허리 둘레 */}
                  <InputCard>
                    <NumberInput
                      id="waistCircumference"
                      label="허리 둘레 (cm)"
                      value={userInfo.waistCircumference}
                      onChange={setWaistCircumference}
                      min={50}
                      max={150}
                      placeholder="예: 84"
                      errorMessage="50cm에서 150cm 사이의 값을 입력해주세요."
                    />
                  </InputCard>
                  
                  {/* 여성일 경우 엉덩이 둘레도 추가 */}
                  {userInfo.gender === "female" && (
                    <InputCard>
                      <NumberInput
                        id="hipCircumference"
                        label="엉덩이 둘레 (cm)"
                        value={userInfo.hipCircumference}
                        onChange={setHipCircumference}
                        min={50}
                        max={150}
                        placeholder="예: 95"
                        errorMessage="50cm에서 150cm 사이의 값을 입력해주세요."
                      />
                    </InputCard>
                  )}
                </div>
                <Separator className="my-6" />
              </div>
            )}
            
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
          
          {/* 폼 끝 공간 */}
          <div className="mt-8"></div>
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
      
      {/* 하단 내비게이션 바 */}
      <StepNavigationBar 
        currentStep={1} 
        onNext={handleSubmit}
        nextButtonText="다음 단계로"
      />
      
      {/* Inspiration Image Grid */}
      <ImageGrid />
      
      {/* Summary Modal */}
      <SummaryModal 
        isVisible={isVisible}
        summary={summary}
        onContinue={handleProceedToRecommendation}
      />
    </main>
  );
};

export default MainInputPage;

import React, { useState } from 'react';
import { Meal } from '@shared/schema';
import { X, ShoppingBag, Info, Plus } from 'lucide-react';

interface FoodDetailProps {
  meal: Meal;
  onClose: () => void;
  onSelect: () => void;
}

const FoodDetail: React.FC<FoodDetailProps> = ({ meal, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md
                    animate-in fade-in duration-300">
      <div className="relative premium-card max-w-2xl w-full mx-4 p-0 max-h-[90vh] overflow-hidden
                     bg-white/95 dark:bg-gray-800/95 border border-gray-100/60 dark:border-gray-700/30
                     rounded-2xl shadow-xl">
        {/* 상단 그라디언트 효과 */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* 헤더 영역 - 고정 */}
        <div className="sticky top-0 z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md 
                       border-b border-gray-100/60 dark:border-gray-700/30 p-4">
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                     bg-gray-100/80 dark:bg-gray-700/50 p-1.5 rounded-full 
                     transition-all duration-200 hover:bg-gray-200/80 dark:hover:bg-gray-600/70"
            onClick={onClose}
          >
            <X size={18} />
          </button>
          
          <h2 className="text-2xl font-bold pr-8 text-gradient">{meal.name}</h2>
          
          <div className="mt-2 flex flex-wrap gap-1.5">
            {meal.tags?.map(tag => (
              <span key={tag} className="inline-flex px-2 py-0.5 rounded-full 
                                       bg-primary/10 dark:bg-primary/20 
                                       text-primary/90 dark:text-primary-foreground/90 
                                       text-xs font-medium">
                #{tag}
              </span>
            )) || (
              <>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/90 dark:text-primary-foreground/90 text-xs font-medium">
                  #일반식
                </span>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/90 dark:text-primary-foreground/90 text-xs font-medium">
                  #건강식
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* 스크롤 가능한 콘텐츠 영역 */}
        <div className="overflow-y-auto max-h-[70vh] scrollbar-thin p-6 pt-5 relative z-[5]">
          {/* 음식 이미지 */}
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-100/80 dark:border-gray-700/30 shadow-sm">
            <img 
              src={meal.imageUrl || '/placeholder-food.jpg'} 
              alt={meal.name}
              className="w-full h-52 sm:h-64 object-cover"
            />
          </div>
          
          {/* 음식 상세 설명 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
              음식 설명
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {meal.description || meal.recipe || `${meal.name}은(는) 건강하고 맛있는 음식입니다. 영양소가 고루 배합되어 있어서 식사 대체나 건강 식단으로 적합합니다. 단백질, 탄수화물, 지방의 배합이 적절하여 식후 만족감을 주며 다양한 비타민과 미네랄을 포함하고 있습니다.`}
            </p>
          </div>
          
          {/* 영양소 정보 - 세련된 디자인 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
              영양소 정보
            </h3>
            
            {/* 주요 영양소 카드 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/5 dark:bg-primary/10 text-center border border-primary/10 dark:border-primary/20">
                <div className="text-xs text-primary/80 dark:text-primary-foreground/80 font-medium">칼로리</div>
                <div className="font-bold text-primary/90 dark:text-primary-foreground/90 mt-1">
                  {meal.calories || meal.nutrition?.calories || 0}
                  <span className="text-xs font-normal ml-0.5">kcal</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-accent/5 dark:bg-accent/10 text-center border border-accent/10 dark:border-accent/20">
                <div className="text-xs text-accent/80 dark:text-accent-foreground/80 font-medium">단백질</div>
                <div className="font-bold text-accent/90 dark:text-accent-foreground/90 mt-1">
                  {meal.protein || meal.nutrition?.protein || 0}
                  <span className="text-xs font-normal ml-0.5">g</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-secondary/5 dark:bg-secondary/10 text-center border border-secondary/10 dark:border-secondary/20">
                <div className="text-xs text-secondary/80 dark:text-secondary-foreground/80 font-medium">탄수화물</div>
                <div className="font-bold text-secondary/90 dark:text-secondary-foreground/90 mt-1">
                  {meal.carbs || meal.nutrition?.carbs || 0}
                  <span className="text-xs font-normal ml-0.5">g</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-success/5 dark:bg-success/10 text-center border border-success/10 dark:border-success/20">
                <div className="text-xs text-success/80 dark:text-success-foreground/80 font-medium">지방</div>
                <div className="font-bold text-success/90 dark:text-success-foreground/90 mt-1">
                  {meal.fat || meal.nutrition?.fat || 0}
                  <span className="text-xs font-normal ml-0.5">g</span>
                </div>
              </div>
            </div>
            
            {/* 추가 영양소 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-2.5 rounded-lg bg-gray-50/70 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600/30">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">나트륨</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {meal.sodium || meal.nutrition?.sodium || 120}
                  <span className="text-xs font-normal ml-0.5 text-gray-500 dark:text-gray-400">mg</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50/70 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600/30">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">당류</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {meal.sugar || meal.nutrition?.sugar || 5}
                  <span className="text-xs font-normal ml-0.5 text-gray-500 dark:text-gray-400">g</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50/70 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-600/30">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">식이섬유</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {meal.fiber || meal.nutrition?.fiber || 3}
                  <span className="text-xs font-normal ml-0.5 text-gray-500 dark:text-gray-400">g</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 건강 혜택 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
              건강 혜택
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 relative ml-1">
              <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-primary/10 rounded-full"></div>
              <li className="flex items-start pl-7 relative">
                <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40"></span>
                <span>단백질 섭취량이 높아 근육 생성과 유지에 도움을 주는 것으로 알려져 있습니다.</span>
              </li>
              <li className="flex items-start pl-7 relative">
                <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40"></span>
                <span>비타민과 미네랄을 포함하여 면역 시스템 강화에 도움을 줄 수 있습니다.</span>
              </li>
              <li className="flex items-start pl-7 relative">
                <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary/20 border-2 border-primary/40"></span>
                <span>적당한 양의 건강한 지방을 함유하여 호르몬 균형 유지에 도움을 줍니다.</span>
              </li>
            </ul>
          </div>
          
          {/* 점수 및 추천 시간대 */}
          <div className="mb-8 flex bg-gray-50/80 dark:bg-gray-800/60 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/30">
            <div className="flex-1 p-4 border-r border-gray-100 dark:border-gray-700/30">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">영양 점수</h3>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-gradient">{meal.score || 85}</div>
                <div className="text-sm text-gray-500 ml-1">/100</div>
              </div>
              <p className="text-xs text-gray-500 mt-1">개인화된 영양 기준 기반</p>
            </div>
            
            <div className="flex-1 p-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">추천 시간대</h3>
              <div className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-14 text-gray-500">아침</span> 
                  {meal.tags?.includes('아침') ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                      <span className="mr-1 text-[10px]">●</span> 추천
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                      적합
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-14 text-gray-500">점심</span> 
                  {meal.tags?.includes('점심') || !meal.tags?.includes('아침') ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                      <span className="mr-1 text-[10px]">●</span> 추천
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                      적합
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-14 text-gray-500">저녁</span> 
                  {meal.tags?.includes('저녁') || !meal.tags?.includes('아침') ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                      <span className="mr-1 text-[10px]">●</span> 추천
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400">
                      적합
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 하단 고정 버튼 영역 */}
        <div className="sticky bottom-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 border-t border-gray-100/60 dark:border-gray-700/30">
          <button
            className="premium-button w-full py-3.5 bg-gradient-to-r from-primary to-primary/90 
                     text-white font-medium rounded-xl flex items-center justify-center space-x-2.5
                     shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30
                     transition-all duration-300 hover:translate-y-[-2px] active:translate-y-0"
            onClick={onSelect}
          >
            <ShoppingBag size={18} />
            <span>식단에 추가하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface FoodCardProps {
  meal: Meal;
  onSelect: (meal: Meal) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ meal, onSelect }) => {
  const [showPopup, setShowPopup] = useState(false);
  
  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handleSelectMeal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // 이벤트 버블링 방지
    onSelect(meal);
    if (showPopup) setShowPopup(false);
  };
  
  return (
    <>
      <div 
        className="premium-card group p-5 rounded-xl flex flex-col md:flex-row md:h-44 w-full
                   backdrop-blur-sm transition-all duration-300 hover:translate-y-[-2px]
                   bg-white/90 dark:bg-gray-800/90 border border-gray-100/80 dark:border-gray-700/30
                   hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10"
      >
        {/* 이미지 컨테이너 - 고급스러운 보더 및 이펙트 적용 */}
        <div className="relative rounded-xl overflow-hidden mb-3 md:mb-0 md:w-48 md:min-w-48 md:mr-5 flex-shrink-0
                       border border-gray-100/30 dark:border-gray-700/20 shadow-sm">
          <img 
            src={meal.imageUrl || '/placeholder-food.jpg'} 
            alt={meal.name}
            className="w-full h-36 md:h-full object-cover transition-transform duration-700 
                       group-hover:scale-[1.02] group-hover:duration-500"
          />
          {/* 세련된 스코어 뱃지 - 정교한 그라디언트 적용 */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-primary/90 
                         text-white px-2.5 py-1 rounded-full text-xs font-semibold
                         shadow-md shadow-primary/20 flex items-center gap-0.5">
            <span className="opacity-90">{meal.score || 85}</span>
            <span className="text-[10px] opacity-80">점</span>
          </div>
        </div>
        
        {/* 콘텐츠 영역 - 세련된 타이포그래피 적용 */}
        <div className="flex flex-col justify-between flex-grow overflow-hidden">
          <div>
            {/* 고급스러운 제목 스타일 */}
            <h3 className="text-lg font-bold mb-1.5 text-foreground overflow-hidden text-ellipsis whitespace-nowrap
                          bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700
                          dark:from-gray-100 dark:to-gray-300">{meal.name}</h3>
            
            {/* 세련된 태그 디자인 */}
            <div className="text-xs mb-3 flex flex-wrap gap-1">
              {meal.tags?.map(tag => (
                <span key={tag} className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20
                                         text-primary/90 dark:text-primary-foreground/90 font-medium">
                  #{tag}
                </span>
              )) || (
                <>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/90 dark:text-primary-foreground/90 font-medium">
                    #일반식
                  </span>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/90 dark:text-primary-foreground/90 font-medium">
                    #건강식
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* 영양소 및 액션 버튼 영역 */}
          <div className="flex flex-col md:flex-row justify-between items-end mt-auto">
            <div className="hidden md:grid grid-cols-4 gap-3 mb-2 md:mb-0 md:mr-auto">
              {/* 고급스러운 영양소 정보 디스플레이 */}
              <div className="px-2 py-1 rounded-lg bg-primary/5 dark:bg-primary/10 text-center">
                <div className="text-[10px] text-primary/80 dark:text-primary-foreground/80 font-medium">칼로리</div>
                <div className="text-sm font-semibold text-primary/90 dark:text-primary-foreground/90">{meal.calories}kcal</div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-accent/5 dark:bg-accent/10 text-center">
                <div className="text-[10px] text-accent/80 dark:text-accent-foreground/80 font-medium">단백질</div>
                <div className="text-sm font-semibold text-accent/90 dark:text-accent-foreground/90">{meal.protein}g</div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-secondary/5 dark:bg-secondary/10 text-center">
                <div className="text-[10px] text-secondary/80 dark:text-secondary-foreground/80 font-medium">탄수화물</div>
                <div className="text-sm font-semibold text-secondary/90 dark:text-secondary-foreground/90">{meal.carbs}g</div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-success/5 dark:bg-success/10 text-center">
                <div className="text-[10px] text-success/80 dark:text-success-foreground/80 font-medium">지방</div>
                <div className="text-sm font-semibold text-success/90 dark:text-success-foreground/90">{meal.fat || 0}g</div>
              </div>
            </div>
            
            {/* 세련된 액션 버튼 */}
            <div className="flex space-x-2 mt-2 md:mt-0 md:flex-shrink-0">
              <button 
                className="premium-button px-3 py-1.5 text-xs font-medium rounded-xl 
                          border border-gray-200/80 dark:border-gray-700/50 
                          bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-300
                          hover:border-primary/30 dark:hover:border-primary/40
                          hover:shadow-sm hover:shadow-primary/5
                          backdrop-blur-sm flex items-center space-x-1.5
                          transition-all duration-300"
                onClick={handleDetailClick}
              >
                <Info size={14} className="text-primary/90" />
                <span>상세 보기</span>
              </button>
              
              <button 
                className="premium-button px-3 py-1.5 text-xs font-medium rounded-xl
                          bg-gradient-to-r from-primary to-primary/90 text-white
                          shadow-sm shadow-primary/20 
                          hover:shadow-md hover:shadow-primary/30
                          flex items-center space-x-1.5
                          transition-all duration-300"
                onClick={handleSelectMeal}
              >
                <Plus size={14} />
                <span>바로 담기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <FoodDetail 
          meal={meal} 
          onClose={handleClosePopup} 
          onSelect={handleSelectMeal}
        />
      )}
    </>
  );
};

export default FoodCard;
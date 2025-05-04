import { Switch, Route } from "wouter";
import MainInputPage from "@/pages/MainInputPage";
import RecommendPage from "@/pages/RecommendPage";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={MainInputPage}/>
      <Route path="/recommendations" component={RecommendPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

// 음식 아이콘 SVG 서브컴포넌트
function FoodIcon({ type, size, style }: { type: string, size: number, style?: React.CSSProperties }) {
  const icons = {
    apple: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M11.8 5.5C10.1 5.5 8.8 4.2 8.8 2.5H7C7 5.1 9.2 7.2 11.8 7.2C14.4 7.2 16.6 5 16.6 2.5H14.8C14.8 4.2 13.5 5.5 11.8 5.5zM20.1 8.5C19.8 8.2 19 7.5 17.7 7.5C16.4 7.5 15.1 8.4 14.3 8.7C14 8.8 13.7 8.9 13.4 8.9H10.3C10 8.9 9.7 8.8 9.4 8.7C8.5 8.4 7.2 7.5 5.9 7.5C4.6 7.5 3.8 8.2 3.5 8.5C2.9 9.1 2 10.2 2 12.5C2 15.7 4.4 22 6.2 22C7.5 22 8 21.3 9.8 21.3H13.9C15.6 21.3 16.2 22 17.5 22C19.3 22 21.7 15.7 21.7 12.5C21.7 10.2 20.8 9.1 20.1 8.5z" />
      </svg>
    ),
    broccoli: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M17 8C16.28 8 15.62 8.2 15.08 8.56C14.58 6.5 12.87 5 10.75 5C8.13 5 6 7.13 6 9.75V10.83C5.7 10.77 5.36 10.75 5 10.75C3.34 10.75 2 12.09 2 13.75C2 15.41 3.34 16.75 5 16.75V19H19V16.75C20.66 16.75 22 15.41 22 13.75C22 12.09 20.66 10.75 19 10.75C19 9.23 18.11 8 17 8M12 11.75C11.31 11.75 10.75 12.31 10.75 13C10.75 13.36 10.9 13.67 11.13 13.91C10.9 14.16 10.75 14.5 10.75 14.89C10.75 15.56 11.31 16.11 12 16.11S13.25 15.56 13.25 14.89C13.25 14.5 13.1 14.16 12.88 13.91C13.1 13.67 13.25 13.36 13.25 13C13.25 12.31 12.69 11.75 12 11.75Z" />
      </svg>
    ),
    carrot: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M16 10L15.8 11H13.5C13.22 11 13 11.22 13 11.5C13 11.78 13.22 12 13.5 12H15.6L15.4 13H14.5C14.22 13 14 13.22 14 13.5C14 13.78 14.22 14 14.5 14H15.2L15 15H13.5C13.22 15 13 15.22 13 15.5C13 15.78 13.22 16 13.5 16H14.8L14.6 17H14.5C14.22 17 14 17.22 14 17.5C14 17.78 14.22 18 14.5 18H14.4L14.2 19H13.5C13.22 19 13 19.22 13 19.5C13 19.78 13.22 20 13.5 20H14L13.8 21.5C13.8 21.78 14 22 14.3 22C14.6 22 14.8 21.78 14.8 21.5L15 20H15.5C15.78 20 16 19.78 16 19.5C16 19.22 15.78 19 15.5 19H15.2L15.4 18H16.5C16.78 18 17 17.78 17 17.5C17 17.22 16.78 17 16.5 17H15.6L15.8 16H16.5C16.78 16 17 15.78 17 15.5C17 15.22 16.78 15 16.5 15H16L16.2 14H17.5C17.78 14 18 13.78 18 13.5C18 13.22 17.78 13 17.5 13H16.4L16.6 12H17.5C17.78 12 18 11.78 18 11.5C18 11.22 17.78 11 17.5 11H16.8L17 10C17 9.72 16.8 9.5 16.5 9.5C16.22 9.5 16 9.72 16 10M9.69 10L9.56 14.37L9.44 18.75C9.44 20.5 9.89 22 10.74 22H10.94C11.64 22 12.19 21.24 12.19 20.31C12.19 20.24 12.19 20.17 12.14 20.1C12.19 20.03 12.19 20 12.19 19.93C12.19 19.27 12.04 18.65 11.79 18.13L13.44 11.31L14.69 11.78C14.89 11.83 15.14 11.69 15.19 11.5C15.24 11.3 15.14 11.07 14.94 11L13.69 10.5L14.69 10L15.44 9.75C15.64 9.69 15.74 9.5 15.69 9.31C15.64 9.13 15.44 9 15.24 9L9.7 9.97H9.69Z" />
      </svg>
    ),
    avocado: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M15.75 5.62C15.77 5.46 15.78 5.29 15.78 5.11C15.78 3.4 14.63 2 13.23 2C11.83 2 10.68 3.4 10.68 5.11C10.68 5.29 10.69 5.46 10.71 5.62C5.33 6.92 2 10.58 2 15C2 19.97 6.54 23 12 23C17.46 23 22 19.97 22 15C22 10.58 18.67 6.92 13.29 5.62M9.45 7.75C9.34 8.21 9.23 8.67 9.23 9.17C9.23 11.42 10.94 13.5 13.23 13.5C15.52 13.5 17.23 11.42 17.23 9.17C17.23 8.67 17.12 8.21 17 7.75C19.33 8.8 20.68 11.36 20.68 14.25C20.68 18.79 16.88 21.5 12 21.5C7.12 21.5 3.32 18.79 3.32 14.25C3.32 11.36 4.67 8.8 7 7.75" />
      </svg>
    ),
    banana: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M16.92 10.29C16.57 10.11 16.21 10 15.85 10C14.55 10 13.5 11.05 13.5 12.35C13.5 12.79 13.64 13.21 13.89 13.55C14 13.68 14.5 14.23 14.69 14.47C15.5 15.5 15.5 15.9 15.45 16.1C15.38 16.43 15.08 16.62 14.74 16.5C14.46 16.41 14.22 16.18 13.92 15.79L12.78 14.33C12.5 13.97 12.47 13.93 12.17 13.54C11.64 12.8 11.5 11.85 11.82 11.03C12.19 10.05 13.05 10 13.46 10C13.13 10 10.32 10 8.57 10C7.64 10 6.6 10.65 7.45 11.79C9.16 14.13 12.76 20.26 15.35 20C15.71 19.96 16.04 19.83 16.32 19.61C17.86 18.5 16.09 13.07 16.06 13C16.8 13.94 18.32 15.7 18.71 16.13C19.17 16.62 20.1 16.5 20.32 15.61C20.58 14.55 19.29 13.31 18.53 12.68C18.18 12.39 17.93 12.26 17.3 12C17 11.87 17 11.74 17.13 11.5C17.28 11.21 17.92 10.29 16.92 10.29M4.12 20.5C5.5 20.5 6 18.98 6.16 18.29C6.27 17.76 6.54 15.63 6.72 14.34C6.84 13.5 6.92 13.5 6.92 13L5.93 13.05C5.92 13.05 5.92 13 5.92 13C5.92 12.95 5.92 12.9 5.93 12.86L6.25 11.22C6.27 11.09 6.29 11 6.16 11L5.05 11.05C5.05 11.05 5 11 5 11C5 10.95 5 10.91 5.05 10.87L5.37 9.22C5.39 9.09 5.41 9 5.29 9L4.18 9.05C4.17 9.05 4.12 9 4.12 9C4.12 8.95 4.12 8.91 4.17 8.87L4.5 7.22C4.5 7.09 4.53 7 4.41 7L1.69 7.05C1.54 7.05 1.47 7.12 1.44 7.26L1.12 8.96C1.07 9.12 1.14 9.06 1.3 9.06H2.39L2.06 10.84C2 11 2.08 10.97 2.24 10.97H3.32L3 12.75C2.96 12.92 3.02 12.86 3.18 12.86H4.23L3.91 14.65C3.87 14.81 3.94 14.75 4.1 14.75H4.79C4.28 17.84 3.6 20.42 4.12 20.5Z" />
      </svg>
    ),
    fish: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} style={style}>
        <path fill="currentColor" d="M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z" />
      </svg>
    )
  };

  const iconType = type in icons ? type : 'apple';
  return icons[iconType as keyof typeof icons];
}

// 배경 애니메이션 컴포넌트
function BackgroundAnimation() {
  const [foodItems, setFoodItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // 초기화 후 음식 아이템 생성
    const generateFoodItems = () => {
      const newItems: React.ReactNode[] = [];
      const foodTypes = ['apple', 'broccoli', 'carrot', 'avocado', 'banana', 'fish'];
      const numItems = 30; // 화면에 표시할 아이템 수

      for (let i = 0; i < numItems; i++) {
        const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        const size = Math.floor(Math.random() * 20) + 20; // 20px~40px 크기
        const left = `${Math.random() * 100}%`;
        const delay = Math.random() * 30; // 지연 시간 (0~30초)
        const duration = 15 + Math.random() * 30; // 애니메이션 기간 (15~45초)
        const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
        
        const style = {
          left,
          bottom: '0',
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          color
        };
        
        newItems.push(
          <div key={i} className="food-item" style={style}>
            <FoodIcon type={foodType} size={size} />
          </div>
        );
      }
      
      setFoodItems(newItems);
    };
    
    generateFoodItems();
  }, []);

  return (
    <div className="animated-bg">
      {foodItems}
    </div>
  );
}

function App() {
  return (
    <>
      <BackgroundAnimation />
      <Router />
    </>
  );
}

export default App;

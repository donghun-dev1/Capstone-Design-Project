import mockDietData from './mockDietData';

export function fetchDietData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockDietData);
    }, 500); // 0.5초 후 응답
  });
} 
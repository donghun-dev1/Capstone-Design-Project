// 퍼센트 계산 함수
export function calculatePercentage(current, target) {
  return Number(((current / target) * 100).toFixed(1));
}

// 영양소별 색상 반환 함수
export function getNutrientColor(key) {
  switch (key) {
    case 'calories': return '#8884d8';
    case 'protein': return '#83a6ed';
    case 'fat': return '#8dd1e1';
    case 'carbs': return '#82ca9d';
    case 'budget': return '#a4de6c';
    default: return '#ccc';
  }
} 
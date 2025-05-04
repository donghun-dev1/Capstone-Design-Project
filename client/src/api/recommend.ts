import { apiRequest } from "@/lib/queryClient";
import { getToken, getAnonymousToken, saveToken, hasToken } from "./auth";
import { UserInfo, DietRecommendation } from "@shared/schema";

// 알레르기 배열을 문자열로 변환하는 helper 함수
function processUserInfo(userInfo: UserInfo) {
  return {
    ...userInfo,
    allergies: userInfo.allergies.join(',')
  };
}

// JWT를 체크하고 필요하면 새로 발급받는 helper 함수
async function ensureToken() {
  if (!hasToken()) {
    const token = await getAnonymousToken();
    saveToken(token);
  }
  return getToken();
}

/**
 * Get nutrition summary based on user information
 * @param {UserInfo} userInfo User information for summary
 * @returns {Promise<DietRecommendation['summary']>} Nutrition summary
 */
export async function getNutritionSummary(userInfo: UserInfo): Promise<DietRecommendation['summary']> {
  try {
    const processedUserInfo = processUserInfo(userInfo);
    const token = await ensureToken();
    
    // Make the API request to get summary
    const res = await fetch("/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(processedUserInfo),
    });

    if (!res.ok) {
      if (res.status === 422) {
        const errorData = await res.json();
        throw new Error(`Validation error: ${JSON.stringify(errorData.errors)}`);
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.summary;
  } catch (error) {
    console.error("Failed to get nutrition summary:", error);
    throw error;
  }
}

/**
 * Get diet recommendations based on user information
 * @param {UserInfo} userInfo User information for recommendation
 * @returns {Promise<DietRecommendation>} Diet recommendations
 */
export async function getDietRecommendation(userInfo: UserInfo): Promise<DietRecommendation> {
  try {
    const processedUserInfo = processUserInfo(userInfo);
    const token = await ensureToken();
    
    // Make the API request to get recommendations
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(processedUserInfo),
    });

    if (!res.ok) {
      if (res.status === 422) {
        const errorData = await res.json();
        throw new Error(`Validation error: ${JSON.stringify(errorData.errors)}`);
      }
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data as DietRecommendation;
  } catch (error) {
    console.error("Failed to get diet recommendation:", error);
    throw error;
  }
}

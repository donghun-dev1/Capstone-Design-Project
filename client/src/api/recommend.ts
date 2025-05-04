import { apiRequest } from "@/lib/queryClient";
import { getToken, getAnonymousToken, saveToken, hasToken } from "./auth";
import { UserInfo, DietRecommendation } from "@shared/schema";

/**
 * Get diet recommendations based on user information
 * @param {UserInfo} userInfo User information for recommendation
 * @returns {Promise<DietRecommendation>} Diet recommendations
 */
export async function getDietRecommendation(userInfo: UserInfo): Promise<DietRecommendation> {
  try {
    // Check if we need to get a JWT first
    if (!hasToken()) {
      const token = await getAnonymousToken();
      saveToken(token);
    }

    const token = getToken();
    
    // Make the API request to get recommendations
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userInfo),
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

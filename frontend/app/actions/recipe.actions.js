"use server";

import { checkUser } from "@/lib/checkUser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { freeMealRecommendations, proTierLimit } from "@/lib/arcjet";
import { request } from "@arcjet/next";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_KEY;

// const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper function to normalize recipe title
function normalizeTitle(title) {
  return title
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Helper function to fetch image from Unsplash
async function fetchRecipeImage(recipeName) {}

// Get or generate recipe details
export async function getOrGenerateRecipe(formData) {}

// Save recipe to user's collection (bookmark)
export async function saveRecipeToCollection(formData) {}

// Remove recipe from user's collection (unbookmark)
export async function removeRecipeFromCollection(formData) {}

// Get recipes based on pantry ingredients
export async function getRecipesByPantryIngredients() {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // ✅ ARCJET RATE LIMIT CHECK
    const isPro = user.subscriptionTier === "pro";
    const arcjetClient = isPro ? proTierLimit : freeMealRecommendations;

    // Create a request object for Arcjet
    const req = await request();

    const decision = await arcjetClient.protect(req, {
      userId: user.clerkId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error(
          `Monthly AI recipe limit reached. ${
            isPro ? "Please contact support." : "Upgrade to Pro!"
          }`
        );
      }
      throw new Error("Request denied");
    }

    // Get user's pantry items
    const pantryResponse = await fetch(
      `${STRAPI_URL}/api/pantry-items?filters[owner][id][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    console.log("pantryResponse:", pantryResponse);

    if (!pantryResponse.ok) {
    console.error("Failed to fetch pantry items. Status:", pantryResponse.status, "Status Text:", pantryResponse.statusText);
    throw new Error("Failed to fetch pantry items");
    }

    const pantryData = await pantryResponse.json();

    if (!pantryData.data || pantryData.data.length === 0) {
      return {
        success: false,
        message: "Your pantry is empty. Add ingredients first!",
      };
    }

    const ingredients = pantryData.data.map((item) => item.name).join(", ");

    console.log("🥘 Finding recipes for ingredients:", ingredients);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
You are a professional chef. Given these available ingredients: ${ingredients}

Suggest 5 recipes that can be made primarily with these ingredients. It's okay if the recipes need 1-2 common pantry staples (salt, pepper, oil, etc.) that aren't listed.

Return ONLY a valid JSON array (no markdown, no explanations):
[
  {
    "title": "Recipe name",
    "description": "Brief 1-2 sentence description",
    "matchPercentage": 85,
    "missingIngredients": ["ingredient1", "ingredient2"],
    "category": "breakfast|lunch|dinner|snack|dessert",
    "cuisine": "italian|chinese|mexican|etc",
    "prepTime": 20,
    "cookTime": 30,
    "servings": 4
  }
]

Rules:
- matchPercentage should be 70-100% (how many listed ingredients are used)
- missingIngredients should be common items or optional additions
- Sort by matchPercentage descending
- Make recipes realistic and delicious
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let recipeSuggestions;
    try {
      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      recipeSuggestions = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error(
        "Failed to generate recipe suggestions. Please try again."
      );
    }

    return {
      success: true,
      recipes: recipeSuggestions,
      ingredientsUsed: ingredients,
      recommendationsLimit: isPro ? "unlimited" : 5,
      message: `Found ${recipeSuggestions.length} recipes you can make!`,
    };
  } catch (error) {
    console.error("❌ Error in getRecipesByPantryIngredients:", error);
    throw new Error(error.message || "Failed to get recipe suggestions");
  }
}

// Get user's saved recipes
export async function getSavedRecipes() {}
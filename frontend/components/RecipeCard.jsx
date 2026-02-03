import { ChefHat } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

const RecipeCard = ({ recipe, variant = "default" }) => {
  // Handle different recipe data structures
  const getRecipeData = () => {
    // For MealDB recipes (category/cuisine pages)
    if (recipe.strMeal) {
      return {
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        href: `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`,
        showImage: true,
      };

      // more conditions can be added here for different recipe data structures
    }
    return {};
  };

  const data = getRecipeData();

  // Variant: grid (for category/cuisine pages with images)
  if (variant === "grid") {
    return (
      <Link href={data.href}>
        <Card className="rounded-none overflow-hidden border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group pt-0">
          {/* Image */}
          {data.showImage ? (
            <div className="relative aspect-square">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">
                    Click to view recipe
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Fallback gradient background when no image
            <div className="relative aspect-square bg-linear-to-br from-orange-400 via-amber-400 to-yellow-400 flex items-center justify-center">
              <ChefHat className="w-20 h-20 text-white/30" />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Title */}
          <CardHeader>
            <CardTitle className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2">
              {data.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  }
};

export default RecipeCard;

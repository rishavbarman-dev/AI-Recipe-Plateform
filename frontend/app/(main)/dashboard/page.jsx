import {
  getAreas,
  getCategories,
  getRecipieOfTheDay,
} from "@/app/actions/mealdb.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryEmoji, getCountryFlag } from "@/lib/data";
import { ArrowRight, ChefHat, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Dashboardpage = async () => {
  const recipeData = await getRecipieOfTheDay();
  const categoriesData = await getCategories();
  const areasData = await getAreas();

  const recipeOfTheDay = recipeData?.recipe ?? null;
  const categories = categoriesData?.categories || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <section className="mb-16">
          <Badge
            variant="outline"
            className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-4 uppercase tracking-wide"
          >
            <ChefHat className="mr-1 w-3.5 h-3.5" />
            Your Kitchen
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            What&apos;s cooking today?
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl font-light">
            Explore recipes, browse by category, or discover cuisines from
            around the world.
          </p>
        </section>

        {/* Recipe of the Day - Hero Section */}
        <section className="mb-20">
          <Badge
            variant="outline"
            className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
          >
            Recipe of the Day
          </Badge>

          {recipeOfTheDay ? (
            <Card className="overflow-hidden border-2 border-stone-200 hover:border-orange-300 transition-colors">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square md:aspect-auto md:min-h-80 bg-stone-200">
                  <Image
                    src={recipeOfTheDay.strMealThumb || "/pasta-dish.png"}
                    alt={recipeOfTheDay.strMeal}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      variant="outline"
                      className="border-2 border-white/90 bg-white/90 text-stone-800 font-bold backdrop-blur-sm"
                    >
                      {getCategoryEmoji(recipeOfTheDay.strCategory)}{" "}
                      {recipeOfTheDay.strCategory}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-2 border-white/90 bg-white/90 text-stone-800 font-bold backdrop-blur-sm"
                    >
                      {getCountryFlag(recipeOfTheDay.strArea)}{" "}
                      {recipeOfTheDay.strArea}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {recipeOfTheDay.strMeal}
                  </h2>
                  <p className="text-stone-600 mb-6 line-clamp-3">
                    {recipeOfTheDay.strInstructions?.slice(0, 180)}...
                  </p>
                  <Link href={`/recipe/${recipeOfTheDay.idMeal}`}>
                    <Button
                      size="lg"
                      className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                    >
                      View Recipe <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          ) : (
            <Card className="border-2 border-stone-200 border-dashed p-12 text-center">
              <p className="text-stone-500">
                No recipe available right now. Check back soon!
              </p>
            </Card>
          )}
        </section>

        {/* Browse by Categories */}
        <section className="mb-20">
          <div className="mb-10">
            <Badge
              variant="outline"
              className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-4 uppercase tracking-wide"
            >
              Browse by Category
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Find recipes by type
            </h2>
            <p className="text-stone-600 max-w-2xl">
              From breakfast to dessert — discover meals that match your mood.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.strCategory}
                href={`/recipes/category/${cat.strCategory.toLowerCase()}`}
              >
                <Card className="h-full border-2 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">
                      {getCategoryEmoji(cat.strCategory)}
                    </span>
                    <span className="font-semibold text-stone-900 group-hover:text-orange-700 transition-colors">
                      {cat.strCategory}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Browse by Cuisine */}
        <section className="mb-12">
          <div className="mb-10">
            <Badge
              variant="outline"
              className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-4 uppercase tracking-wide"
            >
              <Compass className="mr-1 w-3.5 h-3.5" />
              Browse by Cuisine
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Taste the world
            </h2>
            <p className="text-stone-600 max-w-2xl">
              Explore recipes from different regions and cuisines.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {areas.slice(0, 15).map((area) => (
              <Link
                key={area.strArea}
                href={`/recipes/cuisine/${area.strArea
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Card className="h-full border-2 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all cursor-pointer group">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">
                      {getCountryFlag(area.strArea)}
                    </span>
                    <span className="font-semibold text-stone-900 group-hover:text-orange-700 transition-colors">
                      {area.strArea}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboardpage;

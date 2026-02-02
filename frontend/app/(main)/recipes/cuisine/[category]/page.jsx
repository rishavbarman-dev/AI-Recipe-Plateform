"use client";

import { getMealByArea } from "@/app/actions/mealdb.action";
import RecipeGrid from "@/components/RecipeGrid";
import { useParams } from "next/navigation";

export default function CuiseRecipePage() {
    const params = useParams();
    const cuisine = params.cuisine;

    return (
        <RecipeGrid 
            type="cuisine"
            value={cuisine}
            fetchAction={getMealByArea}
            backLink="/dashboard"
        />
    );
};
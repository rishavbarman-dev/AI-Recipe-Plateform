"use client";

import { getMealByCategory } from "@/app/actions/mealdb.action";
import RecipeGrid from "@/components/RecipeGrid";
import { useParams } from "next/navigation";
import { use } from "react";

export default function CategoryPage() {
    const params = useParams();
    const category = params.category;

    return (
        <RecipeGrid 
            type="category"
            value={category}
            fetchAction={getMealByCategory}
            backLink="/dashboard"
        />
    );
};
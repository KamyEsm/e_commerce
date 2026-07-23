"use server";

import { prisma } from "@/lib/db"

export async function fetchCategoriesFromCategoryCarousel() {

    try {
        const cat = await prisma.category.findMany({
            select:{
                name:true,
                iconURL:true,
            },
        })
        return {success:true, data:cat}
    }
    catch (error) {
        console.error("Failed to fetch categories:", error);
        return { success: false, error: "Failed to fetch categories" };
    }



}
"use server";

import { prisma } from "@/lib/db";

export async function fetchHeroBanners() {
    try {
        const banners = await prisma.heroBanner.findMany({
            select: {
                id: true,
                bgColor: true,
                title: true,
                textColor: true,
                imageURL: true,
                brandIconURL: true,
                product:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        });

        return { success: true, data: banners };
    } catch (error) {
        console.error("Failed to fetch hero banners:", error);
        return { success: false, error: "Failed to fetch hero banners" };
    }
}
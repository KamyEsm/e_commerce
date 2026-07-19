"use server";

import { prisma } from "@/lib/db";
import {cons} from "effect/List";

export async function fetchActiveCampaigns() {
    try {
        const now = new Date();
        const camp = await prisma.campaign.findMany({
            where: {
                endDate: {
                    gt: now
                },
                startDate: {
                    lt: now
                }
            },
            select: {
                id: true,
                title: true,
                startDate: true,
                endDate: true,
                productsOnCampaigns: {
                    select: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                ImageURL: true,
                            }
                        },
                        discountRate: true,
                    }
                },
                priority:true
            }
        });

        camp.sort((a,b) => b.priority - a.priority);

        return { success: true, data: camp };
    } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        return { success: false, error: "Failed to fetch campaigns" };
    }
}
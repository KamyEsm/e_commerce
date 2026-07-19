import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {fetchActiveCampaigns} from "@/actions/campaignAction";
import ProductCard from "@/components/ProductCard";
import Timer from "@/components/Timer";
import SectionTag from "@/components/SectionTag";
import Link from "next/link";

export async function FlashSalesCarousel() {

    const campaigns = await fetchActiveCampaigns();


    if (!campaigns.success || !campaigns.data || campaigns.data.length === 0) {
        return <div className="text-center p-4">There are no campaigns to display.</div>;
    }

    const activeCampaign = campaigns.data[0]

    return (
        <div>
            <SectionTag title={"Today\'s"}/>
            <div className="flex flex-row justify-between gap-12 m-4">
                <h2 className="font-bold ">{activeCampaign.title}</h2>
                <Timer targetDate={new Date(activeCampaign.endDate)} />
            </div>
            <Carousel className="w-full">
                <CarouselContent>
                    {activeCampaign.productsOnCampaigns.map((campaign,index) => (
                        <CarouselItem key={index}
                                      className="pl-4 basis-[82%]">
                            <div className="p-1">
                                <ProductCard productName={campaign.product.name} price={campaign.product.price}
                                             discount={campaign.discountRate} imageUrl={campaign.product.ImageURL || "/image/no-image.png"} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
            <div className="w-full h-auto flex items-center justify-center my-12">
                <Link href="/" className="bg-[#DB4444] text-white py-3.5 px-6 rounded">View All Products</Link>
            </div>
        </div>

    )
}

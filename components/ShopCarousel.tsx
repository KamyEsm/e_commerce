import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {ActiveCampaignType} from "@/app/page"

type ProductOnCampaignType = ActiveCampaignType["productsOnCampaigns"][number]


export function ShopCarousel({title , activeCampaign , renderFunction}:{title:React.ReactNode , activeCampaign:ActiveCampaignType | null , renderFunction: (item: ProductOnCampaignType) => React.ReactNode;}) {

    if(!activeCampaign){
        return <div className="text-center p-4">There are no campaigns to display.</div>;
    }

    return (
        <div>
            {title}
            <Carousel className="w-full">
                <CarouselContent>
                    {activeCampaign.productsOnCampaigns.map((campaign,index) => (
                        <CarouselItem key={index}
                                      className="pl-4 basis-[82%]">

                            {
                                renderFunction(campaign)
                            }
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

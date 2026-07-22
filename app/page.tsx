import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Timer from "@/components/Timer";
import {ShopCarousel} from "@/components/ShopCarousel";
import SectionTag from "@/components/SectionTag";
import {fetchActiveCampaigns} from "@/actions/campaignAction";
import * as React from "react";
import ProductCard from "@/components/ProductCard";

type CampaignsActionResponse = Awaited<ReturnType<typeof fetchActiveCampaigns>>;

export type ActiveCampaignType = NonNullable<CampaignsActionResponse["data"]>[number];


export default async function Home() {

    //first campaign
    const campaigns = await fetchActiveCampaigns();
    let activeCampaign: ActiveCampaignType | null = null;
    if(campaigns && campaigns.data && campaigns.success){
        activeCampaign = campaigns.data[0];
    }
    else {
        console.error("Campaign not found!");
    }

    //category

    return (
        <main className="">
            <Header/>
            <HeroCarousel/>
            <ShopCarousel title={
                <>
                    <SectionTag title={"Today's"}/>
                    <div className="flex flex-row justify-between gap-12 m-4">
                        <h2 className="font-bold ">{activeCampaign?.title}</h2>
                        <Timer targetDate={new Date(activeCampaign?.endDate || new Date())}/>
                    </div>
                </>
            } activeCampaign={activeCampaign} renderFunction={(item) => (
                <div className="p-1">
                    <ProductCard productName={item.product.name} price={item.product.price}
                                 discount={item.discountRate} imageUrl={item.product.ImageURL || "/image/no-image.png"} />
                </div>
            )}/>
            <hr className="w-full border-t border-gray-200 my-16" />
        </main>
    );
}
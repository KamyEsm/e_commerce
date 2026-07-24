import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Timer from "@/components/Timer";
import {ShopCarousel} from "@/components/ShopCarousel";
import SectionTag from "@/components/SectionTag";
import {fetchActiveCampaigns} from "@/actions/campaignAction";
import {fetchCategoriesFromCategoryCarousel} from "@/actions/categoryAction";
import * as React from "react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";

type CampaignsActionResponse = Awaited<ReturnType<typeof fetchActiveCampaigns>>;
type ActiveCampaignType = NonNullable<CampaignsActionResponse["data"]>[number];

type categoryActionResponse = Awaited<ReturnType<typeof fetchCategoriesFromCategoryCarousel>>;
type categoryListType = NonNullable<categoryActionResponse["data"]>[number];


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

    if(activeCampaign == null) {
        console.error("Campaign not found!");
    }

    //category
    const categories = await fetchCategoriesFromCategoryCarousel();
    if(!categories || !categories.success || !categories.data) {
        console.error("Category not found!");
    }
    const categoryList : Array<categoryListType> = categories?.data ?? [];

    return (
        <div className="min-h-full flex flex-col font-serif mx-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:my-8">
                <aside className="hidden lg:block border-r border-gray-300 mr-8">
                    <ul className="flex flex-col justify-between h-full">
                        <li>Woman’s Fashion</li>
                        <li>Men’s Fashion</li>
                        <li>Electronics</li>
                        <li>Home & Lifestyle</li>
                        <li>Medicine</li>
                        <li>Sports & Outdoor</li>
                        <li>Baby’s & Toys</li>
                        <li>Groceries & Pets</li>
                        <li>Health & Beauty</li>
                    </ul>
                </aside>
                <div className="col-span-3">
                    <HeroCarousel/>
                </div>
            </div>

            <ShopCarousel title={
                <>
                    <SectionTag title={"Today's"}/>
                    <div className="flex flex-row justify-between gap-12 m-4">
                        <h2 className="font-bold ">{activeCampaign?.title}</h2>
                        <Timer targetDate={new Date(activeCampaign?.endDate || new Date())}/>
                    </div>
                </>
            } dataList={activeCampaign?.productsOnCampaigns} renderFunction={(item) => (
                <div className="p-1">
                    <ProductCard productName={item.product.name} price={item.product.price}
                                 discount={item.discountRate} imageUrl={item.product.ImageURL || "/image/no-image.png"} />
                </div>
            )} className={"basis-[82%] sm:basis-[50%] md:basis-[35%] lg:basis-[28%] xl:basis-[20%]"}>
                <div className="w-full h-auto flex items-center justify-center my-12">
                    <Link href="/" className="bg-[#DB4444] text-white py-3.5 px-6 rounded">View All Products</Link>
                </div>
            </ShopCarousel>
            <hr className="w-full border-t border-gray-200 my-16"/>

            <ShopCarousel title={
                <>
                    <SectionTag title={"Categories"}/>
                    <h2 className="font-bold ml-4 my-6 ">{"Browse By Category"}</h2>
                </>
            } dataList={categoryList} renderFunction={(item:categoryListType) => (
                <CategoryCard categoryName = {item.name} iconURL = {item.iconURL} categoryLink = {"/"}/>
            )} className={"basis-[42%] sm:basis-[28%] md:basis-[20%] lg:basis-[16%]"}/>
            <hr className="w-full border-t border-gray-200 my-16"/>

        </div>
    );
}
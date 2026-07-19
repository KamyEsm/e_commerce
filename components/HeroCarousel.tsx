import * as React from "react"
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {fetchHeroBanners} from "@/actions/heroBannerAction"
import Link from "next/link";

export default async function HeroCarousel() {

    const banners = await fetchHeroBanners();

    if (!banners.success || !banners.data || banners.data.length === 0) {
        return <div className="text-center p-4">There are no banners to display.</div>;
    }


    return (
        <Carousel className="w-full">
            <CarouselContent>
                {banners.data.map((b , index)=> (
                        <CarouselItem key={index}>
                            <div>
                                <Card className="">
                                    <CardContent className="min-h-[200px] flex flex-col items-stretch gap-6 m-2" style={{backgroundColor:b.bgColor || "black" , color: b.textColor || "white"}}> {/*items-stretch همه را هم‌قد می‌کند */}
                                        <div className="flex flex-row items-center gap-2">
                                            {b.brandIconURL && (
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={b.brandIconURL}
                                                    alt="brand icon"
                                                    className=""
                                                />
                                            )}
                                            <h2 className="text-[16px]">{b.product?.name}</h2>
                                        </div>
                                        <h1 className="font-bold text-4xl">{b.title}</h1>
                                        <Link href={`/products/${b.product?.id}`} className="px-4 py-2 rounded underline active:text-blue-500">
                                            Shop Now
                                        </Link>
                                        <div className="relative min-h-48">
                                            <Image src={b.imageURL} fill alt={b.title} className="object-contain" preload/>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="hidden"/>
            <CarouselNext className="hidden"/>
            </Carousel>
    )
}

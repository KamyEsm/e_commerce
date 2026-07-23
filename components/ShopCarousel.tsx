import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";


export function ShopCarousel<T>({title , dataList , renderFunction , className , children}:{title:React.ReactNode , dataList:Array<T> | null | undefined, renderFunction: (item: T) => React.ReactNode,className:string,children?:React.ReactNode}) {

    if(!dataList || dataList.length < 1){
        return <div className="text-center p-4">There are no data to display.</div>;
    }

    return (
        <div>
            {title}
            <Carousel className="w-full" opts={{
                dragFree: true,
                align: "start",
                containScroll: "trimSnaps"
            }}>
                <CarouselContent>
                    {dataList.map((item,index) => (
                        <CarouselItem key={index}
                                      className={`pl-4 ${className}`}>
                            {
                                renderFunction(item)
                            }
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </Carousel>
            {children}
        </div>

    )
}

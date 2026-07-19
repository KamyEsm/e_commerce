import {Card, CardContent} from "@/components/ui/card";
import { IoHeartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import Image from "next/image";


interface propsType {
    price: number
    discount: number
    imageUrl: string
    productName: string
}

export default function ProductCard(props: propsType) {

    return (
        <Card className="bg-white shadow rounded">

            <CardContent className="min-h-72">
                <div className="bg-gray-100 h-60 relative">
                    <div className="bg-[#DB4444] top-3 left-3 absolute px-2 py-1 rounded text-white">
                        {`${props.discount}%`}
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col justify-center items-center gap-1">
                        <IoHeartOutline className="text-2xl"/>
                        <IoEyeOutline className="text-2xl"/>
                    </div>
                    <div className="w-full h-full flex flex-row justify-center items-center">
                        <Image src={props.imageUrl} alt={"product image"} width={200} height={200} />
                    </div>
                </div>
                <div className="min-h-24">
                    <h3 className="py-1 text-[18px]">{props.productName}</h3>
                    <div className="flex flex-row gap-2 text-[16px]">
                        <h4>{`\$${props.price}`}</h4>
                        <h4>{`\$${( props.price - (props.discount / 100) * props.price)}`}</h4>
                    </div>
                    <div className="flex flex-row gap-0.5 text-[16px] my-1">
                        {
                            Array.from({length:5}).map((_,i) =>(
                                <CiStar key={i}/>
                            ))
                        }
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
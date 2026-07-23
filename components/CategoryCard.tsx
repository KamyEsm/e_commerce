import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface propsType {
    categoryName: string,
    iconURL : string
    categoryLink : string
}

export default function CategoryCard(props: propsType){

    return (
        <Link href={props.categoryLink} className="w-full aspect-square">
            <Card className="border-solid-2 rounded w-full h-full">
                <CardContent className="flex flex-col justify-center items-center gap-3 w-full h-full">
                    <Image src={props.iconURL} alt="category icon" width={56} height={56} />
                    <h3 className="font-normal text-sm">{props.categoryName}</h3>
                </CardContent>
            </Card>
        </Link>

    )
}
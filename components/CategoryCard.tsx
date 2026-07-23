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
        <Link href={props.categoryLink}>
            <Card className="border-solid-2 rounded w-50 h-50">
                <CardContent className="w-50 h-50 flex flex-col justify-center items-center gap-3">
                    <Image src={props.iconURL} alt="category icon" width={60} height={60} />
                    <h3 className="font-normal text-2xl">{props.categoryName}</h3>
                </CardContent>
            </Card>
        </Link>

    )
}
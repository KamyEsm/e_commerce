import {SheetMenu} from "@/components/SheetMenu";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function Header(){

    return (
        <header className="sticky flex flex-col w-full top-0 right-0 z-10 bg-white mt-4">
            <div className="flex flex-row items-center justify-between">
                <nav>
                    <SheetMenu/>
                </nav>
                <h1 className="text-2xl font-bold text-gray-900">
                    Exclusive
                </h1>
                <nav className="flex flex-row items-center justify-between py-1 px-2.5 gap-2">
                    <Link href={"/like"} className="">
                        <IoHeartOutline className="h-5 w-5"/>
                    </Link>
                    <Link href="/shopping-cart">
                        <PiShoppingCartLight className="h-5 w-5"/>
                    </Link>
                </nav>
            </div>
            <div className="relative m-4 flex flex-row items-center justify-between">
                <Input className="border-none bg-gray-200 rounded"/>
                <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 right-2"/>
            </div>
        </header>
    )
}
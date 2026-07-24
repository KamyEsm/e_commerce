import {SheetMenu} from "@/components/SheetMenu";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoHeartOutline } from "react-icons/io5";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import NavbarLinks from "@/components/NavbarLinks";

export default function Header(){

    return (
        <header className="sticky flex flex-col w-full top-0 right-0 z-10 bg-white mt-4 lg:sticky lg:flex lg:flex-row ">
            <div className="flex flex-row items-center justify-between lg:flex lg:gap-16 lg:w-full lg:flex-row lg:justify-between">
                <nav className="lg:hidden">
                    <SheetMenu/>
                </nav>
                <h1 className="text-2xl font-bold text-gray-900">
                    Exclusive
                </h1>
                <nav className="hidden md:hidden lg:w-auto lg:flex lg:flex-row lg:items-center">
                    <NavbarLinks />
                </nav>
                <div className="hidden lg:flex lg:flex-row lg:justify-between lg:gap-2.5">
                    <div className="hidden lg:flex lg:flex-row lg:gap-16 lg:relative lg:w-48 ">
                        <Input className="lg:border-none lg:bg-gray-200 lg:rounded"/>
                        <IoSearchOutline className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-2"/>
                    </div>
                    <nav className="flex flex-row items-center justify-between py-1 px-2.5 gap-2">
                        <Link href={"/like"} className="">
                            <IoHeartOutline className="h-5 w-5"/>
                        </Link>
                        <Link href="/shopping-cart">
                            <PiShoppingCartLight className="h-5 w-5"/>
                        </Link>
                    </nav>
                </div>

            </div>
            <div className="relative m-4 flex flex-row items-center justify-between lg:hidden">
                <Input className="border-none bg-gray-200 rounded"/>
                <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 right-2"/>
            </div>
        </header>
    )
}
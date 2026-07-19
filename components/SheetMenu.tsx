"use client";

import { IoMenuOutline } from "react-icons/io5";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

export function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-zinc-100 hover:text-zinc-900 transition-colors dark:hover:bg-zinc-800 dark:hover:text-zinc-50 outline-none cursor-pointer">
                <IoMenuOutline className="h-6 w-6"/>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
                    <div className="grid gap-3">
                        <Link href={"/"} className="hover:underline">
                            <h1 className="text-lg font-medium">Home</h1>
                        </Link>
                        <hr />
                    </div>
                    <div className="grid gap-3">
                        <Link href={"/contact"} className="hover:underline">
                            <h1 className="text-lg font-medium">Contact</h1>
                        </Link>
                        <hr />
                    </div>
                    <div className="grid gap-3">
                        <Link href={"/about"} className="hover:underline">
                            <h1 className="text-lg font-medium">About Us</h1>
                        </Link>
                        <hr />
                    </div>
                    <div className="grid gap-3">
                        <Link href={"/sign-up"} className="hover:underline">
                            <h1 className="text-lg font-medium">Sign Up</h1>
                        </Link>
                        <hr />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
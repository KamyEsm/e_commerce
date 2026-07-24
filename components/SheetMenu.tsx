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
import NavbarLinks from "@/components/NavbarLinks";

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

                <NavbarLinks />
            </SheetContent>
        </Sheet>
    )
}
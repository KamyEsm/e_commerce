import Link from "next/link";


export default function NavbarLinks(){
    return (
        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6 lg:flex lg:flex-row lg:gap-16 lg:mt-0">
            <div className="grid gap-3 lg:flex lg:flex-col lg:justify-center lg:gap-0">
                <Link href={"/"} className="hover:underline">
                    <h1 className="text-lg font-medium">Home</h1>
                </Link>
                <hr />
            </div>
            <div className="grid gap-3 lg:flex lg:flex-col lg:justify-center lg:gap-0">
                <Link href={"/contact"} className="hover:underline">
                    <h1 className="text-lg font-medium">Contact</h1>
                </Link>
                <hr />
            </div>
            <div className="grid gap-3 lg:flex lg:flex-col lg:justify-center lg:gap-0">
                <Link href={"/about"} className="hover:underline">
                    <h1 className="text-lg font-medium">About Us</h1>
                </Link>
                <hr />
            </div>
            <div className="grid gap-3 lg:flex lg:flex-col lg:justify-center lg:gap-0">
                <Link href={"/sign-up"} className="hover:underline">
                    <h1 className="text-lg font-medium">Sign Up</h1>
                </Link>
                <hr />
            </div>
        </div>
    )
}
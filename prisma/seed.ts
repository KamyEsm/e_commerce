import {PrismaClient, Color, Size} from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import prismaConfig from "@/prisma.config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({
    adapter,
});

export async function main() {

    console.log("start seeding ...")

    await prisma.productsOnCampaigns.deleteMany();
    await prisma.roleOnMember.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.heroBanner.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.role.deleteMany();
    await prisma.member.deleteMany();
    await prisma.campaign.deleteMany();

    const adminRole = await prisma.role.create({
        data:{desc:"many access" , name:"admin"},
    })

    const userRole = await prisma.role.create({
        data:{desc:"normal user" , name:"user" },
    })

    const mobileCategory= await prisma.category.create({
        data:{desc:"phone" , name:"Phones" , iconURL:"/icons/mobile_category_icon.svg"},
    })

    const smartWatchCategory = await prisma.category.create({
        data:{desc:"" , name:"SmartWatch" , iconURL:"/icons/smartwatch_category_icon.svg"},
    })

    const cameraCategory = await prisma.category.create({
        data:{desc:"" , name:"Camera" , iconURL:"/icons/camera_category_icon.svg"},
    })

    const computersCategory = await prisma.category.create({
        data:{desc:"" , name:"Computers" , iconURL:"/icons/computer_category_icon.svg"},
    })

    const gamingCategory = await prisma.category.create({
        data:{desc:"" , name:"Gaming" , iconURL:"/icons/gaming_category_icon.svg"},
    })

    const headPhonesCategory = await prisma.category.create({
        data:{desc:"" , name:"HeadPhones" , iconURL:"/icons/headphone_category_icon.svg"},
    })

    const product1 = await prisma.product.create({
        data:{name:"tuf gaming" , color:Color.red , categoryId:computersCategory.id , size:Size.Xlarge, price:506.45 , ImageURL:"/image/tug-gaming.png"}
    })

    const product2 = await prisma.product.create({
        data:{name:"iphone 14" , price: 400.45 , categoryId:mobileCategory.id , ImageURL:"/image/apple-phone.png"}
    })

    const product3 = await prisma.product.create({
        data:{name:"S24 fe" , price: 268.45 , categoryId:mobileCategory.id , ImageURL:"/image/samsung-phone.png"}
    })

    const product4 = await prisma.product.create({
        data:{name:"tab s10" , price:358 , categoryId:gamingCategory.id , ImageURL:"/image/tab-s10.png"}
    })

    const product5 = await prisma.product.create({
        data:{name:"surface" , price:384 , categoryId:gamingCategory.id , ImageURL:"/image/surface.png"}
    })

    const product6 = await prisma.product.create({
        data:{name:"rtx 5060 i5 14600k pc" , price:600 , categoryId:computersCategory.id , ImageURL:"/image/pc.png"}
    })

    await prisma.member.create({
        data: {
            name: "kamyar esmaeilpour",
            email: "kamy@example.com",
            Address: "تهران، خیابان آزادی",
            hashedPass: "hashed_password_123",
            roles: {
                create: [
                    { roleId: adminRole.id },
                    { roleId: userRole.id }
                ]
            },
            favorites: {
                create: [
                    { productId : product1.id },
                    { productId : product4.id },
                    { productId : product5.id },
                    { productId : product6.id }
                ]
            }
        },
    });

    await prisma.member.create({
        data: {
            name: "shiva palangi",
            email: "shiva@example.com",
            Address: "شیراز، بلوار ارم",
            hashedPass: "hashed_password_456",
            roles: {
                create: [
                    { roleId: userRole.id }
                ]
            },
            favorites: {
                create: [
                    { productId: product1.id },
                    { productId: product2.id },
                    { productId: product3.id }
                ]
            }
        },
    });

    await prisma.heroBanner.create({
        data:{
            productId:product2.id,
            textColor:"#ffffff",
            bgColor:"#000000",
            brandIconURL:"/icons/apple-logo.svg",
            imageURL:"/image/apple-phone.png",
            title:"Up to 10% off voucher"
        }
    })

    await prisma.heroBanner.create(
        {
            data:{
                title:"Up to 20% off",
                imageURL:"/image/samsung-phone.png",
                brandIconURL:"/icons/samsung-logo.svg",
                bgColor:"#ffffff",
                textColor:"#000000",
                productId:product3.id
            }
        }
    )

    await prisma.campaign.create({
        data:{
            title:"Flash Sales",
            productsOnCampaigns:{
                create:[
                    { productId : product1.id , discountRate:10 },
                    { productId : product2.id , discountRate:20 },
                    { productId : product3.id , discountRate:30 },
                    { productId : product4.id , discountRate:60 },
                ]
            },
            endDate:new Date(2026 , 11),
            startDate:new Date(2025 , 11),
            priority:10
        }
    })

    console.log("Seeding finished successfully.");
}

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch((err) => {
    console.error(err);
})
import { cookies } from "next/headers";
import db from "@/db";
import { ItemAndFavorite } from "@/types/item";
import { COOKIE_FAVORITE_KEY, COUNT_ITEMS_LOAD } from "@/constants";


export async function getItemsForMainPage(
    take:number = COUNT_ITEMS_LOAD,
    skip:number = 0,
    text:string = "",
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const user = await db.user.currentUser();

        if (user) {
            return await getItemsWithFavoriteByUser(user.id,take,skip,text);
        } else {
            const tempFavoriteListId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

            if(tempFavoriteListId){
                return await getItemsWithFavoriteByTempFavorite(tempFavoriteListId,take,skip,text);
            } else {
                return await getItemsWithFavorite(take,skip,text);
            }
        }
    } catch (error) {
        console.log("getItemsForMainPage error:",error);
        return;
    }
}



async function getItemsWithFavoriteByUser(
    userId:string,
    take:number,
    skip:number,
    text:string = "",
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
            where:{ lable:{ startsWith:text } },
            include: {
                favorites: {
                    where: { userId },
                },
            },
            skip,
            take,
            orderBy: { ceatedAt: "desc" },
        });

        return items.map(({favorites,...item}) => ({ 
            ...item, 
            isFavorite: favorites.length > 0 
        }));
    } catch (error) {
        console.log("getItemsWithFavoriteByUser error:",error);
        return;
    }
}


async function getItemsWithFavoriteByTempFavorite(
    tempFavoriteListId:string,
    take:number,
    skip:number,
    text:string = "",
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
            where:{ lable:{ startsWith:text } },
            include:{
                tempFavorites:{
                    where:{ tempFavoriteListId },
                    take:1
                }
            },
            take,
            skip,
            orderBy: { ceatedAt: "desc" },
        });

        return items.map(({ tempFavorites, ...item }) => ({
            ...item,
            isFavorite: tempFavorites.length > 0,
        }));
    } catch (error) {
        console.log("getItemsWithFavoriteByTempFavorite error:",error);
        return;
    }
}

async function getItemsWithFavorite(
    take:number,
    skip:number,
    text:string = "",
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
            where:{ lable:{ startsWith:text } },
            take,
            skip,
            orderBy: { ceatedAt: "desc" },
        });

        return items.map((item) => ({ 
            ...item, 
            isFavorite: false 
        }));
    } catch (error) {
        console.log("getItemsWithFavorite error:",error);
        return;
    }
}


export async function getCountItems() {
    try {
        const count = await db.item.count({});
        return count;
    } catch (error) {
        console.log("getCountItems error:",error);
    }
}

export async function getCountItemsByText(text:string) {
    try {
        const count = await db.item.count({
            where:{
                lable:{
                    startsWith:text
                }
            }
        });
        return count;
    } catch (error) {
        console.log("getCountItemsByText error:",error);
        return;
    }
}

export async function getItemsByUserId(userId:string,take:number) {
    try {
        const items = await db.item.findMany({
            where: {
                userId: userId,
            },
            take:take
        });
        return items;
    } catch (error) {
        console.log("getItemsByUserId error:",error);
        return;
    }
}

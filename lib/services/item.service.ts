import { cookies } from "next/headers";
import db from "../db";
import { ItemAndFavorite } from "../types/item";
import { COOKIE_FAVORITE_KEY, COUNT_ITEMS_LOAD } from "../const";


export async function getItemsForMainPage(
    take:number = COUNT_ITEMS_LOAD,
    skip:number = 0,
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const user = await db.user.currentUser();

        if (user) {
            return await getItemsWithFavoriteByUser(user.id,take,skip);
        } else {
            const tempFavoriteListId = cookies().get(COOKIE_FAVORITE_KEY)?.value;

            if(tempFavoriteListId){
                return await getItemsWithFavoriteByTempFavorite(tempFavoriteListId,2,1);
            } else {
                return await getItemsWithFavorite(2,2);
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
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
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
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
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
):Promise<ItemAndFavorite[] | undefined> {
    try {
        const items = await db.item.findMany({
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

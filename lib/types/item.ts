import { Item } from "@prisma/client";

export type ItemAndFavorite = Item & { 
    favorite: boolean 
};

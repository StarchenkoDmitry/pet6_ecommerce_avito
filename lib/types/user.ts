import { User } from "@prisma/client";

export type UserOwner = Pick<User,"id" | "imageId" | "name" | "surname">;

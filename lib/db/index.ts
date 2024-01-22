import { PrismaClient } from "@prisma/client";
import { extensionsCurrentUser } from "./extensions/currentUser";

const db = new PrismaClient().$extends(extensionsCurrentUser());

export default db;

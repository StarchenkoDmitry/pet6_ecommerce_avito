import { auth } from "@/config/authConfig";
import { Prisma } from "@prisma/client";

export function extensionsCurrentUser() {
	return Prisma.defineExtension((client) => {
		return client.$extends({
			model: {
				user: {
					async currentUser() {
						try {

							const session = await auth();
	
							if(!session)return null;
	
							const token = session?.user?.accessToken;
							// console.log("currentUser accToken",token);
	
							if (!token) return null;
							const user = await client.user.findFirst({
								where:{
									accessTokens:{
										some:{
											token:token
										}
									}
								}
							});
							// console.log("currentUser user",user);
							return user;
						} catch (error) {
							return null;
						}
					}
				}
			}
		});
	});
}

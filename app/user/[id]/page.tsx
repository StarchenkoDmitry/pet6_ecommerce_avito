import db from "@/db";
import Avatar from "@/components/ui/Avatar";


export default async function Home({ params }: { params: { id: string } }) {
    const { id } = params;
    
    const user = await getUserByIdForPage(id);

    if (!user) {
        return (
            <div className="p-2 flex">
                <h2 className="p-1">User with id {id} is not exist</h2>
            </div>
        );
    }

    return (
        <div className="p-2 flex">
            <Avatar
                className="w-[128px] h-[128px] object-cover rounded-full"
                id={user.imageId}
                sizes="128px"
            />
            <div className="p-2 flex flex-col">
                <span>Name: {user.name}</span>
                <span>Surname: {user.surname}</span>
            </div>
        </div>
    );
}

async function getUserByIdForPage(userId:string) {
    try {
        const user = await db.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                surname: true,
                imageId: true,
            },
        });
        return user;
    } catch (error) {
        console.log("getUserByIdForPage error:",error);
        return null;
    }
}

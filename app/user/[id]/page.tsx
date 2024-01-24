/* eslint-disable @next/next/no-img-element */
import db from "@/lib/db";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Render User page");

  const user = await db.user.findFirst({
    where:{ id:id },
  });

  if(!user){
    return (
      <div className="">
        <h2 className="p-1">User with id {id} is not exist</h2>
      </div>
    );
  }

  const avatarUrl = user.imageId ? `/api/avatar/${user.imageId}` : "/img/1.jpg";

  return (
    <div className="">
      <h2 className="p-1">User id {id}</h2>
      <span>Name: {user.name}</span>
      <span>Surname: {user.surname}</span>
      <span>Surname: {user.imageId}</span>
      <img
        className="w-32 h-32 object-cover rounded-full"
        src={avatarUrl}
        alt="avatar"
      />
    </div>
  );
}

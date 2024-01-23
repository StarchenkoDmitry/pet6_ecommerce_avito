import db from "@/lib/db";

export default async function Home({ params }: { params: { id: string } }) {
  const { id } = params;
  console.log("Render User page");

  const user = await db.user.findFirst({
    where:{ id:id },
  });

  return (
    <div className="">
      <h2 className="p-1">User id {id}</h2>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

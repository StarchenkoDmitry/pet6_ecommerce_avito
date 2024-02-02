import ItemBuilder from "@/components/item/ItemBuilder";


export default async function Home() {
    return (
        <div className="p-2">
            <h2 className="mx-4 text-xl">Создать объявление</h2>
            <ItemBuilder />
        </div>
    );
}

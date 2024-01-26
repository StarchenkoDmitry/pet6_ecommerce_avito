import ItemBuilder from '@/components/item/ItemBuilder';


export default async function Home() {
  console.log("Render CreateItem page");

  return (
    <div className="p-2 _bg-gray-100 rounded-lg">
      <h2 className='mx-4 text-xl'>Создать объявление</h2>
      <ItemBuilder/>
    </div>
  )
}

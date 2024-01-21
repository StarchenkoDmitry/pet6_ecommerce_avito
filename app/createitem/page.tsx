import ItemBuilder from '@/components/item/ItemBuilder';

//Create an announcement
//Creating an announcement

export default async function Home() {
  console.log("Render CreateItem page");

  return (
    <div className="p-2 bg-gray-100 rounded-lg">
      <div className=''>
        <h2 className='mx-2 m-1 text-lg'>Создание объявления</h2>
        <ItemBuilder/>
      </div>
    </div>
  )
}



// export default async function Home() {
//   console.log("Render CreateItem page");

//   return (
//     <div className="bg-gray-100 rounded-lg">
//       <div className='m-1 p-1 flex flex-col'>
//         <h2 className='m-1'>Создание объявления</h2>
//         <ItemBuilder/>
//       </div>
//     </div>
//   )
// }

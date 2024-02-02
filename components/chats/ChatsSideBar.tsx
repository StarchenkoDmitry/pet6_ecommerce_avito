import Link from "next/link"


interface Props {}

function ChatsSideBar(props: Props) {
    return (
        <div className="bg-gray-100 rounded-lg">
            <ul className="[&_a]:bg-white [&_a]:m-1 [&_a]:px-2 [&_a]:flex-1 [&_a]:rounded [&_a]:text-blue-500 [&>li]:flex">
                <li>
                    <Link href={"/chats/all"}>
                        All
                    </Link>
                </li>
                <li>
                    <Link href={"/chats/noitem"}>
                        Without products
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default ChatsSideBar;

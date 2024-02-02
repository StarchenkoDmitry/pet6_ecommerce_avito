import Link from "next/link";
import { clsx } from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/solid";


export interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export interface Props {
    breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="m-1 block">
            <ul className="flex">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={clsx(
                            "flex  items-center",
                            breadcrumb.active ? "text-gray-900" : "text-gray-500"
                        )}
                    >
                        <Link
                            className="px-2 _p-1 _px-2 rounded-lg bg-gray-100"
                            href={breadcrumb.href}
                        >
                            {breadcrumb.label}
                        </Link>
                        {index < breadcrumbs.length - 1 ? 
                            (<ChevronRightIcon className="inline-block w-4 h-4" />):
                            (null)
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
}

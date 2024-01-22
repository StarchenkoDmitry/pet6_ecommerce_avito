import Link from "next/link"
import { clsx } from "clsx"


export interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export interface Props{
    breadcrumbs: Breadcrumb[]
}

export default function Breadcrumbs({ breadcrumbs }:Props) {
  return (
    <nav aria-label="Breadcrumb" className="m-1 block">
      <ol className="flex ">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(breadcrumb.active ? "text-gray-900" : "text-gray-500")}
          >
            <Link className="p-1 px-2 rounded-lg bg-gray-100" href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? <span className="mx-1 inline-block">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

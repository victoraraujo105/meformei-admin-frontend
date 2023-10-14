// ... imports e definição do componente ...
'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactNode } from "react"

type TBreadCrumbProps = {
  homeElement: ReactNode,
  separator: ReactNode,
  containerClasses?: string,
  listClasses?: string,
  activeClasses?: string,
  capitalizeLinks?: boolean
  rootPath?: string
}

const NextBreadcrumb = ({ homeElement, rootPath, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {

  const paths = usePathname()
  let pathNames = paths.split('/').filter(path => path)



  return (
    <div >
      <ul className={containerClasses}>
        <li className={listClasses}><Link style={{ fontSize: "0.9rem" }} href={rootPath ?? '/home'}>{homeElement}</Link></li>
        <p className="text-white">{pathNames.length > 0 && separator}</p>
        {
          pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`
            let itemClasses = paths === href ? `${activeClasses}` : listClasses
            let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
            return (
              <React.Fragment key={index}>
                <li className={`${itemClasses} whitespace-nowrap overflow-hidden text-ellipsis max-w-[13rem] `} >
                  <Link style={{ fontSize: "0.9rem" }} href={href}>{itemLink}</Link>
                </li>
                <p className="text-white">{pathNames.length !== index + 1 && separator}</p>
              </React.Fragment>
            )
          })
        }
      </ul>
    </div>
  )
}

export default NextBreadcrumb
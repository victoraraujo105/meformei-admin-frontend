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
}

const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {

  const paths = usePathname()
  let pathNames = paths.split('/').filter(path => path)



  return (
    <div >
      <ul className={containerClasses}>
        <li className={listClasses}><Link style={{ fontSize: "0.9rem" }} href={'/home'}>{homeElement}</Link></li>
        {pathNames.length > 0 && separator}
        {
          pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join('/')}`
            let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
            let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
            return (
              <React.Fragment key={index}>
                <li className={`${itemClasses} whitespace-nowrap overflow-hidden text-ellipsis max-w-[13rem] `} >
                  <Link style={{ fontSize: "0.9rem" }} href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && separator}
              </React.Fragment>
            )
          })
        }
      </ul>
    </div>
  )
}

export default NextBreadcrumb
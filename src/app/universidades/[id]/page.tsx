
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import University from '@/components/University'



interface PageProps {
  params: {
    id: string
  }
}


export default async function Page({
  params: { id },
}: PageProps) {

  // const data = await getData(id)
  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Editar",
      tabComponent: <University universityId={id} />
    },

  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>

  )
}
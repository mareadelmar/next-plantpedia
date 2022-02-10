import { useEffect, useState } from 'react'
import { Layout } from '@components/Layout'
import { getPlantList } from '@api'
import { PlantCollection } from '@components/PlantCollection'

export default function Home() {
  const [resData, setResData] = useState<Plant[]>([])

  useEffect(() => {
    getPlantList({limit: 10}).then(setResData)
  }, [])

  return (
    <Layout>
      <PlantCollection plants={resData}/>
    </Layout>
  )
}

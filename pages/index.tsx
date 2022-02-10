import { Layout } from '@components/Layout'
import { getPlantList } from '@api'
import { PlantCollection } from '@components/PlantCollection'
import { GetStaticProps, InferGetStaticPropsType } from 'next'


type HomeProps = { plants: Plant[] }

export const getStaticProps:GetStaticProps<HomeProps> = async () => {

  const plants = await getPlantList({limit: 10});

  return {
    props: {
      plants
    }
  }
}

export default function Home({ plants }:InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <Layout>
      <PlantCollection plants={plants} variant="square" className=""/>
    </Layout>
  )
}

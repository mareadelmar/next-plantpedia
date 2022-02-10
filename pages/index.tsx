import { Layout } from '@components/Layout'
import { getPlantList } from '@api'
import { PlantCollection } from '@components/PlantCollection'
import {  Hero } from '@components/Hero'
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
      <Hero {...plants[0]} className='mb-48'/>
      <PlantCollection plants={plants.slice(0, 2)} variant="vertical" className='mb-48'/>
      <PlantCollection plants={plants} variant="square"/>
    </Layout>
  )
}

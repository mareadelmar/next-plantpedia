
import { Layout } from "@components/Layout";
import { RichText } from "@components/RichText";
import { Grid } from "@ui/Grid";
import { Typography } from "@ui/Typography";
import { AuthorCard } from "@components/AuthorCard";
import { getPlant, getPlantList } from "@api";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type PlantEntryProps = {
    plant: Plant
}

type PathType = {
    params: {
        slug: string
    }
}

export const getStaticPaths = async () => {
    const entries = await getPlantList({limit: 10});

    const paths:PathType[] = entries.map(item => ({
        params: {
            slug: item.slug,
        }
    }))

    return {
        paths,
        fallback: false // mirar bien esto dsp
    }
}


export const getStaticProps:GetStaticProps<PlantEntryProps> = async({params}) => {
    const slug = params?.slug;

    if(typeof slug !== "string"){
        return {
            notFound: true // gentileza de next: plant así jamás será null
        }
    }

    try {
        const plant = await getPlant(slug);
        return {
            props: {
                plant
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}


export default function DetailPage({plant}:InferGetStaticPropsType<typeof getStaticProps>){

    return <Layout>
        <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={9} component="article"> 
                <figure>
                    <img src={plant.image.url} alt={plant.plantName} />
                </figure>
                <div className="px-12 pt-8">
                    <Typography variant="h2">{plant.plantName}</Typography>
                </div>
                <div className="p-10">
                    <RichText richText={plant.description}/>
                </div>
            </Grid>

            <Grid item xs={12} md={4} lg={3} component="aside">
                <div>
                    <Typography variant="h5" component="h3" className="mb-4">
                        Recent posts
                    </Typography>
                </div>
                <div className="mt-10">
                    <Typography variant="h5" component="h3" className="mb-4">
                        Categories
                    </Typography>
                </div>

            </Grid>
        </Grid>
        <div className="my4 border-t-2 border-gray-200 pt-12 pb-7">
            <AuthorCard {...plant.author} />
        </div>
    </Layout>

}
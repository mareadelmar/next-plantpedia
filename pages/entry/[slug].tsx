
import { Layout } from "@components/Layout";
import { RichText } from "@components/RichText";
import { Grid } from "@ui/Grid";
import { Typography } from "@ui/Typography";
import { AuthorCard } from "@components/AuthorCard";
import { PlantEntryInline } from "@components/PlantCollection";
import { getPlant, getPlantList, getCategoryList } from "@api";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

type PlantEntryPageProps = {
    plant: Plant | null
    categories: Category[] | null
    lastEntries: Plant[] | null
}

type PathType = {
    params: {
        slug: string
    }
}

export const getStaticPaths = async () => {
    const entries = await getPlantList({ limit: 10 });

    // detail paths
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

export const getStaticProps: GetStaticProps<PlantEntryPageProps> = async({params}) => {
    const slug = params?.slug;

    if(typeof slug !== "string"){
        return {
            notFound: true // gentileza de next: plant así jamás será null
        }
    }
    try {
        const plant = await getPlant(slug);
        const categories = await getCategoryList({ limit: 10 }); // categories
        const lastEntries = await getPlantList({ limit: 5 }); // last entries
        return {
            props: {
                plant,
                categories,
                lastEntries,
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}

export default function DetailPage({plant, categories, lastEntries}: InferGetStaticPropsType<typeof getStaticProps>){

    console.log(plant, categories)
    //const {image, plantName, description, author} = plant;

    return (
        <Layout>
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
                        {
                            lastEntries?.map(item => (
                                <article className="mb-4" key={item.id}>
                                    <PlantEntryInline {...item} />
                                </article>
                            ))
                        }
                    </div>
                    <div className="mt-10">
                        <Typography variant="h5" component="h3" className="mb-4">
                            Categories
                        </Typography>
                        <ul className="list">
                            {
                                categories?.map(item => (
                                    <li key={item.id}>
                                        <Link passHref href={`/category/${item.slug}`}>
                                            <Typography component="a" variant="h6">
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Grid>
            </Grid>
            <div className="my4 border-t-2 border-gray-200 pt-12 pb-7">
                <AuthorCard {...plant.author} />
            </div>
        </Layout>
    )

}
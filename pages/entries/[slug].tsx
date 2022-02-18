
import { Layout } from "@components/Layout";
import { RichText } from "@components/RichText";
import { Grid } from "@ui/Grid";
import { Typography } from "@ui/Typography";
import { AuthorCard } from "@components/AuthorCard";

export default function DetailPage(){
    const plant = {
        image: {
            url: ""
        },
        plantName: "",
        description: "",
        author: {
            fullName: "",
            id: "",
            photo: null,
            linkedIn: "",
            twitter: "",
            biography: "",
            handle: ""
        }
    };

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
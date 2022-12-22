import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-11-27',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN
})
 
const builder = ImageUrlBuilder(client) 


export const urlFor = (source) => builder.image(source)
/**
 * seo.ts
 */
import graphqlRequest from "./graphqlRequest";

export interface SeoSchema {
    raw: string | null;  // Allow raw schema to be null
}

export interface SeoOpengraphImage {
    mediaItemUrl: string | null;  // Allow mediaItemUrl to be null
}

export interface SeoData {
    opengraphImage: SeoOpengraphImage | null;  // Allow opengraphImage to be null
    opengraphModifiedTime: string | null;      // Allow other properties to be null
    opengraphPublishedTime: string | null;
    opengraphTitle: string | null;
    opengraphType: string | null;
    opengraphUrl: string | null;
    schema: SeoSchema | null;
    title: string | null;
    metaDesc: string | null;
    opengraphSiteName: string | null;
    readingTime: string | null;
    opengraphPublisher: string | null;
}

interface GraphQLResponse<T> {
    data: T;
}

interface PageSeoResponse {
    [key: string]: {
        seo: SeoData;
    };
}

export async function getSeo(pageType: string = 'post', slug: string = '/'): Promise<SeoData> {
    const query = {
        query: `query getSeo {
            ${pageType}(id: "${slug}", idType: SLUG) {
              seo {
                opengraphImage {
                  mediaItemUrl
                }
                opengraphModifiedTime
                opengraphPublishedTime
                opengraphTitle
                opengraphType
                opengraphUrl
                schema {
                  raw
                }
                title
                metaDesc
                opengraphSiteName
                readingTime
                opengraphPublisher
              }
            }
          }`
    };

    const getSeo = await graphqlRequest<GraphQLResponse<PageSeoResponse>>(query);
    const seoData = getSeo.data[pageType]?.seo || null;

    // Log seoData for debugging purposes
    // console.log('seodata:', seoData);

    return seoData;
}

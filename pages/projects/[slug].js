/* eslint-disable @next/next/no-img-element */
import PortableText from "react-portable-text";
import { client } from "../../client";
import styles from "../../styles/Project.module.css";
import Vimeo from "@u-wave/react-vimeo";

const Project = ({ project }) => {
    return (
        <article className={styles.container}>
            <main className={styles.main}>
                <h1>{project.title}</h1>

                <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={project.body}
                />
            </main>
            <div className={styles.gallery}>
                {project.vimeo && (
                    <Vimeo video={project.vimeo} responsive={true} />
                )}
                {project.gallery &&
                    project.gallery.map(({ asset }) => {
                        return (
                            <img
                                key={asset.url}
                                alt={project.title}
                                src={asset.url}
                                className={styles.image}
                            />
                        );
                    })}
            </div>
        </article>
    );
};

export async function getStaticPaths() {
    const query = `*[_type == "project"]{
        _id,
        slug {
            current
        }
      }`;
    const projects = await client.fetch(query);

    const paths = projects.map((project) => ({
        params: {
            slug: project.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const query = `*[_type == "project" && slug.current == $slug][0]{
        _id,
        title,
        vimeo,
        body,
        gallery[]{
            asset->{
                url
            }
        }
      }`;

    const project = await client.fetch(query, { slug: params.slug });

    if (!project) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            project,
        },
        revalidate: 60,
    };
}

export default Project;

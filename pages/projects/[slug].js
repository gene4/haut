/* eslint-disable @next/next/no-img-element */
import PortableText from "react-portable-text";
import { client, urlFor } from "../../client";
import styles from "../../styles/Project.module.css";
import { motion } from "framer-motion";

const Project = ({ project }) => {
    // console.log(project.gallery);
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 0 }}
            className={styles.container}
        >
            <main className={styles.main}>
                <h1>{project.title}</h1>

                <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={project.body}
                    serializers={{
                        normal: (props) => <p data-aos="fade-up" {...props} />,
                        image: (props) => (
                            <figure>
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    alt={project.title}
                                    src={urlFor(props).url()}
                                />
                            </figure>
                        ),
                    }}
                />
            </main>
            <div className={styles.gallery}>
                {project.vimeo && (
                    <div
                        className={styles.playerWrapper}
                        style={{
                            // overflow: "hidden",
                            height: "480px",
                            width: "100%",
                        }}
                    >
                        <iframe
                            title="vimeo-player"
                            src={project.vimeo}
                            style={{
                                overflow: "hidden",
                                height: "480px",
                                width: "100%",
                            }}
                            height="100%"
                            width="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; encrypted-media"
                        ></iframe>
                    </div>
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
        </motion.article>
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

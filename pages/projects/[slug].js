/* eslint-disable @next/next/no-img-element */
import PortableText from "react-portable-text";
import { client, urlFor } from "../../client";
import styles from "../../styles/Project.module.css";
import { motion } from "framer-motion";

const Project = ({ project }) => {
    console.log("render");
    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 0 }}
            className={styles.container}
        >
            <header>
                <h1>{project.title}</h1>
            </header>
            <main className={styles.main}>
                {project.vimeo && (
                    <div className={styles.video_container} data-aos="fade-up">
                        <iframe
                            style={{ marginBottom: "2rem" }}
                            title="vimeo-player"
                            src={project.vimeo}
                            height="480"
                            width="100%"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; encrypted-media"
                        ></iframe>
                    </div>
                )}

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
                                    // data-aos="fade-up"
                                    src={urlFor(props).url()}
                                />
                            </figure>
                        ),
                    }}
                />
            </main>
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

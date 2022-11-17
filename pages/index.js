/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { client, urlFor } from "../client";

import Link from "next/link";

export default function Home({ main, projects, category }) {
    console.log(category);
    return (
        <>
            <Head>
                <title>HAUT</title>
                <meta name="description" content="HAUT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                exit={{ opacity: 0 }}
                className={styles.hero_container}
            >
                <a rel="noreferrer" target={"_blank"} href={main[0].link}>
                    <motion.video
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        id="video"
                        autoPlay
                        muted
                        loop
                    >
                        <source
                            src={`https://drive.google.com/uc?export=download&id=${main[0].videoId}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </motion.video>
                </a>
            </motion.section>
            <section id="projects" className={styles.grid}>
                {projects &&
                    projects
                        .filter((project) =>
                            category == ""
                                ? true
                                : project.category === category
                        )
                        .map((project) => {
                            return (
                                <Link
                                    key={project._id}
                                    href={`/projects/${project.slug.current}`}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeOut",
                                        }}
                                        exit={{ opacity: 0 }}
                                        className={styles.image_container}
                                    >
                                        <div className={styles.overlay} />
                                        <div
                                            className={styles.photo}
                                            style={{
                                                backgroundImage: `url(${urlFor(
                                                    project.mainImage
                                                ).url()})`,
                                            }}
                                        >
                                            {" "}
                                        </div>
                                        <p>{project.title}</p>
                                    </motion.div>
                                </Link>
                            );
                        })}
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const query = `*[_type == "project"] | order(_createdAt asc) {
  _id,
  title,
  mainImage,
  category,
  slug
}`;

    const queryMain = `*[_type == "main"]{
  _id,
  link,
  videoId,
}`;
    const projects = await client.fetch(query);
    const main = await client.fetch(queryMain);

    return {
        props: {
            projects,
            main,
        },
        revalidate: 60,
    };
};

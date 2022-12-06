/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { motion } from "framer-motion";
import { client, urlFor } from "../client";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ main, projects, category }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            style={{ position: "absolute", left: 0, top: 0 }}
        >
            <Head>
                <title>HAUT</title>
                <meta name="description" content="HAUT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.hero_container}>
                <a rel="noreferrer" target={"_blank"} href={main[0].link}>
                    <video
                        id="video"
                        autoPlay
                        muted
                        loop
                        className={styles.video}
                    >
                        <source
                            src={`https://drive.google.com/uc?export=download&id=${main[0].videoId}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </a>
            </section>

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
        </motion.div>
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

import Head from "next/head";
import { motion } from "framer-motion";
import { client, urlFor } from "../client";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home({ main, projects, category }) {
    return (
        <motion.div>
            <Head>
                <title>HAUT</title>
                <meta name="description" content="HAUT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.hero_container}>
                <a rel="noreferrer" target={"_blank"} href={main[0].link}>
                    <video
                        playsInline
                        autoPlay
                        muted
                        loop
                        className={styles.video}>
                        <source src={main[0].videoURL} type="video/mp4" />
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
                                    href={`/projects/${project.slug.current}`}>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeOut",
                                        }}
                                        className={styles.image_container}>
                                        <div className={styles.overlay} />
                                        <Image
                                            className={styles.photo}
                                            src={urlFor(
                                                project.mainImage
                                            ).url()}
                                            layout="fill"
                                            priority
                                        />
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
    const query = `*[_type == "project"] | order(orderRank) {
  _id,
  title,
  mainImage,
  category,
  slug
}`;

    const queryMain = `*[_type == "main"]{
  _id,
  link,
  "videoURL": video.asset->url
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

/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { client, urlFor } from "../client";

export default function Home({ hero }) {
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
                <a rel="noreferrer" target={"_blank"} href={hero[0].link}>
                    <div
                        className={styles.hero}
                        style={{
                            backgroundImage: `url(${urlFor(
                                hero[0].image
                            ).url()})`,
                        }}
                    />
                </a>
            </motion.section>
        </>
    );
}

export const getServerSideProps = async () => {
    const query = `*[_type == "project"]{
  _id,
  title,
  mainImage,
  slug
}`;

    const queryHero = `*[_type == "hero"]{
  _id,
  link,
  image,
}`;
    const projects = await client.fetch(query);
    const hero = await client.fetch(queryHero);

    return {
        props: {
            projects,
            hero,
        },
    };
};

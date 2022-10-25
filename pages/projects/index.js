import React from "react";
import Link from "next/link";
import { client, urlFor } from "../../client";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

function projects({ projects }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 0, right: 0 }}
        >
            <section className={styles.grid}>
                {projects &&
                    projects.map((project) => {
                        return (
                            <Link
                                key={project._id}
                                href={`/projects/${project.slug.current}`}
                            >
                                <a>
                                    <div className={styles.image_container}>
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
                                    </div>
                                </a>
                            </Link>
                        );
                    })}
            </section>
        </motion.div>
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

    return {
        props: {
            projects,
        },
    };
};

export default projects;

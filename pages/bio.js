import React from "react";
import PortableText from "react-portable-text";
import { client } from "../client";
import styles from "../styles/Home.module.css";

export default function Bio({ bio }) {
    return (
        <main className={styles.bio_container}>
            <div className={styles.bio_content}>
                <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={bio[0].bio}
                />
            </div>
        </main>
    );
}

export const getStaticProps = async () => {
    const query = `*[_type == "bio"]{
  bio,
}`;
    const bio = await client.fetch(query);

    return {
        props: {
            bio,
        },
        revalidate: 60,
    };
};

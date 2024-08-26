/* eslint-disable @next/next/no-img-element */
import PortableText from "react-portable-text";
import { client } from "../../client";
import styles from "../../styles/Project.module.css";
import {
    getVimeoId,
    getYoutubeId,
    getSpotifyId,
} from "../../utils/get-video-id";
import BlurredImage from "../../components/BlurredImage";

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
                {project.vimeoUrl && (
                    <div className={styles.video_container}>
                        <iframe
                            src={`https://player.vimeo.com/video/${getVimeoId(
                                project.vimeoUrl
                            )}?h=aead483a85`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                )}
                {project.youtubeUrl && (
                    <div className={styles.video_container}>
                        <iframe
                            src={`https://www.youtube.com/embed/${getYoutubeId(
                                project.youtubeUrl
                            )}`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowfullscreen></iframe>
                    </div>
                )}
                {project.appleMusicId && (
                    <div className={styles.video_container}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: project.appleMusicId,
                            }}
                        />
                    </div>
                )}
                {project.soundcloudId && (
                    <div className={styles.video_container}>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: project.soundcloudId,
                            }}
                        />
                    </div>
                )}

                {project.spotifyUrl && (
                    <div
                        style={{
                            height: "400px",
                            width: "100%",
                            marginTop: "4px",
                        }}>
                        <iframe
                            src={`https://open.spotify.com/embed/track/${getSpotifyId(
                                project.spotifyUrl
                            )}?utm_source=generator&theme=0`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowfullscreen=""
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"></iframe>
                    </div>
                )}
                {project.gallery &&
                    project.gallery.map(({ asset }) => {
                        return (
                            <BlurredImage
                                key={asset.url}
                                src={asset.url}
                                lqipSrc={asset.metadata.lqip}
                                alt={project.title}
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
        youtubeUrl,
        vimeoUrl,
        soundcloudId,
        spotifyUrl,
        appleMusicId,
        body,
        gallery[]{
          asset->{
            url,
            metadata {
              lqip,
              blurhash
            }
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

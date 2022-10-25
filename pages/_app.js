import "../styles/globals.css";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
    return (
        <div style={{ position: "relative" }}>
            <nav
                style={{
                    color:
                        router.pathname === "/projects/[slug]"
                            ? "black"
                            : "#deedff",
                }}
            >
                <Link href="/">
                    <a>HAUT</a>
                </Link>
                <Link href="/projects">
                    <a style={{ marginLeft: "auto" }}>projects</a>
                </Link>
                <a href="mailto:hautonhaut@gmail.com">contact</a>
                <a
                    href="https://soundcloud.com/xhautx"
                    rel="noreferrer"
                    target={"_blank"}
                >
                    soundcloud
                </a>
                <a
                    href="https://www.instagram.com/hautonhaut/"
                    rel="noreferrer"
                    target={"_blank"}
                >
                    instagram
                </a>
            </nav>
            <AnimatePresence initial={false}>
                <Component key={router.pathname} {...pageProps} />
            </AnimatePresence>
        </div>
    );
}

export default MyApp;

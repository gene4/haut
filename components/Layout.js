import React from "react";
import { Twirl as Hamburger } from "hamburger-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

function Layout({ setCategory }) {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();
    console.log(router.pathname);
    const handleClick = (category) => {
        router.pathname !== "/" && router.push("/#projects");
        setCategory(category);

        if (router.pathname !== "/") {
            setOpen(false);
        }
    };

    return (
        <>
            <header
                style={{
                    color: router.pathname === "/" && "#deedff",
                }}
            >
                <Hamburger
                    rounded
                    toggled={isOpen}
                    toggle={setOpen}
                    size={48}
                    label="Show menu"
                />
                <Link href="/">
                    <a>HAUT</a>
                </Link>
            </header>
            {isOpen && (
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                    }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div>
                        <button onClick={() => handleClick("")}>all</button>
                        <button onClick={() => handleClick("installation")}>
                            installations
                        </button>
                        <button onClick={() => handleClick("dancePiece")}>
                            dance pieces
                        </button>
                        <button onClick={() => handleClick("movie")}>
                            movies
                        </button>
                        <button onClick={() => handleClick("music")}>
                            music
                        </button>
                    </motion.div>
                    <motion.div>
                        <a href="mailto:hautonhaut@gmail.com">email</a>
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
                    </motion.div>
                    <motion.div>
                        <Link href={"/imprint"}>
                            <a onClick={() => setOpen(false)}>imprint</a>
                        </Link>
                        <Link href={"/data-protection"}>
                            <a onClick={() => setOpen(false)}>
                                data protection
                            </a>
                        </Link>
                    </motion.div>
                </motion.nav>
            )}
        </>
    );
}

export default Layout;

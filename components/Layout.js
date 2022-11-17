import React from "react";
import { Twirl as Hamburger } from "hamburger-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

function Layout({ setCategory }) {
    const [isOpen, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = (category) => {
        router.pathname !== "/" && router.push("/#projects");
        setCategory(category);
    };

    return (
        <>
            <header
                style={{
                    color:
                        router.pathname === "/projects/[slug]"
                            ? "black"
                            : "#deedff",
                }}
            >
                <Hamburger
                    rounded
                    toggled={isOpen}
                    toggle={setOpen}
                    size={48}
                    label="Show menu"
                />
                <Link href="/">HAUT</Link>
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
                    <div>
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
                    </div>

                    <motion.a
                        animate={{ y: ["15%", "0%", "-15%"] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                        }}
                        href="mailto:hautonhaut@gmail.com"
                    >
                        email
                    </motion.a>
                    <motion.a
                        animate={{ y: ["15%", "0%", "-15%"] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: 0.1,
                        }}
                        href="https://soundcloud.com/xhautx"
                        rel="noreferrer"
                        target={"_blank"}
                    >
                        soundcloud
                    </motion.a>
                    <motion.a
                        animate={{ y: ["15%", "0%", "-15%"] }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: 0.05,
                        }}
                        href="https://www.instagram.com/hautonhaut/"
                        rel="noreferrer"
                        target={"_blank"}
                    >
                        instagram
                    </motion.a>
                </motion.nav>
            )}
        </>
    );
}

export default Layout;

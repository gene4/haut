import React from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

function imprint() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.imprint}
        >
            <div>
                <p>
                    Fá Maria
                    <br />
                    <br />
                    hautonhaut@gmail.com
                    <br />
                    <br />
                    All rights reserved. No unauthorized use, copying or
                    reproduction of the images and/or text, whether for personal
                    or commercial purposes, without the written permission of
                    the artist (see details above).
                    <br />
                    <br />
                    The artist does not take responsibility for the views
                    expressed in, or contents of, external links.
                    <br />
                    <br />
                    ©Fá Maria <br />
                    <br />
                    This website was built by Nadav Kirsh.
                </p>
            </div>
        </motion.div>
    );
}

export default imprint;

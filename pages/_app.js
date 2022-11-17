import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, router }) {
    const [category, setCategory] = useState("");
    return (
        <>
            <Layout setCategory={setCategory} />
            <AnimatePresence initial={false}>
                <Component
                    key={router.pathname}
                    category={category}
                    {...pageProps}
                />
            </AnimatePresence>
        </>
    );
}

export default MyApp;

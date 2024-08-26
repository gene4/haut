import React, { useState, useEffect } from "react";

const BlurredImage = ({ src, lqipSrc, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Check if the image is already cached
        const img = new Image();
        img.src = src;
        if (img.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    return (
        <div style={{ position: "relative" }}>
            {/* LQIP Image with Blur Effect */}
            <img
                src={lqipSrc}
                alt={alt}
                style={{
                    filter: "blur(10px)",
                    transition: "opacity 0.5s ease",
                    opacity: isLoaded ? 0 : 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />

            {/* High-Resolution Image */}
            <img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                style={{
                    transition: "opacity 0.5s ease",
                    opacity: isLoaded ? 1 : 0,
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
};

export default BlurredImage;

// src/components/TextGenerateEffect.jsx

"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "../utils/cn";

export const TextGenerateEffect = ({
    words,
    className,
}) => {
    const [scope, animate] = useAnimate();
    // Split the text into lines based on the newline character
    const lines = words.split("\n");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
            },
            {
                duration: 0.9,
                delay: stagger(0.1),
            }
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {/* Map over each line first */}
                {lines.map((line, lineIdx) => (
                    <div key={lineIdx} className="block">
                        {/* Then map over each word in the line */}
                        {line.split(" ").map((word, wordIdx) => (
                            <motion.span
                                key={word + wordIdx}
                                className="opacity-0" // The animation will make it visible
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                    </div>
                ))}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div>
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
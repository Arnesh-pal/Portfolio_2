// src/components/ThreeBackground.jsx

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import gsap from 'gsap';

function Stars(props) {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

    // This hook runs on every frame, allowing continuous animation
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function ThreeBackground() {
    const canvasRef = useRef();

    // This useEffect handles the mouse-move parallax effect
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (canvasRef.current) {
                // Normalize mouse position (-1 to 1)
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                // Use GSAP for smooth animation (lerping)
                gsap.to(canvasRef.current.rotation, {
                    y: mouseX * 0.1, // Adjust multiplier for sensitivity
                    x: mouseY * 0.1,
                    duration: 1.5, // Duration for the smoothing effect
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="w-full h-full fixed top-0 left-0 z-0">
            <Canvas ref={canvasRef} camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default ThreeBackground;
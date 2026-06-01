"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_DATA } from "@/lib/data";

export default function Gallery() {
    const galleryRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.gallery-item');
            
            items.forEach((item, index) => {
                gsap.to(item, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    delay: (index % 3) * 0.1 // Stagger by column
                });
            });
        }, galleryRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="gallery-section" ref={galleryRef} id="clubs">
            <div className="gallery-heading">
                <h2 className="gallery-title">campus life.</h2>
                <h3 className="gallery-subtitle">#amrita diaries</h3>
            </div>
            
            <div className="masonry-grid instagram-embed-grid">
                {GALLERY_DATA.map((post) => (
                    <div className="gallery-item" key={post.id}>
                        <iframe
                            src={post.embedUrl}
                            width="100%"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                            allowtransparency="true"
                            allow="encrypted-media"
                            style={{ border: 'none', overflow: 'hidden', background: 'white', borderRadius: '20px' }}
                        ></iframe>
                    </div>
                ))}
            </div>
        </section>
    );
}

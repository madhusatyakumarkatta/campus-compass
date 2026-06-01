"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TIMELINE_DATA = [
    { time: "8:55 AM – 10:35 AM", title: "Classes begin", desc: "(brace yourself)" },
    { time: "10:35 – 10:45 AM", title: "Break", desc: "(run for the canteen)" },
    { time: "10:45 AM – 1:15 PM", title: "Classes continue", desc: "(stay awake)" },
    { time: "1:15 – 2:05 PM", title: "Lunch break", desc: "(the golden hours)" },
    { time: "2:05 – 3:00 PM", title: "Classes", desc: "(post-lunch struggles)" },
    { time: "3:00 – 3:10 PM", title: "Break", desc: "(almost there)" },
    { time: "3:10 – 4:50 PM", title: "Classes resume", desc: "(the final stretch)" }
];

export default function DailyTimeline() {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Draw the center trunk line downward
            gsap.fromTo(lineRef.current, 
                { strokeDasharray: 2000, strokeDashoffset: 2000 },
                {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            // Animate each timeline node
            const nodes = gsap.utils.toArray('.timeline-node');
            nodes.forEach((node, i) => {
                const dot = node.querySelector('.timeline-dot');
                const content = node.querySelector('.timeline-content');
                
                // Dot pops in
                gsap.to(dot, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Content slides and fades in
                gsap.to(content, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: node,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Closing line animation
            gsap.to('.timeline-closing', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.timeline-closing',
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="timeline-section" ref={sectionRef}>
            <div className="timeline-heading">
                <h2 className="timeline-title">the daily grind.</h2>
                <h3 className="timeline-subtitle">(this is your day... unless you plan to strategically bunk.)</h3>
            </div>

            <div className="timeline-container">
                {/* SVG Trunk Line */}
                <div className="timeline-svg-container">
                    <svg viewBox="0 0 40 2000" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                        <path 
                            ref={lineRef}
                            className="timeline-line-path" 
                            d="M 20 0 L 20 2000" 
                        />
                    </svg>
                </div>

                {TIMELINE_DATA.map((item, index) => (
                    <div className="timeline-node" key={index}>
                        <div className="timeline-content">
                            <h4 className="timeline-time">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {item.time}
                            </h4>
                            <p className="timeline-desc">{item.title}</p>
                            <p className="timeline-subdesc">{item.desc}</p>
                        </div>
                        <div className="timeline-dot"></div>
                        <div className="timeline-spacer"></div>
                    </div>
                ))}
            </div>

            <h2 className="timeline-closing">
                After 4:50 PM:<br/>
                <span>ab jee lo apni zindagi. go touch grass.</span>
            </h2>
        </section>
    );
}

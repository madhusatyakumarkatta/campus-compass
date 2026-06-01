"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia on cards
            const cards = document.querySelectorAll(".motion-card__card");
            cards.forEach((card) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(card, "rotation");
                const startX = gsap.getProperty(card, "x");
                const startY = gsap.getProperty(card, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(card, {
                        inertia: {
                            x: { velocity: speedX * 20, end: startX },
                            y: { velocity: speedY * 20, end: startY },
                            rotation: { velocity: speedX * 1.5, end: startRotation },
                        },
                    });
                };

                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);
            });

            // Inertia on floating labels
            const labels = document.querySelectorAll(".motion-card__floating-label");
            labels.forEach((label) => {
                let lastX = 0;
                let lastY = 0;
                let speedX = 0;
                let speedY = 0;

                const startRotation = gsap.getProperty(label, "rotation");
                const startX = gsap.getProperty(label, "x");
                const startY = gsap.getProperty(label, "y");

                const onMove = (e) => {
                    speedX = e.clientX - lastX;
                    speedY = e.clientY - lastY;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onEnter = (e) => {
                    speedX = 0;
                    speedY = 0;
                    lastX = e.clientX;
                    lastY = e.clientY;
                };

                const onLeave = () => {
                    gsap.to(label, {
                        inertia: {
                            x: { velocity: speedX * 25, end: startX },
                            y: { velocity: speedY * 25, end: startY },
                            rotation: { velocity: speedX * 2, end: startRotation },
                        },
                    });
                };

                label.addEventListener("mousemove", onMove);
                label.addEventListener("mouseenter", onEnter);
                label.addEventListener("mouseleave", onLeave);
            });

            // Entry Animations: Sticker Pop & Underline Draw
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            const topStickerImg = sectionRef.current.querySelector(".motion-card__sticker--top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".motion-card__underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
            }

            // ─── Branching Layout Animation ───
            const trunkPath = sectionRef.current.querySelector(".branching-trunk-path");
            if (trunkPath) {
                gsap.to(trunkPath, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".academics-branching-layout",
                        start: "top 50%",
                        end: "bottom 70%",
                        scrub: 1
                    }
                });
            }

            const branchRows = sectionRef.current.querySelectorAll(".branch-row");
            branchRows.forEach((row) => {
                const isLeft = row.classList.contains("branch-row--left");
                const linePath = row.querySelector(".branch-line-path");
                const card = row.querySelector(".branch-card");

                const rowTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });

                if (linePath) {
                    rowTl.to(linePath, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" });
                }

                rowTl.fromTo(card,
                    { x: isLeft ? 50 : -50, opacity: 0 },
                    { x: 0, opacity: 1, visibility: "visible", duration: 0.7, ease: "back.out(1.2)" },
                    "-=0.3"
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="motion-card-section" id="academics">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="motion-card__heading">
                <h2 className="motion-card__title">
                    Here's Everything They Won't Tell
                    <br />
                    You at Orientation.
                </h2>
                <p className="motion-card__subtitle">
                    we made the mistakes so you don't have to.
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="motion-card__sticker motion-card__sticker--top">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            className="motion-card__sticker-img"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg">
                    <path className="motion-card__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div className="motion-card__cards-area">
                {/* Blue SVG blob behind everything */}
                <div className="motion-card__blob">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="motion-card__blob-svg"
                    />
                </div>


                {/* 4 Photo Cards */}
                <div ref={containerRef} className="motion-card__cards">
                    <div className="motion-card__card motion-card__card--1">
                        <div className="motion-card__card-image">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Students in library"
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--2">
                        <div className="motion-card__card-image">
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Coding and laptop"
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--3">
                        <div className="motion-card__card-image">
                            <img
                                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Exams"
                                className="cover-image"
                            />
                        </div>
                    </div>

                    <div className="motion-card__card motion-card__card--4">
                        <div className="motion-card__card-image">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt="Graduation"
                                className="cover-image"
                            />
                        </div>
                    </div>
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div ref={containerRef} className="motion-card__floating-labels">
                    <div className="motion-card__floating-label motion-card__floating-label--pink">
                        <p className="motion-card__floating-text">learn from the best!</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--orange">
                        <p className="motion-card__floating-text">innovate & build</p>
                    </div>
                    <div className="motion-card__floating-label motion-card__floating-label--red">
                        <p className="motion-card__floating-text">hands-on lab sessions</p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="motion-card__footer-text">
                <p className="motion-card__description">
                    Amrita Amaravati offers a world-class academic environment designed to help you thrive. You'll engage in exciting theory classes, hands-on practical labs, and innovative projects. With the right balance and dedication, achieving greatness here is just the beginning of your journey! 
                </p>
            </div>

            {/* ─── Part 4: Academics Branching Layout ────────────────────── */}
            <div className="academics-branching-layout">
                {/* Central Trunk Line */}
                <div className="branching-trunk-container">
                    <svg className="branching-trunk-svg" preserveAspectRatio="none">
                        <line x1="2" y1="0" x2="2" y2="100%" className="branching-trunk-path" />
                    </svg>
                </div>

                {/* Card 1: Left */}
                <div className="branch-row branch-row--left">
                    <div className="branch-line-container">
                        <svg className="branch-line-svg" preserveAspectRatio="none"><line x1="100%" y1="2" x2="0" y2="2" className="branch-line-path" /></svg>
                    </div>
                    <div className="branch-card branch-card--branches">
                        <h3>Available Branches</h3>
                        <p>Explore cutting-edge B.Tech programs designed for the future:</p>
                        <ul>
                            <li><strong>Computer Science Engineering (CSE)</strong></li>
                            <li><strong>Computer Science Engineering & Artificial Intelligence (CSE-AI)</strong></li>
                            <li><strong>Computer & Communication Engineering (CCE)</strong></li>
                            <li><strong>Artificial Intelligence & Data Science (AI&DS)</strong></li>
                        </ul>
                    </div>
                </div>

                {/* Card 2: Right */}
                <div className="branch-row branch-row--right">
                    <div className="branch-line-container">
                        <svg className="branch-line-svg" preserveAspectRatio="none"><line x1="0" y1="2" x2="100%" y2="2" className="branch-line-path" /></svg>
                    </div>
                    <div className="branch-card branch-card--structure">
                        <h3>Class & Lab Structure</h3>
                        <p>The 8-semester curriculum follows a robust credit system designed to balance theoretical knowledge with practical implementation. A typical B.Tech degree requires around 165 total credits to graduate.</p>
                        <ul>
                            <li><strong>Theory Classes:</strong> 1 credit = 1 hour/week of classroom instruction.</li>
                            <li><strong>Lab Sessions:</strong> 1 credit = 2.5 to 3 hours/week of hands-on practicals.</li>
                            <li><strong>Curriculum Breakdown:</strong> Your coursework is divided into Basic Sciences, Engineering Core, Humanities, and Projects.</li>
                        </ul>
                        <a href="https://amrita.edu/program/btech-computer-science-and-engineering/" target="_blank" rel="noopener noreferrer">Explore Curriculum →</a>
                    </div>
                </div>

                {/* Card 3: Left */}
                <div className="branch-row branch-row--left">
                    <div className="branch-line-container">
                        <svg className="branch-line-svg" preserveAspectRatio="none"><line x1="100%" y1="2" x2="0" y2="2" className="branch-line-path" /></svg>
                    </div>
                    <div className="branch-card branch-card--attendance">
                        <h3>Attendance Rules</h3>
                        <p>Amrita maintains strict academic discipline to ensure student success. A minimum of <strong>75% attendance</strong> in every individual course is mandatory to appear for the end-semester exams. Waitages are calculated meticulously by the AUMS portal.</p>
                        <p style={{ marginTop: '10px' }}>Falling below 75% results in a dreaded <strong>'FA' (Failed due to Attendance) grade</strong>. If this happens, you are not allowed to write the final exam and must re-register for the course entirely when offered next.</p>
                        <a href="https://www.amrita.edu/academics/" target="_blank" rel="noopener noreferrer">Read Official Rules →</a>
                    </div>
                </div>

                {/* Card 4: Right */}
                <div className="branch-row branch-row--right">
                    <div className="branch-line-container">
                        <svg className="branch-line-svg" preserveAspectRatio="none"><line x1="0" y1="2" x2="100%" y2="2" className="branch-line-path" /></svg>
                    </div>
                    <div className="branch-card branch-card--exams">
                        <h3>Exam Pattern</h3>
                        <p>Amrita follows a rigorous Continuous Evaluation system, meaning your performance is tracked throughout the semester, not just at the end.</p>
                        <ul>
                            <li><strong>Internal Assessments (50%):</strong> Periodical tests, weekly quizzes, and continuous lab assessments.</li>
                            <li><strong>End-Semester Exams (50%):</strong> Mandatory final exams covering the entire syllabus. Missing the end-sem results in an automatic 'F' or 'FA' grade regardless of internal marks.</li>
                        </ul>
                        <a href="https://amrita.edu/academics/academic-regulations/" target="_blank" rel="noopener noreferrer">View Exam Guidelines →</a>
                    </div>
                </div>

                {/* Card 5: Left */}
                <div className="branch-row branch-row--left">
                    <div className="branch-line-container">
                        <svg className="branch-line-svg" preserveAspectRatio="none"><line x1="100%" y1="2" x2="0" y2="2" className="branch-line-path" /></svg>
                    </div>
                    <div className="branch-card branch-card--cgpa">
                        <h3>CGPA Tips</h3>
                        <p>Score high by focusing on continuous assessments and lab exams. Active participation in class and consistent project work are your best tools for maintaining a stellar CGPA.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

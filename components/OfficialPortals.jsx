'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OfficialPortals() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            gsap.fromTo('.portal-card', 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.2, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="portals-section" ref={sectionRef}>
            <div className="portals-container">
                <div className="portals-heading">
                    <h2 className="portals-title">official portals.</h2>
                    <p className="portals-subtitle">the two sites you'll visit every single day.</p>
                </div>
                
                <div className="portals-grid">
                    {/* AUMS Card */}
                    <div 
                        className="portal-card portal-card--aums"
                        onClick={() => window.open('https://www.amrita.edu/aums/', '_blank')}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="portal-card__icon">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" alt="AUMS" />
                        </div>
                        <div className="portal-card__content">
                            <h3>AUMS Portal</h3>
                            <p>Used for fee payments, course registration, checking out the official academic curriculum, and downloading your official transcripts.</p>
                            <a href="https://www.amrita.edu/aums/" target="_blank" rel="noopener noreferrer" className="portal-card__link-text" onClick={(e) => e.stopPropagation()}>Go to AUMS →</a>
                        </div>
                    </div>

                    {/* MyAmrita Card */}
                    <div 
                        className="portal-card portal-card--myamrita"
                        onClick={() => window.open('https://my.amrita.edu/index/login', '_blank')}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="portal-card__icon">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-star.svg" alt="MyAmrita" />
                        </div>
                        <div className="portal-card__content">
                            <h3>MyAmrita</h3>
                            <p>Your daily dashboard for checking attendance percentages in real-time, viewing internal marks, and keeping track of your timetable.</p>
                            <a href="https://my.amrita.edu/index/login" target="_blank" rel="noopener noreferrer" className="portal-card__link-text" onClick={(e) => e.stopPropagation()}>Go to MyAmrita →</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

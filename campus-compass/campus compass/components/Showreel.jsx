'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAMPUS_DATA } from '@/lib/data';

export default function Showreel() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to('.campus-title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.campus-cards-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        initCampusCardAnimations();
    }, []);

    return (
        <section className="showreel-section" id="campus-life" style={{ padding: '8rem 0 12rem 0' }}>
            <div className="title-container" style={{ marginBottom: '5rem' }}>
                <h2 className="main-title">life on <span className="italic-text">campus:</span></h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none" className="campus-title-underline-svg title-underline-svg">
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            <div className="cards-wrapper campus-cards-wrapper" id="campus-cards-wrapper" style={{ marginTop: '2rem' }}>
                {CAMPUS_DATA.map((card) => (
                    <div key={card.title} className={`card campus-card card-${card.color}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '50%', width: '100%', position: 'relative' }}>
                            <img src={card.image} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <h3 className="card-title" style={{ marginBottom: '10px' }}>{card.title}</h3>
                            <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true" style={{ marginBottom: '15px' }}>
                                <use href="#card-divider" />
                            </svg>
                            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function initCampusCardAnimations() {
    const cards = gsap.utils.toArray('.campus-card');
    if (!cards.length) return;

    // Tamer rotations for a neat arrangement
    const originalData = [
        { rotation: -4 },
        { rotation: 2 },
        { rotation: -2 },
        { rotation: 4 }
    ];

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let leaveTimeout = null;

    if (!isMobile) {
        cards.forEach((card, index) => {
            gsap.set(card, { rotation: originalData[index].rotation });

            card.addEventListener('mouseenter', () => {
                if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                
                // Reduced gaps so they don't fly off-screen
                const hoverGap = 60;
                const clusterGap = 90;
                const cardWidth = 320;
                const hoveredLeft = cards[index].offsetLeft;
                const leftCards = [];
                const rightCards = [];

                cards.forEach((otherCard, otherIndex) => {
                    if (otherIndex < index) leftCards.push({ card: otherCard, index: otherIndex });
                    else if (otherIndex > index) rightCards.push({ card: otherCard, index: otherIndex });
                });

                const currentTop = cards[index].offsetTop;
                const targetCommonTop = 50;
                const moveY = targetCommonTop - currentTop;

                // Center hovered card (smooth lift, no bouncy elastic)
                gsap.to(cards[index], { x: 0, y: moveY, rotation: 0, scale: 1.05, duration: 0.8, ease: 'power3.out', overwrite: true, zIndex: 100 });

                if (rightCards.length) {
                    const clusterStart = hoveredLeft + cardWidth + hoverGap;
                    rightCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart + (i * clusterGap);
                        const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 0.8, ease: 'power3.out', overwrite: true, zIndex: item.index + 1 });
                    });
                }

                if (leftCards.length) {
                    leftCards.reverse();
                    const clusterStart = hoveredLeft - hoverGap - cardWidth;
                    leftCards.forEach((item, i) => {
                        const targetAbsLeft = clusterStart - (i * clusterGap);
                        const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
                        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
                        const targetY = targetX * Math.tan(angleRad);
                        gsap.to(item.card, { x: targetX, y: targetY, rotation: originalData[item.index].rotation, scale: 1, duration: 0.8, ease: 'power3.out', overwrite: true, zIndex: item.index + 1 });
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                leaveTimeout = setTimeout(() => {
                    cards.forEach((c, i) => {
                        gsap.to(c, { x: 0, y: 0, scale: 1, rotation: originalData[i].rotation, duration: 0.8, ease: 'power3.out', overwrite: true, zIndex: i + 1 });
                    });
                }, 80);
            });
        });
    } else {
        const cardsWrapper = document.querySelector('.campus-cards-wrapper');
        const scrollPerCard = window.innerHeight * 0.8;
        const navH = 60;
        const mobileRotations = [-6, 4, -8, 5];

        cards.forEach((card, i) => {
            gsap.set(card, {
                position: 'absolute', left: '50%', top: '0', xPercent: -50,
                y: i === 0 ? 0 : window.innerHeight * 1.1,
                rotation: mobileRotations[i % mobileRotations.length],
                zIndex: i + 1,
                transformOrigin: 'center center'
            });
        });

        const wrapperH = window.innerHeight * 0.7 + scrollPerCard * (cards.length - 1);
        gsap.set(cardsWrapper, { height: wrapperH });

        ScrollTrigger.create({
            trigger: cardsWrapper,
            start: `top ${navH}px`,
            end: `+=${scrollPerCard * (cards.length - 1)}`,
            pin: true,
            pinSpacing: true,
            id: 'mobile-campus-cards-pin'
        });

        cards.forEach((card, i) => {
            if (i === 0) return;
            gsap.fromTo(card,
                { y: window.innerHeight * 1.1 },
                {
                    y: 0,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardsWrapper,
                        start: `top+=${(i - 1) * scrollPerCard} ${navH}px`,
                        end: `top+=${i * scrollPerCard} ${navH}px`,
                        scrub: 0.4
                    }
                }
            );
        });
    }
}

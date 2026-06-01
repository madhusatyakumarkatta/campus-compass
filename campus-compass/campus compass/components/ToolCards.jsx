'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TOOLS_DATA } from '@/lib/data';

export default function ToolCards() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline SVG paths on scroll
        gsap.to('.tool-title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.tool-cards-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        initToolCardAnimations();
    }, []);

    return (
        <div className="tool-cards-wrapper" style={{ position: 'relative', width: '100%', marginTop: '20px' }}>
            <div className="title-container" id="tools" style={{ textAlign: 'left', marginBottom: '60px' }}>
                <h2 className="main-title" style={{ fontSize: '2.5rem', marginBottom: 0 }}>essential <span className="italic-text">tools:</span></h2>
            </div>

            <div className="cards-wrapper" id="tool-cards-wrapper" style={{ height: '350px' }}>
                {TOOLS_DATA.map((card) => (
                    <a href={card.link} target="_blank" rel="noreferrer" key={card.title} className={`card card-${card.color} tool-card`} style={{textDecoration: 'none', color: 'inherit', display: 'block', position: 'absolute', top: 0, left: 0}}>
                        <div className={`card-sticker sticker-${card.sticker}`}>
                            <img
                                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                                alt=""
                                width="100%"
                                loading="lazy"
                                aria-hidden="true"
                            />
                        </div>
                        <h3 className="card-title" style={{ marginBottom: '10px' }}>{card.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 15px 0' }}>
                            {card.description}
                        </p>
                        <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
                            <use href="#card-divider" />
                        </svg>
                        <ul className="card-list">
                            {card.services.map((service) => (
                                <li key={service}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" className="services-card__bullet-svg" aria-hidden="true">
                                        <use href="#bullet-icon" />
                                    </svg>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </a>
                ))}
            </div>
        </div>
    );
}

function initToolCardAnimations() {
    const cards = gsap.utils.toArray('#tool-cards-wrapper .tool-card');
    if (!cards.length) return;

    // Much smaller, tighter rotations for a more organized look
    const originalData = [
        { rotation: -3 },
        { rotation: 1.5 },
        { rotation: 0 },
        { rotation: -1.5 },
        { rotation: 3 }
    ];

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let leaveTimeout = null;

    if (!isMobile) {
        cards.forEach((card, index) => {
            gsap.set(card, { rotation: originalData[index].rotation });

            card.addEventListener('mouseenter', () => {
                if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                
                // Dramatically reduced gaps so they stay close and organized
                const hoverGap = 50; 
                const clusterGap = 80; 
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

                // Center hovered card (less scale so it doesn't pop aggressively)
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
        // ─── Mobile: Stacked card scroll reveal ───
        const cardsWrapper = document.querySelector('#tool-cards-wrapper');
        const scrollPerCard = window.innerHeight * 0.8;
        const navH = 60;
        const mobileRotations = [-6, 4, -8, 5, -3];

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
            id: 'mobile-tools-pin'
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

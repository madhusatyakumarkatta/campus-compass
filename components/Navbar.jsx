'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        const cleanups = [];
        const logoText = document.querySelector('.logo-main');
        if (logoText) cleanups.push(initWiggle(logoText, WIGGLE_CONFIG.logoMain));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Menu) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <img src="/assets/Navbar SVG/nav-work-blob.svg" width="60" height="55" className="nav-bar__work-blob-svg" alt="" aria-hidden="true" />
                            <span className="logo-work-text">menu</span>
                        </div>

                        {/* Pop-out Box for Menu */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <a href="#academics" className="nav-work-item">
                                    <div className="nav-work-item__text">
                                        <h4 className="nav-work-title" style={{ marginTop: '10px' }}>Academics</h4>
                                    </div>
                                </a>
                                <a href="#clubs" className="nav-work-item">
                                    <div className="nav-work-item__text">
                                        <h4 className="nav-work-title" style={{ marginTop: '10px' }}>Clubs & Extras</h4>
                                    </div>
                                </a>
                                <a href="#campus-life" className="nav-work-item">
                                    <div className="nav-work-item__text">
                                        <h4 className="nav-work-title" style={{ marginTop: '10px' }}>Campus Life</h4>
                                    </div>
                                </a>
                                <a href="#survival" className="nav-work-item">
                                    <div className="nav-work-item__text">
                                        <h4 className="nav-work-title" style={{ marginTop: '10px' }}>Survival Kit</h4>
                                    </div>
                                </a>
                                <a href="#tools" className="nav-work-item">
                                    <div className="nav-work-item__text">
                                        <h4 className="nav-work-title" style={{ marginTop: '10px' }}>Tools & Resources</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    {/* Website Logo */}
                    <div className="logo-main" style={{ fontFamily: 'Epilogue', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                        campus compass.
                    </div>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer", visibility: 'hidden' }}>
                    {/* Hide Right Nav for now */}
                </div>
            </nav>
        </>
    );
}

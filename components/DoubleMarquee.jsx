'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { colors } from '@/lib/data';

const survivalTips = [
    { text: "DO: Sleep well", type: "do" },
    { text: "DON'T: Cram before exams", type: "dont" },
    { text: "DO: Talk to seniors", type: "do" },
    { text: "DON'T: Miss deadlines", type: "dont" },
    { text: "DO: Join a club", type: "do" },
    { text: "DON'T: Survive on Maggie", type: "dont" },
    { text: "DO: Attendance > 75%", type: "do" },
    { text: "DON'T: Skip labs", type: "dont" }
];

function assignColorsNoAdjacent(count, colorPool) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const prev = i > 0 ? result[i - 1] : null;
        const seamColor = i === count - 1 ? result[0] : null;
        const available = colorPool.filter(c => c !== prev && c !== seamColor);
        const pool = available.length > 0 ? available : colorPool.filter(c => c !== prev);
        result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return result;
}

function buildMarqueeItems(isMobile) {
    const tracks = [[], []];
    for (let t = 0; t < 2; t++) {
        // Shuffle tips for variety
        const shuffled = [...survivalTips].sort(() => Math.random() - 0.5);
        const assignedColors = assignColorsNoAdjacent(shuffled.length, colors);
        const items = shuffled.map((tip, i) => ({ tip, color: assignedColors[i] }));
        tracks[t] = isMobile ? items : [...items, ...items]; // duplicate for seamless loop
    }
    return tracks;
}

import ToolCards from './ToolCards';

export default function DoubleMarquee() {
    const [tracks, setTracks] = useState([[], []]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mobile = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile(mobile);
        setTracks(buildMarqueeItems(mobile));

        gsap.set('.marquee-left .marquee-svg-item:nth-child(2) path', { strokeDashoffset: 1000 });

        const marqueeTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.Double-marquee',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        marqueeTl
            .to('.marquee-underline', { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' })

        return () => {
            ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === '.Double-marquee') t.kill(); });
        };
    }, []);

    return (
        <section id="survival" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', padding: '0 40px' }}>
            {/* Left: Text + ToolCards */}
            <div className="marquee-left" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: '40px' }}>
                <div className="marquee-text-container" style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>survival kit:<br /><span className="text-with" style={{ fontSize: '3rem' }}>do's & don'ts</span></h2>
                </div>
                
                {/* Embed Essential Tools here directly under the title */}
                <div style={{ width: '100%', maxWidth: '600px', zIndex: 10 }}>
                    <ToolCards />
                </div>
            </div>

            <div className="marquee-right">
                {tracks.map((trackItems, colIndex) => (
                    <div key={colIndex} className="marquee-column">
                        <div className="marquee-track">
                            {trackItems.map((item, i) => {
                                const isDo = item.tip.type === 'do';
                                const text = item.tip.text.replace(/^(DO: |DON'T: )/, '');
                                return (
                                    <div key={i} className="marquee-item" style={{ backgroundColor: item.color, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', color: '#fff', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)' }}>
                                        <div style={{
                                            background: isDo ? '#fff' : '#111',
                                            color: isDo ? '#000' : '#fff',
                                            padding: '8px 20px',
                                            borderRadius: '30px',
                                            fontWeight: 900,
                                            fontSize: '0.9rem',
                                            marginBottom: '20px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                                        }}>
                                            {isDo ? '👍 DO' : '🛑 DON\'T'}
                                        </div>
                                        <h3 style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: '1.3', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                            {text}
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

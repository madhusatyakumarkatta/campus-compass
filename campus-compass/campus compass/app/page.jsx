'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import ServiceCards from '@/components/ServiceCards';
import MotionCards from '@/components/MotionCards';
import DailyTimeline from '@/components/DailyTimeline';
import OfficialPortals from '@/components/OfficialPortals';
import DoubleMarquee from '@/components/DoubleMarquee';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';

import HorizontalWords from '@/components/HorizontalWords';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
                <VimeoHero />
            </header>
            <main>
                <div className="content-section motion-cards-wrapper" id="academics">
                    <MotionCards />
                    <OfficialPortals />
                    <div id="campus-life">
                        <DailyTimeline />
                    </div>
                </div>
                <HorizontalWords />
                <div className="content-section service-cards-wrapper" id="survival" style={{ paddingTop: '50px' }}>
                    <div id="tools"></div>
                    <ServiceCards />
                </div>
                <section className="Double-marquee">
                    <DoubleMarquee />
                </section>
                <Gallery />
            </main>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}

import './globals.css';

export const metadata = {
    title: 'Campus Compass | Amrita Vishwa Vidyapeetham',
    description: 'A beautiful awwwards winning interactive student survival kit and campus guide for Amrita Vishwa Vidyapeetham',
    icons: {
        icon: 'https://tse3.mm.bing.net/th/id/OIP.Cwsg0g-FTRdXBv2AQ_VCogHaI4?cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

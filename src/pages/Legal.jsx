import React from 'react';
import { useLocation } from 'react-router-dom';
import './Legal.css';

const Legal = () => {
    const location = useLocation();
    const path = location.pathname;

    React.useEffect(() => {
        if (path === '/privacy') document.title = 'Privacy Policy - MTEL';
        else if (path === '/terms') document.title = 'Terms of Use - MTEL';
        else document.title = 'Legal - MTEL';
    }, [path]);

    let content;

    if (path === '/privacy') {
        content = (
            <>
                <h1 className="section-title">Privacy Policy</h1>
                <p className="legal-date">Last updated: November 23, 2025</p>
                <div className="legal-content">
                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                    </section>
                    <section>
                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send you related information.</p>
                    </section>
                    <section>
                        <h2>3. Information Sharing</h2>
                        <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
                    </section>
                </div>
            </>
        );
    } else if (path === '/terms') {
        content = (
            <>
                <h1 className="section-title">Terms of Use</h1>
                <p className="legal-date">Last updated: November 23, 2025</p>
                <div className="legal-content">
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing or using our website, you agree to be bound by these Terms of Use and all applicable laws and regulations.</p>
                    </section>
                    <section>
                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on MTEL's website for personal, non-commercial transitory viewing only.</p>
                    </section>
                    <section>
                        <h2>3. Disclaimer</h2>
                        <p>The materials on MTEL's website are provided on an 'as is' basis. MTEL makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
                    </section>
                </div>
            </>
        );
    } else {
        content = (
            <>
                <h1 className="section-title">Legal</h1>
                <div className="legal-content">
                    <section>
                        <h2>Corporate Information</h2>
                        <p>MTEL Inc. is a registered corporation in Sri Lanka.</p>
                        <p>Registration Number: PV 123456</p>
                    </section>
                    <section>
                        <h2>Trademarks</h2>
                        <p>MTEL, the MTEL logo, and other MTEL marks are trademarks of MTEL Inc.</p>
                    </section>
                    <section>
                        <h2>Compliance</h2>
                        <p>We are committed to complying with all applicable laws and regulations regarding the sale and distribution of mobile communication devices.</p>
                    </section>
                </div>
            </>
        );
    }

    return (
        <div className="legal-page section-padding">
            <div className="container">
                {content}
            </div>
        </div>
    );
};

export default Legal;

import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PromoSection from '../components/PromoSection';
import ProductGrid from '../components/ProductGrid';
import m10Image from '../assets/m10-render.png';
import m1TypeCImage from '../assets/m1-typec.png';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <PromoSection
                image={m10Image}
                title="MTEL M10"
                subtitle="Advanced smartphone with larger display extended battery life."
                linkTo="/phones/m10"
            />
            <PromoSection
                image={m1TypeCImage}
                title="MTEL M1 Type-C"
                subtitle="1020mAh | 1.77 Display | Type C | Call Recording"
                badge="New Edition"
                reverse={true}
                bgColor="#1d1d1f"
                textColor="#f5f5f7"
                linkTo="/phones/m1-type-c"
            />
            <ProductGrid />
            <Features />
        </div>
    );
};

export default Home;

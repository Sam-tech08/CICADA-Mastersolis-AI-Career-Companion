import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/common/Hero';
import Testimonials from '../components/common/Testimonials';
import Footer from '../components/common/Footer';

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Hero />

            <section id="about" style={{ padding: '40px 24px' }}>
                <h2>About</h2>
                <p>We build AI-powered tools that help candidates present their best selves.</p>
            </section>

            <section id="services" style={{ padding: '40px 24px', background: '#fafafa' }}>
                <h2>Services</h2>
                <ul>
                    <li>AI Resume Builder</li>
                    <li>Job Description Tailoring</li>
                    <li>Interview Prep Insights</li>
                </ul>
            </section>

            <section id="projects" style={{ padding: '40px 24px' }}>
                <h2>Projects</h2>
                <p>Explore our latest AI experiments and product updates.</p>
            </section>

            <section id="blog" style={{ padding: '40px 24px', background: '#fafafa' }}>
                <h2>Blog</h2>
                <p>Insights on hiring, AI trends, and career growth.</p>
            </section>

            <section id="careers" style={{ padding: '40px 24px' }}>
                <h2>Careers</h2>
                <p>Join us in building the future of career acceleration.</p>
            </section>

            <Testimonials />

            <Footer />
        </div>
    );
};

export default Home;

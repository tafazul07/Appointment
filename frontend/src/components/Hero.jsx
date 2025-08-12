import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef for animations
import { gsap } from 'gsap'; // Import GSAP
import './cssforall.css';

const Hero = () => {
    // Refs for animating individual elements
    const heroContentRef = useRef(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        // Use gsap.context for proper cleanup in React
        let ctx = gsap.context(() => {
            // Animate hero content on load
            gsap.from(heroContentRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                delay: 0.3 // Slight delay after component mounts
            });

            // Staggered animation for heading, paragraph, and button
            gsap.from([headingRef.current, paragraphRef.current, buttonRef.current], {
                opacity: 0,
                y: 30,
                stagger: 0.2, // Each element animates in sequence
                duration: 0.8,
                ease: "power2.out",
                delay: 0.6 // Start after the main content container appears
            });

            // Optional: Subtle parallax or scale on the background hero when scrolled
            gsap.to(".hero", {
                backgroundPositionY: "20%", // Adjust this value to control parallax
                scale: 1.02, // Subtle zoom
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top", // Ends when bottom of hero passes top of viewport
                    scrub: true, // Smoothly link animation to scroll position
                }
            });

        }, heroContentRef); // Scope GSAP animations to the heroContentRef

        return () => {
            ctx.revert(); // Clean up animations on component unmount
        };
    }, []);

    return (
        <section id="home" className="hero" role="region" aria-label="Welcome to Glamour Studio - Your Destination for Premium Beauty Treatments">
            <div className="hero-overlay" aria-hidden="true"></div>
            <div ref={heroContentRef} className="hero-content">

                <h2 ref={headingRef}>
                    Unleash Your Radiance. <br/>
                    Experience Glamour Studio.
                </h2>
                <p ref={paragraphRef}>
                    Discover bespoke beauty services designed to rejuvenate your spirit and
                    enhance your natural elegance. From luxurious facials to expert styling,
                    your transformation begins here.
                </p>
                <a href="#booking" ref={buttonRef} className="btn hero-cta" aria-label="Book your personalized beauty transformation now">
                    Book Your Transformation
                </a>
            </div>
        </section>
    );
};

export default Hero;
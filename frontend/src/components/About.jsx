import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3, Back } from "gsap/all"; // Ensure these are correctly imported

// Register GSAP plugins ONCE (e.g., in App.js or index.js, but here for self-containment)
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leadTextRef = useRef(null);
  const highlightsRef = useRef(null);
  const statsRef = useRef(null);
  const teamSectionRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Create a GSAP context for this component
    // This allows for automatic cleanup of animations when the component unmounts
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const leadText = leadTextRef.current;
      const highlights = highlightsRef.current;
      const stats = statsRef.current;
      const teamSection = teamSectionRef.current;
      const testimonials = testimonialsRef.current;

      // Ensure all refs exist before attempting animations
      if (
        !section ||
        !heading ||
        !leadText ||
        !highlights ||
        !stats ||
        !teamSection ||
        !testimonials
      ) {
        console.warn(
          "About component: One or more refs are null. Animations may not play."
        );
        return; // Exit if elements aren't ready
      }

      // --- Section: Headline & Lead Text animation ---
      // Use a timeline for sequential animations
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%", // When top of section hits 75% down from viewport top
          // end: "bottom top", // You might not need an end for 'from' animations
          // toggleActions: "play none none none", // Play once on enter
          // markers: true, // For debugging: shows start/end lines
        },
      });

      heroTimeline.from(
        heading,
        {
          y: -50,
          opacity: 0,
          duration: 1.2,
          ease: Power3.easeOut,
        },
        0
      ); // Start at the beginning of the timeline

      heroTimeline.from(
        leadText,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: Power3.easeOut,
        },
        0.4
      ); // Start 0.4 seconds after the timeline begins

      // --- Section: Highlights reveal with stagger ---
      gsap.from(highlights.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15, // Stagger them slightly
        ease: Power3.easeOut,
        scrollTrigger: {
          trigger: highlights,
          start: "top 85%", // When top of highlights section hits 85% down from viewport top
          // markers: true,
        },
      });

      // --- Section: Stats counter and reveal ---
      gsap.from(stats.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: Back.easeOut.config(1.7), // More bouncy ease
        scrollTrigger: {
          trigger: stats,
          start: "top 90%", // When top of stats hits 90% down from viewport top
          // markers: true,
        },
        onComplete: () => {
          // You'd integrate a JS counter here for numbers to animate up
          // Example:
          // document.querySelectorAll('.stat-number .count-up').forEach(el => {
          //   const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
          //   gsap.fromTo(el,
          //     { innerText: 0 },
          //     {
          //       innerText: target,
          //       duration: 1.5,
          //       snap: "innerText", // snaps to integer values
          //       ease: "power1.out",
          //       onUpdate: () => {
          //         // Keep original suffix like "+" or "%"
          //         if (el.classList.contains('has-plus')) el.innerText = Math.round(el.innerText) + '+';
          //         else if (el.classList.contains('has-percent')) el.innerText = Math.round(el.innerText) + '%';
          //         else el.innerText = Math.round(el.innerText);
          //       }
          //     }
          //   );
          // });
        },
      });

      // --- Section: Team member reveal ---
      gsap.from(teamSection.querySelectorAll(".team-member"), {
        y: 80,
        rotationX: -90, // Rotate from the top
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: Power3.easeOut,
        scrollTrigger: {
          trigger: teamSection,
          start: "top 75%", // When top of team section hits 75% down from viewport top
          // markers: true,
        },
      });

      // --- Section: Testimonials reveal ---
      gsap.from(testimonials.querySelectorAll("blockquote"), {
        x: -100, // Slide from left
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: Power3.easeOut,
        scrollTrigger: {
          trigger: testimonials,
          start: "top 80%", // When top of testimonials section hits 80% down from viewport top
          // markers: true,
        },
      });
    }, sectionRef); // Pass sectionRef to context for automatic cleanup

    // Cleanup function for GSAP context
    return () => ctx.revert();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <section
      id="about"
      className="about-section"
      ref={sectionRef}
      role="region"
      aria-label="About our salon, Glamour Studio"
    >
      {/* ... (rest of your JSX content) ... */}
      <div className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 ref={headingRef} className="hero-heading">
            More Than Just Beauty. <br /> It's a Transformation.
          </h2>
          <p ref={leadTextRef} className="hero-lead">
            Step into the future of self-care. At **Glamour Studio**, we don't
            just apply treatments; we craft experiences that redefine
            confidence.
          </p>
        </div>
      </div>

      <div className="container main-about-content">
        {/* Core Philosophy Section */}
        <div className="about-philosophy">
          <h3 className="section-subtitle">Our Unwavering Commitment</h3>
          <p className="philosophy-text">
            For over a decade, Glamour Studio has been at the forefront of
            innovative beauty. We meticulously blend cutting-edge techniques
            with timeless artistry, ensuring every visit leaves you not just
            looking, but feeling extraordinary. We are obsessed with details,
            dedicated to your well-being, and committed to setting new industry
            benchmarks.
          </p>

          <div ref={highlightsRef} className="about-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                {/* SVG for Quality */}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.485 7.515C17.878 7.908 17.878 8.541 17.485 8.934L11.485 14.934C11.092 15.327 10.459 15.327 10.066 14.934L7.066 11.934C6.673 11.541 6.673 10.908 7.066 10.515C7.459 10.122 8.092 10.122 8.485 10.515L11.485 13.515L16.066 8.934C16.459 8.541 17.092 8.541 17.485 8.934V7.515Z"
                    fill="#ff6f61"
                  />
                </svg>
              </div>
              <h3>Unrivaled Quality</h3>
              <p>
                Only the world's most luxurious and sustainably sourced products
                grace our salon.
              </p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                {/* SVG for Expertise */}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM15.5 12C15.5 13.93 13.93 15.5 12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12Z"
                    fill="#ff6f61"
                  />
                </svg>
              </div>
              <h3>Visionary Expertise</h3>
              <p>
                Our award-winning master stylists are trendsetters, not just
                followers.
              </p>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                {/* SVG for Sustainability */}
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 7C9.239 7 7 9.239 7 12C7 14.761 9.239 17 12 17C14.761 17 17 14.761 17 12C17 9.239 14.761 7 12 7Z"
                    fill="#ff6f61"
                  />
                </svg>
              </div>
              <h3>Sustainable Luxury</h3>
              <p>
                Indulge guilt-free. We champion eco-conscious practices and
                ethical sourcing.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section (The "shocking" numbers) */}
        <div className="stats-section">
          <h3 className="section-subtitle">Impact by the Numbers</h3>
          <div ref={statsRef} className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                <span className="count-up has-plus">15,000+</span>{" "}
                {/* Added class for JS counter */}
              </div>
              <p className="stat-description">
                Happy Transformations Since 2010
              </p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="count-up has-percent">98%</span>{" "}
                {/* Added class for JS counter */}
              </div>
              <p className="stat-description">
                Client Satisfaction Rate (Yearly Average)
              </p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="count-up">25+</span>{" "}
                {/* Added class for JS counter */}
              </div>
              <p className="stat-description">Industry Awards & Recognitions</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <span className="count-up has-percent">100%</span>{" "}
                {/* Added class for JS counter */}
              </div>
              <p className="stat-description">
                Cruelty-Free & Vegan Product Commitment
              </p>
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div ref={teamSectionRef} className="team-section">
          <h3 className="section-subtitle">
            Meet the Maestros Behind the Magic
          </h3>
          <p className="team-intro">
            Our stylists aren't just experts; they're artists. Each member of
            the Glamour Studio team brings unparalleled skill, passion, and a
            commitment to making your vision a reality.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div
                className="member-photo"
                style={{ backgroundImage: "url('./portrait-female.webp')" }}
              ></div>
              <h4>Sarah Johnson</h4>
              <p className="specialty">Master Colorist & Educator</p>
              <p className="bio">
                Known for breathtaking balayage and vibrant transformations.
                Sarah regularly teaches advanced coloring techniques globally.
              </p>
            </div>

            <div className="team-member">
              <div
                className="member-photo"
                style={{ backgroundImage: "url('./portrait-female.webp)" }}
              ></div>
              <h4>Michael Chen</h4>
              <p className="specialty">Precision Cutting Director</p>
              <p className="bio">
                A true artisan of shape and texture, Michael's cuts are
                architectural masterpieces. He has styled for fashion weeks and
                editorial shoots.
              </p>
            </div>

            <div className="team-member">
              <div
                className="member-photo"
                style={{ backgroundImage: "url('./portrait-female.webp')" }}
              ></div>
              <h4>Elena Rodriguez</h4>
              <p className="specialty">Extension & Bridal Specialist</p>
              <p className="bio">
                From seamless extensions to dream bridal looks, Elena crafts
                bespoke styles that embody elegance and natural beauty.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="testimonials-section">
          <h3 className="section-subtitle">
            Hear What Our Clients Are Raving About
          </h3>
          <div className="testimonial-carousel">
            <blockquote>
              "I didn't just get a haircut; I got a confidence boost! Glamour
              Studio truly changed my look and how I feel about myself.
              Unbelievable results!"
              <cite>
                - Jessica M. <span className="city"> (Los Angeles, CA)</span>
              </cite>
            </blockquote>
            <blockquote>
              "Every visit is an escape. The atmosphere, the professionalism,
              and the sheer talent of the team are unmatched. It's an investment
              in yourself."
              <cite>
                - David T. <span className="city"> (New York, NY)</span>
              </cite>
            </blockquote>
            <blockquote>
              "My skin has never looked this radiant. The facial was a pure
              dream, and I left feeling utterly rejuvenated. Highly, highly
              recommend!"
              <cite>
                - Emily R. <span className="city"> (Miami, FL)</span>
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

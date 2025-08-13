import { useState, useEffect, useRef } from 'react'; // Import useRef
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
// Import social media icons
import { faFacebook, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import imagePic from './IMG_0770.JPEG'; // Import your image

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'React', 'JavaScript', 'PHP', 
    'HTML', 'CSS',  'MySQL', 
    'PostgreSQL', 'Python', 'Java', 
    'Bootstrap', 'Laravel', 'Django'
  ];

  // Refs for each section to observe
  const skillsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  // State to control visibility of each section
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    // Slideshow interval
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 3000);

    // Intersection Observer for sections
    const observerOptions = {
      root: null, // relative to the viewport
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'is-visible' class when section enters viewport
          if (entry.target.classList.contains('skillsSection')) {
            setSkillsVisible(true);
          } else if (entry.target.classList.contains('projectsSection')) {
            setProjectsVisible(true);
          } else if (entry.target.classList.contains('contactSection')) {
            setContactVisible(true);
          }
          // Optionally, unobserve after animation if it only needs to play once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each section
    if (skillsSectionRef.current) observer.observe(skillsSectionRef.current);
    if (projectsSectionRef.current) observer.observe(projectsSectionRef.current);
    if (contactSectionRef.current) observer.observe(contactSectionRef.current);

    // Cleanup function for both interval and observer
    return () => {
      clearInterval(slideInterval);
      if (skillsSectionRef.current) observer.unobserve(skillsSectionRef.current);
      if (projectsSectionRef.current) observer.unobserve(projectsSectionRef.current);
      if (contactSectionRef.current) observer.unobserve(contactSectionRef.current);
    };
  }, [slides.length]); // Dependency array for useEffect

  return (
    <div className="Container">
      <header className='header'>
        <h2 className='myName'><FontAwesomeIcon icon={faCode} /> Elijah Kalosa <FontAwesomeIcon icon={faCode} /></h2>
        <div className='menuBar'>
          <ul className='menuList'>
            <li className='menuItem'>Home</li>
            <li className='menuItem'>About</li>
            <li className='menuItem'>Projects</li>
            <li className='menuItem'>Contact</li>
          </ul>
        </div>
      </header>
      <main className='mainContent'>
        <section className='introduction'>
          <h3 className='cTA'>
            Meet Elijah Kalosa, a developer proficient in <div className='slideShow'>
              {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                  {slide}
                </div>
              ))}
            </div>
          </h3>
        </section>

        {/* The aboutMe section is now static (not animated on scroll) */}
        <section className='aboutMe'>
          <h3 className='aboutHeading'>About Me</h3> {/* New heading */}
          <p className='aboutText'>
            I am a fullstack developer that builds web applications, 
            I am passionate about creating clean and effective code.
          </p>
          <div className='contactDetails'>
            <p><FontAwesomeIcon icon={faEnvelope} /> kalosaelijah3@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +260770940809</p>
          </div>
          <div className='buttons'>
            <button className='btn'>View Projects</button>
            <button className='btn'>View CV</button>
          </div>
          <div className='socialLinks'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faFacebook} /></a>
            <a href='https://wa.me/260770940809' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href='https://www.linkedin.com/in/elijah-kalosa' target='_blank' rel='noopener noreferrer' className='socialLink'><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </section>

        {/* Image section is now after aboutMe, and also static */}
        <section className='imageSection'>
          <img src={imagePic} alt='Elijah Kalosa' className='profileImage' />
        </section>
        
        {/* These sections will slide in on scroll */}
        <section 
          className={`skillsSection ${skillsVisible ? 'is-visible' : ''}`} 
          ref={skillsSectionRef}
        >
          <h3 className='skillsHeading'>Skills</h3>
          <ul className='skillsList'>
            <li className='skillItem'>React</li>
            <li className='skillItem'>JavaScript</li>
            <li className='skillItem'>PHP</li>
            <li className='skillItem'>HTML</li>
            <li className='skillItem'>CSS</li>
            <li className='skillItem'>MySQL</li>
            <li className='skillItem'>PostgreSQL</li>
            <li className='skillItem'>Python</li>
            <li className='skillItem'>Java</li>
            <li className='skillItem'>Bootstrap</li>
            <li className='skillItem'>Laravel</li>
            <li className='skillItem'>Django</li>
          </ul>
        </section>

        <section 
          className={`projectsSection ${projectsVisible ? 'is-visible' : ''}`} 
          ref={projectsSectionRef}
        >
          <h3 className='projectsHeading'>Projects</h3>
          <p className='projectsText'>
            Check out my projects on GitHub and in live show to see my work in action.
          </p>
          
            <a href='https://github.com/elijahkalosa' target='_blank' rel='noopener noreferrer' className='projectsLink'>
              View on GitHub
            </a>
            <a href='https://github.com/elijahkalosa' target='_blank' rel='noopener noreferrer' className='projectsLink'>
              View in Live Show
            </a>
            
        </section>

        <section 
          className={`contactSection ${contactVisible ? 'is-visible' : ''}`} 
          ref={contactSectionRef}
        >
          <h3 className='contactHeading'>Contact Me</h3>    
          <p className='contactText'>
            If you have any questions or want to collaborate, feel free to reach out!
          </p>
          <form className='contactForm'>
            <input type='email' placeholder='Your Email' className='contactInput' required />
            <textarea placeholder='Your Message' className='contactTextarea' required></textarea>
            <button type='submit' className='contactButton'>Send Message</button>
          </form>
        </section>  
        <section className='footer'>
          <p className='footerText'>© 2025 Elijah Kalosa. All rights reserved.</p>
        </section>
        
      </main>
    </div>
  );
}

export default App;

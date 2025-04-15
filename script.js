// Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Scroll-to-Top
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme from local storage
const savedTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = savedTheme;
themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode☀️' : 'Dark Mode🌙';

themeToggle.addEventListener('click', () => {
  const currentTheme = body.dataset.theme;
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  const themeKey = newTheme === 'dark' ? 'theme-light' : 'theme-dark';
  themeToggle.innerHTML = translations[languageSwitcher.value][themeKey] || translations['en'][themeKey];
});

// Scroll Animations
const animateElements = document.querySelectorAll('.welcome-card, .overview-card, .project-card, .testimonial-card, .modal-content, .timeline-item, .interest-card, form, .circle-container, .about-hero');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        if (entry.target.classList.contains('circle-container')) {
          animateProgressBar(entry.target);
        }
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((el) => observer.observe(el));

// Circular Progress Bar Animation
function animateProgressBar(container) {
  const progressCircle = container.querySelector('.circle-progress');
  const percent = parseInt(container.getAttribute('data-percent'), 10);
  const radius = progressCircle.getAttribute('r');
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  const offset = circumference - (percent / 100) * circumference;
  progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
  setTimeout(() => {
    progressCircle.style.strokeDashoffset = offset;
  }, 100);
}

// Modal Functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'block';
  setTimeout(() => {
    modal.querySelector('.modal-content').classList.add('animate');
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.querySelector('.modal-content').classList.remove('animate');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
}

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
const phrases = ['Civil Engineer', 'Web Developer', 'AI Enthusiast'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!isDeleting && charIndex <= currentPhrase.length) {
    typewriterText.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
  } else if (isDeleting && charIndex >= 0) {
    typewriterText.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
  }

  if (charIndex > currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

if (typewriterText) {
  type();
}

// Language Switcher
const translations = {
  en: {
    'title-home': 'Pabitra Bhatta - Portfolio',
    'title-about': 'Pabitra Bhatta - About',
    'title-education': 'Pabitra Bhatta - Education',
    'title-skills': 'Pabitra Bhatta - Skills',
    'title-projects': 'Pabitra Bhatta - Projects',
    'title-contact': 'Pabitra Bhatta - Contact',
    'header-name': 'Pabitra Bhatta',
    'header-subtitle': 'Aspiring Civil Engineer & Web Developer | Innovating with AI and Design',
    'lang-en': 'English',
    'lang-ne': 'Nepali',
    'lang-hi': 'Hindi',
    'theme-dark': 'Dark Mode🌙',
    'theme-light': 'Light Mode☀️',
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-education': 'Education',
    'nav-skills': 'Skills',
    'nav-projects': 'Projects',
    'nav-contact': 'Contact',
    'welcome-title': 'Welcome to My Portfolio',
    'welcome-text': 'I’m Pabitra Bhatta, ',
    'welcome-cta': 'Get in Touch',
    'welcome-scroll': 'Scroll down for more!',
    'overview-title': 'Explore My Work',
    'overview-about-title': 'About Me',
    'overview-about-text': 'Learn about my journey in civil engineering and web development.',
    'overview-about-link': 'Discover More',
    'overview-skills-title': 'Skills',
    'overview-skills-text': 'Explore my technical expertise and creative abilities.',
    'overview-skills-link': 'View Skills',
    'overview-projects-title': 'Projects',
    'overview-projects-text': 'Check out my engineering and coding projects.',
    'overview-projects-link': 'See Projects',
    'testimonials-title': 'Testimonials',
    'testimonial-1': '"Pabitra’s dedication to engineering and tech is inspiring." - Prof. Jane Smith',
    'about-title': 'About Me',
    'about-who-title': 'Who I Am',
    'about-who-text': 'I’m Pabitra Bhatta, a civil engineering student with a passion for building bridges—both literal and digital. From designing sturdy foundations to coding interactive websites, I thrive on blending structure with creativity.',
    'about-resume': 'Download Resume',
    'about-interests-title': 'My Interests',
    'interest-structural': 'Structural Design',
    'interest-web': 'Web Development',
    'interest-motorcycle': 'Motorcycle Touring',
    'interest-spy': 'Spy Thrillers',
    'about-journey-title': 'My Journey',
    'journey-2019': '2019: Began Civil Engineering Studies',
    'journey-2024': '2024: Interned at Ace Engineering',
    'journey-2025': '2025: Launched AI-Enhanced Portfolio',
    'education-title': 'My Educational Journey',
    'education-highschool-title': 'High School (2019-2021)',
    'education-highschool-gpa': '<strong>GPA:</strong> 3.4 (10th), 3.43 (11th), 3.47 (12th)',
    'education-highschool-text': 'Built a strong foundation in Mathematics, Physics, and Engineering.',
    'education-university-title': 'University Applications (2024)',
    'education-university-text': 'Accepted to top U.S. universities for Civil Engineering:',
    'education-university-1': 'LA TECH University',
    'education-university-2': 'University of Texas at Arlington',
    'education-university-3': 'Iowa State University ($5,500 scholarship)',
    'education-university-4': 'Youngstown State University',
    'education-university-5': 'South Illinois University Edwardsville',
    'education-internships-title': 'Internships & Training (2023-2024)',
    'education-internship-1': '<strong>Kulekhani III Hydropower Project:</strong> Focused on foundation design and estimation.',
    'education-internship-2': '<strong>Ace Engineering Consultancy:</strong> Contributed to construction project planning.',
    'skills-title': 'My Skills',
    'skills-technical-title': 'Technical Skills',
    'skill-autocad': 'AutoCAD',
    'skill-estimating': 'Estimating',
    'skill-surveying': 'Surveying',
    'skills-coding-title': 'Coding Skills',
    'skill-html': 'HTML',
    'skill-css': 'CSS',
    'skills-life-title': 'Practical Life Skills',
    'skill-communication': 'Communication',
    'skill-problem-solving': 'Problem-Solving',
    'skill-hardworking': 'Hardworking',
    'projects-title': 'My Projects',
    'project-aroma-title': 'Aroma Free Movie Website',
    'project-aroma-text': 'A free movie streaming website built using <b>HTML, CSS, and JavaScript</b>. Now integrating AI-powered automation.',
    'project-aroma-link': 'View on GitHub',
    'project-aroma-modal-text': 'Built with HTML, CSS, and JavaScript. Currently enhancing with AI automation for content curation.',
    'project-aroma-modal-link': 'Live Demo',
    'project-foundation-title': 'Foundation Design & Estimation',
    'project-foundation-text': 'Designed structural foundations at <b>Kulekhani III Hydropower Project</b> during OJT, focusing on cost estimation.',
    'project-structural-title': 'Structural Analysis & Design',
    'project-structural-text': 'Optimized building structures using <b>AutoCAD, SAP2000, and Revit</b> during internship.',
    'project-portfolio-title': 'Portfolio Website',
    'project-portfolio-text': 'A modern, interactive portfolio showcasing my skills, projects, and experience using <b>HTML, CSS, JS</b>.',
    'contact-title': "Let's Work Together!",
    'contact-form-title': 'Get in Touch',
    'contact-name-placeholder': 'Your Name',
    'contact-email-placeholder': 'Your Email',
    'contact-message-placeholder': 'Your Message',
    'contact-submit': 'Send Message',
    'contact-social-title': 'My Social Media Handles',
    'contact-social-text': 'Get connected on social media',
    'contact-subscribe-title': 'Subscribe for Updates',
    'contact-subscribe-placeholder': 'Enter your email',
    'contact-subscribe-button': 'Subscribe',
    'footer-copyright': '© 2025 Pabitra Bhatta'
  },
  ne: {
    'title-home': 'पवित्र भट्ट - पोर्टफोलियो',
    'title-about': 'पवित्र भट्ट - मेरो बारेमा',
    'title-education': 'पवित्र भट्ट - शिक्षा',
    'title-skills': 'पवित्र भट्ट - सीपहरू',
    'title-projects': 'पवित्र भट्ट - परियोजनाहरू',
    'title-contact': 'पवित्र भट्ट - सम्पर्क',
    'header-name': 'पवित्र भट्ट',
    'header-subtitle': 'उदीयमान सिभिल इन्जिनियर र वेब डेभलपर | एआई र डिजाइनसँग नवप्रवर्तन',
    'lang-en': 'अंग्रेजी',
    'lang-ne': 'नेपाली',
    'lang-hi': 'हिन्दी',
    'theme-dark': 'डार्क मोड🌙',
    'theme-light': 'लाइट मोड☀️',
    'nav-home': 'होम',
    'nav-about': 'मेरो बारेमा',
    'nav-education': 'शिक्षा',
    'nav-skills': 'सीपहरू',
    'nav-projects': 'परियोजनाहरू',
    'nav-contact': 'सम्पर्क',
    'welcome-title': 'मेरो पोर्टफोलियोमा स्वागत छ',
    'welcome-text': 'म पवित्र भट्ट, ',
    'welcome-cta': 'सम्पर्कमा रहनुहोस्',
    'welcome-scroll': 'थपको लागि तल स्क्रोल गर्नुहोस्!',
    'overview-title': 'मेरो काम अन्वेषण गर्नुहोस्',
    'overview-about-title': 'मेरो बारेमा',
    'overview-about-text': 'सिभिल इन्जिनियरिङ र वेब डेभलपमेन्टमा मेरो यात्रा जान्नुहोस्।',
    'overview-about-link': 'थप पत्ता लगाउनुहोस्',
    'overview-skills-title': 'सीपहरू',
    'overview-skills-text': 'मेरो प्राविधिक विशेषज्ञता र रचनात्मक क्षमताहरू अन्वेषण गर्नुहोस्।',
    'overview-skills-link': 'सीपहरू हेर्नुहोस्',
    'overview-projects-title': 'परियोजनाहरू',
    'overview-projects-text': 'मेरो इन्जिनियरिङ र कोडिङ परियोजनाहरू जाँच गर्नुहोस्।',
    'overview-projects-link': 'परियोजनाहरू हेर्नुहोस्',
    'testimonials-title': 'प्रशंसापत्रहरू',
    'testimonial-1': '"पवित्रको इन्जिनियरिङ र प्रविधिप्रति समर्पण प्रेरणादायी छ।" - प्रो. जेन स्मिथ',
    'about-title': 'मेरो बारेमा',
    'about-who-title': 'म को हुँ',
    'about-who-text': 'म पवित्र भट्ट, सिभिल इन्जिनियरिङका विद्यार्थी हुँ जसलाई वास्तविक र डिजिटल दुवै प्रकारका पुलहरू निर्माण गर्ने जोश छ। बलियो आधार डिजाइन गर्नेदेखि अन्तरक्रियात्मक वेबसाइटहरू कोड गर्नेसम्म, म संरचना र रचनात्मकताको मिश्रणमा रमाउँछु।',
    'about-resume': 'रिज्युम डाउनलोड गर्नुहोस्',
    'about-interests-title': 'मेरो रुचिहरू',
    'interest-structural': 'संरचनात्मक डिजाइन',
    'interest-web': 'वेब डेभलपमेन्ट',
    'interest-motorcycle': 'मोटरसाइकल टुरिङ',
    'interest-spy': 'जासूसी थ्रिलरहरू',
    'about-journey-title': 'मेरो यात्रा',
    'journey-2019': '२०१९: सिभिल इन्जिनियरिङ अध्ययन शुरू',
    'journey-2024': '२०२४: ऐस इन्जिनियरिङमा इन्टर्नशिप',
    'journey-2025': '२०२५: एआई-संवर्धित पोर्टफोलियो लन्च',
    'education-title': 'मेरो शैक्षिक यात्रा',
    'education-highschool-title': 'हाई स्कूल (२०१९-२०२१)',
    'education-highschool-gpa': '<strong>जीपीए:</strong> ३.४ (१०औं), ३.४३ (११औं), ३.४७ (१२औं)',
    'education-highschool-text': 'गणित, भौतिक विज्ञान, र इन्जिनियरिङमा बलियो आधार बनाएँ।',
    'education-university-title': 'विश्वविद्यालय आवेदनहरू (२०२४)',
    'education-university-text': 'सिभिल इन्जिनियरिङका लागि शीर्ष अमेरिकी विश्वविद्यालयहरूमा स्वीकृत:',
    'education-university-1': 'एलए टेक विश्वविद्यालय',
    'education-university-2': 'टेक्सास विश्वविद्यालय, अर्लिंग्टन',
    'education-university-3': 'आयोवा स्टेट विश्वविद्यालय ($५,५०० छात्रवृत्ति)',
    'education-university-4': 'यंग्सटाउन स्टेट विश्वविद्यालय',
    'education-university-5': 'दक्षिण इलिनोइस विश्वविद्यालय एडवर्ड्सभिल',
    'education-internships-title': 'इन्टर्नशिप र प्रशिक्षण (२०२३-२०२४)',
    'education-internship-1': '<strong>कुलेखानी III जलविद्युत परियोजना:</strong> आधार डिजाइन र अनुमानमा केन्द्रित।',
    'education-internship-2': '<strong>ऐस इन्जिनियरिङ परामर्श:</strong> निर्माण परियोजना योजनामा योगदान।',
    'skills-title': 'मेरो सीपहरू',
    'skills-technical-title': 'प्राविधिक सीपहरू',
    'skill-autocad': 'अटोक्याड',
    'skill-estimating': 'अनुमान',
    'skill-surveying': 'सर्वेक्षण',
    'skills-coding-title': 'कोडिङ सीपहरू',
    'skill-html': 'एचटीएमएल',
    'skill-css': 'सीएसएस',
    'skills-life-title': 'व्यावहारिक जीवन सीपहरू',
    'skill-communication': 'सञ्चार',
    'skill-problem-solving': 'समस्या समाधान',
    'skill-hardworking': 'मेहनती',
    'projects-title': 'मेरो परियोजनाहरू',
    'project-aroma-title': 'एरोमा फ्री मूभी वेबसाइट',
    'project-aroma-text': '<b>एचटीएमएल, सीएसएस, र जाभास्क्रिप्ट</b> प्रयोग गरेर बनाइएको निःशुल्क मूभी स्ट्रिमिङ वेबसाइट। अब एआई-संचालित स्वचालन समायोजन गर्दै।',
    'project-aroma-link': 'गिटहबमा हेर्नुहोस्',
    'project-aroma-modal-text': 'एचटीएमएल, सीएसएस, र जाभास्क्रिप्टसँग निर्मित। हाल सामग्री क्युरेसनको लागि एआई स्वचालनसँग सुधार गर्दै।',
    'project-aroma-modal-link': 'लाइभ डेमो',
    'project-foundation-title': 'आधार डिजाइन र अनुमान',
    'project-foundation-text': 'ओजेटीको क्रममा <b>कुलेखानी III जलविद्युत परियोजना</b> मा संरचनात्मक आधारहरू डिजाइन, लागत अनुमानमा केन्द्रित।',
    'project-structural-title': 'संरचनात्मक विश्लेषण र डिजाइन',
    'project-structural-text': 'इन्टर्नशिपको क्रममा <b>अटोक्याड, SAP2000, र Revit</b> प्रयोग गरेर भवन संरचनाहरूलाई अनुकूलित।',
    'project-portfolio-title': 'पोर्टफोलियो वेबसाइट',
    'project-portfolio-text': '<b>एचटीएमएल, सीएसएस, जेएस</b> प्रयोग गरेर मेरो सीपहरू, परियोजनाहरू, र अनुभव प्रदर्शन गर्ने आधुनिक, अन्तरक्रियात्मक पोर्टफोलियो।',
    'contact-title': 'सँगै काम गरौं!',
    'contact-form-title': 'सम्पर्कमा रहनुहोस्',
    'contact-name-placeholder': 'तपाईंको नाम',
    'contact-email-placeholder': 'तपाईंको इमेल',
    'contact-message-placeholder': 'तपाईंको सन्देश',
    'contact-submit': 'सन्देश पठाउनुहोस्',
    'contact-social-title': 'मेरो सोशल मिडिया ह्यान्डलहरू',
    'contact-social-text': 'सोशल मिडियामा जोडिनुहोस्',
    'contact-subscribe-title': 'अपडेटहरूको लागि सदस्यता लिनुहोस्',
    'contact-subscribe-placeholder': 'तपाईंको इमेल प्रविष्ट गर्नुहोस्',
    'contact-subscribe-button': 'सदस्यता लिनुहोस्',
    'footer-copyright': '© २०२५ पवित्र भट्ट'
  },
  hi: {
    'title-home': 'पवित्र भट्ट - पोर्टफोलियो',
    'title-about': 'पवित्र भट्ट - मेरे बारे में',
    'title-education': 'पवित्र भट्ट - शिक्षा',
    'title-skills': 'पवित्र भट्ट - कौशल',
    'title-projects': 'पवित्र भट्ट - परियोजनाएँ',
    'title-contact': 'पवित्र भट्ट - संपर्क',
    'header-name': 'पवित्र भट्ट',
    'header-subtitle': 'उभरता हुआ सिविल इंजीनियर और वेब डेवलपर | एआई और डिज़ाइन के साथ नवाचार',
    'lang-en': 'अंग्रेजी',
    'lang-ne': 'नेपाली',
    'lang-hi': 'हिन्दी',
    'theme-dark': 'डार्क मोड🌙',
    'theme-light': 'लाइट मोड☀️',
    'nav-home': 'होम',
    'nav-about': 'मेरे बारे में',
    'nav-education': 'शिक्षा',
    'nav-skills': 'कौशल',
    'nav-projects': 'परियोजनाएँ',
    'nav-contact': 'संपर्क',
    'welcome-title': 'मेरे पोर्टफोलियो में आपका स्वागत है',
    'welcome-text': 'मैं पवित्र भट्ट, ',
    'welcome-cta': 'संपर्क में रहें',
    'welcome-scroll': 'और अधिक के लिए नीचे स्क्रॉल करें!',
    'overview-title': 'मेरे काम का अन्वेषण करें',
    'overview-about-title': 'मेरे बारे में',
    'overview-about-text': 'सिविल इंजीनियरिंग और वेब डेवलपमेंट में मेरी यात्रा के बारे में जानें।',
    'overview-about-link': 'और जानें',
    'overview-skills-title': 'कौशल',
    'overview-skills-text': 'मेरी तकनीकी विशेषज्ञता और रचनात्मक क्षमताओं का अन्वेषण करें।',
    'overview-skills-link': 'कौशल देखें',
    'overview-projects-title': 'परियोजनाएँ',
    'overview-projects-text': 'मेरी इंजीनियरिंग और कोडिंग परियोजनाओं को देखें।',
    'overview-projects-link': 'परियोजनाएँ देखें',
    'testimonials-title': 'प्रशंसापत्र',
    'testimonial-1': '"पवित्र का इंजीनियरिंग और तकनीक के प्रति समर्पण प्रेरणादायक है।" - प्रो. जेन स्मिथ',
    'about-title': 'मेरे बारे में',
    'about-who-title': 'मैं कौन हूँ',
    'about-who-text': 'मैं पवित्र भट्ट, एक सिविल इंजीनियरिंग छात्र हूँ, जिसे वास्तविक और डिजिटल दोनों तरह के पुल बनाने का जुनून है। मजबूत नींव डिज़ाइन करने से लेकर इंटरैक्टिव वेबसाइट कोड करने तक, मैं संरचना और रचनात्मकता के मिश्रण में फलता-फूलता हूँ।',
    'about-resume': 'रिज्यूमे डाउनलोड करें',
    'about-interests-title': 'मेरी रुचियाँ',
    'interest-structural': 'संरचनात्मक डिज़ाइन',
    'interest-web': 'वेब डेवलपमेंट',
    'interest-motorcycle': 'मोटरसाइकिल टूरिंग',
    'interest-spy': 'जासूसी थ्रिलर',
    'about-journey-title': 'मेरी यात्रा',
    'journey-2019': '2019: सिविल इंजीनियरिंग अध्ययन शुरू किया',
    'journey-2024': '2024: ऐस इंजीनियरिंग में इंटर्नशिप',
    'journey-2025': '2025: एआई-संवर्धित पोर्टफोलियो लॉन्च किया',
    'education-title': 'मेरी शैक्षिक यात्रा',
    'education-highschool-title': 'हाई स्कूल (2019-2021)',
    'education-highschool-gpa': '<strong>जीपीए:</strong> 3.4 (10वीं), 3.43 (11वीं), 3.47 (12वीं)',
    'education-highschool-text': 'गणित, भौतिकी और इंजीनियरिंग में मजबूत नींव बनाई।',
    'education-university-title': 'विश्वविद्यालय आवेदन (2024)',
    'education-university-text': 'सिविल इंजीनियरिंग के लिए शीर्ष अमेरिकी विश्वविद्यालयों में स्वीकार किया गया:',
    'education-university-1': 'एलए टेक विश्वविद्यालय',
    'education-university-2': 'टेक्सास विश्वविद्यालय, अर्लिंग्टन',
    'education-university-3': 'आयोवा स्टेट विश्वविद्यालय ($5,500 छात्रवृत्ति)',
    'education-university-4': 'यंग्सटाउन स्टेट विश्वविद्यालय',
    'education-university-5': 'दक्षिण इलिनोइस विश्वविद्यालय एडवर्ड्सविल',
    'education-internships-title': 'इंटर्नशिप और प्रशिक्षण (2023-2024)',
    'education-internship-1': '<strong>कुलेखानी III जलविद्युत परियोजना:</strong> नींव डिज़ाइन और अनुमान पर केंद्रित।',
    'education-internship-2': '<strong>ऐस इंजीनियरिंग परामर्श:</strong> निर्माण परियोजना योजना में योगदान दिया।',
    'skills-title': 'मेरे कौशल',
    'skills-technical-title': 'तकनीकी कौशल',
    'skill-autocad': 'ऑटोकैड',
    'skill-estimating': 'अनुमान',
    'skill-surveying': 'सर्वेक्षण',
    'skills-coding-title': 'कोडिंग कौशल',
    'skill-html': 'एचटीएमएल',
    'skill-css': 'सीएसएस',
    'skills-life-title': 'व्यावहारिक जीवन कौशल',
    'skill-communication': 'संचार',
    'skill-problem-solving': 'समस्या समाधान',
    'skill-hardworking': 'मेहनती',
    'projects-title': 'मेरी परियोजनाएँ',
    'project-aroma-title': 'एरोमा फ्री मूवी वेबसाइट',
    'project-aroma-text': '<b>एचटीएमएल, सीएसएस, और जावास्क्रिप्ट</b> का उपयोग करके बनाई गई मुफ्त मूवी स्ट्रीमिंग वेबसाइट। अब एआई-संचालित स्वचालन को एकीकृत कर रहा हूँ।',
    'project-aroma-link': 'गिटहब पर देखें',
    'project-aroma-modal-text': 'एचटीएमएल, सीएसएस, और जावास्क्रिप्ट के साथ निर्मित। वर्तमान में सामग्री क्यूरेशन के लिए एआई स्वचालन के साथ सुधार कर रहा हूँ।',
    'project-aroma-modal-link': 'लाइव डेमो',
    'project-foundation-title': 'नींव डिज़ाइन और अनुमान',
    'project-foundation-text': 'ओजेटी के दौरान <b>कुलेखानी III जलविद्युत परियोजना</b> में संरचनात्मक नींव डिज़ाइन की, लागत अनुमान पर ध्यान केंद्रित किया।',
    'project-structural-title': 'संरचनात्मक विश्लेषण और डिज़ाइन',
    'project-structural-text': 'इंटर्नशिप के दौरान <b>ऑटोकैड, SAP2000, और Revit</b> का उपयोग करके भवन संरचनाओं को अनुकूलित किया।',
    'project-portfolio-title': 'पोर्टफोलियो वेबसाइट',
    'project-portfolio-text': '<b>एचटीएमएल, सीएसएस, जेएस</b> का उपयोग करके मेरे कौशल, परियोजनाओं और अनुभव को प्रदर्शित करने वाला एक आधुनिक, इंटरैक्टिव पोर्टफोलियो।',
    'contact-title': 'आइए मिलकर काम करें!',
    'contact-form-title': 'संपर्क में रहें',
    'contact-name-placeholder': 'आपका नाम',
    'contact-email-placeholder': 'आपका ईमेल',
    'contact-message-placeholder': 'आपका संदेश',
    'contact-submit': 'संदेश भेजें',
    'contact-social-title': 'मेरे सोशल मीडिया हैंडल',
    'contact-social-text': 'सोशल मीडिया पर जुड़ें',
    'contact-subscribe-title': 'अपडेट के लिए सब्सक्राइब करें',
    'contact-subscribe-placeholder': 'अपना ईमेल दर्ज करें',
    'contact-subscribe-button': 'सब्सक्राइब करें',
    'footer-copyright': '© 2025 पवित्र भट्ट'
  }
};

const languageSwitcher = document.getElementById('language-switcher');

function updateContent(lang) {
  // Update elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  // Update page title
  const pageKey = `title-${window.location.pathname.split('/').pop().replace('.html', '') || 'home'}`;
  document.title = translations[lang][pageKey] || translations['en']['title-home'];

  // Update language switcher options
  document.querySelectorAll('#language-switcher option').forEach((option) => {
    const key = option.getAttribute('data-i18n');
    option.textContent = translations[lang][key] || translations['en'][key];
  });
}

// Load saved language from local storage
const savedLang = localStorage.getItem('language') || 'en';
languageSwitcher.value = savedLang;
updateContent(savedLang);

languageSwitcher.addEventListener('change', (e) => {
  const lang = e.target.value;
  updateContent(lang);
  localStorage.setItem('language', lang);
});

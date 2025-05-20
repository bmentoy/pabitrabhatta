document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.getElementById('ai-chat-toggle-btn');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChatButton = document.getElementById('ai-chat-close-btn');
    const chatMessagesContainer = document.getElementById('ai-chat-messages');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSendButton = document.getElementById('ai-chat-send-btn');

    // AI Knowledge Base
    const aiKnowledgeBase = {
        // Keywords and their corresponding information keys in translations.js or direct answers
        // This is a simple example; more complex NLP would require more sophisticated matching.
        greeting: ['hello', 'hi', 'hey', 'good day', 'greetings'],
        who: ['who is pabitra', 'who are you', 'tell me about pabitra', 'about pabitra bhatta'],
        skills: ['skills', 'what can pabitra do', 'technical skills', 'coding skills', 'expertise'],
        education: ['education', 'study', 'qualifications', 'university', 'school'],
        projects: ['projects', 'work', 'portfolio items', 'what has pabitra built'],
        contact: ['contact', 'get in touch', 'email', 'social media', 'how to reach pabitra'],
        interests: ['interests', 'hobbies', 'pabitra likes'],
        resume: ['resume', 'cv', 'download resume'],
        internship: ['internship', 'training', 'ojt', 'kulekhani', 'ace engineering'],
        // Default response key
        defaultResponse: 'I am not sure how to answer that. Could you try asking differently? You can ask about Pabitra\'s skills, education, projects, or how to get in touch.'
    };

    const portfolioData = {
        name: "Pabitra Bhatta",
        description: "An aspiring Civil Engineer & Web Developer, innovating with AI and Design.",
        // Simplified data that the AI can use - pull from your site's content
        about: "Pabitra Bhatta is a civil engineering student passionate about blending structure with creativity, from designing foundations to coding interactive websites.",
        educationSummary: "Pabitra has a strong High School foundation (GPA up to 3.47) and has been accepted to several U.S. universities for Civil Engineering, including Iowa State University with a scholarship. Pabitra also completed internships/training at Kulekhani III Hydropower Project and Ace Engineering Consultancy.",
        skillsSummary: "Technical skills include AutoCAD, Estimating, and Surveying. Coding skills involve HTML & CSS. Practical life skills feature Communication, Problem-Solving, and being Hardworking.",
        projectsSummary: "Key projects include the 'Aroma Free Movie Website', foundation design at Kulekhani III, structural analysis & design using AutoCAD/SAP2000/Revit, and this portfolio website. The movie website is being enhanced with AI.",
        contactInfo: "You can contact Pabitra via the form on the Contact page or connect on LinkedIn, GitHub, Facebook, and Instagram. Links are available on the Contact page.",
        interestsSummary: "Pabitra's interests include Structural Design, Web Development, Motorcycle Touring, and Spy Thrillers.",
        resumeLink: "files/Pabitra Bhatta's Resume.pdf", // Make sure this path is correct
        internshipDetails: "Interned at Kulekhani III Hydropower Project focusing on foundation design and estimation, and at Ace Engineering Consultancy contributing to project planning."
    };

    function getAIResponse(userInput) {
        const input = userInput.toLowerCase().trim();
        
        if (aiKnowledgeBase.greeting.some(phrase => input.includes(phrase))) {
            // Get the current language from the language switcher to provide a localized greeting if available
            const currentLang = document.getElementById('language-switcher')?.value || 'en';
            return translations[currentLang]?.['ai-greeting'] || "Hello! How can I assist you today regarding Pabitra Bhatta?";
        }
        if (aiKnowledgeBase.who.some(phrase => input.includes(phrase))) {
            return `${portfolioData.name} is ${portfolioData.description}. ${portfolioData.about}`;
        }
        if (aiKnowledgeBase.skills.some(phrase => input.includes(phrase))) {
            return `Regarding skills: ${portfolioData.skillsSummary} You can find more details on the Skills page.`;
        }
        if (aiKnowledgeBase.education.some(phrase => input.includes(phrase))) {
            return `For education: ${portfolioData.educationSummary} Check out the Education page for a detailed timeline.`;
        }
        if (aiKnowledgeBase.projects.some(phrase => input.includes(phrase))) {
            return `Pabitra has worked on several projects: ${portfolioData.projectsSummary} The Projects page has more information.`;
        }
        if (aiKnowledgeBase.contact.some(phrase => input.includes(phrase))) {
            return portfolioData.contactInfo;
        }
        if (aiKnowledgeBase.interests.some(phrase => input.includes(phrase))) {
            return `Pabitra's interests include: ${portfolioData.interestsSummary} More details are on the About page.`;
        }
        if (aiKnowledgeBase.resume.some(phrase => input.includes(phrase))) {
            return `You can download Pabitra's resume from the About page or using this link: <a href='${portfolioData.resumeLink}' target='_blank' download>Download Resume</a>.`;
        }
        if (aiKnowledgeBase.internship.some(phrase => input.includes(phrase))) {
            return `Pabitra gained practical experience through: ${portfolioData.internshipDetails}. You can see this mentioned in the Education and About sections.`;
        }

        // Default response
        const currentLang = document.getElementById('language-switcher')?.value || 'en';
        return translations[currentLang]?.['ai-default-response'] || aiKnowledgeBase.defaultResponse;
    }

    function addMessageToChat(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type === 'user' ? 'user-message' : 'ai-message');
        messageDiv.innerHTML = message; // Use innerHTML to allow links in AI responses
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Auto-scroll
    }

    function handleUserInquiry() {
        const userInputText = chatInput.value.trim();
        if (userInputText === "") return;

        addMessageToChat(userInputText, 'user');
        chatInput.value = '';

        // Simulate AI "thinking"
        setTimeout(() => {
            const aiResponse = getAIResponse(userInputText);
            addMessageToChat(aiResponse, 'ai');
        }, 500 + Math.random() * 500); // Random delay for realism
    }

    if (chatToggleButton && chatWindow && closeChatButton && chatInput && chatSendButton) {
        chatToggleButton.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
             // Add a welcome message when chat opens, if no messages are present
            if (chatWindow.classList.contains('active') && chatMessagesContainer.children.length === 0) {
                const currentLang = document.getElementById('language-switcher')?.value || 'en';
                const welcomeMsg = translations[currentLang]?.['ai-welcome'] || "Hello! I'm Pabitra's AI assistant. Ask me anything about Pabitra's portfolio.";
                addMessageToChat(welcomeMsg, 'ai');
            }
        });

        closeChatButton.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        chatSendButton.addEventListener('click', handleUserInquiry);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInquiry();
            }
        });
    } else {
        console.warn('AI Chat elements not found. Ensure HTML structure is correct.');
    }
});

// Note: The 'translations' object is expected to be globally available from script.js
// You'll need to add keys like 'ai-greeting', 'ai-default-response', 'ai-welcome'
// 'ai-chat-title', 'ai-chat-placeholder', 'ai-chat-send' to your i18n object in script.js
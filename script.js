// Configuration object (kept for completeness if SDK logic is desired later)
const defaultConfig = {
    app_title: "AI Typing Speed Tester",
    start_button_text: "Start Test",
    reset_button_text: "Reset"
};

// AI-powered paragraph generator (mock implementation)
const aiParagraphs = {
    tech: [
        "Artificial intelligence is revolutionizing the way we interact with technology. Machine learning algorithms can now process vast amounts of data in seconds, enabling computers to make decisions that were once exclusively human. From autonomous vehicles navigating busy streets to smart assistants understanding natural language, AI is becoming an integral part of our daily lives. The future promises even more exciting developments as quantum computing and neural networks continue to evolve.",
        "Cloud computing has transformed how businesses store and access their data. Instead of maintaining expensive on-premise servers, companies can now leverage scalable infrastructure that adapts to their needs. This shift has enabled startups to compete with established enterprises, democratizing access to powerful computing resources. As edge computing emerges, we're seeing even faster processing times and reduced latency for critical applications.",
        "Cybersecurity remains one of the most pressing challenges in our digital age. As hackers develop more sophisticated attack methods, security professionals must stay ahead with advanced threat detection systems. Blockchain technology offers new possibilities for secure transactions, while biometric authentication is replacing traditional passwords. The battle between security and convenience continues to shape how we protect our digital identities."
    ],
    motivational: [
        "Success is not final, failure is not fatal, it is the courage to continue that counts. Every great achievement begins with the decision to try, and every expert was once a beginner. The path to excellence is paved with consistent effort, unwavering determination, and the willingness to learn from mistakes. Remember that champions are made when nobody is watching, through countless hours of practice and dedication to their craft.",
        "Your mindset determines your reality. When you believe in yourself and your abilities, you unlock potential you never knew existed. Challenges are not obstacles but opportunities to grow stronger and wiser. Embrace the journey of self-improvement, celebrate small victories, and never underestimate the power of persistence. The only limits that truly exist are the ones you place on yourself.",
        "Dreams without action remain wishes, but dreams with deadlines become goals. Take that first step today, no matter how small it may seem. Progress is progress, regardless of the pace. Surround yourself with people who inspire you to be better, and never stop learning. Your future self will thank you for the courage you show today in pursuing what matters most to you."
    ],
    poetry: [
        "In gardens where the morning dew glistens like diamonds on emerald leaves, whispers of ancient wisdom dance through the gentle breeze. Time flows like a river, carrying memories downstream while new moments bloom like flowers in spring. The symphony of nature plays its eternal song, reminding us that beauty exists in the simplest of things, waiting to be discovered by those who pause to listen.",
        "Beneath the canvas of a starlit sky, dreams take flight on wings of hope and wonder. Each constellation tells a story of love, loss, and redemption, written in the language of light across the infinite darkness. The moon watches over sleeping cities, casting silver shadows that transform ordinary streets into pathways of magic and possibility.",
        "Words are the bridges between souls, connecting hearts across vast distances of time and space. In the silence between spoken thoughts, poetry finds its voice, painting emotions with metaphors and breathing life into the intangible. Every verse is a doorway to understanding, every stanza a step closer to the truth that binds us all together in this beautiful, chaotic dance of existence."
    ],
    science: [
        "The human brain contains approximately 86 billion neurons, each forming thousands of connections with other neurons. This intricate network processes information at incredible speeds, allowing us to think, feel, and remember. Recent advances in neuroscience have revealed how memories are formed and stored, opening new possibilities for treating neurological disorders. The plasticity of the brain means it can adapt and rewire itself throughout our lives.",
        "Quantum mechanics challenges our understanding of reality at the smallest scales. Particles can exist in multiple states simultaneously until observed, a phenomenon known as superposition. Quantum entanglement allows particles to be mysteriously connected across vast distances, with changes to one instantly affecting the other. These strange properties are being harnessed to develop quantum computers that could solve problems impossible for classical computers.",
        "The theory of evolution explains the incredible diversity of life on Earth through natural selection and genetic variation. Over millions of years, species have adapted to their environments, developing remarkable survival strategies. From the echolocation of bats to the camouflage of chameleons, nature has produced solutions that inspire human innovation. Understanding evolution helps us appreciate our place in the web of life and our responsibility to protect biodiversity."
    ],
    history: [
        "The Renaissance period marked a profound transformation in European culture, art, and science. Beginning in 14th century Italy, this intellectual movement spread across the continent, challenging medieval traditions and embracing humanistic values. Great minds like Leonardo da Vinci and Michelangelo created masterpieces that still inspire us today, while explorers like Columbus opened new worlds to European influence. The invention of the printing press revolutionized the spread of knowledge and ideas.",
        "The Industrial Revolution fundamentally changed how humans lived and worked. Steam engines powered factories and transportation, while new manufacturing processes increased production dramatically. Cities grew rapidly as people moved from rural areas seeking employment in the new industries. This period of innovation laid the foundation for modern society, though it also brought challenges like pollution and worker exploitation that we continue to address today.",
        "Ancient civilizations developed remarkable achievements that continue to amaze us. The Egyptians built pyramids that have stood for thousands of years, while the Greeks established democratic principles and philosophical traditions. The Roman Empire created engineering marvels like aqueducts and roads, and the Chinese invented paper, gunpowder, and the compass. These innovations shaped the course of human history and cultural development."
    ],
    nature: [
        "Deep in the Amazon rainforest, an incredible symphony of life unfolds every day. Colorful parrots call from the canopy while jaguars prowl silently through the undergrowth. This vast ecosystem is home to millions of species, many still undiscovered by science. The forest acts as the lungs of our planet, producing oxygen and absorbing carbon dioxide. Every tree, every creature plays a vital role in maintaining the delicate balance of this natural wonder.",
        "Ocean currents circle the globe like a vast conveyor belt, distributing heat and nutrients across the planet. Coral reefs teem with vibrant marine life, from tiny clownfish to massive whale sharks. The deep sea remains largely unexplored, hiding creatures adapted to extreme pressure and darkness. These underwater ecosystems are crucial for climate regulation and provide food and livelihoods for billions of people worldwide.",
        "Mountain ranges stand as monuments to the Earth's geological history, their peaks reaching toward the sky like ancient cathedrals. Alpine meadows burst with wildflowers during brief summers, while glaciers slowly carve valleys with their immense power. Wildlife has adapted to these harsh conditions, from sure-footed mountain goats to elusive snow leopards. These high-altitude environments are particularly sensitive to climate change, serving as early indicators of our planet's health."
    ]
};

// Game state
let gameState = {
    isActive: false,
    startTime: null,
    timeLeft: 60,
    currentText: '',
    userInput: '',
    currentIndex: 0,
    errors: 0,
    totalCharacters: 0,
    timer: null
};

// DOM elements
const elements = {
    themeSelect: document.getElementById('themeSelect'),
    startBtn: document.getElementById('startBtn'),
    resetBtn: document.getElementById('resetBtn'),
    textDisplay: document.getElementById('textDisplay'),
    typingInput: document.getElementById('typingInput'),
    timer: document.getElementById('timer'),
    results: document.getElementById('results'),
    wpmValue: document.getElementById('wpmValue'),
    accuracyValue: document.getElementById('accuracyValue'),
    errorsValue: document.getElementById('errorsValue'),
    charactersValue: document.getElementById('charactersValue'),
    finalWpm: document.getElementById('finalWpm'),
    finalAccuracy: document.getElementById('finalAccuracy'),
    finalErrors: document.getElementById('finalErrors'),
    finalTime: document.getElementById('finalTime'),
    appTitle: document.getElementById('appTitle'),
};

/**
 * Generates a random paragraph based on the selected theme.
 * @param {string} theme - The theme key (e.g., 'tech', 'motivational').
 * @returns {string} - A random paragraph string.
 */
function generateParagraph(theme) {
    const paragraphs = aiParagraphs[theme] || aiParagraphs.tech;
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

/**
 * Updates the text display with character highlighting.
 */
function updateTextDisplay() {
    const text = gameState.currentText;
    const input = gameState.userInput;
    let html = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let className = '';
        
        // Use a non-breaking space for actual space characters to apply background color
        const displayChar = char === ' ' ? '&nbsp;' : char;

        if (i < input.length) {
            className = input[i] === char ? 'char-correct' : 'char-incorrect';
        } else if (i === input.length) {
            className = 'char-current';
        } else {
            className = 'char-pending';
        }

        html += `<span class="${className}">${displayChar}</span>`;
    }

    elements.textDisplay.innerHTML = html;
}

/**
 * Calculates and updates the live statistics (WPM, Accuracy, Errors).
 */
function updateStats() {
    const timeElapsed = gameState.startTime ? (Date.now() - gameState.startTime) / 1000 : 0;
    // Count words based on spaces in the correct part of the input
    const correctInput = gameState.userInput.substring(0, gameState.currentText.length);
    const wordsTyped = correctInput.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // WPM calculation: (Words Typed / Minutes Elapsed)
    const wpm = timeElapsed > 0 ? Math.round((wordsTyped / timeElapsed) * 60) : 0;
    
    // Accuracy calculation: (Correct Chars / Total Chars) * 100
    const correctCharacters = gameState.totalCharacters - gameState.errors;
    const accuracy = gameState.totalCharacters > 0 ? 
        Math.round((correctCharacters / gameState.totalCharacters) * 100) : 100;

    elements.wpmValue.textContent = wpm;
    elements.accuracyValue.textContent = accuracy;
    elements.errorsValue.textContent = gameState.errors;
    elements.charactersValue.textContent = gameState.totalCharacters;
}

/**
 * Starts the typing test.
 */
function startTest() {
    const theme = elements.themeSelect.value;
    gameState.currentText = generateParagraph(theme);
    gameState.userInput = '';
    gameState.currentIndex = 0;
    gameState.errors = 0;
    gameState.totalCharacters = 0;
    gameState.isActive = true;
    gameState.startTime = Date.now();
    gameState.timeLeft = 60;

    elements.typingInput.disabled = false;
    elements.typingInput.value = '';
    elements.typingInput.focus();
    elements.startBtn.disabled = true;
    elements.themeSelect.disabled = true;
    elements.results.classList.remove('show');
    elements.timer.classList.add('show');

    updateTextDisplay();
    updateStats();
    startTimer();
}

/**
 * Starts the countdown timer.
 */
function startTimer() {
    elements.timer.textContent = `${gameState.timeLeft}s`;
    
    // Clear any existing timer just in case
    if (gameState.timer) clearInterval(gameState.timer);

    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        elements.timer.textContent = `${gameState.timeLeft}s`;
        
        if (gameState.timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

/**
 * Ends the typing test and displays final results.
 */
function endTest() {
    gameState.isActive = false;
    clearInterval(gameState.timer);
    
    elements.typingInput.disabled = true;
    elements.startBtn.disabled = false;
    elements.themeSelect.disabled = false;
    elements.timer.classList.remove('show');

    // Calculate final statistics
    const totalTimeElapsed = 60 - gameState.timeLeft; // Time elapsed in seconds (max 60)
    const timeUsed = Math.round(totalTimeElapsed > 0 ? totalTimeElapsed : 1);
    
    // Only count words that are fully and correctly typed up to the final index
    const completedText = gameState.userInput.substring(0, gameState.currentText.length);
    const finalWords = completedText.trim().split(/\s+/).filter(word => word.length > 0).length;

    const finalWpm = Math.round((finalWords / timeUsed) * 60);
    
    const correctCharacters = gameState.totalCharacters - gameState.errors;
    const finalAccuracy = gameState.totalCharacters > 0 ? 
        Math.round((correctCharacters / gameState.totalCharacters) * 100) : 100;

    // Display results
    elements.finalWpm.textContent = finalWpm;
    elements.finalAccuracy.textContent = `${finalAccuracy}%`;
    elements.finalErrors.textContent = gameState.errors;
    elements.finalTime.textContent = `${timeUsed}s`;
    elements.results.classList.add('show');
}

/**
 * Resets the application state and UI.
 */
function resetTest() {
    gameState.isActive = false;
    gameState.startTime = null;
    gameState.timeLeft = 60;
    gameState.currentText = '';
    gameState.userInput = '';
    gameState.currentIndex = 0;
    gameState.errors = 0;
    gameState.totalCharacters = 0;
    
    clearInterval(gameState.timer);
    
    elements.typingInput.disabled = true;
    elements.typingInput.value = '';
    elements.startBtn.disabled = false;
    elements.themeSelect.disabled = false;
    elements.timer.classList.remove('show');
    elements.results.classList.remove('show');
    elements.textDisplay.innerHTML = 'Select a theme and click "Start Test" to begin your typing challenge!';
    
    // Reset live stats display
    elements.wpmValue.textContent = '0';
    elements.accuracyValue.textContent = '100';
    elements.errorsValue.textContent = '0';
    elements.charactersValue.textContent = '0';
}

/**
 * Handles all typing input events, checks for errors, and updates display/stats.
 * @param {Event} event - The input event.
 */
function handleTyping(event) {
    if (!gameState.isActive) return;

    const input = event.target.value;
    const previousLength = gameState.userInput.length;
    const textLength = gameState.currentText.length;
    
    // Ensure input doesn't exceed the length of the paragraph
    if (input.length > textLength) {
        // Prevent typing past the end of the required text
        event.target.value = gameState.userInput;
        return;
    }
    
    gameState.userInput = input;
    
    // Update total characters typed (which is the length of the input)
    gameState.totalCharacters = input.length;

    // Error logic: check the last character typed
    if (input.length > previousLength) {
        const charIndex = input.length - 1;
        if (charIndex < textLength && input[charIndex] !== gameState.currentText[charIndex]) {
            gameState.errors++;
        }
    } 
    // Handle backspace/deletion: You may need more complex logic here 
    // to strictly track errors if the user deletes a *previously made error*,
    // but for simplicity, the current logic tracks total accumulated errors.
    // For a strict WPM test, often errors are only counted on typing, not on correcting.
    
    // Check if test is complete (user has typed the entire paragraph)
    if (input.length === textLength) {
        endTest();
        return;
    }

    updateTextDisplay();
    updateStats();
}

// Event listeners
elements.startBtn.addEventListener('click', startTest);
elements.resetBtn.addEventListener('click', resetTest);
elements.typingInput.addEventListener('input', handleTyping);

// Prevent Enter key from causing unintended behavior (like a newline)
elements.typingInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// Initial application setup
window.onload = resetTest;
// Note: I've removed the specific 'elementSdk' logic as it seems proprietary
// to your environment and unnecessary for the core functionality.
// If you need it, you can re-integrate it here.
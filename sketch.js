// Global variables
let particles = []; // Particle system
let weatherData; // Weather data
let weatherType = ""; // Weather type
let isOracleRevealed = false; // Oracle revealed flag
let emotion = ""; // Stored emotion text
let canvas; // p5.js canvas

// API key and city
const apiKey = "d68f88934a51c75a9ac721f0f55a6ae9";
const city = "New York";

// Make functions globally accessible
window.showWelcomeScreen = showWelcomeScreen;
window.showInputScreen = showInputScreen;
window.showLoadingScreen = showLoadingScreen;
window.showOracleScreen = showOracleScreen;
window.startDivination = startDivination;
window.shareReading = shareReading;

// Emotion categories and keywords
const emotionCategories = {
    Joy: ["happy", "joy", "delighted", "excited", "cheerful", "ecstatic", "glad", "pleased", "thrilled", "content"],
    Sadness: ["sad", "unhappy", "depressed", "gloomy", "miserable", "melancholy", "downcast", "blue", "sorrowful"],
    Anger: ["angry", "mad", "furious", "enraged", "irritated", "annoyed", "frustrated", "bitter", "indignant"],
    Fear: ["afraid", "scared", "fearful", "terrified", "anxious", "worried", "nervous", "panicked", "alarmed"],
    Surprise: ["surprised", "amazed", "astonished", "shocked", "stunned", "startled", "astounded", "dumbfounded"],
    Disgust: ["disgusted", "revolted", "repulsed", "sickened", "appalled", "nauseous", "offended", "averse"],
    Calm: ["calm", "peaceful", "relaxed", "serene", "tranquil", "composed", "centered", "collected", "quiet"],
    Confused: ["confused", "perplexed", "puzzled", "baffled", "bewildered", "disoriented", "uncertain", "lost"],
    Hopeful: ["hopeful", "optimistic", "expectant", "anticipating", "encouraged", "confident", "assured", "positive"],
    Tired: ["tired", "exhausted", "fatigued", "weary", "drained", "sleepy", "spent", "worn out", "drowsy"]
};

// Emotion response prefixes
const emotionPrefixes = {
    Joy: [
        "Your radiance harmonizes with",
        "Your light shines brighter against",
        "The warmth within you complements"
    ],
    Sadness: [
        "Your depths resonate with",
        "Your melancholy finds reflection in",
        "The weight you carry is witnessed by"
    ],
    Anger: [
        "Your fire is acknowledged by",
        "Your intensity finds perspective in",
        "The heat of your emotion interacts with"
    ],
    Fear: [
        "Your apprehension is held within",
        "Your uncertainty is embraced by",
        "The shadows you perceive are illuminated by"
    ],
    Surprise: [
        "Your awakened awareness perceives",
        "Your sudden shift in perception reveals",
        "The unexpected within you aligns with"
    ],
    Disgust: [
        "Your resistance is transformed through",
        "Your aversion finds cleansing within",
        "The rejection you feel is reframed by"
    ],
    Calm: [
        "Your stillness deepens with",
        "Your inner peace reflects",
        "The quiet center within you expands through"
    ],
    Confused: [
        "Your questions find space in",
        "Your uncertainty is honored by",
        "The mystery you face is contextualized within"
    ],
    Hopeful: [
        "Your anticipation resonates with",
        "Your forward gaze is supported by",
        "The seed of possibility within you is nurtured by"
    ],
    Tired: [
        "Your need for restoration is cradled by",
        "Your depleted energy is replenished through",
        "The respite you seek is offered within"
    ],
    Default: [
        "Your present state intertwines with",
        "Your experience is reflected in",
        "The essence of your being communes with"
    ]
};

// Oracle message database
const oracleMessages = {
    Clear: [
        "The clear sky mirrors your inner state. What you seek is already within you, waiting in the light.",
        "Like the sun that casts no shadow in its zenith, your true path requires no validation from others.",
        "In clarity, we find our truest reflections. The universe sees you clearly now.",
        "The brightness above speaks to the potential within. What seeds will you plant in this fertile light?",
        "When skies are clear, we can see furthest. Look beyond your immediate horizon."
    ],
    Clouds: [
        "Between clouds exists perspective. Your emotions are valid veils through which you perceive reality.",
        "The clouds gather but do not yet speak. Patience will reveal what remains hidden from view.",
        "Neither clear nor storming - you stand at a threshold of change. The decision to step forward is yours alone.",
        "Clouds collect thoughts as you collect feelings. Not every gathering leads to rain.",
        "In the soft diffusion of light through cloud, find gentleness for yourself."
    ],
    Rain: [
        "The rain cleanses what no longer serves. Allow your emotions to flow without judgment.",
        "Each droplet follows its destined path downward. Trust that your journey unfolds as it should.",
        "The earth receives the sky's gift without resistance. What might you receive if you opened fully?",
        "Between sky and earth, water connects worlds. You are a bridge between seemingly separate realms.",
        "The rhythm of raindrops speaks an ancient language. Listen to the wisdom beneath the surface noise."
    ],
    Default: [
        "The elements speak in cycles and patterns. Your current state is neither permanent nor accidental.",
        "Between earth and sky, you stand as witness to the dance of forces greater than yourself.",
        "The weather of your mind creates landscapes of possibility. What climate will you cultivate?",
        "External conditions reflect inner realities. What weather system moves through your being now?",
        "You are both the observer and the observed. The oracle sees you as you see it."
    ]
};

// Weather color definitions
const weatherColors = {
    Clear: {
        hue: 50,    // Golden yellow
        sat: 80,
        bright: 90
    },
    Clouds: {
        hue: 220,   // Blue-grey
        sat: 30,
        bright: 70
    },
    Rain: {
        hue: 200,   // Blue
        sat: 70,
        bright: 60
    },
    Thunderstorm: {
        hue: 270,   // Purple
        sat: 90,
        bright: 80
    },
    Snow: {
        hue: 190,   // Light blue
        sat: 20,
        bright: 95
    },
    Default: {
        hue: 200,   // Default blue
        sat: 60,
        bright: 80
    }
};

// Emotion color and behavior definitions
const emotionEffects = {
    Joy: {
        hue: 60,    // Yellow
        sat: 90,
        bright: 95,
        speedMult: 1.5,
        sizeMult: 1.3,
        spinMult: 1.2
    },
    Sadness: {
        hue: 230,   // Blue
        sat: 50,
        bright: 50,
        speedMult: 0.7,
        sizeMult: 0.8,
        spinMult: 0.5
    },
    Anger: {
        hue: 0,     // Red
        sat: 100,
        bright: 85,
        speedMult: 2,
        sizeMult: 1.5,
        spinMult: 2
    },
    Fear: {
        hue: 280,   // Purple
        sat: 70,
        bright: 40,
        speedMult: 1.8,
        sizeMult: 0.7,
        spinMult: 1.5
    },
    Surprise: {
        hue: 300,   // Bright magenta/pink
        sat: 85,
        bright: 90,
        speedMult: 1.7,
        sizeMult: 1.2,
        spinMult: 1.8
    },
    Disgust: {
        hue: 120,   // Sickly green
        sat: 70,
        bright: 60,
        speedMult: 0.9,
        sizeMult: 0.6,
        spinMult: 1.3
    },
    Calm: {
        hue: 160,   // Soft green
        sat: 40,
        bright: 80,
        speedMult: 0.6,
        sizeMult: 1.1,
        spinMult: 0.3
    },
    Confused: {
        hue: 270,   // Soft purple
        sat: 45,
        bright: 75,
        speedMult: 1.2,
        sizeMult: 0.9,
        spinMult: 2.5    // Fast spinning to represent confusion
    },
    Hopeful: {
        hue: 180,   // Turquoise
        sat: 60,
        bright: 85,
        speedMult: 1.3,
        sizeMult: 1.2,
        spinMult: 0.8
    },
    Tired: {
        hue: 30,    // Muted orange/brown
        sat: 30,
        bright: 60,
        speedMult: 0.4,  // Slow movement
        sizeMult: 1.4,   // Larger particles
        spinMult: 0.2    // Very slow spin
    },
    Default: {
        hue: 200,
        sat: 60,
        bright: 80,
        speedMult: 1,
        sizeMult: 1,
        spinMult: 1
    }
};

// Setup function
function setup() {
    // Create canvas inside canvas-container
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    // Set color mode to HSB
    colorMode(HSB, 360, 100, 100, 100);
    
    // Initialize particles with default properties
    initializeParticles();
    
    // Setup emotion suggestions
    setupEmotionSuggestions();
    
    // Get initial weather data
    getInitialWeather();
}

// Initialize particles with default rain-like properties
function initializeParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        let p = new Particle();
        // Set initial rain-like properties
        p.color = color(200, 70, 60, 70); // Blue-ish color for rain
        p.vel = createVector(random(-0.5, 0.5), random(1, 3)); // Falling motion
        p.baseSpeed = 1.5;
        p.spinSpeed = 0.03;
        particles.push(p);
    }
}

// Get initial weather data
function getInitialWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    loadJSON(url, (data) => {
        weatherData = data;
        weatherType = data.weather[0].main;
        console.log('Initial weather:', weatherType);
        
        // Update particles based on weather
        updateParticlesForWeather(weatherType, 'Default');
    }, (err) => {
        console.log('Error getting initial weather:', err);
    });
}

// Draw loop
function draw() {
    // Clear background with slight fade effect
    background(0, 0, 0, 10);
    
    // Update and display particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }
}

// Window resize adjustment
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Ensure particles stay within new boundaries
    for (let p of particles) {
        if (p.pos.x > width) p.pos.x = width;
        if (p.pos.y > height) p.pos.y = height;
    }
}

// UI Navigation Functions
function showWelcomeScreen() {
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('input-screen').style.display = 'none';
    document.getElementById('oracle-screen').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'none';
    
    // Add hint about particle effects
    const hintElement = document.createElement('p');
    hintElement.className = 'particle-hint';
    hintElement.textContent = '✨ The background particles are influenced by your emotions and New York\'s current weather ✨';
    hintElement.style.cssText = 'text-align: center; color: rgba(255, 255, 255, 0.8); font-style: italic; margin-top: 10px; font-size: 0.9em;';
    
    const welcomeScreen = document.getElementById('welcome-screen');
    // Insert hint after the first element in welcome screen
    if (welcomeScreen.firstChild) {
        welcomeScreen.insertBefore(hintElement, welcomeScreen.firstChild.nextSibling);
    } else {
        welcomeScreen.appendChild(hintElement);
    }
}

function showInputScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('input-screen').style.display = 'block';
    document.getElementById('oracle-screen').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('emotion-input').value = '';
    // Keep current particles
}

function showLoadingScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('input-screen').style.display = 'none';
    document.getElementById('oracle-screen').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';
    // Keep current particles
}

function showOracleScreen() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('input-screen').style.display = 'none';
    document.getElementById('oracle-screen').style.display = 'block';
    document.getElementById('loading-screen').style.display = 'none';
    // Keep current particles
}

// Emotion suggestions setup
function setupEmotionSuggestions() {
    const input = document.getElementById('emotion-input');
    const suggestionsContainer = document.getElementById('emotion-suggestions');
    
    // Create suggestion chips for common emotions
    Object.entries(emotionCategories).forEach(([category, keywords]) => {
        keywords.slice(0, 3).forEach(keyword => {
            const chip = document.createElement('button');
            chip.className = 'emotion-chip';
            chip.textContent = keyword;
            chip.onclick = () => {
                input.value = keyword;
            };
            suggestionsContainer.appendChild(chip);
        });
    });
}

// Determine emotion category based on input text
function detectEmotionCategory(emotionText) {
    emotionText = emotionText.toLowerCase();
    
    // Check each emotion category for keyword matches
    for (const [category, keywords] of Object.entries(emotionCategories)) {
        for (const keyword of keywords) {
            if (emotionText.includes(keyword)) {
                console.log('Detected emotion category:', category);
                return category;
            }
        }
    }
    
    // Default if no match found
    console.log('No specific emotion category detected, using Default');
    return "Default";
}

// Start divination process
function startDivination() {
    emotion = document.getElementById('emotion-input').value;
    if (emotion.trim() === "") {
        alert("Please describe your emotion first");
        return;
    }
    
    console.log('Starting divination with emotion:', emotion);
    showLoadingScreen();
    
    // Call OpenWeatherMap API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    loadJSON(url, gotWeatherData, weatherError);
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// Format temperature with both units
function formatTemperature(celsius) {
    const fahrenheit = celsiusToFahrenheit(celsius);
    return `${Math.round(celsius)}°C (${Math.round(fahrenheit)}°F)`;
}

// Weather data received
function gotWeatherData(data) {
    weatherData = data;
    weatherType = data.weather[0].main;
    const emotionCategory = detectEmotionCategory(emotion);
    
    // Update weather info display
    document.getElementById('weather-type').textContent = weatherType;
    document.getElementById('temperature').textContent = formatTemperature(data.main.temp);
    document.getElementById('humidity').textContent = `${data.main.humidity}% Humidity`;
    
    // Update particle system with both weather and emotion
    updateParticlesForWeather(weatherType, emotionCategory);
    
    // Generate and display oracle message
    generateOracleText(emotion, weatherType, data);
    
    // Show oracle screen after a short delay
    setTimeout(() => {
        showOracleScreen();
    }, 1500);
}

// Reset particle system
function resetParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

// Share reading functionality
function shareReading() {
    const oracleMessage = document.getElementById('oracle-message').textContent;
    const weatherInfo = document.getElementById('weather-type').textContent;
    const tempInfo = document.getElementById('temperature').textContent;
    
    const shareText = `✨ My Digital Divination Reading ✨\n\n` +
                     `Weather in New York: ${weatherInfo}\n` +
                     `Temperature: ${tempInfo}\n\n` +
                     `Oracle's Message:\n${oracleMessage}`;

    // Create a modal dialog for sharing options
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 20px;
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
        min-width: 300px;
        text-align: center;
        color: white;
    `;

    const title = document.createElement('h3');
    title.textContent = 'Share Your Reading';
    title.style.marginBottom = '20px';
    modal.appendChild(title);

    // Share buttons container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '10px';

    // Native share button (for mobile)
    if (navigator.share) {
        const nativeShareBtn = createShareButton('Share', '📱', () => {
            navigator.share({
                title: 'Digital Divination Reading',
                text: shareText
            }).catch(console.error);
            document.body.removeChild(modal);
        });
        buttonContainer.appendChild(nativeShareBtn);
    }

    // Copy to clipboard button
    const copyBtn = createShareButton('Copy to Clipboard', '📋', () => {
        navigator.clipboard.writeText(shareText)
            .then(() => {
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 1000);
            })
            .catch(console.error);
    });
    buttonContainer.appendChild(copyBtn);

    // Close button
    const closeBtn = createShareButton('Close', '❌', () => {
        document.body.removeChild(modal);
    });
    buttonContainer.appendChild(closeBtn);

    modal.appendChild(buttonContainer);

    // Add modal backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    `;
    backdrop.onclick = () => {
        document.body.removeChild(backdrop);
        document.body.removeChild(modal);
    };

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
}

// Helper function to create share buttons
function createShareButton(text, icon, onClick) {
    const button = document.createElement('button');
    button.innerHTML = `${icon} ${text}`;
    button.style.cssText = `
        padding: 10px 20px;
        margin: 5px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 16px;
    `;
    button.onmouseover = () => {
        button.style.background = 'rgba(255, 255, 255, 0.2)';
    };
    button.onmouseout = () => {
        button.style.background = 'rgba(255, 255, 255, 0.1)';
    };
    button.onclick = onClick;
    return button;
}

// Update particles based on weather and emotion
function updateParticlesForWeather(weatherType, emotionCategory) {
    const weather = weatherColors[weatherType] || weatherColors.Default;
    const emotion = emotionEffects[emotionCategory] || emotionEffects.Default;
    const particleCount = 100;
    
    // Create new particles
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        let p = new Particle();
        
        if (emotionCategory === 'Default' || !emotionCategory) {
            // Pure weather effect
            p.color = color(
                weather.hue + random(-5, 5),
                weather.sat + random(-5, 5),
                weather.bright + random(-5, 5),
                70
            );
            p.baseSpeed = 1;
            p.spinSpeed = 0.02;
            p.baseSize = random(3, 8);
        } else {
            // 50/50 mix of weather and emotion
            if (random() < 0.5) {
                // Weather particle
                p.color = color(
                    weather.hue + random(-5, 5),
                    weather.sat + random(-5, 5),
                    weather.bright + random(-5, 5),
                    70
                );
            } else {
                // Emotion particle
                p.color = color(
                    emotion.hue + random(-5, 5),
                    emotion.sat + random(-5, 5),
                    emotion.bright + random(-5, 5),
                    70
                );
            }
            
            // Apply emotion's movement effects
            p.baseSpeed = emotion.speedMult;
            p.spinSpeed = 0.02 * emotion.spinMult;
            p.baseSize = random(3, 8) * emotion.sizeMult;
        }
        
        // Apply weather-specific movement patterns
        switch(weatherType) {
            case 'Rain':
            case 'Drizzle':
                p.vel = createVector(random(-0.5, 0.5), random(2, 4));
                p.isRain = true;
                break;
            case 'Snow':
                p.vel = createVector(random(-0.5, 0.5), random(0.5, 1));
                p.isSnow = true;
                break;
            case 'Thunderstorm':
                p.vel = createVector(random(-2, 2), random(-2, 2));
                p.isStorm = true;
                break;
            default:
                p.vel = createVector(random(-1, 1), random(-1, 1));
        }
        
        particles.push(p);
    }
}

// Generate oracle text based on emotion and weather
function generateOracleText(emotionText, weatherType, weatherData) {
    console.log('Generating oracle text for:', emotionText, weatherType);
    
    // Get weather messages for current weather
    let weatherMessages = oracleMessages[weatherType] || oracleMessages.Default;
    
    // Detect emotion category from input text
    const emotionCategory = detectEmotionCategory(emotionText);
    console.log('Detected emotion category:', emotionCategory);
    
    // Get prefixes for this emotion
    const prefixes = emotionPrefixes[emotionCategory] || emotionPrefixes.Default;
    
    // Choose random prefix and message
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const message = weatherMessages[Math.floor(Math.random() * weatherMessages.length)];
    
    // Construct final oracle text
    const tempC = Math.round(weatherData.main.temp);
    const tempDescription = weatherData.main.temp < 10 ? "the cold" : 
                          weatherData.main.temp > 25 ? "the warm" : "the mild";
    
    // Final oracle text
    const finalMessage = `${prefix} ${tempDescription} ${weatherType.toLowerCase()} skies of New York.\n\n${message}`;
    
    // Add temperature and humidity information as a subtle hint
    const humidity = weatherData.main.humidity;
    
    // Add a mystical postscript with both temperature units
    const fullMessage = `${finalMessage}\n\n${formatTemperature(weatherData.main.temp)} and ${humidity}% humidity whisper: Remember this moment.`;
    
    console.log('Generated oracle message:', fullMessage);
    
    // Update the oracle message element with line breaks
    const oracleElement = document.getElementById('oracle-message');
    oracleElement.innerHTML = fullMessage.replace(/\n\n/g, '<br><br>');
    oracleElement.style.whiteSpace = 'pre-line';
}

// Weather error handling
function weatherError(err) {
    console.log("Error fetching weather data:", err);
    const oracleElement = document.getElementById('oracle-message');
    oracleElement.innerHTML = "The oracle is silent today... Please try again later.";
    oracleElement.style.whiteSpace = 'pre-line';
    showOracleScreen();
}

// Particle class
class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.baseSize = random(3, 8);
        this.size = this.baseSize;
        this.baseSpeed = 1;
        this.spinSpeed = 0.02;
        this.angle = random(TWO_PI);
        this.isRain = false;
        this.isSnow = false;
        this.isStorm = false;
    }
    
    update() {
        // Update angle for rotation
        this.angle += this.spinSpeed;
        
        // Apply velocity with base speed
        let finalVel = p5.Vector.mult(this.vel, this.baseSpeed);
        
        // Add weather-specific behaviors
        if (this.isRain) {
            finalVel.y += 0.1; // Gravity effect for rain
        } else if (this.isSnow) {
            finalVel.x += sin(frameCount * 0.05) * 0.1; // Swaying effect for snow
        } else if (this.isStorm) {
            finalVel.rotate(sin(frameCount * 0.1) * 0.2); // Chaotic movement for storm
        }
        
        this.pos.add(finalVel);
        
        // Wrap around screen edges
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
        
        // Size pulsing effect
        this.size = this.baseSize + sin(frameCount * 0.05) * (this.baseSize * 0.2);
    }
    
    display() {
        noStroke();
        fill(this.color);
        
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        
        if (this.isRain) {
            // Elongated shape for rain
            rect(-this.size/4, -this.size, this.size/2, this.size*2);
        } else if (this.isSnow) {
            // Star shape for snow
            beginShape();
            for (let i = 0; i < 6; i++) {
                let ang = TWO_PI * i / 6;
                let r1 = this.size;
                let r2 = this.size * 0.4;
                let x1 = cos(ang) * r1;
                let y1 = sin(ang) * r1;
                let x2 = cos(ang + TWO_PI/12) * r2;
                let y2 = sin(ang + TWO_PI/12) * r2;
                vertex(x1, y1);
                vertex(x2, y2);
            }
            endShape(CLOSE);
        } else {
            // Default circular shape
            ellipse(0, 0, this.size * 2);
        }
        
        pop();
    }
}

// Make sure canvas stays on top of all screens
window.onload = function() {
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
        canvasContainer.style.zIndex = '1';
        const appContainer = document.querySelector('.app-container');
        appContainer.style.zIndex = '2';
        // Add transition for smooth visibility toggle
        appContainer.style.transition = 'opacity 0.3s ease';
    }

    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-interface';
    toggleButton.innerHTML = '👁️ Hide Interface';
    toggleButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 8px 15px;
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        border-radius: 20px;
        cursor: pointer;
        z-index: 1000;
        font-size: 14px;
        transition: all 0.3s ease;
    `;

    // Add hover effect
    toggleButton.onmouseover = function() {
        this.style.background = 'rgba(0, 0, 0, 0.8)';
    };
    toggleButton.onmouseout = function() {
        this.style.background = 'rgba(0, 0, 0, 0.6)';
    };

    // Add click handler with improved visibility toggle
    toggleButton.onclick = function() {
        const appContainer = document.querySelector('.app-container');
        if (appContainer.style.opacity !== '0') {
            appContainer.style.opacity = '0';
            appContainer.style.visibility = 'hidden';
            this.innerHTML = '👁️ Show Interface';
        } else {
            appContainer.style.opacity = '1';
            appContainer.style.visibility = 'visible';
            this.innerHTML = '👁️ Hide Interface';
        }
    };

    document.body.appendChild(toggleButton);
}; 
// Global variables
let emotionInput; // Emotion input field
let submitButton; // Submit button
let oracleText = ""; // Oracle text
let oracleOpacity = 0; // Oracle text opacity
let particles = []; // Particle system
let weatherData; // Weather data
let weatherType = ""; // Weather type
let isOracleRevealed = false; // Oracle revealed flag
let emotion = ""; // Stored emotion text

// API key and city
const apiKey = "d68f88934a51c75a9ac721f0f55a6ae9";
const city = "New York";

// Oracle message database
const oracleMessages = {
  // Clear weather oracle messages
  Clear: [
    "The clear sky mirrors your inner state. What you seek is already within you, waiting in the light.",
    "Like the sun that casts no shadow in its zenith, your true path requires no validation from others.",
    "In clarity, we find our truest reflections. The universe sees you clearly now.",
    "The brightness above speaks to the potential within. What seeds will you plant in this fertile light?",
    "When skies are clear, we can see furthest. Look beyond your immediate horizon."
  ],
  
  // Cloudy weather oracle messages
  Clouds: [
    "Between clouds exists perspective. Your emotions are valid veils through which you perceive reality.",
    "The clouds gather but do not yet speak. Patience will reveal what remains hidden from view.",
    "Neither clear nor storming - you stand at a threshold of change. The decision to step forward is yours alone.",
    "Clouds collect thoughts as you collect feelings. Not every gathering leads to rain.",
    "In the soft diffusion of light through cloud, find gentleness for yourself."
  ],
  
  // Rainy weather oracle messages
  Rain: [
    "The rain cleanses what no longer serves. Allow your emotions to flow without judgment.",
    "Each droplet follows its destined path downward. Trust that your journey unfolds as it should.",
    "The earth receives the sky's gift without resistance. What might you receive if you opened fully?",
    "Between sky and earth, water connects worlds. You are a bridge between seemingly separate realms.",
    "The rhythm of raindrops speaks an ancient language. Listen to the wisdom beneath the surface noise."
  ],
  
  // Drizzle weather oracle messages
  Drizzle: [
    "Gentle persistence reshapes the hardest stone. Your quiet efforts matter more than you know.",
    "The soft touch of drizzle reminds us that transformation need not be dramatic to be profound.",
    "Neither dry nor drenched - you exist in the in-between spaces where growth is subtle but certain.",
    "The misty veil between worlds thins. Trust the whispers you hear at the edges of awareness.",
    "Small droplets gather to nurture life. Your small acts of kindness create ripples of change."
  ],
  
  // Thunderstorm weather oracle messages
  Thunderstorm: [
    "Electric potential seeks balance. The tension you feel precedes necessary transformation.",
    "The storm speaks with many voices. Which will you choose to hear above the noise?",
    "Between lightning and thunder lies a moment of perfect stillness. Find this space within yourself.",
    "Power reveals itself in moments of intensity. Your own power surges beneath the surface.",
    "The air clears after the tempest. What will you build in the calm that follows?"
  ],
  
  // Snow weather oracle messages
  Snow: [
    "Each snowflake follows a unique path to the same destination. Your journey belongs to you alone.",
    "Under the blanket of white, life waits in quiet potential. What sleeps within you now?",
    "Silence falls with the snow. In this quietude, your inner voice can finally be heard.",
    "The world transforms beneath the gentle weight of snow. Allow yourself to be changed by grace.",
    "What seems like an ending may be a necessary dormancy. Trust the seasons of your life."
  ],
  
  // Mist/Fog weather oracle messages
  Mist: [
    "In the mist, familiar landmarks disappear. Navigate by your inner compass when external guidance fades.",
    "The boundary between known and unknown blurs. Step carefully but without fear into uncertainty.",
    "Close horizons invite intimate attention. What details have you overlooked in broader vistas?",
    "Not all clarity comes through sight. Develop your other senses when the path ahead is veiled.",
    "The mist holds secrets and possibilities. Embrace the mystery that surrounds you now."
  ],
  
  // Default/Other weather oracle messages
  Default: [
    "The elements speak in cycles and patterns. Your current state is neither permanent nor accidental.",
    "Between earth and sky, you stand as witness to the dance of forces greater than yourself.",
    "The weather of your mind creates landscapes of possibility. What climate will you cultivate?",
    "External conditions reflect inner realities. What weather system moves through your being now?",
    "You are both the observer and the observed. The oracle sees you as you see it."
  ]
};

// Emotion categories and keywords
const emotionCategories = {
  Joy: ["happy", "joy", "delighted", "excited", "cheerful", "ecstatic", "glad", "pleased", "thrilled", "content", "elated", "jubilant", "satisfied"],
  Sadness: ["sad", "unhappy", "depressed", "gloomy", "miserable", "melancholy", "downcast", "blue", "sorrowful", "dejected", "disheartened", "down", "heartbroken"],
  Anger: ["angry", "mad", "furious", "enraged", "irritated", "annoyed", "frustrated", "bitter", "indignant", "outraged", "resentful", "irate", "livid"],
  Fear: ["afraid", "scared", "fearful", "terrified", "anxious", "worried", "nervous", "panicked", "alarmed", "dreading", "frightened", "apprehensive", "uneasy"],
  Surprise: ["surprised", "amazed", "astonished", "shocked", "stunned", "startled", "astounded", "dumbfounded", "speechless", "awestruck", "bewildered", "taken aback"],
  Disgust: ["disgusted", "revolted", "repulsed", "sickened", "appalled", "nauseous", "offended", "averse", "loathing", "abhorrent", "detestable"],
  Calm: ["calm", "peaceful", "relaxed", "serene", "tranquil", "composed", "centered", "collected", "quiet", "still", "untroubled", "undisturbed", "placid"],
  Confused: ["confused", "perplexed", "puzzled", "baffled", "bewildered", "disoriented", "uncertain", "lost", "unsure", "indecisive", "ambivalent", "doubtful"],
  Hopeful: ["hopeful", "optimistic", "expectant", "anticipating", "looking forward", "encouraged", "confident", "assured", "positive", "upbeat", "enthusiastic"],
  Tired: ["tired", "exhausted", "fatigued", "weary", "drained", "sleepy", "spent", "worn out", "burned out", "lethargic", "sluggish", "drowsy"]
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

// Setup function
function setup() {
  // Create canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  // Create emotion input field
  emotionInput = createInput();
  emotionInput.position(width/2 - 100, height/2);
  emotionInput.size(200, 30);
  emotionInput.attribute('placeholder', 'Describe your current mood or emotion...');
  emotionInput.parent('container');
  
  // Create submit button
  submitButton = createButton('Start Divination');
  submitButton.position(width/2 - 50, height/2 + 50);
  submitButton.size(100, 40);
  submitButton.mousePressed(startDivination);
  submitButton.parent('container');
  
  // Set basic drawing parameters
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
}

// Draw loop
function draw() {
  // Gradient background
  background(0, 0, 0, 10);
  
  // If oracle is revealed, draw particles and text
  if (isOracleRevealed) {
    // Update and display all particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].display();
    }
    
    // Fade in oracle text
    if (oracleOpacity < 100) {
      oracleOpacity += 0.5;
    }
    
    // Draw oracle text (with slight trembling effect)
    push();
    fill(255, 255, 255, oracleOpacity);
    textSize(24);
    textStyle(ITALIC);
    // Text slight trembling
    let offsetX = random(-1, 1);
    let offsetY = random(-1, 1);
    text(oracleText, width/2 + offsetX, height/2 + offsetY, width * 0.7, 200);
    pop();
  }
}

// Window resize adjustment
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reposition input and button
  emotionInput.position(width/2 - 100, height/2);
  submitButton.position(width/2 - 50, height/2 + 50);
}

// Start divination process
function startDivination() {
  emotion = emotionInput.value();
  if (emotion.trim() === "") {
    alert("Please describe your emotion first");
    return;
  }
  
  // Hide input and button
  emotionInput.style('display', 'none');
  submitButton.style('display', 'none');
  
  // Show "Connecting to weather oracle..." message
  oracleText = "Connecting to weather oracle...";
  isOracleRevealed = true;
  
  // Create initial particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  
  // Call OpenWeatherMap API
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  loadJSON(url, gotWeatherData, weatherError);
}

// Weather data received
function gotWeatherData(data) {
  weatherData = data;
  weatherType = data.weather[0].main;
  console.log("Weather type:", weatherType);
  console.log("Temperature:", data.main.temp);
  console.log("Humidity:", data.main.humidity);
  
  // Update particle properties based on weather
  updateParticlesForWeather(weatherType);
  
  // Generate oracle text based on emotion and weather
  generateOracleText(emotion, weatherType, data);
}

// Weather error handling
function weatherError(err) {
  console.log("Error fetching weather data:", err);
  oracleText = "The oracle is silent today... Please try again later.";
}

// Update particles based on weather type
function updateParticlesForWeather(weatherType) {
  // Clear existing particles
  particles = [];
  
  // Create new particles based on weather
  let particleCount = 150;
  let hueRange, saturation, brightness;
  
  switch(weatherType) {
    case "Clear":
      hueRange = [40, 60]; // Yellow/gold tones
      saturation = 80;
      brightness = 90;
      break;
    case "Clouds":
      hueRange = [200, 240]; // Blue-grey tones
      saturation = 30;
      brightness = 70;
      break;
    case "Rain":
    case "Drizzle":
      hueRange = [180, 220]; // Blue tones
      saturation = 70;
      brightness = 60;
      break;
    case "Thunderstorm":
      hueRange = [250, 280]; // Purple tones
      saturation = 90;
      brightness = 80;
      break;
    case "Snow":
      hueRange = [180, 220]; // Light blue tones
      saturation = 10;
      brightness = 95;
      break;
    case "Mist":
    case "Fog":
    case "Haze":
      hueRange = [180, 200]; // Light cyan tones
      saturation = 20;
      brightness = 70;
      break;
    default:
      hueRange = [0, 360]; // Full spectrum
      saturation = 60;
      brightness = 80;
  }
  
  // Create new weather-influenced particles
  for (let i = 0; i < particleCount; i++) {
    let particle = new Particle();
    particle.color = color(
      random(hueRange[0], hueRange[1]),
      saturation + random(-20, 20),
      brightness + random(-20, 20),
      70
    );
    
    // Adjust particle speed/size based on weather
    if (weatherType === "Rain" || weatherType === "Drizzle") {
      particle.vel = createVector(random(-0.5, 0.5), random(1, 3)); // Falling down
      particle.size = random(2, 5);
    } else if (weatherType === "Snow") {
      particle.vel = createVector(random(-0.5, 0.5), random(0.2, 1)); // Slow falling
      particle.size = random(3, 6);
    } else if (weatherType === "Thunderstorm") {
      particle.vel = createVector(random(-2, 2), random(-2, 2)); // Chaotic
      particle.size = random(2, 8);
    }
    
    particles.push(particle);
  }
}

// Determine emotion category based on input text
function detectEmotionCategory(emotionText) {
  emotionText = emotionText.toLowerCase();
  
  // Check each emotion category for keyword matches
  for (const [category, keywords] of Object.entries(emotionCategories)) {
    for (const keyword of keywords) {
      if (emotionText.includes(keyword)) {
        return category;
      }
    }
  }
  
  // Default if no match found
  return "Default";
}

// Generate oracle text based on emotion and weather
function generateOracleText(emotionText, weatherType, weatherData) {
  // Show loading message
  oracleText = "The oracle is forming a message for you...";
  
  // Delay to create sense of ritual
  setTimeout(() => {
    // Get weather messages for current weather
    let weatherMessages;
    if (oracleMessages[weatherType]) {
      weatherMessages = oracleMessages[weatherType];
    } else {
      // Fallback to default messages if weather type not found
      weatherMessages = oracleMessages.Default;
    }
    
    // Detect emotion category from input text
    const emotionCategory = detectEmotionCategory(emotionText);
    
    // Get prefixes for this emotion
    const prefixes = emotionPrefixes[emotionCategory] || emotionPrefixes.Default;
    
    // Choose random prefix and message
    const prefix = prefixes[Math.floor(random(prefixes.length))];
    const message = weatherMessages[Math.floor(random(weatherMessages.length))];
    
    // Construct final oracle text
    const tempDescription = weatherData.main.temp < 10 ? "the cold" : 
                          weatherData.main.temp > 25 ? "the warm" : "the mild";
    
    // Final oracle text
    oracleText = `${prefix} ${tempDescription} ${weatherType.toLowerCase()} skies of New York.\n\n${message}`;
    
    // Add temperature and humidity information as a subtle hint
    const tempC = Math.round(weatherData.main.temp);
    const humidity = weatherData.main.humidity;
    
    // Add a mystical postscript
    oracleText += `\n\n${tempC}°C and ${humidity}% humidity whisper: Remember this moment.`;
  }, 3000);
}

// Particle class
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.size = random(3, 8);
    this.color = color(random(200, 240), 80, 100, 70);
    this.speed = random(0.5, 2);
  }
  
  update() {
    this.pos.add(p5.Vector.mult(this.vel, this.speed));
    
    // Boundary check
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }
  
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
} 
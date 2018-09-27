// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const body = document.querySelector("body");

// Init the vocies array
let vocies = [];

const getVocies = () => {
  vocies = synth.getVoices();
  vocies.forEach(voice => {
    // Create option element
    const option = document.createElement("option");
    // Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";

    // Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVocies;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.log("Alreday speaking...");
    return;
  }
  if (textInput.value !== "") {
    // Add background animation
    body.style.background = "#141414 url(../images/wave.gif)";
    body.style.backgroundRepeat = "repeat-x";
    body.style.backgroundSize = "100% 100%";

    // Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // Speak end
    speakText.onend = event => {
      console.log("Done Speaking...");
      body.style.background = "#141414";
    };

    // Speak error
    speakText.onerror = event => {
      console.log("Somthing went wrong");
    };

    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices
    vocies.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }
};

// EVENTS LISTENERS
// Text form submit
textForm.addEventListener("submit", event => {
  event.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener("change", event => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener(
  "change",
  event => (pitchValue.textContent = pitch.value)
);

// Voice select change
voiceSelect.addEventListener("change", event => speak());

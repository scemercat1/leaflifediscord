// Initialize state variables
let waterLevel = 20;
let growthStage = 1;

const stages = {
    1: { name: "🌱 Cosmic Seed", img: "https://i.imgur.com/83p1XbK.png" },
    2: { name: "🌿 Emerging Sprout", img: "https://i.imgur.com/W2kP3zP.png" },
    3: { name: "🌳 Growing Leaf Shrub", img: "https://i.imgur.com/YgR8Nzm.png" },
    4: { name: "✨ Ascended Aircraft Tree", img: "https://i.imgur.com/Z4O8Fmx.png" }
};

// Update UI graphics smoothly
function updateUI() {
    document.getElementById("waterFill").style.width = waterLevel + "%";
    document.getElementById("stageName").innerText = "Stage: " + stages[growthStage].name;
    document.getElementById("plantImg").src = stages[growthStage].img;
}

// Interactive button click function
function waterPlant() {
    if (growthStage >= 4) {
        alert("Your Aircraft Tree has fully ascended to maximum power! 🌟");
        return;
    }

    waterLevel += Math.floor(Math.random() * 15) + 10;
    if (waterLevel > 100) waterLevel = 100;

    if (waterLevel >= 70) {
        growthStage++;
        waterLevel = 30; // Partial reset upon evolution burst
    }

    updateUI();
}

async function initializeActivity() {
    // Check if running inside Discord client container environment
    if (typeof discordSdk !== 'undefined') {
        const discordSdkInstance = new window.discordSdk.DiscordSDK("YOUR_CLIENT_ID_HERE");
        await discordSdkInstance.ready();
        console.log("Handshake verified with Discord core infrastructure.");
    } else {
        console.log("Running in standalone web browser development viewport mode.");
    }
    updateUI();
}

initializeActivity();

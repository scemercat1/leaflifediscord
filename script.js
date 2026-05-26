let coins = 0;
let water = 30;
let exp = 0;
let stage = 1;
let musicPlaying = false;

// Imagini reale, publice și stabile (Pe viitor le înlocuiești cu grafica ta proprie)
const gameStages = {
    1: { name: "🌱 Stage 1: Mystic Space Seed", img: "https://cdn-icons-png.flaticon.com/512/628/628283.png" },
    2: { name: "🌿 Stage 2: Sprouting Leaf", img: "https://cdn-icons-png.flaticon.com/512/188/188333.png" },
    3: { name: "🌳 Stage 3: Aircraft Bonsai", img: "https://cdn-icons-png.flaticon.com/512/4204/4204780.png" },
    4: { name: "✨ Stage 4: Ascended Ancient Entity", img: "https://cdn-icons-png.flaticon.com/512/1149/1149162.png" }
};

function render() {
    document.getElementById("coinCount").innerText = coins;
    document.getElementById("waterFill").style.width = water + "%";
    document.getElementById("expFill").style.width = exp + "%";
    document.getElementById("stageTitle").innerText = gameStages[stage].name;
    document.getElementById("treeAsset").src = gameStages[stage].img;
}

// Acțiunea de udare: dă EXP și Bani, dar consumă din entuziasm
function waterAction() {
    if (stage >= 4) return;

    water += 15;
    if (water > 100) water = 100;

    // Jucătorul primește monede la fiecare udare corectă
    coins += Math.floor(Math.random() * 3) + 2; 
    exp += 10;

    if (exp >= 100) {
        stage++;
        exp = 0;
        water = 20; // reset parțial la evoluție
        triggerEvolutionEffect();
    }

    render();
}

// Magazinul (Shop): Cumperi îngrășământ ca să sari peste nivele mai repede
function buyFertilizer() {
    if (stage >= 4) return;
    
    if (coins >= 15) {
        coins -= 15;
        exp += 35; // Oferă un boost masiv de experiență directă
        
        if (exp >= 100) {
            stage++;
            exp = 0;
            triggerEvolutionEffect();
        }
        render();
    } else {
        alert("❌ Not enough Aircraft Coins! Keep watering to earn more.");
    }
}

// Efect vizual de animație la transformarea copacului IRL (In Real Life / Instante)
function triggerEvolutionEffect() {
    const asset = document.getElementById("treeAsset");
    asset.style.transform = "scale(1.4) rotate(10deg)";
    asset.style.filter = "drop-shadow(0px 0px 20px #2ecc71) brightness(1.3)";
    
    setTimeout(() => {
        asset.style.transform = "scale(1) rotate(0deg)";
        asset.style.filter = "drop-shadow(0px 5px 10px rgba(0,0,0,0.5))";
    }, 600);
}

// Sistemul de pornire/oprire al muzicii Ambientale
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (!musicPlaying) {
        music.play().catch(e => console.log("Discord interactions blocked audio autoplay: ", e));
        musicPlaying = true;
    } else {
        music.pause();
        musicPlaying = false;
    }
}

// Handshake inițial obligatoriu cu Discord
async function startSystem() {
    if (typeof discordSdk !== 'undefined') {
        const sdk = new window.discordSdk.DiscordSDK("1508701744283127808");
        await sdk.ready();
    }
    render();
}

startSystem();

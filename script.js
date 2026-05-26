let coins = 0;
let water = 30;
let exp = 0;
let stage = 1;
let prestigeLevels = 0;
let musicPlaying = false;

// Imagini sigure direct din CDN-ul de producție Twitter Twemoji (Nu vor fi șterse niciodată și merg în orice iframe)
const gameStages = {
    1: { name: "🌱 Stage 1: Mystic Space Seed", img: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f331.png" },
    2: { name: "🌿 Stage 2: Sprouting Leaf", img: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f33f.png" },
    3: { name: "🌳 Stage 3: Aircraft Bonsai", img: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f333.png" },
    4: { name: "✨ Stage 4: Ascended Ancient Entity", img: "https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f334.png" }
};

function render() {
    document.getElementById("coinCount").innerText = coins;
    document.getElementById("waterFill").style.width = water + "%";
    document.getElementById("expFill").style.width = exp + "%";
    
    if (stage >= 4) {
        document.getElementById("stageTitle").innerText = `✨ Stage 4: Ascended Tree (Prestige Lvl ${prestigeLevels})`;
        document.getElementById("treeAsset").src = gameStages[4].img;
    } else {
        document.getElementById("stageTitle").innerText = gameStages[stage].name;
        document.getElementById("treeAsset").src = gameStages[stage].img;
    }
}

// Acțiunea de udare (Funcționează la nesfârșit!)
function waterAction() {
    water += 15;
    if (water > 100) water = 100;

    // Câștigi monede de fiecare dată
    coins += Math.floor(Math.random() * 3) + 2; 
    exp += 15;

    if (exp >= 100) {
        exp = 0;
        water = 30;
        
        if (stage < 4) {
            stage++;
            triggerEvolutionEffect("#2ecc71"); // Strălucire verde la evoluție
        } else {
            prestigeLevels++; // La nivel maxim, crește nivelul de prestigiu la nesfârșit!
            triggerEvolutionEffect("#f1c40f"); // Strălucire aurie la prestigiu
        }
    }

    render();
}

// Magazinul (Funcționează la nesfârșit!)
function buyFertilizer() {
    if (coins >= 15) {
        coins -= 15;
        exp += 35; // Oferă boost de experiență
        
        if (exp >= 100) {
            exp = 0;
            if (stage < 4) {
                stage++;
                triggerEvolutionEffect("#2ecc71");
            } else {
                prestigeLevels++;
                triggerEvolutionEffect("#f1c40f");
            }
        }
        render();
    } else {
        alert("❌ Not enough Aircraft Coins! Keep watering to earn more.");
    }
}

// Animație fluidă de puls și glow de culoare customizabilă
function triggerEvolutionEffect(glowColor) {
    const asset = document.getElementById("treeAsset");
    asset.style.transform = "scale(1.3) rotate(15deg)";
    asset.style.filter = `drop-shadow(0px 0px 25px ${glowColor}) brightness(1.4)`;
    
    setTimeout(() => {
        asset.style.transform = "scale(1) rotate(0deg)";
        asset.style.filter = "drop-shadow(0px 5px 10px rgba(0,0,0,0.5))";
    }, 500);
}

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (!musicPlaying) {
        music.play().catch(e => console.log("Audio block bypass: ", e));
        musicPlaying = true;
    } else {
        music.pause();
        musicPlaying = false;
    }
}

async function startSystem() {
    if (typeof discordSdk !== 'undefined') {
        const sdk = new window.discordSdk.DiscordSDK("1508701744283127808");
        await sdk.ready();
    }
    render();
}

startSystem();

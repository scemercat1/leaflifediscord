let coins = 0;
let water = 30;
let exp = 0;
let stage = 1;
let musicPlaying = false;
let hasBeluga = false;

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
    document.getElementById("stageTitle").innerText = gameStages[stage].name;
    
    if (hasBeluga) {
        document.getElementById("treeAsset").src = "https://i.imgur.com/v8PqBq6.png";
        document.getElementById("treeAsset").className = "tree-img beluga-active";
        document.getElementById("stageTitle").innerText = "🐱 Beluga is vibing on your screen!";
    } else {
        document.getElementById("treeAsset").src = gameStages[stage].img;
    }
}

function waterAction() {
    water += 15;
    if (water > 100) water = 100;

    coins += Math.floor(Math.random() * 4) + 3;
    exp += 25;

    if (exp >= 100) {
        if (stage < 4) {
            stage++;
            exp = 0;
            water = 30;
            triggerEvolutionEffect();
            
            if (stage === 4) {
                document.getElementById("endScreen").style.display = "flex";
            }
        } else {
            exp = 100;
        }
    }
    render();
}

function continueGrind() {
    document.getElementById("endScreen").style.display = "none";
}

function toggleShop(show) {
    document.getElementById("shopModal").style.display = show ? "flex" : "none";
}

function buyBeluga() {
    if (coins >= 70) {
        coins -= 70;
        hasBeluga = true;
        toggleShop(false);
        render();
        alert("🐱 You bought Beluga! Look at her go left and right!");
    } else {
        alert("❌ You need 70 Aircraft Coins to buy Beluga! Keep grinding!");
    }
}

function buySecret() {
    if (coins >= 100) {
        coins -= 100;
        render();
        alert("This is just a demo on discord, the full game will be 3D lol");
    } else {
        alert("❌ You need 100 Aircraft Coins for the secret! Keep grinding!");
    }
}

function triggerEvolutionEffect() {
    const asset = document.getElementById("treeAsset");
    asset.style.transform = "scale(1.3) rotate(10deg)";
    setTimeout(() => { asset.style.transform = "scale(1) rotate(0deg)"; }, 400);
}

function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");
    if (!musicPlaying) {
        music.play().catch(e => console.log(e));
        musicPlaying = true;
        btn.innerText = "⏸️ Pause Background Music";
        btn.style.background = "#ed4245";
    } else {
        music.pause();
        musicPlaying = false;
        btn.innerText = "🎵 Play Background Music";
        btn.style.background = "#4f545c";
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

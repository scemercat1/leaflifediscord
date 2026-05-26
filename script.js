var coins = 0;
var water = 30;
var exp = 0;
var stage = 1;
var musicPlaying = false;
var hasBeluga = false;

var gameStages = {
    1: { name: "🌱 Stage 1: Mystic Space Seed", emoji: "🌱" },
    2: { name: "🌿 Stage 2: Sprouting Leaf", emoji: "🌿" },
    3: { name: "🌳 Stage 3: Aircraft Bonsai", emoji: "🌳" },
    4: { name: "✨ Stage 4: Ascended Ancient Entity", emoji: "✨" }
};

function render() {
    document.getElementById("coinCount").innerText = coins;
    document.getElementById("waterFill").style.width = water + "%";
    document.getElementById("expFill").style.width = exp + "%";
    
    var treeAsset = document.getElementById("treeAsset");
    
    if (hasBeluga) {
        treeAsset.innerHTML = '<img src="https://imgur.com" alt="Beluga" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover;">';
        treeAsset.className = "tree-emoji beluga-active";
        document.getElementById("stageTitle").innerText = "🐱 Beluga is vibing on your screen!";
    } else {
        treeAsset.innerHTML = gameStages[stage].emoji;
        treeAsset.className = "tree-emoji";
        document.getElementById("stageTitle").innerText = gameStages[stage].name;
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
        document.getElementById("stageTitle").innerText = "🐱 Success! You bought Beluga!";
    } else {
        document.getElementById("stageTitle").innerText = "❌ Need 70 Coins for Beluga!";
        setTimeout(render, 2500);
    }
}

function buySecret() {
    if (coins >= 100) {
        coins -= 100;
        render();
        document.getElementById("stageTitle").innerText = "ℹ️ This is a demo. Full game is 3D lol";
        setTimeout(render, 4000);
    } else {
        document.getElementById("stageTitle").innerText = "❌ Need 100 Coins for Secret!";
        setTimeout(render, 2500);
    }
}

function triggerEvolutionEffect() {
    var asset = document.getElementById("treeAsset");
    asset.style.transform = "scale(1.3) rotate(10deg)";
    setTimeout(function() { asset.style.transform = "scale(1) rotate(0deg)"; }, 400);
}

function toggleMusic() {
    var music = document.getElementById("bgMusic");
    var btn = document.getElementById("musicBtn");
    if (!musicPlaying) {
        music.play().catch(function(e) { console.log("Audio delayed until click:", e); });
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

render();

document.getElementById("btnWater").addEventListener("click", waterAction);
document.getElementById("btnOpenShop").addEventListener("click", function() { toggleShop(true); });
document.getElementById("btnCloseShop").addEventListener("click", function() { toggleShop(false); });
document.getElementById("btnBuyBeluga").addEventListener("click", buyBeluga);
document.getElementById("btnBuySecret").addEventListener("click", buySecret);
document.getElementById("btnContinue").addEventListener("click", continueGrind);
document.getElementById("musicBtn").addEventListener("click", toggleMusic);

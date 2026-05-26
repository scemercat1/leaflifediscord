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
    document.getElementById("stageTitle").innerText = gameStages[stage].name;
    
    if (hasBeluga) {
        document.getElementById("treeAsset").innerText = "🐱";
        document.getElementById("treeAsset").className = "tree-emoji beluga-active";
        document.getElementById("stageTitle").innerText = "🐱 Beluga is vibing on your screen!";
    } else {
        document.getElementById("treeAsset").innerText = gameStages[stage].emoji;
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
    var asset = document.getElementById("treeAsset");
    asset.style.transform = "scale(1.3) rotate(10deg)";
    setTimeout(function() { asset.style.transform = "scale(1) rotate(0deg)"; }, 400);
}

function toggleMusic() {
    var music = document.getElementById("bgMusic");
    var btn = document.getElementById("musicBtn");
    if (!musicPlaying) {
        music.play().catch(function(e) { console.log(e); });
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

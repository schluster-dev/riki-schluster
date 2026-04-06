// --- 1. SPACE CANVAS LOGIC (Bintang Bergerak) ---
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const starCount = 150;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(); 
}
window.addEventListener('resize', resize);

class Star {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height + 100); 
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe';
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) { stars.push(new Star()); }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

// --- 2. BIO TYPEWRITER LOGIC ---
const textElement = document.getElementById('typewriter-action');
const bioText = "Saya bekerja sebagai Staff Kurikulum dan Arsiparis Digital di <span class='text-cyan-400'>smkn3linggabuana.sch.id</span>. <br><br> Pengelola website resmi sekolah, AI Music Producer (Suno/Udio) di kanal <span class='text-purple-400'>Schluster</span>, dan kreator visual menggunakan Stable Diffusion dengan teknik Strong Prompting. <br><br> Saat ini aktif mempelajari Python, mengembangkan game survival menggunakan <span class='text-cyan-500'>Godot Engine</span> dengan bantuan AI, serta mengoptimalkan sistem automasi kearsipan. <br><br> Perjalanan hidup saya dibentuk oleh tantangan, namun saya percaya bahwa debu terkecil sekalipun, melalui kegigihan, dapat bertransformasi menjadi batu. Never stop learning, creating, and evolving.";
let charIndex = 0;

function typeWriter() {
    if (textElement && charIndex < bioText.length) {
        if (bioText.substring(charIndex, charIndex + 4) === "<br>") {
            textElement.innerHTML += "<br>";
            charIndex += 4;
            setTimeout(typeWriter, 30);
        } else if (bioText.charAt(charIndex) === "<") {
            let tagEnd = bioText.indexOf(">", charIndex);
            textElement.innerHTML += bioText.substring(charIndex, tagEnd + 1);
            charIndex = tagEnd + 1;
            typeWriter();
        } else {
            textElement.innerHTML += bioText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    } else if (textElement) {
        textElement.innerHTML += '<span class="text-cyan-400 animate-pulse">_</span>';
    }
}

// --- 3. STARSHIP MUSIC HUB LOGIC ---
var player;
// YouTube API membutuhkan fungsi ini di level global (window)
window.onYouTubeIframeAPIReady = function() {
    const iframe = document.querySelector('.group\\/yt iframe');
    if (iframe) {
        iframe.id = "youtube-player-id";
        let currentSrc = iframe.getAttribute('src');
        if(!currentSrc.includes('enablejsapi=1')) {
            iframe.setAttribute('src', currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'enablejsapi=1');
        }

        player = new YT.Player(iframe.id, {
            events: {
                'onReady': onPlayerReady
            }
        });
    }
};

function onPlayerReady(event) {
    const ytIcon = document.querySelector('.group\\/yt div[class*="bg-red-600"]');
    const sfxBlip = document.getElementById('sfx-blip');
    
    if (ytIcon) {
        ytIcon.addEventListener('click', function() {
            if (sfxBlip) { sfxBlip.currentTime = 0; sfxBlip.play(); }
            
            var state = player.getPlayerState();
            if (state === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        });
    }
}

function initMusicHub() {
    const starshipToggle = document.getElementById('music-toggle');
    const sfxBlip = document.getElementById('sfx-blip');
    const sfxLaunch = document.getElementById('sfx-launch');

    if (starshipToggle) {
        const playBlip = () => {
            if (sfxBlip) {
                sfxBlip.currentTime = 0;
                sfxBlip.volume = 0.15;
                sfxBlip.play().catch(() => {});
            }
        };

        starshipToggle.addEventListener('mouseenter', playBlip);
        
        starshipToggle.addEventListener('click', () => {
            playBlip();
            if (sfxLaunch) {
                sfxLaunch.currentTime = 0;
                sfxLaunch.volume = 0.2;
                sfxLaunch.play().catch(() => {});
            }
            // Toggle class untuk menampilkan menu di mobile atau efek tambahan
            starshipToggle.parentElement.classList.toggle('active-menu');
        });
    }

    // Load YouTube API Script
    if (!window.YT) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// --- 4. INITIALIZE ALL SYSTEMS ---
document.addEventListener('DOMContentLoaded', () => {
    resize();
    animate();
    if(textElement) {
        textElement.innerHTML = "";
        typeWriter();
    }
    initMusicHub();
});

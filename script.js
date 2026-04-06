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

// --- SCHLUSTER TACTICAL FLEET LOGIC (v5.0 - CLICK MODE) ---

function initTacticalFleet() {
    const starshipToggle = document.getElementById('music-toggle');
    const shipSpotify = document.getElementById('ship-spotify');
    const shipYoutube = document.getElementById('ship-youtube');
    
    // SFX Elements
    const sfxBlip = document.getElementById('sfx-blip');
    const sfxLaunch = document.getElementById('sfx-launch');
    const sfxPower = document.getElementById('sfx-power');

    // Pastikan elemen ada
    if (starshipToggle && shipSpotify && shipYoutube) {
        
        // Fungsi untuk memainkan SFX
        const playSfx = (audio, vol = 0.2) => {
            if (audio) {
                audio.currentTime = 0;
                audio.volume = vol;
                audio.play().catch(() => {}); // Hindari error browser policy
            }
        };

        // 1. MOTHERSHIP INTERACTION (Hover)
        // Tetap pakai hover untuk memunculkan hangar armada di mobile/desktop
        starshipToggle.addEventListener('mouseenter', () => playSfx(sfxBlip, 0.1));
        starshipToggle.addEventListener('click', () => {
            playSfx(sfxBlip, 0.2);
            playSfx(sfxLaunch, 0.1);
            // Toggle class untuk mobile agar hangar tidak tertutup
            starshipToggle.parentElement.classList.toggle('active-music-menu');
        });

        // 2. ESCORT SHIPS INTERACTION (Click to Play)
        
        // Fungsi untuk men-toggle panel player
        const togglePlayer = (shipElement, audio) => {
            const panel = shipElement.querySelector('.player-panel');
            // Cek apakah panel sedang terbuka
            const isOpen = !panel.classList.contains('hidden');

            // Tutup semua panel terbuka lainnya dulu
            document.querySelectorAll('.player-panel').forEach(p => p.classList.add('hidden'));

            // Toggle panel yang diklik
            if (isOpen) {
                panel.classList.add('hidden');
            } else {
                panel.classList.remove('hidden');
                playSfx(audio, 0.2); // Suara panel terbuka
            }
        };

        // Klik pada Kapal Spotify
        shipSpotify.querySelector('.ship-spot-mantis').addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah Mothership ikut terklik
            togglePlayer(shipSpotify, sfxPower);
        });

        // Klik pada Kapal YouTube
        shipYoutube.querySelector('.ship-yt-raven').addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah Mothership ikut terklik
            togglePlayer(shipYoutube, sfxPower);
        });

        // Tutup panel jika klik di luar armada
        document.addEventListener('click', () => {
            document.querySelectorAll('.player-panel').forEach(p => p.classList.add('hidden'));
        });
    }
}

// Panggil fungsi ini di dalam DOMContentLoaded kamu
// (Hapus panggilan initMusicHub lama)
document.addEventListener('DOMContentLoaded', () => {
    // ... (logic bintang & typewriter tetap sama) ...
    initTacticalFleet();
});

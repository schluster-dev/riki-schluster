const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
const textElement = document.getElementById('typewriter-action');

let stars = [];
const starCount = 150;

// --- STAR ENGINE ---
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initApp() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = Array.from({ length: starCount }, () => new Star());
    typeWriter();
    animate();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- TYPEWRITER ENGINE ---
const bioText = "Saya bekerja sebagai Staff Kurikulum dan Arsiparis Digital di <span class='text-cyan-400'>smkn3linggabuana.sch.id</span>. <br><br> Pengelola website resmi sekolah, AI Music Producer (Suno/Udio) di kanal <span class='text-purple-400'>Schluster</span>..."; 
let charIndex = 0;

function typeWriter() {
    if (charIndex < bioText.length) {
        let char = bioText.charAt(charIndex);
        if (char === "<") {
            let tagEnd = bioText.indexOf(">", charIndex);
            textElement.innerHTML += bioText.substring(charIndex, tagEnd + 1);
            charIndex = tagEnd + 1;
            typeWriter(); // Jump over tags
        } else {
            textElement.innerHTML += char;
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    } else {
        textElement.innerHTML += '<span class="text-cyan-400 animate-pulse">_</span>';
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    requestAnimationFrame(animate);
}

initApp();

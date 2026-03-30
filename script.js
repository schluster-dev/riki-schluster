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
    constructor() {
        this.reset();
    }

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
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

resize();

const textElement = document.getElementById('typewriter-action');

// --- UPDATE BIO TEXT DENGAN POINT-POINT BARU KAMU ---
const bioText = "Saya bekerja sebagai Staff Kurikulum & Arsiparis Digital di <span class='text-cyan-400'>smkn3linggabuana.sch.id</span>. <br><br> Pengelola website resmi sekolah, AI Music Producer (Suno/Udio) di kanal <span class='text-purple-400'>Schluster</span>, dan kreator visual menggunakan Stable Diffusion dengan teknik Strong Prompting. <br><br> Saat ini aktif mempelajari Python, mengembangkan game survival menggunakan <span class='text-cyan-500'>Godot Engine</span>, serta mengoptimalkan sistem automasi kearsipan. <br><br> Perjalanan hidup saya dibentuk oleh tantangan, namun saya percaya bahwa debu terkecil sekalipun, melalui kegigihan, dapat bertransformasi menjadi batu. Never stop learning, creating, and evolving.";

let charIndex = 0;

if(textElement) textElement.innerHTML = "";

function typeWriter() {
    if (textElement && charIndex < bioText.length) {
        // Cek tag <br>
        if (bioText.substring(charIndex, charIndex + 4) === "<br>") {
            textElement.innerHTML += "<br>";
            charIndex += 4;
            setTimeout(typeWriter, 30);
        } 
        // Cek tag <span> untuk warna (agar tag tidak ikut diketik satu-satu)
        else if (bioText.charAt(charIndex) === "<") {
            let tagEnd = bioText.indexOf(">", charIndex);
            textElement.innerHTML += bioText.substring(charIndex, tagEnd + 1);
            charIndex = tagEnd + 1;
            typeWriter(); // Lanjut langsung tanpa delay untuk tag
        }
        else {
            textElement.innerHTML += bioText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    } else if (textElement) {
        textElement.innerHTML += '<span class="text-cyan-400 animate-pulse">_</span>';
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

animate();
typeWriter();

const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150;

// Menyesuaikan ukuran canvas ke layar penuh
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Membuat objek bintang (Tetap seperti aslinya)
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
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
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow agar tidak berat
    }
}

// Inisialisasi bintang
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// --- LOGIKA BARU: INFINITE SCROLLING TERMINAL ---
// Mengganti typewriter lama dengan sistem scroll otomatis ke atas
const textElement = document.getElementById('typewriter-action');
const bioText = "I am a lifelong learner with a strong passion for technology, creativity, and artificial intelligence. I work as a school IT professional and a civil servant (ASN), while remaining an enthusiastic gamer, programmer, and AI enthusiast. My interests include web development, coding, digital illustration, graphic design, AI-generated music, and visual creativity using tools such as Photoshop, Krita, and various AI platforms. I enjoy exploring how technology and art intersect to create meaningful and innovative digital experiences. My life journey has not been easy — shaped by challenges and setbacks — but I have always chosen to stand, grow, and move forward. I believe that even something as small as dust can, through persistence, transform into stone. That belief drives me to never stop learning, creating, and evolving.";

let charIndex = 0;
// Membuat container internal agar teks bisa digeser ke atas
const scrollContainer = document.createElement('div');

// Styling awal via JS agar aman
textElement.style.overflow = 'hidden';
textElement.style.position = 'relative';
scrollContainer.style.position = 'absolute';
scrollContainer.style.width = '100%';
scrollContainer.style.bottom = '0'; // Mulai ngetik dari bawah
textElement.appendChild(scrollContainer);

function typeWriter() {
    if (charIndex < bioText.length) {
        scrollContainer.innerHTML += bioText.charAt(charIndex);
        charIndex++;

        // Logika Gerak Ke Atas: 
        // Jika tinggi tulisan sudah melebihi tinggi box (140px), naikkan posisinya
        if (scrollContainer.offsetHeight > textElement.offsetHeight) {
            scrollContainer.style.bottom = 'auto';
            // Geser posisi top ke arah negatif agar tulisan lama menghilang ke atas
            scrollContainer.style.top = `-${scrollContainer.offsetHeight - textElement.offsetHeight}px`;
        }

        setTimeout(typeWriter, 35); // Kecepatan mengetik
    } else {
        // Jika sudah selesai, tunggu 4 detik lalu ulangi dari awal (Loop)
        setTimeout(() => {
            scrollContainer.innerHTML = "";
            scrollContainer.style.top = 'auto';
            scrollContainer.style.bottom = '0';
            charIndex = 0;
            typeWriter();
        }, 4000);
    }
}

// Loop Animasi Canvas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}

// Jalankan semuanya
animate();
typeWriter();

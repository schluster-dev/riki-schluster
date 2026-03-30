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

// Membuat objek bintang
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; // Sesuai tema Cyan & Purple
    }

    update() {
        this.y -= this.speed; // Gerak ke atas
        if (this.y < 0) this.reset();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inisialisasi bintang
for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
}

// Tambahan Efek Typewriter (Menghidupkan teks yang kosong tadi)
const textElement = document.getElementById('typewriter-action');
const bioText = "Membangun jembatan antara efisiensi birokrasi dan kreativitas digital. Spesialis dalam arsitektur sistem kearsipan dan pengembangan visual interaktif.";
let charIndex = 0;

function typeWriter() {
    if (charIndex < bioText.length) {
        textElement.innerHTML += bioText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40);
    }
}

// Loop Animasi
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

/* Master JS v3.0: Deep Space Engine */

// --- SECTION 1: TYPEWRITER (Lore) ---
const bioText = "Lifelong learner, Civil Servant (ASN), and IT Specialist at SMKN 3 Linggabuana. I thrive in the intersection of digital infrastructure and creative expression. Expert in optimizing school operations through Google Apps Script, while maintaining a creative soul as an AI music producer and digital illustrator. System Operator Schluster v2.0 activated.";
let index = 0;

function typeWriter() {
    const element = document.getElementById("typewriter-action");
    if (element && index < bioText.length) {
        element.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 25); // Kecepatan mengetik
    }
}

// --- SECTION 2: FORM HANDLING (Apps Script) ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbxlOufLu5a-_umYnVvXh5eDLwAGofpaxs5TIHWKShSOcOxOFFZDtdT-zkbiqvogCo1NcQ/exec';

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            btn.disabled = true;
            btn.innerHTML = "TRANSMITTING TO ARCHIVE...";

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            fetch(scriptURL, { method: 'POST', body: JSON.stringify(data)})
            .then(response => {
                alert("QUEST COMPLETE: Transmission received in the Archive!");
                form.reset();
                btn.disabled = false;
                btn.innerHTML = "EXECUTE TRANSMISSION (SEND)";
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("CRITICAL ERROR: Transmission failed. Retrying...");
                btn.disabled = false;
                btn.innerHTML = "RETRY TRANSMISSION";
            });
        });
    }
}

// --- SECTION 3: ANIMATED SPACE BACKGROUND (Pixel Theme) ---
function initSpaceBackground() {
    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;

    // Pixel sprites (Unicode characters)
    const sprites = {
        ships: ['🚀', '🛸', '🛰️'],
        aliens: ['👾', '☠️'],
        planets: ['🪐', '🌕', '🔴'] // 🪐(Purple), 🌕(White), 🔴(Red)
    };

    // Space objects array
    let objects = [];
    const numObjects = 25; // Jumlah objek bergerak

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // Object class
    class SpaceObject {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            
            // Tentukan jenis objek
            const typeRoll = Math.random();
            if (typeRoll < 0.2) {
                this.sprite = sprites.planets[Math.floor(Math.random() * sprites.planets.length)];
                this.size = Math.random() * 20 + 20; // 20-40px
                this.speedX = Math.random() * 0.2 - 0.1; // Sangat lambat
                this.speedY = 0;
            } else if (typeRoll < 0.7) {
                this.sprite = sprites.ships[Math.floor(Math.random() * sprites.ships.length)];
                this.size = Math.random() * 10 + 10; // 10-20px
                this.speedX = Math.random() * 1.5 + 0.5; // Bergerak ke kanan
                this.speedY = Math.random() * 0.2 - 0.1;
            } else {
                this.sprite = sprites.aliens[Math.floor(Math.random() * sprites.aliens.length)];
                this.size = Math.random() * 10 + 10;
                this.speedX = Math.random() * 1 + 0.2; // Bergerak lambat ke kanan
                this.speedY = Math.random() * 1 - 0.5; // Mengambang atas/bawah
            }
            
            // Random opacity untuk efek kedalaman
            this.opacity = Math.random() * 0.5 + 0.2; // 0.2 - 0.7
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bungkus posisi (warp) jika keluar layar
            if (this.x > width + 50) this.x = -50;
            if (this.x < -50) this.x = width + 50;
            if (this.y > height + 50) this.y = -50;
            if (this.y < -50) this.y = height + 50;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.font = `${this.size}px 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif`;
            ctx.fillStyle = "white"; // Warna fallback jika emoji tidak render
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.sprite, this.x, this.y);
            ctx.restore();
        }
    }

    // Initialize objects
    for (let i = 0; i < numObjects; i++) {
        objects.push(new SpaceObject());
    }

    // Bintang latar belakang yang statis
    function drawStars() {
        ctx.fillStyle = "white";
        for (let i = 0; i < 200; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1, 0, Math.random() * Math.PI * 2);
            ctx.fill();
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height); // Hapus layar
        
        // Gambar bintang statis dulu
        // drawStars(); // Opsional, jika ingin bintang kecil statis juga
        
        // Update dan gambar objek bergerak
        objects.forEach(obj => {
            obj.update();
            obj.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', resize);

    // Start engine
    resize();
    animate();
}

// --- SECTION 4: INITIALIZATION ---
window.onload = () => {
    typeWriter();
    handleContactForm();
    initSpaceBackground(); // Nyalakan mesin luar angkasa
};

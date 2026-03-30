const bioText = "Lifelong learner, Civil Servant (ASN), and IT professional with a passion for AI and digital creativity. My journey is defined by persistence: the belief that even dust can transform into stone. Bridging the gap between school IT infrastructure, digital arts, and generative music.";
let index = 0;

function typeWriter() {
    const element = document.getElementById("typewriter-action");
    if (element && index < bioText.length) {
        element.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
    }
}

// Integrasi Apps Script (Sama seperti sebelumnya)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxlOufLu5a-_umYnVvXh5eDLwAGofpaxs5TIHWKShSOcOxOFFZDtdT-zkbiqvogCo1NcQ/exec';

function handleContactForm() {
    const form = document.getElementById('contact-form');
    const btn = document.getElementById('submit-btn');

    if(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            btn.disabled = true;
            btn.innerHTML = "TRANSMITTING...";

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            fetch(scriptURL, { method: 'POST', body: JSON.stringify(data)})
            .then(response => {
                alert("QUEST COMPLETE: Message Sent Successfully!");
                form.reset();
                btn.disabled = false;
                btn.innerHTML = "SEND MESSAGE (QUEST SUBMIT)";
            })
            .catch(error => {
                alert("ERROR: Transmission failed.");
                btn.disabled = false;
                btn.innerHTML = "RETRY TRANSMISSION";
            });
        });
    }
}

window.onload = () => {
    typeWriter();
    handleContactForm();
};

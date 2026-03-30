// COMPLEX BIO CONFIGURATION
const bioText = "Lifelong learner, Civil Servant (ASN), and IT Specialist at SMKN 3 Linggabuana. I thrive in the intersection of digital infrastructure and creative expression. My life's philosophy is persistence: believing that even dust can transform into stone. Expert in optimizing school operations through Google Apps Script and modern web technologies, while maintaining a creative soul as an AI music producer and digital illustrator.";
let index = 0;

function typeWriter() {
    const element = document.getElementById("typewriter-action");
    if (element && index < bioText.length) {
        element.innerHTML += bioText.charAt(index);
        index++;
        setTimeout(typeWriter, 30);
    }
}

// FORM HANDLING (APPS SCRIPT)
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
                alert("QUEST COMPLETE: Your message has been archived!");
                form.reset();
                btn.disabled = false;
                btn.innerHTML = "EXECUTE TRANSMISSION (SEND)";
            })
            .catch(error => {
                alert("CRITICAL ERROR: Transmission failed.");
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

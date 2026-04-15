document.addEventListener('DOMContentLoaded', () => {
    // İletişim Formu İşlevselliği
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Gönderiliyor...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Formun gönderilmesini simüle ediyoruz
            setTimeout(() => {
                alert('Mesajınız başarıyla gönderildi! (Bu bir portfolyo demosu olduğu için e-posta arka planda gitmemiştir.)');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    // Scroll (Kaydırma) Animasyonları
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if(section.id !== 'home') {
            // Ana sayfa hariç diğerlerini başlangıçta gizle
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });
    // -- MATRIX RAIN EFFECT (Arka plan kod akıntısı) --
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Daha yazılımcı hissiyatı için karakterler
        const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]=$#@;';
        const fontSize = 14;
        let columns = canvas.width / fontSize;

        const rainDrops = [];
        for(let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const drawMatrix = () => {
            // Hafif saydam siyah arkaplan ile iz bırakma efekti
            ctx.fillStyle = 'rgba(18, 18, 18, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Tema rengi (yumuşak yeşil: #9CAF88)
            ctx.fillStyle = '#9CAF88'; 
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < rainDrops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if(rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975){
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(drawMatrix, 35);

        // Ekran boyutu değişirse ayarları güncelle
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = canvas.width / fontSize;
            while(rainDrops.length < columns) {
                rainDrops.push(Math.random() * (canvas.height / fontSize));
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name-input');
    const enterBtn = document.getElementById('enter-btn');
    const authScreen = document.getElementById('auth-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const blackScreen = document.getElementById('black-screen');
    const particlesContainer = document.getElementById('particles');

    function switchScreen(from, to) {
        from.classList.remove('active');
        from.style.opacity = '0';

        setTimeout(() => {
            from.style.display = 'none';
            to.style.display = 'flex';
            setTimeout(() => {
                to.classList.add('active');
                to.style.opacity = '1';
            }, 50);
        }, 800);
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const types = ['❤️', '🌸', '🌹', '✨', '💐', '💖'];
        particle.innerHTML = types[Math.floor(Math.random() * types.length)];

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 4 + 's';
        particle.style.fontSize = Math.random() * 40 + 30 + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.5;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 7000);
    }

    function startCelebration() {
        switchScreen(authScreen, celebrationScreen);
        setInterval(createParticle, 150);
    }

    function triggerBlackOut() {
        switchScreen(authScreen, blackScreen);
    }

    enterBtn.addEventListener('click', () => {
        const input = nameInput.value.trim().toLowerCase().replace(/\s/g, '');
        const target = "anapaula";

        if (input === target) {
            startCelebration();
        } else if (input !== "") {
            triggerBlackOut();
        }
    });

    // Also support Enter key
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enterBtn.click();
        }
    });
});

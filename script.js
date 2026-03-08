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

    const generalCelebrationScreen = document.getElementById('general-celebration-screen');

    function isFeminine(name) {
        const n = name.toLowerCase().trim();
        if (!n) return false;

        // Specific feminine names provided as examples
        const specificFeminine = ['lia', 'clara', 'anamaria', 'ana maria'];
        if (specificFeminine.includes(n)) return true;

        // Common feminine endings in Portuguese
        const feminineEndings = ['a', 'ia', 'is', 'ne', 'ce', 'iz', 'se', 'le', 'te', 'ra'];
        // Names that end in 'a' are 99% feminine in PT
        const commonFemaleNames = ['beatriz', 'isabel', 'raquel', 'nicole', 'ellen', 'ruth', 'ester', 'iris', 'yasmin', 'vivian'];

        const lastLetter = n.slice(-1);
        const lastTwo = n.slice(-2);

        return feminineEndings.includes(lastLetter) ||
            feminineEndings.includes(lastTwo) ||
            commonFemaleNames.includes(n);
    }

    enterBtn.addEventListener('click', () => {
        const rawValue = nameInput.value.trim();
        const inputClean = rawValue.toLowerCase().replace(/\s/g, '');
        const target = "anapaula";

        if (inputClean === target) {
            startCelebration();
        } else if (rawValue !== "") {
            if (isFeminine(rawValue)) {
                switchScreen(authScreen, generalCelebrationScreen);
            } else {
                triggerBlackOut();
                setTimeout(() => {
                    window.close();
                    // Fallback if window.close() is blocked
                    document.querySelector('.restricted-message').textContent = "Aba bloqueada. Fechamento não permitido pelo navegador.";
                }, 1000);
            }
        }
    });

    // Also support Enter key
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enterBtn.click();
        }
    });
});

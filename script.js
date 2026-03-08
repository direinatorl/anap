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

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        
        particlesContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    function startCelebration() {
        switchScreen(authScreen, celebrationScreen);
        setInterval(createHeart, 300);
    }

    function triggerBlackOut() {
        switchScreen(authScreen, blackScreen);
    }

    enterBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        
        if (name === "Ana Paula") {
            startCelebration();
        } else if (name !== "") {
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

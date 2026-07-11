// script.js

function initFloatingNames() {
    const canvas = document.getElementById('namesCanvas');
    if (!canvas) {
        return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');

    const firstNames = [
        'James', 'Maria', 'Chen', 'Priya', 'Omar', 'Elena', 'David', 'Aisha',
        'Michael', 'Sofia', 'Kenji', 'Fatima', 'Robert', 'Isabella', 'Wei',
        'Amara', 'Thomas', 'Yuki', 'Carlos', 'Nina', 'Daniel', 'Leila', 'Marcus',
        'Hannah', 'Raj', 'Claire', 'Andre', 'Mei', 'Samuel', 'Zara'
    ];

    const lastNames = [
        'Johnson', 'Garcia', 'Kim', 'Patel', 'Williams', 'Martinez', 'Nguyen',
        'Brown', 'Singh', 'Lee', 'Anderson', 'Taylor', 'Rodriguez', 'Wang',
        'Jackson', 'Cohen', 'Murphy', 'Diaz', 'Thompson', 'Ali', 'Wilson',
        'Chen', 'Moore', 'Khan', 'Clark', 'Santos', 'Rivera', 'Brooks', 'Hayes'
    ];

    let names = [];
    let width = 0;
    let height = 0;
    let animationId = null;

    function randomName() {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        return first + ' ' + last;
    }

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createName() {
        const useRed = Math.random() < 0.2;
        return {
            text: randomName(),
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.4,
            vy: (Math.random() - 0.5) * 1.4,
            size: 11 + Math.random() * 10,
            opacity: 0.15 + Math.random() * 0.35,
            color: useRed ? '255, 40, 40' : '220, 220, 220',
            angle: (Math.random() - 0.5) * 0.4,
            spin: (Math.random() - 0.5) * 0.004
        };
    }

    function initNames(count) {
        names = [];
        for (let i = 0; i < count; i++) {
            names.push(createName());
        }
    }

    function drawStaticNames() {
        ctx.clearRect(0, 0, width, height);
        names.forEach(function(name) {
            ctx.save();
            ctx.translate(name.x, name.y);
            ctx.rotate(name.angle);
            ctx.font = name.size + 'px "IBM Plex Mono", "Courier New", monospace';
            ctx.fillStyle = 'rgba(' + name.color + ', ' + name.opacity + ')';
            ctx.fillText(name.text, 0, 0);
            ctx.restore();
        });
    }

    function tick() {
        ctx.clearRect(0, 0, width, height);

        names.forEach(function(name) {
            name.x += name.vx;
            name.y += name.vy;
            name.angle += name.spin;

            if (name.x < -200) {
                name.x = width + 100;
            } else if (name.x > width + 200) {
                name.x = -100;
            }

            if (name.y < -40) {
                name.y = height + 20;
            } else if (name.y > height + 40) {
                name.y = -20;
            }

            ctx.save();
            ctx.translate(name.x, name.y);
            ctx.rotate(name.angle);
            ctx.font = name.size + 'px "IBM Plex Mono", "Courier New", monospace';
            ctx.fillStyle = 'rgba(' + name.color + ', ' + name.opacity + ')';
            ctx.fillText(name.text, 0, 0);
            ctx.restore();
        });

        animationId = requestAnimationFrame(tick);
    }

    resizeCanvas();
    initNames(Math.min(70, Math.floor((width * height) / 18000)));

    if (prefersReducedMotion) {
        drawStaticNames();
    } else {
        tick();
    }

    window.addEventListener('resize', function() {
        resizeCanvas();
        initNames(Math.min(70, Math.floor((width * height) / 18000)));
        if (prefersReducedMotion) {
            drawStaticNames();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initFloatingNames();

    const button = document.getElementById('demoButton');
    const messageArea = document.getElementById('messageDisplay');
    const aboutLink = document.getElementById('aboutLink');
    const aboutBubble = document.getElementById('aboutBubble');

    function hideAboutBubble() {
        aboutBubble.hidden = true;
        aboutBubble.classList.remove('is-visible');
    }

    function showAboutBubble() {
        aboutBubble.hidden = false;
        requestAnimationFrame(function() {
            aboutBubble.classList.add('is-visible');
        });
    }

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();

        if (aboutBubble.classList.contains('is-visible')) {
            hideAboutBubble();
            return;
        }

        showAboutBubble();
    });

    document.addEventListener('click', function(event) {
        if (!aboutBubble.classList.contains('is-visible')) {
            return;
        }

        if (!aboutLink.contains(event.target) && !aboutBubble.contains(event.target)) {
            hideAboutBubble();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideAboutBubble();
        }
    });

    button.addEventListener('click', function() {
        const currentTime = new Date().toLocaleTimeString(); // Get current time
        const message = 'Hello! You clicked the button at ' + currentTime;
        
        // Display the message in our message area
        // textContent sets the text inside the HTML element
        messageArea.textContent = message;
        
        // Add some visual feedback by changing the button text temporarily
        button.textContent = 'Thanks for clicking!';
        
        // After 2 seconds, change the button text back to original
        // setTimeout runs a function after a specified delay (in milliseconds)
        setTimeout(function() {
            button.textContent = 'Click Me!';
        }, 2000); // 2000 milliseconds = 2 seconds
    });
});
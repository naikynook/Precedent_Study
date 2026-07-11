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
    let dpr = 1;
    let animationId = null;

    function randomName() {
        const first = firstNames[Math.floor(Math.random() * firstNames.length)];
        const last = lastNames[Math.floor(Math.random() * lastNames.length)];
        return first + ' ' + last;
    }

    function randomSize() {
        const roll = Math.random();
        if (roll < 0.18) {
            return 30 + Math.random() * 20;
        }
        if (roll < 0.5) {
            return 16 + Math.random() * 12;
        }
        return 10 + Math.random() * 6;
    }

    function resizeCanvas() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.textBaseline = 'alphabetic';
    }

    function createName() {
        const useRed = Math.random() < 0.2;
        const speed = 2.2 + Math.random() * 3.2;
        const direction = Math.random() * Math.PI * 2;
        const size = randomSize();

        return {
            text: randomName(),
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.cos(direction) * speed,
            vy: Math.sin(direction) * speed,
            size: size,
            opacity: size > 28 ? 0.12 + Math.random() * 0.22 : 0.18 + Math.random() * 0.38,
            color: useRed ? '255, 40, 40' : '220, 220, 220',
            angle: (Math.random() - 0.5) * 0.5,
            spin: (Math.random() - 0.5) * 0.008
        };
    }

    function initNames(count) {
        names = [];
        for (let i = 0; i < count; i++) {
            names.push(createName());
        }
    }

    function drawName(name) {
        ctx.save();
        ctx.translate(name.x, name.y);
        ctx.rotate(name.angle);
        ctx.font = name.size + 'px "IBM Plex Mono", "Courier New", monospace';
        ctx.fillStyle = 'rgba(' + name.color + ', ' + name.opacity + ')';
        ctx.fillText(name.text, 0, 0);
        ctx.restore();
    }

    function updateName(name) {
        name.x += name.vx;
        name.y += name.vy;
        name.angle += name.spin;

        const margin = name.size * 4;

        if (name.x < -margin) {
            name.x = width + margin * 0.5;
        } else if (name.x > width + margin) {
            name.x = -margin * 0.5;
        }

        if (name.y < -margin) {
            name.y = height + margin * 0.25;
        } else if (name.y > height + margin) {
            name.y = -margin * 0.25;
        }
    }

    function drawStaticNames() {
        ctx.clearRect(0, 0, width, height);
        names.forEach(drawName);
    }

    function tick() {
        ctx.clearRect(0, 0, width, height);

        names.forEach(function(name) {
            updateName(name);
            drawName(name);
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
});
// script.js
// example of a function
function showMessage() {
  const message = document.getElementById("message");
  message.textContent = "You clicked the button!";
}

// This JavaScript code runs when the HTML page finishes loading
// We wait for the page to load so we can be sure all HTML elements exist

// This function runs when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is now running!');

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
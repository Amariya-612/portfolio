// Typing Animation
document.addEventListener('DOMContentLoaded', function() {

if (document.querySelector('.multiple-text')) {

new Typed('.multiple-text', {
strings: [
'Network Engineer',
'Front-End Web Developer'
],
typeSpeed: 90,
backSpeed: 60,
backDelay: 1200,
startDelay: 500,
loop: true,
smartBackspace: true,
showCursor: true,
cursorChar: '|'
});

}

});
// Scroll Active Links
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });
};

// ============================================================
// PROJECT DATA — edit via admin.html, do not touch manually
// ============================================================
const PROJECTS = [
  {
    "id": 1,
    "title": "Enterprise Network Design",
    "description": "Small Office network design with VLANs, Wireless Device using Cisco Packet Tracer",
    "image": "p3.jpg",
    "category": "network",
    "link": "https://github.com/Amariya-612/Net-Design",
    "linkLabel": "GitHub"
  },
  {
    "id": 2,
    "title": "Clinical Appointment Web",
    "description": "Responsive medical appointment website for health organisation",
    "image": "pt.PNG",
    "category": "web",
    "link": "https://rad-monstera-ff6a76.netlify.app/",
    "linkLabel": "Web Link"
  },
  {
    "id": 3,
    "title": "File Collection",
    "description": "Simple project collection in networking using Cisco Packet Tracer",
    "image": "pi.png",
    "category": "network",
    "link": "https://github.com/Amariya-612/Project-files",
    "linkLabel": "GitHub"
  },
  {
    "id": 1787729619406,
    "title": "test",
    "description": "test",
    "image": "Enterprise network topology.PNG",
    "category": "network",
    "link": "https://github.com/Amariya-612/Enterprise-Network",
    "linkLabel": "GitHub"
  },
  {
    "id": 1787729856416,
    "title": "me",
    "description": "me",
    "image": "Enterprise network topology.jpg",
    "category": "other",
    "link": "https://github.com/Amariya-612/Enterprise-Network",
    "linkLabel": "me"
  }
];
// ============================================================

function renderProjects() {
    const container = document.getElementById('project-container');
    if (!container) return;

    container.innerHTML = '';

    if (!PROJECTS || PROJECTS.length === 0) {
        container.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--main-color);">No projects yet.</p>';
        return;
    }

    PROJECTS.forEach(project => {
        const box = document.createElement('div');
        box.className = `project-box ${project.category}`;
        box.style.cursor = 'pointer';
        if (project.link && project.link !== '#') {
            box.onclick = () => window.open(project.link, '_blank');
        }

        box.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-layer">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                ${project.link && project.link !== '#' ? `
                <div class="project-links">
                    <a href="${project.link}" target="_blank" onclick="event.stopPropagation()">
                        ${project.linkLabel || 'View'}
                    </a>
                </div>` : ''}
            </div>
        `;

        container.appendChild(box);
    });

    initProjectFilter();
}

// Project filter — runs after projects are rendered
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projectCards  = document.querySelectorAll('.project-box');

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                card.style.display =
                    (filter === 'all' || card.classList.contains(filter)) ? 'flex' : 'none';
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);


// Skill Bars Animation on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Set target widths for progress bars
    const barFillElements = document.querySelectorAll('.bar-fill');
    barFillElements.forEach(bar => {
        const parentProgressBar = bar.closest('.progress-bar');
        if (parentProgressBar) {
            const percentSpan = parentProgressBar.querySelector('.info span:last-child');
            if (percentSpan) {
                const percentValue = percentSpan.textContent;
                bar.style.setProperty('--target-width', percentValue);
            }
        }
    });

    // Set conic gradients for skill circles
    const skillCircles = document.querySelectorAll('.skill-circle');
    skillCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        if (percent) {
            // Convert percentage string to number (remove % sign)
            const percentValue = parseInt(percent);
            // Set custom property for animation
            circle.style.setProperty('--p', percent);
            // Set the final conic gradient after animation completes
            setTimeout(() => {
                circle.style.background = `conic-gradient(var(--main-color) ${percentValue}%, #222 0)`;
            }, 1500); // Match animation duration
        }
    });
});

// Animate Skills on Scroll (backup for when page load animation doesn't trigger)
const skillSection = document.querySelector(".skills");
const bars = document.querySelectorAll(".bar-fill");
let skillsAnimated = false;

function animateSkillsOnScroll() {
    if (!skillSection || skillsAnimated) return;
    
    let sectionTop = skillSection.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
        bars.forEach(bar => {
            // Get the target width from the parent's span
            const parentProgressBar = bar.closest('.progress-bar');
            if (parentProgressBar) {
                const percentSpan = parentProgressBar.querySelector('.info span:last-child');
                if (percentSpan) {
                    bar.style.width = percentSpan.textContent;
                }
            }
        });
        skillsAnimated = true;
        window.removeEventListener("scroll", animateSkillsOnScroll);
    }
}

// Only add scroll listener if skills section exists
if (skillSection) {
    window.addEventListener("scroll", animateSkillsOnScroll);
    // Trigger once in case skills are already visible
    setTimeout(animateSkillsOnScroll, 500);
}

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form input validation styling
const contactInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
contactInputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.style.borderColor = 'red';
    });
    
    input.addEventListener('input', () => {
        input.style.borderColor = '';
    });
});

// Add click-to-call and click-to-email functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make phone numbers clickable
    const phoneElements = document.querySelectorAll('.contact-info span, .quick-contact span');
    phoneElements.forEach(element => {
        const text = element.textContent;
        if (text.includes('+251') || text.includes('phone') || text.match(/[\d\s\+]+/)) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                const phoneNumber = this.textContent.replace(/\s/g, '');
                window.location.href = `tel:${phoneNumber}`;
            });
            element.setAttribute('title', 'Click to call');
        }
    });
    
    // Make emails clickable
    const emailElements = document.querySelectorAll('.contact-info span, .quick-contact span');
    emailElements.forEach(element => {
        const text = element.textContent;
        if (text.includes('@gmail.com')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                window.location.href = `mailto:${this.textContent}`;
            });
            element.setAttribute('title', 'Click to email');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(8, 27, 41, 0.95)';
    } else {
        header.style.background = 'rgba(8, 27, 41, 0.85)';
    }
});

 /*Handle mobile menu (optional - uncomment if you add a hamburger menu)*/
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

// Console message for developer
console.log('Portfolio website loaded successfully!');
console.log('Contact: amariyatesfaw@email.com');

(function(){
    emailjs.init("TwNCQwp7IJBN4cKJ2");
})();

const form = document.getElementById("contact-form");
const messageBox = document.getElementById("form-message");

form.addEventListener("submit", function(e){
    e.preventDefault();

    messageBox.textContent = "Sending...";
    messageBox.className = "";

    emailjs.sendForm(
        "service_mqoh9mg",
        "template_gzr31ij",
        this
    )
    .then(function(){
        messageBox.innerHTML = "Thank you for reaching out!<br>I’ve received your message and will get back to you as soon as possible.";
        messageBox.className = "success";
        form.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
            messageBox.textContent = "";
            messageBox.className = "";
        }, 5000);
    })
    .catch(function(error){
        messageBox.textContent = "❌ Failed to send message. Please try again.";
        messageBox.className = "error";
        console.log(error);

        // Optional: auto-hide error message after 5 seconds
        setTimeout(() => {
            messageBox.textContent = "";
            messageBox.className = "";
        }, 5000);
    });
});
const certBtn = document.getElementById("certBtn");
const gallery = document.getElementById("gallery");

certBtn.addEventListener("click", function(e){

e.preventDefault();

if(gallery.style.display === "none" || gallery.style.display === ""){
gallery.style.display = "flex";
certBtn.textContent = "Hide Certificates";
}
else{
gallery.style.display = "none";
certBtn.textContent = "My Certificate";
}

});
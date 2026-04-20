// 1. Sidebar Menu & Animation for Mobile
const mobileToggle = document.getElementById('mobile-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const navLinks = document.querySelectorAll('.sidebar .nav-links a');
const toggleIcon = mobileToggle.querySelector('i'); // جلب الأيقونة

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    // إرجاع الأيقونة لشكل الـ Bars
    toggleIcon.classList.remove('fa-times');
    toggleIcon.classList.add('fa-bars');
}

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // تغيير الأيقونة بين Bars و Times
    if (sidebar.classList.contains('active')) {
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
    } else {
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    }
});

overlay.addEventListener('click', closeSidebar);
navLinks.forEach(link => { link.addEventListener('click', closeSidebar); });

// 2. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            const headerOffset = 80; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
        }
    });
});

// 3. Scroll Fade-In Animation
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);
faders.forEach(fader => { appearOnScroll.observe(fader); });

// 4. EmailJS Integration & Custom Alert
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const customAlert = document.getElementById('custom-alert');
const closeAlertBtn = document.getElementById('close-alert');

if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const serviceID = 'service_vwqtf2a'; 
        const templateID = 'template_2q65tqr'; 

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
                contactForm.reset();
                customAlert.classList.add('active');
            }, (err) => {
                submitBtn.innerText = "Send Message";
                submitBtn.disabled = false;
                alert("Oops! Something went wrong. \n" + JSON.stringify(err));
            });
    });
}

if(closeAlertBtn) {
    closeAlertBtn.addEventListener('click', () => {
        customAlert.classList.remove('active');
    });
}
// Navbar Toggle and Active Link
const toggleButton = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav__links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const navbar = document.querySelector('nav');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }

  const scrollPos = window.scrollY;

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop - navbarHeight && scrollPos < sectionTop + sectionHeight) {
      document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
    } else {
      document.querySelector(`a[href="#${sectionId}"]`).classList.remove('active');
    }
  });
});

// Smooth Scroll Behavior and Remove Active Class on Click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelectorAll('.nav__links a').forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// More About Section Toggle (Show More / Show Less)
const moreAboutBtn = document.getElementById('more-about-btn');
const moreAboutContent = document.getElementById('more-about-content');
const btnText = document.getElementById('btn-text');
const btnArrow = document.getElementById('btn-arrow');

moreAboutBtn?.addEventListener('click', () => {
  const isContentVisible = moreAboutContent.style.maxHeight;
  if (isContentVisible) {
    moreAboutContent.style.maxHeight = null;
    btnText.textContent = 'Show More';
    btnArrow.classList.remove('ri-arrow-up-s-line');
    btnArrow.classList.add('ri-arrow-down-s-line');
  } else {
    moreAboutContent.style.maxHeight = moreAboutContent.scrollHeight + "px";
    btnText.textContent = 'Show Less';
    btnArrow.classList.remove('ri-arrow-down-s-line');
    btnArrow.classList.add('ri-arrow-up-s-line');
  }
});

// Contact Form Handling with SweetAlert and Formspree
document.getElementById('contact-form')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch("https://formspree.io/f/movwkode", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully!',
          background: '#ffffff',
          color: '#0d1319',     
          confirmButtonColor: '#ff4e05', 
          iconColor: '#ff4e05',
        });
        form.reset();
      } else {
        return response.json().then(data => {
          throw new Error(data.error || "An error occurred");
        });
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Something went wrong: ${error.message}`,
        background: '#ffffff', 
        color: '#0d1319',    
        confirmButtonColor: '#bf3900',
        iconColor: '#bf3900',
      });
    });
});

// Project Data
const projects = [
  {
    title: "Game Website",
    description: "Developed an engaging and interactive browser-based game interface using JavaScript and CSS, focusing on smooth animations and user experience.",
    github: "https://github.com/AlshimaaAlnajjar/Game-Over.git",
    demo: "https://alshimaaalnajjar.github.io/Game-Over/",
    image: "assets/project-1.png"
  },
  {
    title: "Shopping Website (Bella)",
    description: "Built a fully responsive e-commerce platform with dynamic product listings, shopping cart functionality, and seamless user interactions using React.js and CSS.",
    github: "https://github.com/AlshimaaAlnajjar/Bella.git",
    demo: "https://alshimaaalnajjar.github.io/Bella/",
    image: "assets/project-2.png"
  },
  {
    title: "Weather Website",
    description: "Created a weather forecasting application integrating third-party APIs to fetch real-time data, featuring a clean, responsive design and interactive UI powered by JavaScript.",
    github: "https://github.com/AlshimaaAlnajjar/Weather-Website.git",
    demo: "https://alshimaaalnajjar.github.io/Weather-Website/",
    image: "assets/project-3.png"
  },
  {
    title: "Education Website",
    description: "Designed and implemented a responsive educational platform interface that offers easy navigation and content accessibility across devices.",
    github: "https://github.com/AlshimaaAlnajjar/Education-website.git",
    demo: "https://alshimaaalnajjar.github.io/Education-website/",
    image: "assets/project-4.png"
  },
  {
    title: "Bookmark Website",
    description: "Developed a bookmarking web app with local storage integration, enabling users to save and manage favorite links efficiently with a user-friendly interface.",
    github: "https://github.com/AlshimaaAlnajjar/Bookmark.git",
    demo: "https://alshimaaalnajjar.github.io/Bookmark/",
    image: "assets/project-5.png"
  },
  {
    title: "Login-system Website",
    description: "Implemented a secure login system featuring form validation, session management, and error handling to enhance user authentication experience.",
    github: "https://github.com/AlshimaaAlnajjar/Login-system.git",
    demo: "https://alshimaaalnajjar.github.io/Login-system/",
    image: "assets/project-6.png"
  }
];

// Generate Projects Dynamically
function generateProjects() {
  const projectGrid = document.getElementById('project-grid');
  if (!projectGrid) return;

  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project__card');

    const projectImageContainer = document.createElement('div');
    projectImageContainer.classList.add('project__image-container');

    const projectImage = document.createElement('img');
    projectImage.src = project.image;
    projectImage.alt = project.title;
    projectImageContainer.appendChild(projectImage);

    const overlay = document.createElement('div');
    overlay.classList.add('project__overlay');

    const githubIcon = document.createElement('a');
    githubIcon.href = project.github;
    githubIcon.target = "_blank";
    githubIcon.classList.add('project__icon');
    githubIcon.innerHTML = '<i class="ri-github-fill"></i>';

    const demoIcon = document.createElement('a');
    demoIcon.href = project.demo;
    demoIcon.target = "_blank";
    demoIcon.classList.add('project__icon');
    demoIcon.innerHTML = '<i class="ri-play-fill"></i>';

    overlay.appendChild(githubIcon);
    overlay.appendChild(demoIcon);

    projectImageContainer.appendChild(overlay);
    projectCard.appendChild(projectImageContainer);

    const projectTitle = document.createElement('h4');
    projectTitle.textContent = project.title;
    projectTitle.classList.add('project__title');
    projectCard.appendChild(projectTitle);

    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;
    projectDescription.classList.add('project__description');
    projectCard.appendChild(projectDescription);

    projectGrid.appendChild(projectCard);
  });
}

window.onload = generateProjects;

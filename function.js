const desktopLinks = document.querySelectorAll('nav.nav-desktop li.nav-link');
const mobileLinks = document.querySelectorAll('nav.nav-mobile li.nav-link');
const mobileUl = document.querySelector('nav.nav-mobile ul');
const carouselItems = document.querySelectorAll('.carousel__item');
const moreInfoBtn = document.querySelector('.case__study__above__btn');
const caseStudyBelow = document.querySelector('.case__study__below');
const caseStudyBtn = document.querySelector('.case__study__btn');

const scrollableElement = document.querySelector('body');

const kontaktExit = document.querySelector('.kontakt__exit__button');
const kontaktSection = document.querySelector('section.kontakt');
const btnCta = document.querySelectorAll('button.cta');

const offerCardBtn1 = document.querySelector(".offer__card__more__btn.standart")
const offerCardOther1 = document.querySelector(".offer__card__other.standart")

const offerCardBtn2 = document.querySelector(".offer__card__more__btn.plus")
const offerCardOther2 = document.querySelector(".offer__card__other.plus")

const namietkyVideo = document.querySelector(".namietky-video");

const offerCardBtn3 = document.querySelector(".offer__card__more__btn.premium")
const offerCardOther3 = document.querySelector(".offer__card__other.premium")
const videos = ["/videos/nemam-cas.webm", "/videos/technicky-typ.webm", "/videos/nemam-peniaze.webm"];

const images = [
  '/images/zhliadnutia-img.png',
  '/images/kontakty-img.png',
  '/images/sledovatelia-img.png',
  // add more as needed
];

function startImageCycle() {
  const img = document.querySelector('.case__study__above__chart__visual img');
  let current = 0;



    setInterval(() => {
    current = (current + 1) % images.length;
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = images[current];
        img.style.opacity = '1';
    }, 400);
    }, 5000);
    }

startImageCycle();


const sections = [
    document.querySelector('section.hero'),
    document.querySelector('section.objections'),
    document.querySelector('section.case__study'),
    document.querySelector('section.services'),
    document.querySelector('section.offer'),
];


function setActive(index) {
    // Clear all active classes in both menus
    desktopLinks.forEach(link => link.classList.remove('active'));
    mobileLinks.forEach(link => link.classList.remove('active'));

    // Set active on the clicked index in both menus
    desktopLinks[index].classList.add('active');
    mobileLinks[index].classList.add('active');
}

// Desktop clicks
desktopLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        setActive(index);
    });
});

// Mobile clicks
mobileLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        // If clicking the already-active link, toggle the menu open/close
        if (link.classList.contains('active')) {
            mobileUl.classList.toggle('open');
        } else {
            // Set new active and close the menu
            setActive(index);
            mobileUl.classList.remove('open');
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    let closest = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
            closestDistance = distance;
            closest = section;
        }
    });

    if (closest) {
        const index = sections.indexOf(closest);
        if (index !== -1) setActive(index);
    }
}, { threshold: [0, 0.25, 0.5] });
sections.forEach(section => {
    if (section) observer.observe(section);
});


carouselItems.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.classList.contains("active")){
        }
        else {
            carouselItems.forEach((i) => {
                i.classList.remove("active")
            });
            item.classList.add("active");
            let videoItem = Array.from(carouselItems).indexOf(item);
            namietkyVideo.src = videos[videoItem];

        }
    });
});

moreInfoBtn.addEventListener("click", () => {
    if (caseStudyBelow.classList.contains("active")) {
        caseStudyBelow.classList.remove("active");
        caseStudyBtn.classList.remove("active");
    }
    else {
        caseStudyBelow.classList.add("active");
        caseStudyBtn.classList.add("active");
    }
});

offerCardBtn1.addEventListener("click", () => {
    if (offerCardBtn1.classList.contains("active")) {
        offerCardBtn1.classList.remove("active");
        offerCardOther1.classList.remove("active");
    }
    else {
        offerCardBtn1.classList.add("active");
        offerCardOther1.classList.add("active");
    }
});

offerCardBtn2.addEventListener("click", () => {
    if (offerCardBtn2.classList.contains("active")) {
        offerCardBtn2.classList.remove("active");
        offerCardOther2.classList.remove("active");
    }
    else {
        offerCardBtn2.classList.add("active");
        offerCardOther2.classList.add("active");
    }
});

offerCardBtn3.addEventListener("click", () => {
    if (offerCardBtn3.classList.contains("active")) {
        offerCardBtn3.classList.remove("active");
        offerCardOther3.classList.remove("active");
    }
    else {
        offerCardBtn3.classList.add("active");
        offerCardOther3.classList.add("active");
    }
});

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
}

function disableScroll() {
    // Adding { passive: false } allows preventDefault() to work
    scrollableElement.addEventListener("wheel", preventScroll, { passive: false });
}

function enableScroll() {
    scrollableElement.removeEventListener("wheel", preventScroll);
}

kontaktExit.addEventListener("click", () => {
    kontaktSection.classList.remove("active");
    enableScroll(); // Added parentheses to invoke
});

btnCta.forEach((item) => {
    item.addEventListener("click", () => {
        kontaktSection.classList.add("active");
        disableScroll(); // Added parentheses to invoke
    });
});

const heroVisual = document.querySelector(".hero-visual");
const DURATION = 600;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

function lockPanel(video) {
  if (!video) return;
  video.pause();
  video.currentTime = 0;
  video.muted = true;
  video.style.pointerEvents = "none";
}

function activatePanel(video) {
  if (!video) return;
  video.muted = true;
  video.currentTime = 0;
  video.style.pointerEvents = "auto";
  video.play().catch(() => {});
}

function applyState() {
  const panels = Array.from(heroVisual.querySelectorAll(".mobile-panel"));
  
  panels.forEach((p, index) => {
    const video = p.querySelector("video");
    if (index === 1) { // Middle Panel (New active video)
      p.style.filter = "none";
      p.style.zIndex = "2";
      activatePanel(video);
      video.onended = shift; // Trigger next shift when done
    } else {
      p.style.filter = "blur(10px)";
      p.style.zIndex = "1";
      lockPanel(video);
      video.onended = null;
    }
  });
}

function shift() {
  const panels = Array.from(heroVisual.querySelectorAll(".mobile-panel"));
  const [p1, p2, p3] = panels;

  // Get current coordinates
  const r1 = p1.getBoundingClientRect();
  const r2 = p2.getBoundingClientRect();
  const r3 = p3.getBoundingClientRect();

  // 1. Prepare transitions
  [p1, p2, p3].forEach(p => {
    p.style.transition = `transform ${DURATION}ms ${EASING}, filter ${DURATION}ms, opacity ${DURATION}ms`;
  });

  // 2. The Move (Reverse Direction):
  // p2 (mid) moves to p3 (right)
  p2.style.transform = `translate(${r3.left - r2.left}px, ${r3.top - r2.top}px)`;
  
  // p1 (left) moves to p2 (mid)
  p1.style.transform = `translate(${r2.left - r1.left}px, ${r2.top - r1.top}px)`;

  // p3 (right) "recycles" by dropping out and moving to the p1 (left) position
  p3.style.transform = `translateY(${window.innerHeight}px)`;
  p3.style.opacity = "0";

  setTimeout(() => {
    // 3. Reorder DOM: Move the last element (p3) to the very start
    // This makes the former "right" panel the new "left" panel
    heroVisual.prepend(p3);

    // 4. Reset Styles for the new DOM positions
    const newPanels = Array.from(heroVisual.querySelectorAll(".mobile-panel"));
    newPanels.forEach(p => {
      p.style.transition = "none";
      p.style.transform = "none";
      p.style.opacity = "1";
    });

    // 5. Update visuals and activate the new middle video
    applyState();
  }, DURATION);
}

// Initial setup
function init() {
  // Ensure videos are ready
  const videos = heroVisual.querySelectorAll("video");
  videos.forEach(v => {
    v.muted = true;
    v.setAttribute("playsinline", "");
  });
  
  applyState();
}

init();
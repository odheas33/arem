document.querySelector(".icon-menu").addEventListener("click", function (event) {
  event.preventDefault();
  document.body.classList.toggle("menu-open");
});

const spollerButtons = document.querySelectorAll("[data-spoller] .spollers-faq__button");

spollerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const currentItem = button.closest("[data-spoller]");
    const content = currentItem.querySelector(".spollers-faq__text");

    const parent = currentItem.parentNode;
    const isOneSpoller = parent.hasAttribute("data-one-spoller");

    if (isOneSpoller) {
      const allItems = parent.querySelectorAll("[data-spoller]");
      allItems.forEach((item) => {
        if (item !== currentItem) {
          const otherContent = item.querySelector(".spollers-faq__text");
          item.classList.remove("active");
          otherContent.style.maxHeight = null;
        }
      });
    }

    if (currentItem.classList.contains("active")) {
      currentItem.classList.remove("active");
      content.style.maxHeight = null;
    } else {
      currentItem.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Menü dışına tıklandığında menüyü kapat
document.addEventListener('click', function(e) {
  if (document.body.classList.contains('menu-open')) {
    if (!e.target.closest('.menu__body') && !e.target.closest('.icon-menu')) {
      document.body.classList.remove('menu-open');
    }
  }
});

// Dropdown menü içindeki linklere tıklanınca sadece menüyü kapat
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function() {
    document.body.classList.remove('menu-open');
  });
});

// Testimonials slider
document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.querySelector('.testimonials__wrapper');
  const prevButton = document.querySelector('.testimonials__prev');
  const nextButton = document.querySelector('.testimonials__next');
  const items = document.querySelectorAll('.testimonial__item');
  
  if (wrapper && prevButton && nextButton && items.length > 0) {
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 32;
    const itemsPerView = window.innerWidth > 768 ? 3 : 1;
    const maxIndex = items.length - itemsPerView;

    function updateSlider() {
      wrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateSlider();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = Math.min(currentIndex + 1, maxIndex);
      updateSlider();
    });

    // Otomatik kaydırma
    setInterval(() => {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    }, 5000);
  }
});

// Smooth scroll için
document.querySelectorAll('.dropdown-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').split('#')[1];
    const target = document.getElementById(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Testimonials Slider için geliştirilmiş sürükleme özelliği
const slider = document.querySelector('.testimonials__wrapper');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;
const itemWidth = document.querySelector('.testimonial__item')?.offsetWidth + 32 || 0;
const itemsPerView = window.innerWidth > 768 ? 3 : 1;
const maxIndex = document.querySelectorAll('.testimonial__item').length - itemsPerView;

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function touchStart(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  slider.style.cursor = 'grabbing';
  slider.style.transition = 'none';
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  slider.style.cursor = 'grab';
  slider.style.transition = 'transform 0.3s ease-out';

  const movedBy = currentTranslate - prevTranslate;
  
  if (movedBy < -100 && currentIndex < maxIndex) {
    currentIndex++;
  }
  if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  currentTranslate = currentIndex * -itemWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function touchMove(event) {
  if (!isDragging) return;
  
  const currentPosition = getPositionX(event);
  const diff = currentPosition - startPos;
  currentTranslate = prevTranslate + diff;
  
  // Sınırları kontrol et
  const minTranslate = -(maxIndex * itemWidth);
  const maxTranslate = 0;
  
  currentTranslate = Math.max(minTranslate, Math.min(maxTranslate, currentTranslate));
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Mouse Events
slider.addEventListener('mousedown', touchStart);
slider.addEventListener('mousemove', touchMove);
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('mouseleave', touchEnd);

// Touch Events
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

// Prevent context menu
slider.addEventListener('contextmenu', e => e.preventDefault());

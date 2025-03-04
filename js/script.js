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

document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.querySelector('.testimonials__wrapper');
  const prevButton = document.querySelector('.testimonials__prev');
  const nextButton = document.querySelector('.testimonials__next');
  const items = document.querySelectorAll('.testimonial__item');
  
  let currentIndex = 0;
  const itemWidth = items[0].offsetWidth + 32; // 32px gap
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
});

document.querySelectorAll('.menu__item-dropdown').forEach(item => {
  item.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.classList.toggle('active');
    }
  });
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

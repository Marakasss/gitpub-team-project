document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.querySelector('.header--open-menu');
    const menuContainer = document.getElementById('menu-container');
  
    if (!burgerBtn || !menuContainer) {
      console.error('Не знайдено бургер або контейнер для меню');
      return;
    }
  
    burgerBtn.addEventListener('click', async () => {
      if (!menuContainer.innerHTML.trim()) {
        try {
          const response = await fetch('./partials/menu.html');
          const data = await response.text();
          menuContainer.innerHTML = data;
  
          const menuCssLink = document.createElement('link');
          menuCssLink.rel = 'stylesheet';
          menuCssLink.href = './css/menu.css';
          document.head.appendChild(menuCssLink);
  
          initMenuFunctions();
        } catch (error) {
          console.error('Не вдалося завантажити меню:', error);
        }
      } else {
        openMenu();
      }
    });
  
    function initMenuFunctions() {
      const menu = document.querySelector('.menu');
      const closeBtn = document.querySelector('.close-btn');
  
      if (!menu || !closeBtn) {
        console.error('Не знайдено меню або кнопку закриття');
        return;
      }
  
      openMenu();
  
      closeBtn.addEventListener('click', () => {
        closeMenu();
      });
  
      if (window.innerWidth <= 768) {
        initSwipeMenu(menu);
      }
    }
  
    function openMenu() {
      const menu = document.querySelector('.menu');
      if (menu) {
        menu.classList.add('open');
      }
    }
  
    function closeMenu() {
      const menu = document.querySelector('.menu');
      if (menu) {
        menu.classList.remove('open');
      }
    }
  
    function initSwipeMenu(menu) {
      let touchStartX = null;
      let touchEndX = null;
  
      // Свайп на документі для відкриття меню
      document.addEventListener('touchstart', (e) => {
        if (menu.classList.contains('open')) return;
        touchStartX = e.changedTouches[0].screenX;
      }, false);
  
      document.addEventListener('touchend', (e) => {
        if (menu.classList.contains('open')) return;
        touchEndX = e.changedTouches[0].screenX;
  
        if (touchStartX === null || touchEndX === null) return;
  
        const swipeDistance = touchStartX - touchEndX;
        const swipeThreshold = 50;
  
        if (swipeDistance > swipeThreshold) {
          openMenu();
        }
  
        touchStartX = null;
        touchEndX = null;
      }, false);
  
      // Свайп на самому меню для закриття меню
      menu.addEventListener('touchstart', (e) => {
        if (!menu.classList.contains('open')) return;
        touchStartX = e.changedTouches[0].screenX;
      }, false);
  
      menu.addEventListener('touchend', (e) => {
        if (!menu.classList.contains('open')) return;
        touchEndX = e.changedTouches[0].screenX;
  
        if (touchStartX === null || touchEndX === null) return;
  
        const swipeDistance = touchStartX - touchEndX;
        const swipeThreshold = 50;
  
        if (swipeDistance < -swipeThreshold) {
          closeMenu();
        }
  
        touchStartX = null;
        touchEndX = null;
      }, false);
    }
  });
  
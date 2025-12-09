const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');       // ← превращает бургер в крестик
  mobileMenu.classList.toggle('open');   // ← открывает/закрывает меню
});

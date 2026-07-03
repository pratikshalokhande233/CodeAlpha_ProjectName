const galleryGrid = document.getElementById('galleryGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cards = Array.from(document.querySelectorAll('.gallery-card'));
let currentIndex = 0;

function filterGallery(category) {
  cards.forEach((card) => {
    const matches = category === 'all' || card.dataset.category === category;
    card.style.display = matches ? 'block' : 'none';
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    filterGallery(button.dataset.category);
  });
});

function showLightbox(index) {
  const visibleCards = cards.filter((card) => card.style.display !== 'none');
  currentIndex = visibleCards.indexOf(cards[index]);
  const activeCard = cards[index];

  if (!activeCard) return;

  const image = activeCard.querySelector('img');
  const caption = activeCard.querySelector('h2').textContent;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
  lightbox.classList.remove('hidden');
}

function openLightboxFromCard(card) {
  const index = cards.indexOf(card);
  showLightbox(index);
}

cards.forEach((card) => {
  card.addEventListener('click', () => openLightboxFromCard(card));
});

function updateLightbox(direction) {
  const visibleCards = cards.filter((card) => card.style.display !== 'none');
  if (!visibleCards.length) return;

  currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
  const nextCard = visibleCards[currentIndex];
  const image = nextCard.querySelector('img');
  const caption = nextCard.querySelector('h2').textContent;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
}

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', () => updateLightbox(1));
prevBtn.addEventListener('click', () => updateLightbox(-1));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

window.addEventListener('keydown', (event) => {
  if (lightbox.classList.contains('hidden')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') updateLightbox(1);
  if (event.key === 'ArrowLeft') updateLightbox(-1);
});

filterGallery('all');

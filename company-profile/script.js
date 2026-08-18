/* =========================================================
   ARTEVA STUDIO — interactions
========================================================= */

/* ---------- Navbar scroll state + mobile menu ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Hero video fallback (if video source unavailable, keep blob bg) ---------- */
const heroVideo = document.getElementById('heroVideo');
heroVideo.addEventListener('error', () => { heroVideo.style.display = 'none'; }, true);

/* ---------- Decorative cursor dot ---------- */
const paintCursor = document.getElementById('paintCursor');
window.addEventListener('mousemove', (e) => {
  paintCursor.style.left = e.clientX + 'px';
  paintCursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .service-box, .gallery-card, .artist-photo, .book').forEach(el => {
  el.addEventListener('mouseenter', () => { paintCursor.style.width = '44px'; paintCursor.style.height = '44px'; paintCursor.style.borderColor = '#eccf4d'; });
  el.addEventListener('mouseleave', () => { paintCursor.style.width = '26px'; paintCursor.style.height = '26px'; paintCursor.style.borderColor = '#ef9fc0'; });
});

/* =========================================================
   GALLERY — categories with connected images + arrows
========================================================= */
const galleryData = [
  {
    id: 'painting',
    title: 'Custom Painting',
    tagText: 'Series',
    images: [
      { src: 'https://picsum.photos/seed/gal-paint-1/700/900', caption: 'Sunset Bloom — acrylic on canvas, 2025' },
      { src: 'https://picsum.photos/seed/gal-paint-2/700/900', caption: 'Sunset Bloom, detail study' },
      { src: 'https://picsum.photos/seed/gal-paint-3/700/900', caption: 'Sunset Bloom, work in progress' },
    ]
  },
  {
    id: 'exhibition',
    title: 'Art Exhibition',
    tagText: 'Event',
    images: [
      { src: 'https://picsum.photos/seed/gal-expo-1/700/900', caption: '“Quiet Colors” opening night' },
      { src: 'https://picsum.photos/seed/gal-expo-2/700/900', caption: 'Visitors exploring the main hall' },
      { src: 'https://picsum.photos/seed/gal-expo-3/700/900', caption: 'Curator talk & artist meet-up' },
    ]
  },
  {
    id: 'illustration',
    title: 'Illustration',
    tagText: 'Project',
    images: [
      { src: 'https://picsum.photos/seed/gal-illus-1/700/900', caption: 'Children book illustration set' },
      { src: 'https://picsum.photos/seed/gal-illus-2/700/900', caption: 'Character exploration sketches' },
      { src: 'https://picsum.photos/seed/gal-illus-3/700/900', caption: 'Final spread, printed edition' },
    ]
  },
  {
    id: 'workshop',
    title: 'Art Workshop',
    tagText: 'Class',
    images: [
      { src: 'https://picsum.photos/seed/gal-work-1/700/900', caption: 'Watercolor basics workshop' },
      { src: 'https://picsum.photos/seed/gal-work-2/700/900', caption: 'Participants at work' },
      { src: 'https://picsum.photos/seed/gal-work-3/700/900', caption: 'Showcasing finished pieces' },
    ]
  },
];

const galleryGrid = document.getElementById('galleryGrid');
galleryData.forEach((cat, idx) => {
  const card = document.createElement('div');
  card.className = 'gallery-card';
  card.dataset.index = idx;
  card.innerHTML = `
    <img src="${cat.images[0].src}" alt="${cat.title}">
    <div class="gallery-card-label">
      <span>${cat.tagText}</span>
      <h3>${cat.title}</h3>
    </div>`;
  galleryGrid.appendChild(card);
});

const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
const galleryDots = document.getElementById('galleryDots');
let activeCat = null, activeImgIndex = 0;

function openGallery(catIndex){
  activeCat = galleryData[catIndex];
  activeImgIndex = 0;
  renderGalleryImage();
  galleryModal.classList.add('open');
}
function renderGalleryImage(){
  const item = activeCat.images[activeImgIndex];
  galleryImage.src = item.src;
  galleryImage.alt = item.caption;
  galleryCaption.textContent = item.caption;
  galleryDots.innerHTML = activeCat.images.map((_, i) =>
    `<span class="${i === activeImgIndex ? 'active' : ''}"></span>`).join('');
}
function closeGallery(){
  galleryModal.classList.remove('open');
  activeCat = null;
}
galleryGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.gallery-card');
  if (card) openGallery(Number(card.dataset.index));
});
document.getElementById('galleryClose').addEventListener('click', closeGallery);
document.getElementById('galleryBackdrop').addEventListener('click', closeGallery);
document.getElementById('galleryPrev').addEventListener('click', () => {
  activeImgIndex = (activeImgIndex - 1 + activeCat.images.length) % activeCat.images.length;
  renderGalleryImage();
});
document.getElementById('galleryNext').addEventListener('click', () => {
  activeImgIndex = (activeImgIndex + 1) % activeCat.images.length;
  renderGalleryImage();
});
document.addEventListener('keydown', (e) => {
  if (!galleryModal.classList.contains('open')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') document.getElementById('galleryPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('galleryNext').click();
});

/* =========================================================
   ARTISTS — tap avatar to reveal description
========================================================= */
const artistData = [
  {
    name: 'Natalia Agustin',
    role: 'Founder & Lead Artist',
    photo: 'https://picsum.photos/seed/artist-natalia/300/300',
    desc: 'Pendiri Arteva Studio. Berfokus pada lukisan ekspresif bertema emosi dan memori, dengan sentuhan warna pastel yang lembut.',
    tag: 'Founder'
  },
  {
    name: 'Raka Pramudya',
    role: 'Illustrator',
    photo: 'https://picsum.photos/seed/artist-raka/300/300',
    desc: 'Ilustrator dengan gaya whimsical, banyak berkarya untuk buku anak dan proyek editorial.',
    tag: 'Illustration'
  },
  {
    name: 'Bianca Wirawan',
    role: 'Fine Art Painter',
    photo: 'https://picsum.photos/seed/artist-bianca/300/300',
    desc: 'Spesialis lukisan cat minyak dengan tema alam dan potret, aktif dalam beberapa pameran nasional.',
    tag: 'Fine Art'
  },
  {
    name: 'Devan Saputra',
    role: 'Workshop Mentor',
    photo: 'https://picsum.photos/seed/artist-devan/300/300',
    desc: 'Mentor workshop yang senang membimbing pemula menemukan gaya seni mereka sendiri.',
    tag: 'Mentor'
  },
];

const artistRow = document.getElementById('artistRow');
artistData.forEach((a) => {
  const el = document.createElement('div');
  el.className = 'artist';
  el.innerHTML = `
    <div class="artist-photo"><img src="${a.photo}" alt="${a.name}"></div>
    <div class="artist-name">${a.name}</div>
    <div class="artist-role">${a.role}</div>
    <div class="artist-desc">
      <h4>${a.name}</h4>
      <p>${a.desc}</p>
      <span class="artist-tag">${a.tag}</span>
    </div>`;
  artistRow.appendChild(el);
});

document.addEventListener('click', (e) => {
  const photo = e.target.closest('.artist-photo');
  const allArtists = document.querySelectorAll('.artist');
  if (photo) {
    const artistEl = photo.closest('.artist');
    const wasActive = artistEl.classList.contains('active');
    allArtists.forEach(a => a.classList.remove('active'));
    if (!wasActive) artistEl.classList.add('active');
  } else if (!e.target.closest('.artist-desc')) {
    allArtists.forEach(a => a.classList.remove('active'));
  }
});

/* =========================================================
   EXHIBITIONS — virtual book flip
========================================================= */
const exhibitionData = [
  {
    title: 'Quiet Colors',
    date: 'Mar 2026',
    cover: 'https://picsum.photos/seed/expo-cover-1/500/650',
    desc: 'Pameran tunggal yang mengangkat tema ketenangan lewat sapuan warna pastel dan komposisi minim.'
  },
  {
    title: 'Fragments of Us',
    date: 'Jul 2025',
    cover: 'https://picsum.photos/seed/expo-cover-2/500/650',
    desc: 'Kolaborasi lima seniman muda menampilkan potongan memori personal dalam berbagai medium.'
  },
  {
    title: 'Paper Tales',
    date: 'Nov 2025',
    cover: 'https://picsum.photos/seed/expo-cover-3/500/650',
    desc: 'Eksplorasi ilustrasi di atas kertas buatan tangan, menghadirkan cerita rakyat dengan gaya kontemporer.'
  },
];

const bookShelf = document.getElementById('bookShelf');
exhibitionData.forEach((ex) => {
  const book = document.createElement('div');
  book.className = 'book';
  book.innerHTML = `
    <div class="book-cover" style="background-image:url('${ex.cover}')">
      <div class="book-cover-text">
        <span>${ex.date}</span>
        <h3>${ex.title}</h3>
      </div>
    </div>
    <div class="book-page">
      <span class="book-meta">${ex.date}</span>
      <h4>${ex.title}</h4>
      <p>${ex.desc}</p>
    </div>`;
  book.addEventListener('click', () => book.classList.toggle('flipped'));
  bookShelf.appendChild(book);
});

/* =========================================================
   WORKSHOPS
========================================================= */
const workshopData = [
  { title: 'Watercolor for Beginners', desc: 'Kenali dasar teknik cat air dalam sesi santai selama 3 jam.', duration: '3 jam', price: 'Rp 275rb' },
  { title: 'Portrait Drawing', desc: 'Belajar proporsi wajah dan shading untuk hasil potret realistis.', duration: '4 jam', price: 'Rp 350rb' },
  { title: 'Acrylic Painting Intensive', desc: 'Eksplorasi tekstur dan layering dengan cat akrilik di atas kanvas.', duration: '2 hari', price: 'Rp 650rb' },
  { title: 'Kids Art Class', desc: 'Kelas seru untuk anak usia 6–12 tahun mengenal warna & bentuk.', duration: '2 jam', price: 'Rp 150rb' },
];
const workshopList = document.getElementById('workshopList');
workshopData.forEach(w => {
  const card = document.createElement('div');
  card.className = 'workshop-card';
  card.innerHTML = `
    <h3>${w.title}</h3>
    <p>${w.desc} · Durasi ${w.duration}</p>
    <div class="workshop-meta">
      <span class="workshop-price">${w.price}<br><small>/ orang</small></span>
      <button class="workshop-btn" type="button">Book Now</button>
    </div>`;
  card.querySelector('.workshop-btn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    const topicSelect = document.querySelector('select[name="topic"]');
    if (topicSelect) topicSelect.value = 'Art Workshop';
  });
  workshopList.appendChild(card);
});

/* =========================================================
   TESTIMONIALS
========================================================= */
const testimonialData = [
  { quote: 'Lukisan yang Arteva Studio buat untuk kado ulang tahun ibu saya sangat menyentuh, detailnya luar biasa.', name: 'Sarah W.', role: 'Klien Custom Painting' },
  { quote: 'Workshop-nya seru dan mentornya sabar banget, cocok buat pemula seperti saya.', name: 'Fajar R.', role: 'Peserta Workshop' },
  { quote: 'Pameran yang diselenggarakan sangat rapi dan hangat, banyak insight baru soal seni lokal.', name: 'Melinda T.', role: 'Pengunjung Pameran' },
  { quote: 'Ilustrasi buku anak kami jadi hidup berkat tim Arteva. Proses komunikasinya juga lancar.', name: 'Studio Kata Kecil', role: 'Klien Illustration' },
];
const testimonialTrack = document.getElementById('testimonialTrack');
const testInner = document.createElement('div');
testInner.className = 'test-inner';
testimonialData.forEach(t => {
  const card = document.createElement('div');
  card.className = 'test-card';
  card.innerHTML = `
    <div class="test-stars">★★★★★</div>
    <p class="test-quote">“${t.quote}”</p>
    <div class="test-person">${t.name}</div>
    <div class="test-role">${t.role}</div>`;
  testInner.appendChild(card);
});
testimonialTrack.appendChild(testInner);

const testDots = document.getElementById('testDots');
testimonialData.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => setTestIndex(i));
  testDots.appendChild(dot);
});

let testIndex = 0;
function setTestIndex(i){
  testIndex = (i + testimonialData.length) % testimonialData.length;
  testInner.style.transform = `translateX(-${testIndex * 100}%)`;
  [...testDots.children].forEach((d, idx) => d.classList.toggle('active', idx === testIndex));
}
document.getElementById('testPrev').addEventListener('click', () => setTestIndex(testIndex - 1));
document.getElementById('testNext').addEventListener('click', () => setTestIndex(testIndex + 1));
let testAutoplay = setInterval(() => setTestIndex(testIndex + 1), 6000);
testimonialTrack.addEventListener('mouseenter', () => clearInterval(testAutoplay));
testimonialTrack.addEventListener('mouseleave', () => { testAutoplay = setInterval(() => setTestIndex(testIndex + 1), 6000); });

/* =========================================================
   CONTACT FORM (UI only — no backend)
========================================================= */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Terima kasih! Pesanmu sudah kami terima ✦';
  contactForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 5000);
});

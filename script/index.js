import galleryItems from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  modal: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay')
}

refs.gallery.insertAdjacentHTML('beforeend', getItemOfGallery(galleryItems));

refs.gallery.addEventListener('click', onGalleryClick);

refs.closeModalBtn.addEventListener('click', onCloseModal);


function getItemOfGallery(arr) {
  const itemOfGallery = arr.map(({ preview, original, description}, index) =>
`<li class="gallery__item">
<a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
</a>
</li>`)
.join('');
  return itemOfGallery;
}

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = e.target;
  
  refs.largeImage.src = imageRef.dataset.source;
  refs.largeImage.alt = imageRef.alt;
  refs.largeImage.index = imageRef.dataset.index;
  onOpenModal();
}

function onOpenModal() {
  window.addEventListener('keydown', onPressESC);
  window.addEventListener('keydown', onPressArrow); 
  refs.modal.classList.add('is-open');
  refs.overlay.addEventListener('click', onClickOverlay);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);
  window.removeEventListener('keydown', onPressArrow);
  refs.modal.classList.remove('is-open');
  refs.largeImage.src = '#';
  refs.largeImage.alt = ' ';
}

function onPressESC(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onClickOverlay(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onPressArrow(e) {
  let currentIndex = Number(refs.largeImage.index);

  if (e.code === 'ArrowLeft' & currentIndex !== 0) {
    const prevLargeImage=document.querySelector(`img[data-index="${currentIndex - 1}"]`);
    
    refs.largeImage.src = prevLargeImage.dataset.source;
    refs.largeImage.alt = prevLargeImage.alt;
    refs.largeImage.index -= 1;
  }
    
  else if (e.code === 'ArrowRight' & currentIndex !== galleryItems.length-1 ) {
      const nextLargeImage = document.querySelector(`img[data-index="${currentIndex + 1}"]`);
      
      refs.largeImage.src = nextLargeImage.dataset.source;
      refs.largeImage.alt = nextLargeImage.alt;
      refs.largeImage.index = currentIndex + 1;
    
  }
}
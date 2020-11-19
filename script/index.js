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
  const itemOfGallery = arr.map(({ preview, original, description}) =>
`<li class="gallery__item">
<a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
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

  onOpenModal();
}

function onOpenModal() {
  window.addEventListener('keydown', onPressESC);
   
  refs.modal.classList.add('is-open');

  refs.overlay.addEventListener('click', onClickOverlay);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);

  refs.modal.classList.remove('is-open');
  refs.largeImage.src='';
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
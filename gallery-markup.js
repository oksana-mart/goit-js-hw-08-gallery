import images from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const lightboxImageEl = document.querySelector('.lightbox__image');
const lightboxEl = document.querySelector('div.lightbox');
const closeLightboxBtn = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');
const galleryMarkup = createGalleryMarkup(images);


galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(images) {
  return images.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
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
    </li >
    `;
    })
    .join(''); 
};

function onGalleryContainerClick(event) {
  event.preventDefault();
  const isGalleryImage = event.target.classList.contains('gallery__image');

  if (!isGalleryImage) {
    return;
  };
  
  const imageFullSizeUrl = event.target.dataset.source;
  openLightbox(imageFullSizeUrl);
};

function openLightbox(image) {
  lightboxEl.classList.add('is-open');
  lightboxImageEl.setAttribute('src', image);
  window.addEventListener('keydown', onEscPress);
  closeLightboxBtn.addEventListener('click', onCloseBtnClick);
  lightboxOverlayEl.addEventListener('click', onLightboxOverlayClick);
  window.addEventListener('keydown', onArrowRightPress);
  window.addEventListener('keydown', onArrowLeftPress);
  //console.log(lightboxImageEl);
};

function closeModal() {
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.setAttribute('src', '');
  window.removeEventListener('keydown', onEscPress);
  closeLightboxBtn.removeEventListener('click', onCloseBtnClick);
  lightboxOverlayEl.removeEventListener('click', onLightboxOverlayClick);
  window.removeEventListener('keydown', onArrowRightPress);
  window.removeEventListener('keydown', onArrowLeftPress);
};

function onCloseBtnClick() {
  closeModal();
};
  
function onLightboxOverlayClick(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  };
};
  
function onEscPress(event) {
  //console.log(event);
  if (event.code === 'Escape') {
    closeModal();
  }
};

function nextImage(images) {
  const currentImage = images.find(image => image.original === lightboxImageEl.src);
 
  let index = currentImage ? images.indexOf(currentImage) : 0;
  if (index < images.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  lightboxImageEl.src = images[index].original;
};

function previousImage() {
  const currentImage = images.find(image => image.original === lightboxImageEl.src);

  let index = currentImage ? images.indexOf(currentImage) : images.length - 1;
  if (index > 0) {
    index -= 1;
  } else {
    index = images.length - 1;
  }
  lightboxImageEl.src = images[index].original;
};

function onArrowRightPress(event) {
  if (event.code === 'ArrowRight') {
    nextImage(images);
  }
};

function onArrowLeftPress(event) {;
  if (event.code === 'ArrowLeft') {
    previousImage(images);
  }
};
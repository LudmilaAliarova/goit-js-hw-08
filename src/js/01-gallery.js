import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const createGalleryItemMarkup = ({ preview, original, description }) => {
  return `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      />
    </a>
  </div>
      `;
};

const createGalleryMarkup = galleryItems.map(createGalleryItemMarkup).join('');
const galleryElements = document.querySelector('.gallery');

galleryElements.insertAdjacentHTML('beforeend', createGalleryMarkup);
galleryElements.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modalShow(event.target.dataset.source);
}
const gallery = new SimpleLightbox('.gallery a');

function modalShow(src) {
  gallery.on(
    'show.simplelightbox',
    () => {
      window.addEventListener('keydown', onEscClick);
    },
    gallery.on('close.simplelightbox', () => {
      window.removeEventListener('keydown', onEscClick);
    }),
  );

  function onEscClick(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
  instance.show();
}
console.log(galleryItems);

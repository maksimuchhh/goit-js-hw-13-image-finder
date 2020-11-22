import './styles.css';
import API from './apiService';
import photoTemplate from './templates/photo-card.hbs';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

const refs = {
  galleryList: document.querySelector('.gallery'),

  submitBtn: document.querySelector('.submit-btn'),
  searchQuery: document.querySelector('input[name="query"]'),
  morePicBtn: document.querySelector('.more-pictures'),
};

refs.submitBtn.addEventListener('click', searchPhoto);
refs.morePicBtn.addEventListener('click', morePictures);
refs.galleryList.addEventListener('click', openModal);

async function renderPhoto() {
  const resolve = await API.fetchPhoto(URL);
  const markup = await photoTemplate(resolve.hits);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function openModal(evt) {
  const imgEl = document.querySelectorAll('.photo-card img');
  if (Array.from(imgEl).includes(evt.target)) {
    const source = evt.target.getAttribute('data-source');
    let instance = basicLightbox.create(
      `<img src="${source}" width="800" height="600">`,
    );
    instance.show();
  }
}

function searchPhoto(evt) {
  resetToDisplayNextPic(evt);
  setSearchValue();
  generateURL();
  refs.galleryList.style.display = 'flex';
  if (API.pageNumber !== 1) {
    refs.morePicBtn.style.display = 'block';
  }
}

function resetToDisplayNextPic(evt) {
  refs.galleryList.innerHTML = '';
  API.resetPageNumber();
  evt.preventDefault();
}

function setSearchValue() {
  const searchQueryValue = refs.searchQuery.value;
  API.setSearchQuery(searchQueryValue);
}

function generateURL() {
  const URL = API.generateURL();
  renderPhoto();
  API.addPageNumber();
}

function morePictures() {
  generateURL();
  let pageOffset = pageYOffset;
  let pageHeight = window.innerHeight;
  let scrollCords = pageOffset + pageHeight - 90;
  setTimeout(
    () =>
      window.scrollTo({
        top: scrollCords,
        behavior: 'smooth',
      }),
    700,
  );
}

/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
const lightBox = document.querySelector('.lightbox');
const closeLightboxBtn = document.querySelector('button.fermer');
let indexOfLightbox;

let focusedElementBeforeModal;

export function closeLightBox() {
  const lightBox = document.querySelector('.lightbox');
  const mainContent = document.getElementById('main-photographe');
  const containerSlides = document.querySelector('.container-slides');

  lightBox.style.visibility = 'hidden';
  lightBox.style.opacity = '0';
  document.body.classList.remove('modal-open-antiscroll');
  lightBox.ariaHidden = 'true';
  mainContent.ariaHidden = 'false';
  mainContent.style.display = 'block';
  containerSlides.innerHTML = '';

  focusedElementBeforeModal.focus();
}

export function attachEventToEachCard() {
  const galleryMedias = document.querySelectorAll('.card');
  const cardImg = document.querySelectorAll('.card-wrapper');
  galleryMedias.forEach((card) => {
    cardImg[card.dataset.index].addEventListener('click', openLightbox);
  });
}

export function removeEventFromEachCard() {
  const galleryMedias = document.querySelectorAll('.card');
  const cardImg = document.querySelectorAll('.card-wrapper');
  galleryMedias.forEach((card) => {
    cardImg[card.dataset.index].removeEventListener('click', openLightbox);
  });
}

function openLightbox(e) {
  const lightBox = document.querySelector('.lightbox');
  const mainContent = document.getElementById('main-photographe');
  const containerSlides = document.querySelector('.container-slides');
  const cardMediaSrc = document.querySelectorAll('.gallerie-img');
  const titreImgLightbox = document.querySelector('.titre-lightbox');

  focusedElementBeforeModal = document.activeElement;

  e.preventDefault();
  indexOfLightbox = Number(this.parentElement.dataset.index);
  lightBox.style.visibility = 'visible';
  lightBox.style.opacity = '1';
  document.body.classList.add('modal-open-antiscroll');
  lightBox.ariaHidden = 'false';
  mainContent.ariaHidden = 'true';
  mainContent.style.display = 'none';

  containerSlides.innerHTML = '';

  const innerMediaLightbox = cardMediaSrc[indexOfLightbox].cloneNode();
  const imgName = innerMediaLightbox.getAttribute('data-name');

  const largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

  containerSlides.appendChild(innerMediaLightbox);
  innerMediaLightbox.src = largeImg;
  titreImgLightbox.innerText = imgName;
}

export function handleSliderLightBox() {
  const cardMediaSrc = document.querySelectorAll('.gallerie-img');
  const btnLeft = document.querySelector('button.gauche');
  const btnRight = document.querySelector('button.droit');
  const containerSlides = document.querySelector('.container-slides');
  const titreImgLightbox = document.querySelector('.titre-lightbox');
  const mediaLength = cardMediaSrc.length - 1;

  function lightboxLeft() {
    indexOfLightbox -= 1;

    if (indexOfLightbox < 0) {
      indexOfLightbox = mediaLength;

      containerSlides.innerHTML = '';

      const innerMediaLightbox = cardMediaSrc[indexOfLightbox].cloneNode();
      const imgName = innerMediaLightbox.getAttribute('data-name');
      const largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

      innerMediaLightbox.src = largeImg;
      titreImgLightbox.innerText = imgName;
      containerSlides.appendChild(innerMediaLightbox);
    } else {
      containerSlides.innerHTML = '';

      const innerMediaLightbox = cardMediaSrc[indexOfLightbox].cloneNode();
      const imgName = innerMediaLightbox.getAttribute('data-name');
      const largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

      innerMediaLightbox.src = largeImg;
      titreImgLightbox.innerText = imgName;
      containerSlides.appendChild(innerMediaLightbox);
    }
  }

  function lightboxRight() {
    indexOfLightbox += 1;

    if (indexOfLightbox > mediaLength) {
      indexOfLightbox = 0;

      containerSlides.innerHTML = '';
      const innerMediaLightbox = cardMediaSrc[indexOfLightbox].cloneNode();
      const imgName = innerMediaLightbox.getAttribute('data-name');
      const largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

      innerMediaLightbox.src = largeImg;
      titreImgLightbox.innerText = imgName;
      containerSlides.appendChild(innerMediaLightbox);
    } else {
      containerSlides.innerHTML = '';
      const innerMediaLightbox = cardMediaSrc[indexOfLightbox].cloneNode();
      const imgName = innerMediaLightbox.getAttribute('data-name');
      const largeImg = innerMediaLightbox.src.replace('1_small', '2_medium');

      innerMediaLightbox.src = largeImg;
      titreImgLightbox.innerText = imgName;
      containerSlides.appendChild(innerMediaLightbox);
    }
  }

  btnLeft.addEventListener('click', lightboxLeft);
  btnRight.addEventListener('click', lightboxRight);

  document.onkeydown = function (e) {
    if (lightBox.style.visibility === 'visible') {
      switch (e.key) {
        case 'ArrowLeft':
          lightboxLeft();
          break;
        case 'ArrowRight':
          lightboxRight();
          break;
        default:
        // do nothing
      }
    }
  };
}

closeLightboxBtn.addEventListener('click', closeLightBox);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && lightBox.style.visibility === 'visible') {
    closeLightBox();
  }
});

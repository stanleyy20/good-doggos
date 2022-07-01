import '../sass/index.scss';

class Dogog {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog__image img');
    this.bgEl = document.querySelector('.featured-dog__bg');
    this.tilesEl = document.querySelector('.tiles');
    this.spinnerEl = document.querySelector('.spinner');
    this.dogBreedEl = document.querySelector('.featured-dog__breed');

    this.init();
  }

  showLoading() {
    this.spinnerEl.classList.add('spinner--visible');
  }

  hideLoading() {
    this.spinnerEl.classList.remove('spinner--visible');
  }

  listBreeds = () => {
    return fetch(`${this.apiUrl}/breeds/list/all`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  };

  getRandomImage = () => {
    return fetch(`${this.apiUrl}/breeds/image/random`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  };

  getRandomImageByBreed = (breed, name) => {
    this.dogBreedEl.textContent = name;

    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  };

  showImageWhenReady(image) {
    this.imgEl.setAttribute('src', image);
    this.bgEl.style.backgroundImage = `url("${image}")`;
    this.hideLoading();
  }

  addBreed(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === 'undefined') {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }

    const tile = document.createElement('div');
    tile.classList.add('tiles__tile');

    const tileContent = document.createElement('div');
    tileContent.classList.add('tiles__tile-content');

    tileContent.innerHTML = name;
    tileContent.addEventListener('click', () => {
      window.scrollTo(0, 0);
      this.showLoading();
      this.getRandomImageByBreed(type, name).then((src) => {
        this.showImageWhenReady(src);
      });
    });

    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
  }

  showAllBreeds() {
    this.listBreeds().then((breeds) => {
      for (const breed in breeds) {
        if (breeds[breed].length === 0) {
          this.addBreed(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            this.addBreed(breed, subBreed);
          }
        }
      }
    });
  }

  init = () => {
    this.showLoading();
    this.getRandomImage().then((src) => {
      this.showImageWhenReady(src);
    });

    this.showAllBreeds();

    this.dogBreedEl.textContent = '';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  new Dogog();
});

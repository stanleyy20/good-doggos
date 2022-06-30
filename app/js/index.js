import '../sass/index.scss';

class Dogog {
  constructor() {
    this.apiUrl = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog__image img');
    this.bgEl = document.querySelector('.featured-dog__bg');

    this.init();
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

  getRandomImageByBreed = (breed) => {
    return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  };

  init = () => {
    this.getRandomImage().then((src) => {
      this.imgEl.setAttribute('src', src);
      this.bgEl.style.backgroundImage = `url("${src}")`;
    });
  };
}

document.addEventListener('DOMContentLoaded', () => {
  new Dogog();
});

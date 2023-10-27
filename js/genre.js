import { API_KEY, createCards, movieInfo, clearDom, addToFav } from "./utils.js";

const genreNameCardsContainer = document.querySelector('.genre-cards-container')
const genreCardsContainer = document.querySelector('.genre-movies')
const genres = document.querySelector('.genres')
const genre = document.querySelector('.genre')
const genreTitle = document.querySelector('.genre .section--title')
genres.style.marginTop = document.querySelector('header').offsetHeight + 'px';
genre.style.marginTop = document.querySelector('header').offsetHeight + 'px';
const nav = document.querySelector('.nav-ul')
const toggler = document.querySelector('#toggler')

const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
const MAIN_URL = `https://api.themoviedb.org/3/discover/movie?with_genres=`
const images = {
    "Action": 'images/Action.jpg',
    "Adventure": 'images/Adventure.jpeg',
    "Animation": 'images/Animation.jpeg',
    "Comedy": 'images/Comedy.jpg',
    "Horror": 'images/Horror.jpg',
    "Crime": 'images/Crime.jpg',
    "Documentary": 'images/Documentary.jpg',
    "Drama": 'images/Drama.jpeg',
    "Family": 'images/Family.jpg',
    "Science Fiction": 'images/Science-Fiction.jpg',
    "History": 'images/History.jpeg',
    "War": 'images/war.jpeg',
    "Romance": 'images/Romance.jpg',
    "Thriller": "images/Thriller.jpg",
    "Music": "images/Music.webp",
    "Mystery": "images/Mystery.jpg",
    "Fantasy": "images/Fantasy.jpg",
    "Western": "images/Western.avif",
    "TV Movie": "images/TV-movie.jpg"
}

async function createGenreCards(url) {
    const res = await fetch(url)
    let data = await res.json()
    data = data['genres']
    await data.forEach(element => {
        const card = document.createElement('div')
        card.classList.add('genre-card')
        // images[element.name] = `images/${element.name}.jpeg`
        card.style.backgroundImage = `url('${images[element.name]}')`;
        card.innerHTML = `<h3>${element.name}</h3>`
        genreNameCardsContainer.appendChild(card)
        card.setAttribute('id', `${element.id}`)
    });

    const cards = document.querySelectorAll('.genre-card')
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            genreTitle.innerHTML = e.target.innerHTML
            genres.style.display = 'none'
            genre.style.display = 'block'
            const id = card.getAttribute('id')
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`

            createCards(url, genreCardsContainer)

        })
    })
}

createGenreCards(GENRE_URL)

toggler.addEventListener('change', () => {
    if (toggler.checked) nav.style.display = 'block'
    else { nav.style.display = 'none' }
})
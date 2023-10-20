import { API_KEY, createCards, movieInfo, clearDom, addToFav } from "./utils.js";

const genreNameCardsContainer = document.querySelector('.genre-cards-container')
const genreCardsContainer = document.querySelector('.genre-movies')
const genres = document.querySelector('.genres')
const genre = document.querySelector('.genre')
genres.style.marginTop = document.querySelector('header').offsetHeight + 'px'
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
const MAIN_URL = `https://api.themoviedb.org/3/discover/movie?with_genres=`


async function createGenreCards(url) {
    const res = await fetch(url)
    let data = await res.json()
    data = data['genres']
    await data.forEach(element => {
        const card = document.createElement('div')
        card.classList.add('genre-card')
        card.innerHTML = `<h3>${element.name}</h3>`
        genreNameCardsContainer.appendChild(card)
        card.setAttribute('id', `${element.id}`)
    });

    const cards = document.querySelectorAll('.genre-card')
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            genres.style.display = 'none'
            genre.style.display = 'block'
            const id = card.getAttribute('id')
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`

            createCards(url, genreCardsContainer)

        })
    })
}

createGenreCards(GENRE_URL)
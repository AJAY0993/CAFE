import { API_KEY, createCards, movieInfo } from "./utils.js";

const genreCardsContainer = document.querySelector('.genre-cards-container')
const genres = document.querySelector('.genres')
genres.style.marginTop = document.querySelector('header').offsetHeight + 'px'
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

async function createGenreCards(url) {
    const res = await fetch(url)
    let data = await res.json()
    data = data['genres']
    await data.forEach(element => {
        const card = document.createElement('div')
        card.classList.add('genre-card')
        card.innerHTML = `<h3>${element.name}</h3>`
        genreCardsContainer.appendChild(card)
        card.setAttribute('id', `${element.id}`)
    });

    const cards = document.querySelector('.genre-card')
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const id = card.getAttribute('id')

        })
    })
}


createGenreCards(GENRE_URL)
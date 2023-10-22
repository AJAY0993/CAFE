export const links = document.querySelectorAll('li a')
export const slideContainer = document.querySelector('.hero--slider-container')
export const poularMoviesCardsContainer = document.querySelector('.popular-movies .cards-container')
export const topRatedMoviesCardsContainer = document.querySelector('.top-rated-movies .cards-container')
export const searchResultCardsContainer = document.querySelector('.search-result-card-container')
export const paginationContainer = document.querySelector('.pagination-container')
export const main = document.querySelector('main')
export const input = document.querySelector('.search-bar')
export const form = document.querySelector('form')
export const page = document.querySelector('.current-page')
export const searchBtn = document.querySelector('#search-btn')
export const myListLink = document.querySelector('#my-list')
export const movieBtn = document.querySelector('#movie-btn')
export const showBtn = document.querySelector('#show-btn')
export const header = document.querySelector('header')
export const searchSection = document.querySelector('.search-result')
export const paginationSection = document.querySelector('.pagination')
export const searchSectionTitle = document.querySelector('.search-result .section--title')
export const prevBtn = document.querySelector('.prev')
export const nextBtn = document.querySelector('.next')
export const headerHeight = header.offsetHeight + 'px'
// export const currentStae =  ;
export const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
export const NOW_TV_SERIES_PLAYING_URL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
export const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
export const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
export const POPULAR_SHOW_URL = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
export const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
export const TOP_RATED_SHOW_URL = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
export const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/multi?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

export function movieInfo(url) {
    url = url + '&append_to_response=videos'
    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            main.style.display = 'none'
            //if (document.querySelector('.myListTemporaryContainer')) { document.querySelector('.myListTemporaryContainer').innerHTML = '' }
            clearDom()
            const movieInfoTemporaryContainer = document.createElement('div')
            //.className = 'movieInfoTemporaryContainer'
            header.insertAdjacentElement("afterend", movieInfoTemporaryContainer)
            movieInfoTemporaryContainer.className = 'movieInfoTemporaryContainer movie-info-container container'
            movieInfoTemporaryContainer.innerHTML = `<div class="movie-info">
<div class="movie-info-image">
<img src="https://image.tmdb.org/t/p/w1280${data.poster_path}">
</div>
<div class="movie-info-content">
<div class="movie-info-name">
${data.original_title || data.name}
</div>
<div class="movie-info-rating">
<i class="fa-solid fa-star"></i>${data.vote_average}/10
</div>
<div class="movie-info-release">
${data.release_date || data.first_air_date}
</div>
<div class="movie-info-overview">
${data.overview}
</div>
<ul class="movie-info-genres"> GENRES
</ul>
<a href="${data.homepage}" class="movie-info-homepage-link">link to homepage</a>
<a href="https://www.youtube.com/watch?v=${data.videos.results[0].key}" class="movie-info-play-trailer-link">Play trailer</a>
<button class = "movie-info-add-to-fav btn" data-movieid = ${data.id}>ADD TO FAV</button>
</div>

</div>
<div class="section--title">
MOVIE INFO
</div>
<ul class="movie-info-additional">

</ul>
<ul class="movie-info-production">
<h3>PRODUCTION COMAPANIES</h3>
</ul>
</div>
</div>`
            const isMovie = data.name ? false : true

            if (isMovie == true) {
                const ul = document.querySelector('.movie-info-additional')
                ul.innerHTML = `<li class="movie-info-additional-item"><span>BUDGET:</span>${data.budget}</li>
    <li class="movie-info-additional-item"><span>RUNTIME:</span>${data.runtime} mins</li>
    <li class="movie-info-additional-item"><span>REVENUE:</span>${data.revenue}</li>
    <li class="movie-info-additional-item"><span>STATUS:</span>${data.status}</li>`
            } else {
                const ul = document.querySelector('.movie-info-additional')
                ul.innerHTML = `<li class="movie-info-additional-item"><span>NUMBER OF SEASONS:</span>${data.number_of_seasons}</li>
    <li class="movie-info-additional-item"><span>NUMBER OF EPISODES:</span>${data.number_of_episodes} episodes </li>
`
            }

            const genreContainer = document.querySelector('.movie-info-genres')
            console.log(data)
            data.genres.forEach(genre => {
                console.log(genre)
                const li = document.createElement('li')
                li.className = 'movie-info-genre-item'
                li.innerText = genre['name']
                genreContainer.appendChild(li)
            })

            const productionComapaniesContainer = document.querySelector('.movie-info-production')
            data.production_companies.forEach(company => {
                const li = document.createElement('li')
                li.className = 'movie-info-company-item'
                li.innerText = company['name']
                productionComapaniesContainer.appendChild(li)
                li.style.display = 'inline-block'

            })

            const addToFavBtn = document.querySelector('.movie-info-add-to-fav')
            console.log("its a", isMovie)
            addToFavBtn.addEventListener('click', (e) => {
                if (isMovie == false) {
                    const movieID = e.target.getAttribute('data-movieid')
                    addToFav(movieID, false)
                    console.log('its  not a movie')
                }
                else {
                    const movieID = e.target.getAttribute('data-movieid')
                    addToFav(movieID, true)
                    console.log('its  a  movie')
                }
            })
        })


}

export function createCards(url, parent) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            try {
                parent.innerHTML = ''
                page.innerText = data.page + ' out of ' + data.total_pages
            }
            catch (err) {
                console.log(err)
            }
            if (data.results.length < 1) parent.innerHTML = "<h3>COULD'NT FOUND</h3>"
            else {
                data['results'].forEach(elm => {
                    const card = document.createElement('div')
                    card.classList.add('movie-card')
                    const isMovie = elm.title ? true : false
                    card.setAttribute('data-movieID', `${elm.id}`)
                    card.setAttribute('ismovie', isMovie)
                    card.addEventListener('click', (e) => {
                        const movieInfoContainer = document.querySelector('.movie-info-container')
                        console.log(movieInfoContainer)
                        const movieID = card.getAttribute('data-movieid')
                        console.warn(e.target)
                        console.warn(movieID)
                        const ID_API_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                        const SHOW_ID_API_URL = `https://api.themoviedb.org/3/tv/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                        card.getAttribute('ismovie') == 'true' ? movieInfo(ID_API_URL) : movieInfo(SHOW_ID_API_URL)
                    })
                    card.innerHTML = `<div class="card--movie-image">
            <img src="https://image.tmdb.org/t/p/w1280${elm.poster_path || elm.backdrop_path}" alt="">
            </div>
            <div class="card--movie-name">
${elm.title ? elm.title : elm.name}
            </div>
            <div class="card--movie-time">
${elm["release_date"] || elm.first_air_date}
            </div>`
                    try { parent.appendChild(card) }
                    catch (err) { console.log(err) }
                })

                if (data.page == 1) {
                    const showMoreButton = document.createElement('button')
                    showMoreButton.className = 'navigation-link show-more'
                    showMoreButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>'
                    parent.appendChild(showMoreButton)
                    showMoreButton.addEventListener('click', () => {
                        pagination(url, parent)
                    })
                }
            }
        })
        .catch(err => console.log(err))
}
export function clearDom() {
    const movieInfo = document.querySelector('.movieInfoTemporaryContainer')
    const list = document.querySelector('.myListTemporaryContainer')
    try {
        searchSection.style.display = 'none'
        paginationSection.style.display = 'none'
    }
    catch (err) { console.log(err) }
    if (list) { list.remove() }
    if (movieInfo) { movieInfo.remove() }

}

export function addToFav(id, isMovie) {

    if (isMovie == true) {
        if (localStorage.getItem('favs') != null) {
            let favs = localStorage.getItem('favs')
            favs += ' ' + id
            localStorage.setItem('favs', favs)
        }
        else {
            localStorage.setItem('favs', id)
        }
    }
    else {
        if (localStorage.getItem('favsShow') != null) {
            let favsShow = localStorage.getItem('favsShow')
            favsShow += ' ' + id
            localStorage.setItem('favsShow', favsShow)
        }
        else {
            localStorage.setItem('favsShow', id)
        }
    }
}


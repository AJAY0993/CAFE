const links = document.querySelectorAll('li a')
const slideContainer = document.querySelector('.hero--slider-container')
const poularMoviesCardsContainer = document.querySelector('.popular-movies .cards-container')
const topRatedMoviesCardsContainer = document.querySelector('.top-rated-movies .cards-container')
const main = document.querySelector('main')
const myListLink = document.querySelector('#my-list')
const movieBtn = document.querySelector('#movie-btn')
const showBtn = document.querySelector('#show-btn')
const header = document.querySelector('header')
// const currentStae =  ;
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_TV_SERIES_PLAYING_URL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const POPULAR_SHOW_URL = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const TOP_RATED_SHOW_URL = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

function loadNowPlaying(url) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            try { slideContainer.innerHTML = '' }
            catch (err) { console.log(err) }
            data['results'].forEach(element => {
                const slide = document.createElement('div')
                slide.classList.add('slide', 'active')
                slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${element.backdrop_path})`
                slide.innerHTML = `<div class="slide-image">
        <img src="https://image.tmdb.org/t/p/w1280${element.poster_path}" alt="">
    </div>
    <div class="slide-rating">
        <i class="fa-solid fa-star">

        </i> <span class ="vote-average">${element['vote_average']}/10</span>
    </div>`
                try {
                    slideContainer.appendChild(slide)
                }
                catch (err) {
                    console.log(err)
                }
            });
            const slides = document.querySelectorAll('.slide')
            updateSlide(slides)
        })
        .catch(err => console.log(err))
}

function createCards(url, parent) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            try {
                parent.innerHTML = ''
            }
            catch (err) {
                console.log(err)
            }
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
            <img src="https://image.tmdb.org/t/p/w1280${elm.poster_path}" alt="">
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
        })
        .catch(err => console.log(err))
}

function updateSlide(array) {
    let count = 0
    setInterval(() => {
        array.forEach(ele => ele.classList.remove('active'))
        array[count].classList.add('active')
        count++
        if (count == (array.length - 1)) {
            count = 0
        }
    }, 3000)
}

function movieInfo(url) {
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
            addToFavBtn.addEventListener('click', (e) => {
                const movieID = e.target.getAttribute('data-movieid')
                addToFav(movieID)
            })
        })


}
function addToFav(id) {
    if (localStorage.length > 0) {
        let favs = localStorage.getItem('favs')
        favs += ' ' + id
        localStorage.setItem('favs', favs)
    }
    else {
        localStorage.setItem('favs', id)
    }
}
///////////////////////////////////////////////////////////////////
// LOCAL STORAGE MAGIC TO STORE MOVIES IN MY LIST CONTAINER
///////////////////////////////////////////////////////////////////
myListLink.addEventListener('click', (e) => {
    e.preventDefault()
    main.style.display = 'none'
    clearDom()
    const div = document.createElement('div')
    div.className = 'myListTemporaryContainer'
    const header = document.querySelector('header')
    header.insertAdjacentElement("afterend", div)
    div.innerHTML = `<section class="my-list">
    <div class="section--title">
        MY LIST
    </div>
    <div class="container cards-container my-list-card-container">
        
            <div class="custom-loader"></div>
            
      
    </div>
</section>`
    let arr = localStorage.getItem('favs').split(' ')
    arr = [... new Set(arr)]
    console.log(arr)
    const listContainer = document.querySelector('.my-list-card-container')
    const loader = document.querySelector('.custom-loader')
    if (arr.length < 1) {
        div.innerHTML = `<div class = "section--title"> YOU DONT HAVE ANY ITEM IN YOUR LIST</div>`
    }
    arr.forEach((id, idx) => {
        const ID_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
        fetch(ID_API_URL)
            .then(data => data.json())
            .then(data => {
                if (idx == 0) { loader.remove() }
                const card = document.createElement('div')
                card.className = 'movie-card'
                card.innerHTML = `<div class="card--movie-image">
<img src="https://image.tmdb.org/t/p/w1280${data.poster_path}">
        </div>
        <div class="card--movie-name">
${data.title}
        </div>
        <div class="card--movie-time">
${data.release_date}
        </div>
    `
                card.setAttribute('data-movieID', `${data.id}`)

                card.addEventListener('click', (e) => {
                    const movieInfoContainer = document.querySelector('.movie-info-container')
                    console.log(movieInfoContainer)
                    const movieID = card.getAttribute('data-movieid')
                    console.warn(e.target)
                    console.warn(movieID)
                    const ID_API_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                    movieInfo(ID_API_URL)
                })
                listContainer.appendChild(card)
            })

    })
})

loadNowPlaying(NOW_PLAYING_URL)
createCards(POPULAR_URL, poularMoviesCardsContainer)
createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)

links.forEach(link => link.addEventListener('click', (e) => {
    links.forEach(link => link.classList.remove('active'))
    e.target.classList.add('active')
})

)
movieBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearDom()
    main.style.display = 'block'
    loadNowPlaying(NOW_PLAYING_URL)
    createCards(POPULAR_URL, poularMoviesCardsContainer)
    createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)
})

showBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearDom()
    main.style.display = 'block'
    loadNowPlaying(NOW_TV_SERIES_PLAYING_URL)
    createCards(NOW_TV_SERIES_PLAYING_URL, poularMoviesCardsContainer)
    createCards(TOP_RATED_SHOW_URL, topRatedMoviesCardsContainer)
})

function clearDom() {
    const movieInfo = document.querySelector('.movieInfoTemporaryContainer')
    const list = document.querySelector('.myListTemporaryContainer')
    if (list) { list.remove() }
    if (movieInfo) { movieInfo.remove() }
}
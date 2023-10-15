const links = document.querySelectorAll('li a')
const slideContainer = document.querySelector('.hero--slider-container')
const poularMoviesCardsContainer = document.querySelector('.popular-movies .cards-container')
const topRatedMoviesCardsContainer = document.querySelector('.top-rated-movies .cards-container')
const movieInfoContainer = document.querySelector('.movie-info-container')
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='


// let myMovies;
/*
getMovies(API_URL)
function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('main').innerHTML = ''
            data['results'].forEach(element => {
 
                const movieCard = document.createElement('div')
                movieCard.classList.add('movie--card')
                movieCard.innerHTML = `<div class="image">
                <img src="https://image.tmdb.org/t/p/w1280${element.poster_path}" alt="">
            </div>
            <h2 class="movie--title">${element.title}</h2>
            <button class="movie--add">Add</button>
            <span class="movie--rating ${classByRating(+element.vote_average)}">${element.vote_average}</span>
            <p class="movie--overview">${element.overview}
            </p>
        </div>`
 
                document.querySelector('main').appendChild(movieCard)
 
 
 
            });
        }
 
 
        )
        .then(data => {
            let add = document.querySelectorAll('.movie--add')
            add.forEach(btn => {
                btn.addEventListener('click',
                    () => {
                        let movie = btn.previousElementSibling.innerText
                        movie = localStorage.getItem('movies') + ';' + movie
                        localStorage.setItem('movies', movie)
                    }
                )
            })
        })
        .catch(err => { document.querySelector('main').innerHTML = `<h1>${err}</h1>` })
}
 
function classByRating(rating) {
    if (rating > 8) { return 'green' }
    if (rating > 6) { return 'yellow' }
    if (rating > 4) { return 'orange' }
    else { return 'red' }
}
 
document.querySelector('button').addEventListener('click', () => {
    const query = document.querySelector('input').value
    getMovies(SEARCH_API_URL + query)
})
 
links.forEach(link => link.addEventListener('click', () => { location.reload() }))
 */


fetch(NOW_PLAYING_URL)
    .then(data => data.json())
    .then(data => {
        console.log(data)
        slideContainer.innerHTML = ''
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
            slideContainer.appendChild(slide)
        });
        const slides = document.querySelectorAll('.slide')
        updateSlide(slides)
    })

function createCards(url, parent) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            parent.innerHTML = ''
            data['results'].forEach(elm => {
                const card = document.createElement('div')
                card.classList.add('movie-card')
                card.setAttribute('data-movieID', `${elm.id}`)
                card.addEventListener('click', () => { movieInfo(card) })
                card.innerHTML = `<div class="card--movie-image">
            <img src="https://image.tmdb.org/t/p/w1280${elm.poster_path}" alt="">
            </div>
            <div class="card--movie-name">
${elm.title}
            </div>
            <div class="card--movie-time">
${elm["release_date"]}
            </div>`
                parent.appendChild(card)
            })
        })
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

function movieInfo(card) {
    const movieID = card.getAttribute('data-movieID')
    console.log(movieID)
    const ID_API_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`
    window.location = '../movieInfo.html'
    fetch(ID_API_URL)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            movieInfoContainer.innerHTML = ''
            movieInfoContainer.innerHTML = `<div class="movie-info">
<div class="movie-info-image">
<img src="https://image.tmdb.org/t/p/w1280${poster_path}">
</div>
<div class="movie-info-content">
    <div class="movie-info-name">
        ${data.original_title}
    </div>
    <div class="movie-info-rating">
        <i class="fa-solid fa-star"></i>${data.vote_average}/vote_average
    </div>
    <div class="movie-info-release">
        ${data.release_date}
    </div>
    <div class="movie-info-overview">
       ${data.overview}
    </div>
    <ul class="movie-info-genres"> GENRES
        <li class="movie-info-genre-item">lorem</li>
        <li class="movie-info-genre-item">lorem</li>
        <li class="movie-info-genre-item">lorem</li>
    </ul>
    <a href="" class="movie-info-homepage-link">link homepage</a>
</div>

</div>
<div class="section--title">
MOVIE INFO
</div>
<ul class="movie-info-additional">
<li class="movie-info-additional-item"><span>BUDGET</span></li>
<li class="movie-info-additional-item"><span>RUNTIME</span></li>
<li class="movie-info-additional-item"><span>REVENUE</span></li>
<li class="movie-info-additional-item"><span>STATUS</span></li>
</ul>
<div class="movie-info-production">
<h3>PRODUCTION COMAPANIES</h3>
<span>Lorem ipsum dolor sit amet consectetur adipisicing.</span>
</div>
</div>`
        })
}

createCards(NOW_PLAYING_URL, poularMoviesCardsContainer)
createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)

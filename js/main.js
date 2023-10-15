const links = document.querySelectorAll('li a')
const slideContainer = document.querySelector('.hero--slider-container')
const poularMoviesCardsContainer = document.querySelector('.popular-movies .cards-container')
const topRatedMoviesCardsContainer = document.querySelector('.top-rated-movies .cards-container')
const main = document.querySelector('main')
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='


fetch(NOW_PLAYING_URL)
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
                card.setAttribute('data-movieID', `${elm.id}`)
                card.addEventListener('click', (e) => {
                    const movieInfoContainer = document.querySelector('.movie-info-container')
                    console.log(movieInfoContainer)
                    const movieID = card.getAttribute('data-movieid')
                    console.warn(e.target)
                    console.warn(movieID)
                    const ID_API_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                    movieInfo(ID_API_URL)
                })
                card.innerHTML = `<div class="card--movie-image">
            <img src="https://image.tmdb.org/t/p/w1280${elm.poster_path}" alt="">
            </div>
            <div class="card--movie-name">
${elm.title}
            </div>
            <div class="card--movie-time">
${elm["release_date"]}
            </div>`
                try { parent.appendChild(card) }
                catch (err) { console.log(err) }
            })
        })
        .catch(err => console.log(err))
}

// function updateSlide(array) {
//     let count = 0
//     setInterval(() => {
//         array.forEach(ele => ele.classList.remove('active'))
//         array[count].classList.add('active')
//         count++
//         if (count == (array.length - 1)) {
//             count = 0
//         }
//     }, 3000)
// }

function movieInfo(url) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            main.innerHTML = ''
            main.className = 'movie-info-container container'
            main.innerHTML = `<div class="movie-info">
<div class="movie-info-image">
<img src="https://image.tmdb.org/t/p/w1280${data.poster_path}">
</div>
<div class="movie-info-content">
<div class="movie-info-name">
${data.original_title}
</div>
<div class="movie-info-rating">
<i class="fa-solid fa-star"></i>${data.vote_average}/10
</div>
<div class="movie-info-release">
${data.release_date}
</div>
<div class="movie-info-overview">
${data.overview}
</div>
<ul class="movie-info-genres"> GENRES
</ul>
<a href="${data.homepage}" class="movie-info-homepage-link">link to homepage</a>
</div>

</div>
<div class="section--title">
MOVIE INFO
</div>
<ul class="movie-info-additional">
<li class="movie-info-additional-item"><span>BUDGET:</span>${data.budget}</li>
<li class="movie-info-additional-item"><span>RUNTIME:</span>${data.runtime} mins</li>
<li class="movie-info-additional-item"><span>REVENUE:</span>${data.revenue}</li>
<li class="movie-info-additional-item"><span>STATUS:</span>${data.status}</li>
</ul>
<ul class="movie-info-production">
<h3>PRODUCTION COMAPANIES</h3>
</ul>
</div>
</div>`

            const genreContainer = document.querySelector('.movie-info-genres')
            console.log(data)
            data.genres.forEach(genre => {
                console.log(genre)
                const li = document.createElement('li')
                li.className = 'movie-info-genre-item'
                li.innerText = genre['name']
                genreContainer.appendChild(li)

                const productionComapaniesContainer = document.querySelector('.movie-info-production')
                data.production_companies.forEach(company => {
                    console.log(genre)
                    const li = document.createElement('li')
                    li.className = 'movie-info-company-item'
                    li.innerText = company['name']
                    productionComapaniesContainer.appendChild(li)
                    li.style.display = 'inline-block'
                })
            })
        })


}

createCards(NOW_PLAYING_URL, poularMoviesCardsContainer)
createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)

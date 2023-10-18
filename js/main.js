
const links = document.querySelectorAll('li a')
const slideContainer = document.querySelector('.hero--slider-container')
const poularMoviesCardsContainer = document.querySelector('.popular-movies .cards-container')
const topRatedMoviesCardsContainer = document.querySelector('.top-rated-movies .cards-container')
const searchResultCardsContainer = document.querySelector('.search-result-card-container')
const paginationContainer = document.querySelector('.pagination-container')
const main = document.querySelector('main')
const input = document.querySelector('.search-bar')
const form = document.querySelector('form')
const page = document.querySelector('.current-page')
const searchBtn = document.querySelector('#search-btn')
const myListLink = document.querySelector('#my-list')
const movieBtn = document.querySelector('#movie-btn')
const showBtn = document.querySelector('#show-btn')
const header = document.querySelector('header')
const searchSection = document.querySelector('.search-result')
const paginationSection = document.querySelector('.pagination')
const searchSectionTitle = document.querySelector('.search-result .section--title')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const headerHeight = header.offsetHeight + 'px'
// const currentStae =  ;
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_TV_SERIES_PLAYING_URL = 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const POPULAR_SHOW_URL = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const TOP_RATED_SHOW_URL = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/multi?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

main.style.marginTop = headerHeight
searchSection.style.marginTop = headerHeight
///////////////////////////////////////////////////////////////////////////////
// FUNCTION TO LOAD HERO SECTION
////////////////////////////////////////////////////////////////////////////////
function loadNowPlaying(url) {
    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            try { slideContainer.innerHTML = '' }
            catch (err) { console.log(err) }
            data['results'].forEach(element => {
                const slide = document.createElement('div')
                slide.classList.add('slide')
                slideContainer.appendChild(slide)
                const isMovie = element.name ? false : true
                const id = element.id
                const ID_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                const SHOW_ID_API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
                slide.addEventListener('click', () => {
                    isMovie ? movieInfo(ID_API_URL) : movieInfo(SHOW_ID_API_URL)
                })
                slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${element.backdrop_path})`
                slide.innerHTML = `<div class="main--text-content">
                <div>
                <h2 class = "slider-movie-name">${element.name || element.title}</h2>
						<ul class="main--ul">
							<li>${element.release_date || element.first_air_date}</li>
							<li>${element.original_language}</li>
                            <li><i class="fa-solid fa-star"></i>${element.vote_average}/10</li>
							
						</ul>
						<div class="main--overview">
							${element.overview}
						</div>
    </div>
					</div>`

            });
            const slides = document.querySelectorAll('.slide')
            updateSlide(slides)
        })
        .catch(err => console.log(err))
}
///////////////////////////////////////////////////////////////////////////////
// FUNCTION TO CREATE CARDS
////////////////////////////////////////////////////////////////////////////////
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
            const showMoreButton = document.createElement('button')
            showMoreButton.className = 'showMoreBtn'
            showMoreButton.innerHTML = '<i class="fa-solid fa-arrow-right"></i>'
            parent.appendChild(showMoreButton)
            showMoreButton.addEventListener('click', () => {
                pagination(url)
            })
        })
        .catch(err => console.log(err))
}
///////////////////////////////////////////////////////////////////////////////
// FUNCTION TO UPDATE SLIDER OF HERO SECTION
////////////////////////////////////////////////////////////////////////////////
function updateSlide(array) {
    let count = 0
    setInterval(() => {
        array.forEach(ele => ele.style.display = 'none')
        array[count].style.display = 'block'
        count++
        if (count == (array.length - 1)) {
            count = 0
        }
    }, 3000)
}
///////////////////////////////////////////////////////////////////////////////
// FUNCTION TO CREATE MOVIE/SHOW INFO 
////////////////////////////////////////////////////////////////////////////////
function movieInfo(url) {
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
///////////////////////////////////////////////////////////////////////////////
// FUNCTION TO ADD MOVIES/SHOW IN FAV LIST
////////////////////////////////////////////////////////////////////////////////
function addToFav(id, isMovie) {

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
    let arr = []
    let showArr = []
    if (localStorage.getItem('favs') != null) { arr = localStorage.getItem('favs').split(' ') }
    if (localStorage.getItem('favsShow') != null) { showArr = localStorage.getItem('favsShow').split(' ') }
    // let showArr = localStorage.getItem('favsShow').split(' ') || ['']
    arr = [... new Set(arr)]
    showArr = [... new Set(showArr)]
    console.log(showArr)
    console.log(arr)
    const listContainer = document.querySelector('.my-list-card-container')
    const loader = document.querySelector('.custom-loader')
    if (arr.length < 1 && showArr.length < 1) {
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
                    const isMovie = data.title ? true : false
                    const ID_API_URL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                    //const SHOW_ID_API_URL = `https://api.themoviedb.org/3/tv/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`

                    movieInfo(ID_API_URL)
                })
                listContainer.appendChild(card)
            })

    })
    showArr.forEach((id, idx) => {
        const ID_API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
        fetch(ID_API_URL)
            .then(data => data.json())
            .then(data => {
                // if (idx == 0) { loader.remove() }
                const card = document.createElement('div')
                card.className = 'movie-card'
                card.innerHTML = `<div class="card--movie-image">
<img src="https://image.tmdb.org/t/p/w1280${data.poster_path}">
        </div>
        <div class="card--movie-name">
${data.name}
        </div>
        <div class="card--movie-time">
${data.first_air_date}
        </div>
    `
                card.setAttribute('data-movieID', `${data.id}`)

                card.addEventListener('click', (e) => {
                    const movieInfoContainer = document.querySelector('.movie-info-container')
                    console.log(movieInfoContainer)
                    const movieID = card.getAttribute('data-movieid')
                    console.warn(e.target)
                    console.warn(movieID)
                    const ID_API_URL = `https://api.themoviedb.org/3/tv/${movieID}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`
                    movieInfo(ID_API_URL)
                })
                listContainer.appendChild(card)
            })

    })
})
//////////////////////////////////////////////////////////////////////////////
//LOADING HOMEPAGE
///////////////////////////////////////////////////////////////////////////////
loadNowPlaying(NOW_PLAYING_URL)
createCards(POPULAR_URL, poularMoviesCardsContainer)
createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)

///////////////////////////////////////////////////////////////////////////////
// MAKING NAV LINKS YELLOW AND BOLD ON CLICK
////////////////////////////////////////////////////////////////////////////////
links.forEach(link => link.addEventListener('click', (e) => {
    e.preventDefault()
    links.forEach(link => link.classList.remove('active'))
    e.target.classList.add('active')
})

)

///////////////////////////////////////////////////////////////////////////////
// MAKING MOVIE PAGE ON CLICK 
////////////////////////////////////////////////////////////////////////////////
movieBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearDom()
    main.style.display = 'block'
    loadNowPlaying(NOW_PLAYING_URL)
    createCards(POPULAR_URL, poularMoviesCardsContainer)
    createCards(TOP_RATED_URL, topRatedMoviesCardsContainer)
})

///////////////////////////////////////////////////////////////////////////////
// MAKING SHOW PAGE ON CLICK
////////////////////////////////////////////////////////////////////////////////
showBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearDom()
    main.style.display = 'block'
    loadNowPlaying(NOW_TV_SERIES_PLAYING_URL)
    createCards(NOW_TV_SERIES_PLAYING_URL, poularMoviesCardsContainer)
    createCards(TOP_RATED_SHOW_URL, topRatedMoviesCardsContainer)
})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    clearDom()
    main.style.display = 'none'
    searchSection.style.display = 'block'
    createCards(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`, searchResultCardsContainer)
    form.addEventListener('submit', (submitEvent) => {
        submitEvent.preventDefault()
        const url = SEARCH_API_URL + input.value
        createCards(url, searchResultCardsContainer)
        searchSectionTitle.innerText = 'RESULT'
    })

})
function clearDom() {
    const movieInfo = document.querySelector('.movieInfoTemporaryContainer')
    const list = document.querySelector('.myListTemporaryContainer')
    searchSection.style.display = 'none'
    paginationSection.style.display = 'none'
    if (list) { list.remove() }
    if (movieInfo) { movieInfo.remove() }

}
///////////////////////////////////////////////////////////////////////////////
// PAGINATION
////////////////////////////////////////////////////////////////////////////////
function pagination(url) {
    paginationContainer.setAttribute('data-url', `${url.replace('&page=1', '')}`)
    url = url.replace('page=1', 'page=2')
    clearDom()
    page.innerText = 2
    main.style.display = 'none'
    paginationSection.style.display = 'block'
    createCards(url, paginationContainer)
    paginationContainer.setAttribute('data-page', 2)
}

nextBtn.addEventListener('click', () => {
    let currentPage = paginationContainer.getAttribute('data-page')
    let reqPage = ++currentPage
    page.innerText = reqPage
    let url = paginationContainer.getAttribute('data-url')
    url = url + `&page=${reqPage}`
    createCards(url, paginationContainer)
    paginationContainer.setAttribute('data-page', reqPage)
    // alert(url)
})
prevBtn.addEventListener('click', () => {
    let currentPage = paginationContainer.getAttribute('data-page')
    if (currentPage > 1) {
        let reqPage = --currentPage
        page.innerText = reqPage
        let url = paginationContainer.getAttribute('data-url')
        url = url + `&page=${reqPage}`
        createCards(url, paginationContainer)
        paginationContainer.setAttribute('data-page', reqPage)
        // alert(url)
    }
    else {
        alert("its first page you can browsw in negative")
    }
})
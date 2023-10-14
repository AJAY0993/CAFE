const links = document.querySelectorAll('li a')
const slideContainer = document.querySelector('.hero--slider-container')
const cardsContainer = document.querySelector('.popular-movies-card-container')
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
const POPULAR_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
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
            slide.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${element.poster_path})`
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


fetch(POPULAR_URL)
    .then(data => data.json())
    .then(data => {
        data['results'].forEach(elm => {
            const card = document.createElement('div')
            card.classList.add('movie-card')
            card.innerHTML = `<div class="card--movie-image">
            <img src="https://image.tmdb.org/t/p/w1280${elm.poster_path}" alt="">
            </div>
            <div class="card--movie-name">
${elm.title}
            </div>
            <div class="card--movie-time">
${elm["release_date"]}
            </div>`
            cardsContainer.appendChild(card)
        })
    })

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
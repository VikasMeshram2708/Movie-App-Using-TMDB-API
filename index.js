// tmdb

const API_KEY = "api_key=c143fcbc0203660a09b3ab7b834fea45";
const BASE_URL = "https://api.themoviedb.org/3";
const APi_URL = BASE_URL+ '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + '/search/movie?'+API_KEY;
getMovies(APi_URL);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search')

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        showMovies(data.results);
    })
}


function showMovies(data){

    main.innerHTML = '';
    data.forEach(movie=>{
        const {title, poster_path, vote_average,overview}=movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = 
        `
        <div class="movie">
        <img src="${IMG_URL+poster_path}" alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
        ${overview}
        </div>
      </div>

        `

        main.appendChild(movieElement)
    })
}


function getColor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchterm  = search.value;
    if(searchterm){
        getMovies(searchURL+'&query='+searchterm)
    }else{
        getMovies(APi_URL);
    }
})
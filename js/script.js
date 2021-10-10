$("#searchForm").on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
})

function searchMovies(){
    let searchText = $('#searchText').val();
    getMovies(searchText);
}

function getMovies(searchText){
    var settings = {
        "url" : "http://www.omdbapi.com/?apikey=3c8e204c&s=" + searchText,
        "method" : "GET",
        "timeout" : 0
    }

    $.ajax(settings).done((response) => {
        var content = response.Search;
        let output = '';
        let movies = content;
        
        $.each(movies, (index, movie) => {
            // console.log(movie);
            output += `
            <div class="col">
               <div class="well text-center">
                   <img src="${movie.Poster}" alt="">
                   <h5>${movie.Title}</h5>
                   <a href="#" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary">Movie Details</a>
               </div>
           </div>
            `
        });
        $("#movies").html(output);
        // console.log(output);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);

    var settings = {
        "url" : "http://www.omdbapi.com/?apikey=3c8e204c&i=" + id,
        "method" : "GET",
        "timeout" : 0
    }

    $.ajax(settings).done((response) => {
        var content = response;
        let movie = content;
        // console.log(movie);
        // console.log(movie.Actors);

        let output = `
        <div class="row">
        <img src="${movie.Poster}" class="thumbnail">
    </div>
    <div class="row">
        <h2>${movie.Title}</h2>
        <hr>
        <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary" target="_blank">View iMDB</a>
            <a href="index.html" class="btn btn-default">Go Back to Search</a>
        </div>
    </div>
    <div class="row">
        <ul class="list-group">
            <li class="list-group-item"><strong>Genre</strong>: ${movie.Genre}</li>
            <li class="list-group-item"><strong>Released</strong>: ${movie.Released}</li>
            <li class="list-group-item"><strong>Rated</strong>: ${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating</strong>: ${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director</strong>: ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer</strong>: ${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors</strong>: ${movie.Actors}</li>
        </ul>
    </div>
            `;
        $("#movie").html(output);
        console.log(output);
    });
}

function myMessage()
{
    alert('Hi');
}
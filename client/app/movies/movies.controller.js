'use strict';

(function(){

class MoviesComponent {
  constructor($http, $scope, socket) {
    // this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    // this.movieData = [];
  }

  $onInit() {
    this.$http.get('/api/movies')
    .then(response => {
      this.movies = response.data;
      this.socket.syncUpdates('movie', this.movies);
    });
  }

  getYear(date){
    return year;
  }

  searchMovies(){
    // this.getYear();
    console.log('hi');
    this.$http.get(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${this.search.title}`)
      .then(response => {
        var movieID = response.data.results[0].id;
        console.log(movieID);
        this.$http.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US`).then(response =>{
          // this.getYear(response.data.releaseDate);
          this.movieData = {
            Title: response.data.original_title,
            Year: response.data.release_date.substring(0,4),
            Genre: _.pluck(response.data.genres, 'name').join(),
            Plot: response.data.overview,
            Poster: `http://image.tmdb.org/t/p/w500/${response.data.poster_path}`,
            Backdrop:  `http://image.tmdb.org/t/p/w500/${response.data.backdrop_path}`,
            Runtime: `${response.data.runtime} minutes`
          };
          console.log(this.movieData);
        })
      });
  }

  addMovie() {
    // console.log(this.movieData.Poster)
    this.$http.post('/api/movies', this.movieData);
    this.newMovie = '';

      // this.$http.get('/api/movies').then(response => {
      //   this.movies = response.data;
      //   console.log(this.movies);
      //   // this.socket.syncUpdates('thing', this.awesomeThings);
      // });
  }

  deleteMovie(movie) {
    // console.log('Work Bitch');
    this.$http.delete('/api/movies/' + movie._id).then(response => {
      console.log(response);
    });

    // this.$http.get('/api/movies')
    // .then(response => {
    //   this.movies = response.data;
    //   console.log(this.movies);
    //   // this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }
}

angular.module('movieApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();

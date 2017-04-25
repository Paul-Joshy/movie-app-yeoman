'use strict';

(function(){

class MoviesComponent {
  constructor($http) {
    // this.message = 'Hello';
    this.$http = $http;
    this.movieData = [];
  }

  $onInit() {
    this.$http.get('/api/movies')
    .then(response => {
      this.movies = response.data;
      console.log(this.movies);
      // this.socket.syncUpdates('thing', this.awesomeThings);
    });
  }

  searchMovies(){
    // console.log('hi');
    this.$http.get('http://www.omdbapi.com/?t='+this.search.title)
      .then(response => {
        this.movieData = response.data;
        console.log(this.movieData);
        // this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addMovie() {
      this.$http.post('/api/movies', {
        Title: this.movieData.Title,
        Plot: this.movieData.Plot
      });
      this.newMovie = '';
      // getMovies();
  }

  deleteMovie(movie) {
    // console.log('Work Bitch');
    this.$http.delete('/api/movies/' + movie._id).then(response => {
      console.log(response);
    });
  }
}

angular.module('movieApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();

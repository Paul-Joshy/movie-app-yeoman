'use strict';

(function(){

class TheatreMappingComponent {
  constructor($http, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.movies = [];
    this.theatres = [];
    this.cities = [];
    this.mappings = [];
    this.theatreForm = {};
    this.cityMappings = {};

    this.theatreForm.dates = [];
    this.theatreForm.timings = [];
  }

    $onInit(){

      this.$http.get('/api/theatres').then(response =>{
        this.theatres = response.data;
        this.cityMappings = _.groupBy(this.theatres, (theatre)=>{ return theatre.city; });
        console.log(this.theatres);
        this.socket.syncUpdates('theatre', this.theatres);
      });

      this.$http.get('/api/movies').then(response =>{
        this.movies = response.data;
        // console.log(this.theatres);
        this.socket.syncUpdates('movie', this.theatres);
      });

      this.$http.get('/api/cities').then(response =>{
        this.cities = response.data;
        // console.log(this.theatres);
        this.socket.syncUpdates('city', this.theatres);
      });

      this.$http.get('/api/theatre-mappings').then(response =>{
        this.mappings = response.data;
        console.log(this.mappings);
        this.socket.syncUpdates('theatreMapping', this.mapppings);
      });

      // groupByCity(){


    }

    searchMapping(){
      this.theatreForm.dates = [];
      this.theatreForm.timings = [];
      this.mapping = _.find(this.mappings, (mapping)=>{ return mapping.city === this.theatreForm.city && mapping.movie === this.theatreForm.movie && mapping.theatre === this.theatreForm.theatre});
      console.log(this.mapping);
      if(this.mapping){
        this.theatreForm.dates = this.mapping.dates;
        this.theatreForm.timings = this.mapping.timings;
      }
    }

    addMapping(){
      // this.theatreForm.dates = [];
      // this.theatreForm.timings = [];
      // this.theatreForm.dates.push(this.date);
      // this.theatreForm.timings.push(this.timing);
      console.log(this.theatreForm);
      this.$http.post('api/theatre-mappings',this.theatreForm);
      this.theatreForm = '';
    }

    addDate(){
      // console.log(this.theatreForm);
      // this.theatreForm.dates = [];
      this.theatreForm.dates.push(this.date);
      console.log(this.theatreForm.dates);
    }

    removeDate(i){
      console.log(i);
      this.theatreForm.dates.splice(i,1);
      console.log(this.theatreForm.dates);
    }

    at(){
      console.log("dummy");
    }

    addTiming(){
      // this.theatreForm.times = [];
      console.log(this.timing);
      this.theatreForm.timings.push(this.timing);
      console.log(this.theatreForm.timings);
    }

    removeTiming(i){
      console.log(i);
      this.theatreForm.timings.splice(i,1);
      console.log(this.theatreForm.timings);
    }

    PostOrUpdateMapping(city, theatre, movie){
      console.log('theatre mappings')
      // console.log(this.mapping[0]);
      this.mapping = _.find(this.mappings, (mapping)=>{ return mapping.city === this.theatreForm.city && mapping.movie === this.theatreForm.movie && mapping.theatre === this.theatreForm.theatre});
      console.log(this.mapping);
      if(this.mapping){
        console.log("came here")
        console.log(this.mapping._id);
        this.$http.put('api/theatre-mappings/'+this.mapping._id,{
          dates: this.theatreForm.dates,
          timings: this.theatreForm.timings
        })
      }
      else
        this.$http.post('api/theatre-mappings',this.theatreForm);

      // this.$http.put('api/theatre-mappings/'+this.theatreForm.city+'/'+this.theatreForm.theatre+'/'+this.theatreForm.movie,{
      //   dates: this.theatreForm.dates,
      //   timings: this.theatreForm.timings
      // }).then(response =>{
      //   console.log(response);
      // })
    }

    deleteMapping(){
      console.log(this.mapping);
      this.$http.delete('api/theatre-mappings/' + this.mapping._id);
      this.mapping = {};
    }

  }

angular.module('movieApp')
  .component('theatreMapping', {
    templateUrl: 'app/theatre-mapping/theatre-mapping.html',
    controller: TheatreMappingComponent,
    controllerAs: 'theatreMappingCtrl'
  });


})();

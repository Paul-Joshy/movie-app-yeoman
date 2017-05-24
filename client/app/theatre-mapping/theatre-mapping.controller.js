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
    this.mapping = {};

    this.theatreForm = {};
    this.cityMappings = {};
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
        this.socket.syncUpdates('movie', this.movies);
      });

      this.$http.get('/api/cities').then(response =>{
        this.cities = response.data;
        this.socket.syncUpdates('city', this.cities);
      });

      this.$http.get('/api/theatre-mappings').then(response =>{
        this.mappings = response.data;
        console.log(this.mappings);
      });

    }

    addMapping(){
      if(this.searchMapping())
      {
        this.mapping = this.searchMapping()
        console.log(this.searchMapping());
        console.log("mapping exists");
      }
      else {
        console.log("mapping doesnt exist, creating new")
        this.mapping = {}
        this.mapping.city = this.theatreForm.city;
        this.mapping.theatre = this.theatreForm.theatre;
        this.mapping.movie = this.theatreForm.movie;
        this.mapping.dates = [];
        this.mapping.timings = [];
      }
      console.log(this.mapping);
    }

    searchMapping(){
        return  _.find( this.mappings, (mapping)=>{ return mapping.city === this.theatreForm.city && mapping.theatre === this.theatreForm.theatre && mapping.movie === this.theatreForm.movie } );
    }

    genDate(date){
      var day = new Date(date).getDate();
      var month = new Date(date).getMonth();
      var year = new Date(date).getFullYear();
      return `${day}.${month}.${year}`;
    }

    genTiming(timing){
      var hours = new Date(timing).getHours();
      var minutes = new Date(timing).getMinutes();
      return `${hours}.${minutes}`;
    }

    addDate(){
      var date = new Date(this.theatreForm.date);
      this.mapping.dates.push(date);
      this.mapping.dates = _.sortBy( this.mapping.dates, (date)=>{ return date } );
      console.log(this.mapping);
    }

    removeDate(i){
      this.mapping.dates.splice(i,1);
    }

    addTiming(){
      var timing = new Date(this.theatreForm.timing);
      this.mapping.timings.push(timing);
      this.mapping.timings = _.sortBy( this.mapping.timings, (timing)=>{ return timing } );
      console.log(this.mapping);
    }

    removeTiming(i){
      this.mapping.timings.splice(i,1);
    }

    PostOrUpdateMapping(city, theatre, movie){
      console.log(this.searchMapping());
      var mapping = this.searchMapping();
      console.log(mapping);
      if(mapping)
      {
        console.log("mapping exists, updating changes...");
        this.$http.put('/api/theatre-mappings/' + mapping._id, {
          dates: this.mapping.dates,
          timings: this.mapping.timings
        }).then(response =>{
          console.log(response);
          console.log(this.mappings);
          this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
          this.mappings.push(response.data);

        })
      }
      else {
        console.log("mapping doesn't exist, posting new...");
        this.$http.post('/api/theatre-mappings', this.mapping).then( (response) =>
          {
              console.log(response);
              this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
              this.mappings.push(response.data);

              console.log(this.mappings);
          }, (err) => console.log(err) );
      }
    }

    deleteMapping(){
      var mapping = this.searchMapping();
      if(mapping){
        this.$http.delete('/api/theatre-mappings/' + mapping._id).then( response =>{
           console.log(response);
           this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
         });
      }
      else {
        console.log("Mapping doesn't exist")
      }
    }

  }

angular.module('movieApp')
  .component('theatreMapping', {
    templateUrl: 'app/theatre-mapping/theatre-mapping.html',
    controller: TheatreMappingComponent,
    controllerAs: 'theatreMappingCtrl'
  });


})();

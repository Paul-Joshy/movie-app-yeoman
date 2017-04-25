'use strict';

(function(){

class CitiesComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http
    this.newCity = [];
  }

  $onInit() {
    this.$http.get('/api/cities').then(response => {
      this.cities = response.data;
      console.log(this.cities);
      // this.socket.syncUpdates('thing', this.awesomeThings);
    })
  }

  addCity() {
      console.log('hi');
      this.$http.post('/api/cities/', {
        name:this.name
      });
    }

  deleteCity(city) {
    this.$http.delete('/api/cities/' + city._id).then(response => {
      console.log(response);
    });
  }

  updateCity(city) {
    console.log('sdfsd');
    var name = prompt("Enter new city name");

    this.$http.put('api/cities/' + city._id, {
      name: name
    }).then(response =>{
      console.log(response);
    });
  }

}


angular.module('movieApp')
  .component('cities', {
    templateUrl: 'app/cities/cities.html',
    controller: CitiesComponent,
    controllerAs: 'citiesCtrl'
  });

})();

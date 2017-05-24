'use strict';

(function(){

class CitiesComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.cities = [];
    this.newCity = [];
  }

  $onInit() {
    this.$http.get('/api/cities').then(response => {
      this.cities = response.data;
      this.socket.syncUpdates('city', this.cities, ()=>{
        console.log("updated");
      });
    });
  }

  addCity() {
      this.$http.post('/api/cities/', {
        name:this.name
      }).then( ()=>{
      });
      // location.reload();
    }

  deleteCity(city) {
    this.$http.delete('/api/cities/' + city._id).then(response => {
    });
    // location.reload();
  }

  updateCity(city) {
    console.log(city);
    this.$http.put('api/cities/' + city._id, {
      name: this.cityName
    }).then(response =>{
      console.log(response);
    });
    // console.log($(`#${city.name}Modal`));
    $('.modal-backdrop').hide();
  }

}


angular.module('movieApp')
  .component('cities', {
    templateUrl: 'app/cities/cities.html',
    controller: CitiesComponent,
    controllerAs: 'citiesCtrl'
  });

})();

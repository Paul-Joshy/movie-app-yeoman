'use strict';

(function(){

class SeatingComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieApp')
  .component('seating', {
    templateUrl: 'app/seating/seating.html',
    controller: SeatingComponent,
    controllerAs: 'seatingCtrl'
  });

})();

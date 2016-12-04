'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('sanguoshaHero', []).
component('sanguoshaHero', {
    templateUrl: 'sanguosha-hero/sanguosha-hero.template.html',
    controller: function SanguoshaHeroController($http) {
        var self = this;
        $http.get('data/sanguosha-heroes.json').then(function(response) {
            self.heroes = response.data;
            // console.log(self.heroes);
        });
    }
});
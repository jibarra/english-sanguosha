'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('sanguoshaHero', []).
component('sanguoshaHero', {
    templateUrl: 'sanguosha-hero/sanguosha-hero.template.html',
    controller: function SanguoshaHeroController($http) {
        var selectedHero = {value: 0};
        var self = this;

        self.query = function(){
            $http.get('data/sanguosha-heroes.json').then(function(response) {
                self.displayHeroes = response.data;
                // self.editHeroes = [].concat(self.displayHeroes);
                // console.log(self.heroes);
            });
        };

        self.display = function(hero) {
            if(hero.selected === undefined){
                hero.selected = true;
            }
            else{
                hero.selected = !hero.selected;
            }
        };

        self.query();
    }
});
'use strict';

angular
.module('sanguoshaHero')
.controller('SanguoshaHeroController', ['$http', 'SanguoshaHeroService',
    function SanguoshaHeroController($http, SanguoshaHeroService){
        var self = this;

        self.query = function(){
            self.displayHeroes = SanguoshaHeroService.query();
            // $http.get('data/sanguosha-heroes.json').then(function(response) {
            //     self.displayHeroes = response.data;
            //     // self.editHeroes = [].concat(self.displayHeroes);
            //     // console.log(self.heroes);
            // });
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
]);
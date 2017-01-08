angular
.module('sanguoshaHero')
.service('SanguoshaHeroService', ['$resource',
    function($resource){
        return $resource('data/sanguosha-heroes.json', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true
            }
        });
    }
]);
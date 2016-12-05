/**
 * Created by jose on 12/3/16.
 */
function SanguoshaHero(heroName, heroType, sanguoshaAbilities, imageUrl, originalSiteUrl){
    this.heroName = heroName;
    this.heroType = heroType;
    //Array of SanguoshaAbility
    this.sanguoshaAbilities = sanguoshaAbilities;
    this.imageUrl = imageUrl;
    this.originalSiteUrl = originalSiteUrl;
}

function SanguoshaAbility(abilityName, abilityDescription){
    this.abilityName = abilityName;
    this.abilityDescription = abilityDescription;
}

function SanguoshaAllHeroes(numHeroTypes){
    this.numHeroTypes = numHeroTypes;
    this.countedHeroTypes = 0;
    this.allHeroes = [];

    this.addHeroes = function(heroList) {
        // this.allHeroes = allHeroes.concat(heroList);
        Array.prototype.push.apply(this.allHeroes, heroList);
        this.countedHeroTypes++;

        if(this.numHeroTypes === this.countedHeroTypes){
            console.log(JSON.stringify(this.allHeroes, null, 2));
        }
        // for(var i = 0; i < heroList.length; i++){
        //
        // }
    }
}
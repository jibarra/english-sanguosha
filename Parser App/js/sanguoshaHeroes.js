/**
 * Created by jose on 12/3/16.
 */
function SanguoshaHero(heroName, sanguoshaAbilities, imageUrl, originalSiteUrl){
    this.heroName = heroName;
    //Array of SanguoshaAbility
    this.sanguoshaAbilities = sanguoshaAbilities;
    this.imageUrl = imageUrl;
    this.originalSiteUrl = originalSiteUrl;
}

function SanguoshaAbility(abilityName, abilityDescription){
    this.abilityName = abilityName;
    this.abilityDescription = abilityDescription;
}

function SanguoshaAllHeroes(){
    this.weiHeroes;
    this.shuHeroes;
    this.wuHeroes;
    this.heroHeroes;
    this.godHeroes;

    this.checkAllHeroesFilled = function(){
        if(allHeroes.weiHeroes != undefined && allHeroes.shuHeroes != undefined
            && allHeroes.wuHeroes != undefined && allHeroes.heroHeroes != undefined
            && allHeroes.godHeroes != undefined){
            console.log(JSON.stringify(allHeroes, null, 2));
        }
    }
}
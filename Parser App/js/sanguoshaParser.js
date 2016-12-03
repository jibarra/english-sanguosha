function SanguoshaParser(){
    this.heroes = [];
    this.heroCount = 0;

    this.parseHero = function(url, callBackFunction){

        var lineBreaksExp = new RegExp("(\r\n|\n|\r)");
        var self = this;

        $.get(url, function( htmlResult ) {
            var anchor = $('.sites-layout-tile, .sites-tile-name-header', $(htmlResult))[0];
            var tableElement = $('table', anchor);

            var heroImageElement = $('img', tableElement)[0];

            var heroElementDivs = $('td > span > div', tableElement);
            var heroElement = $('span', $(heroElementDivs)[0]);

            var heroName = (((heroElementDivs[0] == undefined || heroElementDivs[0].innerText == undefined) ? "" : heroElementDivs[0].innerText)
                + ((heroElement == undefined || heroElement.innerText == undefined) ? "" : heroElement.innerText)
                ).trim();
            var heroImgSrc = $(heroImageElement).attr('src');

            var heroSkillStrings = [];

            //Position 0 has the hero name, position 1 will be empty or have the "nickname" for the hero
            for(var i = 2; i < heroElementDivs.length; i++){
                var text = $(heroElementDivs)[i].innerText.replace(lineBreaksExp,"").trim();
                if(!isEmptyText(text)){
                    heroSkillStrings.push(text);
                }
            }

            var heroSkills = [];
            for(var i = 0; i < heroSkillStrings.length; i+=2){
                var skill = new SanguoshaAbility(heroSkillStrings[i], heroSkillStrings[i + 1]);
                heroSkills.push(skill);
            }

            var sanguoshaHero = new SanguoshaHero(heroName, heroSkills, heroImgSrc, url);
            // console.log(sanguoshaHero);
            self.heroes.push(sanguoshaHero);

            if(self.heroCount === self.heroes.length){
                callBackFunction(self.heroes);
            }
        });
    }

    this.parseCharacterListPage = function(url, callBackFunction){
        var self = this;
        $.get(url, function(htmlResult) {
            var anchor = $('.sites-layout-tile, .sites-tile-name-header', $(htmlResult))[0];
            var tableElements = $('table', anchor);
            var topTableElement = tableElements[0];

            var allHeroATags = $('a', topTableElement);
            var allHeroUrls = [];

            var imgRegExp = new RegExp(".jpg$");

            for(var i = 0; i < allHeroATags.length; i++){
                var heroATag = $(allHeroATags[i]).attr('href');
                if(imgRegExp.exec(heroATag) != null){
                    console.log(heroATag + " is an image.");
                } else{
                    allHeroUrls.push(heroATag);
                    self.heroCount++;
                }
            }

            self.processHeroUrls(allHeroUrls, callBackFunction);
        });
    }

    this.processHeroUrls = function(allHeroUrls, callBackFunction) {
        for(var i = 0; i < allHeroUrls.length; i++){
            this.parseHero(allHeroUrls[i], callBackFunction);
        }
    }
}

function isEmptyText(text){
    if(text == undefined){
        return true;
    }
    else if(text == "" || text === "\n"){
        return true;
    }

    return false;
}
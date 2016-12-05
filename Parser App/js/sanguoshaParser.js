function SanguoshaParser(){
    this.heroes = [];
    this.heroCount = 0;

    this.parseHero = function(url, heroType, callBackFunction){
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

            var sanguoshaHero = new SanguoshaHero(heroName, heroType, heroSkills, heroImgSrc, url);

            // console.log(sanguoshaHero);
            self.heroes.push(sanguoshaHero);

            if(self.heroCount === self.heroes.length){
                callBackFunction(self.heroes);
            }
        });
    }

    this.parseCharacterListPage = function(url, callBackFunction){
        var self = this;
        console.log(url);



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

            var heroType = self.determineHeroType(url);

            self.processHeroUrls(allHeroUrls, heroType, callBackFunction);
        });
    }

    this.processHeroUrls = function(allHeroUrls, heroType, callBackFunction) {
        for(var i = 0; i < allHeroUrls.length; i++){
            this.parseHero(allHeroUrls[i], heroType, callBackFunction);
        }
    }

    this.determineHeroType = function(url){
        var weiExp = new RegExp("wei");
        var shuExp = new RegExp("shu");
        var wuExp = new RegExp("wu");
        var heroExp = new RegExp("hero");
        var godExp = new RegExp("god");

        if(weiExp.exec(url)){
            return "Wei";
        } else if(shuExp.exec(url)){
            return "Shu";
        } else if(wuExp.exec(url)){
            return "Wu";
        } else if(heroExp.exec(url)){
            return "Hero";
        } else if(godExp.exec(url)){
            return "God";
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
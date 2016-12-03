function parseHero(){
    $.get('http://www.englishsanguosha.com/wei/li-dian-7', function( htmlResult ) {
        console.log(htmlResult);
        var anchor = $('.sites-layout-tile, .sites-tile-name-header', $(htmlResult))[0];
        var tableElement = $('table', anchor);

        var heroImageElement = $('img', tableElement)[0];

        var heroElement = $('td > span > div > span', tableElement)[0];
        var heroName = heroElement.innerText;

        //Doesn't work with heroes that have line numbers:
        //All within table > tr > td > span:
        //div > {Hero Name}
        //div > {Hero Description}
        //Continues:
        //div > blank
        //div > {Ability Name}
        //div > {Ability Description}

        //Maybe isntead:
        //All within table > tr > td > span:
        //div > {Hero Name}
        //div > {Hero Description}
        //Then get all text for abilities to be parsed later

        console.log("anchor");
        console.log(anchor);
        console.log("tableElement");
        console.log(tableElement);
        console.log("heroImageElement");
        console.log(heroImageElement);
        console.log("heroImageElement.src");
        console.log(heroImageElement.src);

        console.log("heroName");
        console.log(heroName);
        // var parsedPage = $.parseHTML(htmlResult,document,false);
        // console.log(parsedPage);
    });
}

function parseHeroPage(url){
    $.get(url, function(htmlResult) {
        // console.log(htmlResult);
        var anchor = $('.sites-layout-tile, .sites-tile-name-header', $(htmlResult))[0];
        var tableElements = $('table', anchor);
        var topTableElement = tableElements[0];

        var allHeroATags = $('a', topTableElement);
        // console.log(allHeroATags);
        var allHeroUrls = [];
        for(var i = 0; i < allHeroATags.length; i++){
            console.log($(allHeroATags[i]).attr('href'));
        }

        console.log("allHeroUrls");
        console.log(allHeroUrls);
    });
}
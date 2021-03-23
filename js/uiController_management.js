let currentLanguage = 0; //0  for English, 1 for Swedish
let displayItems = 10; // Number of items to display in order page


//Fetches cookie for the given session
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}

//Sets cookie for the given session
function setCookie(cname, value, hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = cname + '=' + value + ';Expires=' + d.toUTCString() + ';';
}

$(function () {
    htmlElements.title.click(() => setManagementPageData());
    htmlElements.englishIcon.click(() => changeToEng());
    htmlElements.swedishIcon.click(() => changeToSwed());
    htmlElements.manageStock.click(() => setStockPageData());
    setCopyrightYear();
    setLanguage();
    setManagementPageData();
});

function setLanguage() {
    let data = getCookie("langaugeSelected").trim();
    if (data !== "" && parseInt(data) == 1) changeToSwed();
    else changeToEng();
}

function changeToSwed() {
    currentLanguage = 1;
    htmlElements.login.text(language.swe.Login);
    htmlElements.desc1.text(language.swe.Content);
    htmlElements.avalItmsTitle.text(language.swe.AvalItmsTitle);
    htmlElements.selItmsTitle.text(language.swe.SeleItmsTitle);
    htmlElements.avalItemsMenu.html(setmenuItems(language.swe.drinkMenuItems));

    htmlElements.manageStock.text(language.swe.ManageStock);
    htmlElements.managePrice.text(language.swe.ManagePrice);
    setCookie("langaugeSelected", currentLanguage, 3600);
}
function changeToEng() {
    currentLanguage = 0;
    htmlElements.login.text(language.eng.Login);
    htmlElements.desc1.text(language.eng.Content);
    htmlElements.avalItmsTitle.text(language.eng.AvalItmsTitle);
    htmlElements.selItmsTitle.text(language.eng.SeleItmsTitle);
    htmlElements.avalItemsMenu.html(setmenuItems(language.eng.drinkMenuItems));
    
    htmlElements.manageStock.text(language.eng.ManageStock);
    htmlElements.managePrice.text(language.eng.ManagePrice);
    htmlElements.avalItmsTitle.text(language.eng.AvalItmsTitle);
    htmlElements.stockList.html(setStockItems(language.eng.drinkMenuItems));
    setCookie("langaugeSelected", currentLanguage, 3600);
}
function setCopyrightYear() {
    htmlElements.copyrightText.text(new Date().getFullYear())
}

function setmenuItems(menus) {
    str = '';
    menus.forEach((item) => {
        str += `<div class="drinkType" onclick="displayAvailableItems(this);">${item}</div>`;
    });
    return str;
}

function setStockItems(stocks) {
    str = '';
    stocks.forEach(
        (item) => {
            str += `<div class="drinkType" onclick="displayStockItems(this);">${item}</div>`;
        }
    )
}

function makeUiElementsNone() {
    $("#index_page_flying").hide();
    $(".content").children().each(function () {
        $(this).hide();
    });
}

function setManagementPageData() {
    //Make all elements disappear
    makeUiElementsNone();

    // Make index page elements display.
    $("#index_page_flying").show();
    $("#management_page").show();
}

function setStockPageData() {
    // Remove all elements
    makeUiElementsNone();
    // Display stock page elements
    $('#stock_page').show();
    $(".drinkType")[0].click();
}

function displayAvailableItems(elem) {
    $(".drinkType").removeClass("active");
    $(elem).addClass("active");
    let drinks = getAllDrinkofType($(elem).text()).slice(0, displayItems);
    console.log(drinks);
    htmlElements.availItems.empty();
    htmlElements.availItems.append(generateDrinksHtml(drinks));

}

function displayStockItems(elem) {
    $(".drinkType").removeClass("active");
    $(elem).addClass("active");
    let stocks = getAllStock($(elem).text()).slice(0, displayItems);
    console.log(stocks);
    htmlElements.stockItems.empty();
    htmlElements.stockItems.append(generateDrinksHtml(stocks));

}

function generateStocksHtml(stocks) {
    let html = ``;

    stocks.forEach((stock) => {
        html += `
        <div draggable="true" id="${stock.nr}"> 
        <div  class="stockItemTitle"> ${stock.name}</div>
        <span class="availItemAlchPer">${stock.alcoholstrength}</span>
        <span class="availItemPrice"> ${stock.priceinclvat}</span><br>
        </div>
        `;
    });
    return html;
}

function generateDrinksHtml(drinks) {
    let html = ``;

    drinks.forEach((drink) => {
        html += `
        <div draggable="true" id="${drink.nr}"> 
        <div  class="availItemTitle"> ${drink.name}</div>
        <span class="availItemAlchPer">${drink.alcoholstrength}</span>
        <span class="availItemPrice"> ${drink.priceinclvat}</span><br>
        </div>
        `;
    });
    return html;
}

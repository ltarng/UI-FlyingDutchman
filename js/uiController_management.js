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
    // htmlElements.stockChangeConfirmButton.click(() => saveStockChange()); //didn't implement saveStockChange() yet
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

    htmlElements.stockItemsTable.html(setStockItems(language.eng.drinkMenuItems));
    htmlElements.stockChangeConfirmButton.text(language.swe.StockChangeConfirmButton);
    setCookie("langaugeSelected", currentLanguage, 3600);
}

function changeToEng() {
    currentLanguage = 0;
    htmlElements.login.text(language.eng.Login);
    htmlElements.desc1.text(language.eng.Content);

    htmlElements.stockItemsTable.html(setStockItems(language.eng.drinkMenuItems));
    htmlElements.stockChangeConfirmButton.text(language.eng.StockChangeConfirmButton);
    setCookie("langaugeSelected", currentLanguage, 3600);
}

function setCopyrightYear() {
    htmlElements.copyrightText.text(new Date().getFullYear())
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
    $("#stockTable").show();
}

function setStockItems(stocks){
    str = '';
    stocks.forEach((item) => {
        str += `<div class="drinkType" onclick="displayStockItems(this);">${item}</div>`;
    });
    return str;
}

function displayStockItems(elem){
    $(".stockTable").removeClass("active");
    $(elem).addClass("active");
    let stocks =  getAllStock($(elem).text()).slice(0, displayItems);
    htmlElements.stockItems.empty();
    htmlElements.stockItems.append(generateStocksHtml(stocks));

}

function generateStocksHtml(stocks){
    let html = ``;

    stocks.forEach((stock) => {
        html +=`
        <div draggable="true" class="stockItemsMain" ondragstart="drag(event)" id="${stock.nr}"> 
        <div  class="availItemTitle"> ${stock.name}</div>
        <span class="availItemAlchPer">${stock.alcoholstrength}</span>
        <span class="availItemPrice"> ${stock.priceinclvat}</span><br>
        </div>
        `;
    });
    return html;
}

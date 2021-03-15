let currentLanguage = 0; //0  for English, 1 for Swedish
let displayItems = 10; // Number of items to display in order page

function viewProductList(){
    htmlElements.
}

function display_product_menu()
{

}

function remove_product_from_menu()
{
    
}

$(function(){
    htmlElements.title.click(() => setIndexPageData());
    htmlElements.englishIcon.click(() => changeToEng());
    htmlElements.swedishIcon.click(() => changeToSwed());
    htmlElements.manageStock.click(() => setOrderPageData());
    htmlElements.managePrice.click(() => setOrderPageData());
    setCopyrightYear();
    setLanguage();
    setIndexPageData();
});


function setmenuItems(menus){
    str = '';
    menus.forEach((item) => {
        str += `<div class="drinkType" onclick="displayAvailableItems(this);">${item}</div>`;
    });
    return str;
}


function makeUiElementsNone(){
    $("#index_page_flying").hide();
    $(".content").children().each(function () {
        $(this).hide();
    });
}

function setIndexPageData(){
    //Make all elements disappear
    makeUiElementsNone();

    // Make index page elements display.
    $("#index_page_flying").show();
    $("#index_page").show();
}

function setOrderPageData(){
    //Make all elements disappear
     makeUiElementsNone();
    // Make order page elements display.
    $("#order_page").show();
    $(".drinkType")[0].click();
}


function displayAvailableItems(elem){
    $(".drinkType").removeClass("active");
    $(elem).addClass("active");
    let drinks =  getAllDrinkofType($(elem).text()).slice(0, displayItems);
    console.log(drinks);
    htmlElements.availItems.empty();
    htmlElements.availItems.append(generateDrinksHtml(drinks));

}


function generateDrinksHtml(drinks){
    let html = ``;

    drinks.forEach((drink) => {
        html +=`
        <div draggable="true" id="${drink.nr}"> 
        <div  class="availItemTitle"> ${drink.name}</div>
        <span class="availItemAlchPer">${drink.alcoholstrength}</span>
        <span class="availItemPrice"> ${drink.priceinclvat}</span><br>
        </div>
        `;
    });
    return html;
}
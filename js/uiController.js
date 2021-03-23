let currentLanguage = 0; //0  for English, 1 for Swedish
let displayItems = 10; // Number of items to display in order page
let total = 0.0;
let cartNumber = 0;
let savedItemsName = "SelectedItems";
let items = [];
let undoStack = [];
let redoStack = [];

//Fetches cookie for the given session
function getCookie(cname) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cname}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return "";
}

function checkCookie(cname){
    var user = getCookie(cname);
    if (user != "") {
        return true;
    } else {
        return false;
    }
}

//Sets cookie for the given session
function setCookie(cname, value, hours = 24){
    var d = new Date();
    d.setTime(d.getTime() + (hours*60*60*1000));                
    document.cookie=cname+'='+value+';Expires='+d.toUTCString()+';';
}

$(function(){
    htmlElements.title.click(() => setIndexPageData());
    htmlElements.englishIcon.click(() => changeToEng());
    htmlElements.swedishIcon.click(() => changeToSwed());
    htmlElements.orderNow.click(() => setOrderPageData());
    htmlElements.cart.click(() => setCartPageData());
    htmlElements.proceedCart.click(() => setCartPageData());
    htmlElements.continueShopping.click(() => setOrderPageData());
    htmlElements.backCart.click(() => setOrderPageData());
    htmlElements.buyNow.click(() => toPayment());
    htmlElements.undoButton.click(() => performUndoOperation());
    htmlElements.redoButton.click(() => performRedoOperation());
    
    updateTotalPrice();
    setCopyrightYear();
    setLanguage();
    setIndexPageData();
    checkSelectedItemsCookies();
    htmlElements.cartNumber.text(cartNumber);
});

function setLanguage(){
    let data = getCookie("langaugeSelected").trim();
    if(data !== "" && parseInt(data) == 1) changeToSwed();
    else changeToEng();  
}

function checkSelectedItemsCookies(){
    if (checkCookie(savedItemsName))
        items = convertStringtoJSON(getCookie(savedItemsName));



    if(items.length > 0){
        total = 0.0;
        cartNumber = 0;
        let html = ``;
        items.forEach((drink) => {
            html +=`
            <div class="availItemsMain" id="${drink.Id}_added"> 
            <div  class="availItemTitle"> ${drink.Name}</div>
            <span class="availItemAlchPer">${drink.AlchPer}</span>
            <span class="availItemPrice"> ${drink.Price}</span><br>
            </div>
            `;
            total += parseFloat(drink.Price);
            cartNumber += 1;

        });
        updateTotalPrice();
        $("#selectedItems").empty().append(html);

    }
}


function changeToSwed(){
    currentLanguage = 1;
    htmlElements.login.text(language.swe.Login);
    htmlElements.aboutUs.text(language.swe.About);
    htmlElements.contactUs.text(language.swe.Contact);
    htmlElements.desc1.text(language.swe.Content);
    htmlElements.desc2.text(language.swe.Content2);
    htmlElements.orderNow.text(language.swe.Order);
    htmlElements.bookNow.text(language.swe.Reserve);
    htmlElements.avalItmsTitle.text(language.swe.AvalItmsTitle);
    htmlElements.selItmsTitleCart.text(language.swe.SeleItmsTitle);
    htmlElements.selItmsTitle.text(language.swe.SeleItmsTitle);
    htmlElements.avalItemsMenu.html(setmenuItems(language.swe.drinkMenuItems));
    htmlElements.priceText.text(language.swe.priceText);
    htmlElements.priceTextCart.text(language.swe.priceText);
    htmlElements.proceedCartText.text(language.swe.proceedCartText);
    htmlElements.emptyCartText.text(language.swe.emptyCartText);
    htmlElements.continueShopping.text(language.swe.continueShopping);
    htmlElements.paymentTitle.text(language.swe.paymentTitle);
    htmlElements.cardPaymentText.text(language.swe.cardPaymentText);
    htmlElements.swishPaymentText.text(language.swe.swishPaymentText);
    htmlElements.cashPaymentText.text(language.swe.cashPaymentText);
    htmlElements.backCart.text(language.swe.backCart);
    htmlElements.buyNow.text(language.swe.buyNow);
    htmlElements.undoText.text(language.swe.undoText);
    htmlElements.redoText.text(language.swe.redoText);
    setCookie("langaugeSelected", currentLanguage,3600);
}
function changeToEng(){
    currentLanguage = 0;
    htmlElements.login.text(language.eng.Login);
    htmlElements.aboutUs.text(language.eng.About);
    htmlElements.contactUs.text(language.eng.Contact);
    htmlElements.desc1.text(language.eng.Content);
    htmlElements.desc2.text(language.eng.Content2);
    htmlElements.orderNow.text(language.eng.Order);
    htmlElements.bookNow.text(language.eng.Reserve);
    htmlElements.avalItmsTitle.text(language.eng.AvalItmsTitle);
    htmlElements.selItmsTitleCart.text(language.eng.SeleItmsTitle);
    htmlElements.selItmsTitle.text(language.eng.SeleItmsTitle);
    htmlElements.avalItemsMenu.html(setmenuItems(language.eng.drinkMenuItems));
    htmlElements.priceText.text(language.eng.priceText);
    htmlElements.priceTextCart.text(language.eng.priceText);
    htmlElements.proceedCartText.text(language.eng.proceedCartText);
    htmlElements.emptyCartText.text(language.eng.emptyCartText);
    htmlElements.continueShopping.text(language.eng.continueShopping);
    htmlElements.paymentTitle.text(language.eng.paymentTitle);
    htmlElements.cardPaymentText.text(language.eng.cardPaymentText);
    htmlElements.swishPaymentText.text(language.eng.swishPaymentText);
    htmlElements.cashPaymentText.text(language.eng.cashPaymentText);
    htmlElements.backCart.text(language.eng.backCart);
    htmlElements.buyNow.text(language.eng.buyNow);
    htmlElements.undoText.text(language.eng.undoText);
    htmlElements.redoText.text(language.eng.redoText);
    setCookie("langaugeSelected", currentLanguage, 3600);
}

function setCopyrightYear(){
    htmlElements.copyrightText.text(new Date().getFullYear())
}

function updateTotalPrice(){
    htmlElements.priceVal.text(total.toFixed(2));
}


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
       
    checkSelectedItemsCookies();
    // Make order page elements display.
    $("#order_page").show();
    $(".drinkType")[0].click();
}

function displayEmptyCartPage(){
    //Make all elements disappear
    makeUiElementsNone();
    $("#empty_cart_page").show();
}

function deleteCartItem(elem_id){
    items.forEach((item, ind) =>{

        if(item.Id == elem_id){
            items.splice(ind,1); 
            total -= parseFloat(item.Price);
            cartNumber -= 1;
            return false; 
        }

    });
    setCookie(savedItemsName, convertJSONtoString(items));
    displayCartItems();
    htmlElements.cartNumber.text(cartNumber);
    htmlElements.priceValCart.text(total.toFixed(2));

    if(items.length <= 0){
        $("#selectedItems").empty();
        updateTotalPrice();
        displayEmptyCartPage();
    }
}


function displayCartItems(){

    let html = ``;
    items.forEach((drink) => {
        html +=`
        <div class="availItemsMain" id="${drink.Id}_cart"> 
        <div  class="availItemTitle"> ${drink.Name}</div>
        <span class="availItemAlchPer">${drink.AlchPer}</span>
        <div class="cartItemRight">
        <span class="availItemPrice"> ${drink.Price}</span>
        <span class="deleteCartItem" onclick="deleteCartItem('${drink.Id}');">X</span>
        </div>
        <br />
        </div>
        `;
    });
    $("#selectedItemsCart").empty().append(html);


}


function setCartPageData(){

   
    // Make all elements disappear
    makeUiElementsNone();

     //Check if any items are selected.
     if(items.length <= 0 ){
        displayEmptyCartPage();
        return false;
    }

    displayCartItems();
    htmlElements.priceValCart.text(total.toFixed(2));
    //Make cart page elements diaplay
    $("#cart_page").show();
}

function displayAvailableItems(elem){
    $(".drinkType").removeClass("active");
    $(elem).addClass("active");
    let drinks =  getAllDrinkofType($(elem).text()).slice(0, displayItems);
    htmlElements.availItems.empty();
    htmlElements.availItems.append(generateDrinksHtml(drinks));

}


function generateDrinksHtml(drinks){
    let html = ``;

    drinks.forEach((drink) => {
        html +=`
        <div draggable="true" class="availItemsMain" ondragstart="drag(event)" id="${drink.nr}"> 
        <div  class="availItemTitle"> ${drink.name}</div>
        <span class="availItemAlchPer">${drink.alcoholstrength}</span>
        <span class="availItemPrice"> ${drink.priceinclvat}</span><br>
        </div>
        `;
    });
    return html;
}


function allowDrop(ev) {
    ev.preventDefault(); // This makes the item accept drop actions.
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


function extractDataFromNode(elem){
    return {
            Id: elem[0].id,
            Price: elem.children(".availItemPrice").text(),
            Name: elem.children(".availItemTitle").text(),
            AlchPer: elem.children(".availItemAlchPer").text()
    }
}


function addItemtoCookies(data){
    if(checkCookie(savedItemsName)){
        items = convertStringtoJSON(getCookie(savedItemsName));
    }

    items.push(data);

    setCookie(savedItemsName, convertJSONtoString(items));

}

function drop(ev) {


    ev.preventDefault();

    ev.dataTransfer.dropEffect = "copy";

    let data = ev.dataTransfer.getData("text"); 

    let nodeCopy = document.getElementById(data).cloneNode(true);
    $(nodeCopy).removeAttr("ondragstart");
    $(nodeCopy).removeAttr("draggable");
    
    addItemtoCookies(extractDataFromNode($(nodeCopy)));
    pushToStack(createUndoRedoJson(extractDataFromNode($(nodeCopy)), "added"), undoStack);

    nodeCopy.id = nodeCopy.id + "_added"; 

    $("#selectedItems").append(nodeCopy);

    //Inc Cart Number 
    cartNumber += 1;

    htmlElements.cartNumber.text(cartNumber);

    // Make a total sum of all the prices.
    
    let selectedPrice = parseFloat($(nodeCopy).children(".availItemPrice").text());
    total += selectedPrice;
    updateTotalPrice();
}

function createSuccessNotification(text){
    let successAlert = `
    <div id="alert-box" data-closable class="alert-box callout success">
         <span>${text}<span>
     </div>
     `;
     $('body').append(successAlert);
    setTimeout(() => {
        $("#alert-box").remove();
    }, 2000);
}


function createErrorNotification(text){
    let failedAlert = `
    <div id="alert-box" data-closable class="alert-box callout alert">
         <span>${text}<span>
     </div>
     `;
     $('body').append(failedAlert);
        setTimeout(() => {
        $("#alert-box").remove();
    }, 2000);

}

function createWarningNotification(text){
    let warningAlert = `
    <div id="alert-box" data-closable class="alert-box callout warning">
         <span>${text}<span>
     </div>
     `;
     $('body').append(warningAlert);
        setTimeout(() => {
        $("#alert-box").remove();
    }, 2000);
}

function toPayment(){
    let paymentType = $('input[name="payment"]:checked').val();


    switch(paymentType){
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;
        default:
            createErrorNotification("Please select payment to proceed!");
    }
}

function pushToStack(data, stack){
    stack.push(data);
}


function popFromStack(stack){
    return stack.pop();
}

function createUndoRedoJson(data, operation){
    return {
        elem_data: data,
        operation: operation
    }
}


function performUndoOperation(){
    let lastData = popFromStack(undoStack);
    pushToStack(lastData, redoStack);

    if(items.length && items[items.length - 1].Id === lastData.elem_data.Id){
        items.pop();
     }
     setCookie(savedItemsName, convertJSONtoString(items));
     checkSelectedItemsCookies();

}

function performRedoOperation(){
    let lastData = popFromStack(redoStack);
    pushToStack(lastData, undoStack);

    items.push(lastData.elem_data);
    
    setCookie(savedItemsName, convertJSONtoString(items));
    checkSelectedItemsCookies();
}
// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }

// // this cannot be used untill we run the file on servers
// let userDetailsDB;
// //Get DB Users:
// readTextFile("./db_files/dutchman_table_users.json", function(text){
//     userDetailsDB = JSON.parse(text);
// });



function checkUserDetails(uname, upass){
    for (let index = 0; index < DB.users.length; index++) {
        const user = DB.users[index];
        if (user.email == uname && user.password == upass) {
            return {
                result: true,
                userId: user.user_id,
                name: user.first_name + " " + user.last_name,
                userName: user.username
            };
        }
    }
    return {
        result: false
    };
}


function getAllDrinkofType(type){
    let drinks = {};
    let matchedDrinks;
    let engDrinks = language.eng.drinkMenuItems.map(function(v) {
        return v.toLowerCase();
    });
    let sweDrinks = language.swe.drinkMenuItems.map(function(v) {
        return v.toLowerCase();
    });
    switch(type.toLowerCase()){
        case engDrinks[0]:
        case sweDrinks[0]:
            matchedDrinks = bar.filter(item => (item.catgegory.toLowerCase().includes("beer") || item.catgegory.toLowerCase().includes("ale")));
            break;
        case engDrinks[1]:
        case sweDrinks[1]:
            matchedDrinks = bar.filter(item => (item.catgegory.toLowerCase().includes("spicy spirits") || item.catgegory.toLowerCase().includes("okryddad sprit")) );
            break;
        case engDrinks[2]:
        case sweDrinks[2]:
            matchedDrinks = bar.filter(item => (item.catgegory.toLowerCase().includes("whisky") || item.catgegory.toLowerCase().includes("okryddad sprit")));
            break;
        case engDrinks[3]:
        case sweDrinks[3]:
            matchedDrinks = bar.filter(item => (item.catgegory.toLowerCase().includes("wine") || item.catgegory.toLowerCase().includes("vin")));
            break;
        default:
            matchedDrinks = [];
    } 
    return matchedDrinks;
}

function getAllStock(){
    // Using a local variable to collect the items.
    var collector = [];

    // The DB is stored in the variable DB2, with "spirits" as key element. If you need to select only certain
    // items, you may introduce filter functions in the loop... see the template within comments.
    //
    for (i = 0; i < DB2.spirits.length; i++) {
        collector.push([DB2.spirits[i].namn, DB2.spirits[i].varugrupp]);
    };
    //
    return collector;
}
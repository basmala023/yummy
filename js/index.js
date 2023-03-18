const mealsData= document.getElementById("mealsData");
const searchContainer=document.getElementById("searchContainer");
const loading= document.querySelector(".loading");
console.log(loading)


//========================================================== show/hide navbar-menu ====================================================================//

let navWidth=$(".navbar-collapse").outerWidth();
$(".side-nav-menu").css("left",-navWidth)
$("#openBtn").click(()=>{
   
    console.log(navWidth);
    if($(".side-nav-menu").css("left")=="0px"){
        $(".side-nav-menu").animate({left:-navWidth},500);
        $("#openBtn").addClass("bi bi-list");
        $("#openBtn").removeClass("bi bi-x");
       
        
       
    }
    else{
        $(".side-nav-menu").animate({left:"0px"},500);
        $("#openBtn").removeClass("bi bi-list");
        $("#openBtn").addClass("bi bi-x");
        for(let i=0;i<5;i++){
            $(".links li").eq(i).animate({top:0},(i+5)*1000)
        }
        
      
    }
    
});


//================================================ functions to display data ==============================================================================//

function displayMeals(data){
    let html="";
    for(let i=0;i<data.length;i++){
        html+=`
        <div class="col-md-3">
                    <div onclick="getMealRecipe('${data[i].idMeal}')" class="mael-item">
                            <img src="${data[i].strMealThumb}" class="w-100 " alt="">
                            <div class="layer">
                                <h3>${data[i].strMeal}</h3>
                            </div>
                       
                    </div>
                  </div>
        `
    }
    mealsData.innerHTML=html;
    
}

//======================================================= funstions to get meals by area from api ===========================================================//

async function getArea(){
    loading.classList.remove("d-none");
    
    const api = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const response = await api.json();
    console.log(response);
    diaplayArea(response.meals);
    loading.classList.add("d-none");
    $(".side-nav-menu").animate({left:-navWidth},700);
    $("#openBtn").addClass("bi bi-list");
    $("#openBtn").removeClass("bi bi-x");
    

}
async function getAreaMeals(area){
    // mealsData.innerHTML='';
    loading.classList.remove("d-none");
    const api= await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const response = await api.json();
    console.log(response);
    displayMeals(response.meals)
    loading.classList.add("d-none")
}
// function to display meals by area
function diaplayArea(data){
    let html='';
    for(let i=0;i<data.length;i++){
        html+=`
        <div class="col-md-3">
        <div onclick="getAreaMeals('${data[i].strArea}')" class="mael-item">
                <i class="bi bi-house-fill area"></i>
                
                 <h3 class="area-text">${data[i].strArea}</h3>
                    
                
           
        </div>
      </div>
        `
    }
    mealsData.innerHTML=html;
}
//======================================================= end of funstions to get meals by area ===========================================================//

//====================================================== funstions to get meals by ingrediants from api ==================================================//
async function getIngrediants(){
    loading.classList.remove("d-none")

    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await api.json();
    console.log(response);
    displayIngrediants(response.meals.slice(0,20))
    loading.classList.add("d-none");
    $(".side-nav-menu").animate({left:-navWidth},700);
    $("#openBtn").addClass("bi bi-list");
    $("#openBtn").removeClass("bi bi-x");

}
async function getIngrediantsMeals(ingrediant){
    loading.classList.remove("d-none")
    const api= await fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`);
    const response = await api.json();
    console.log(response);
    displayMeals(response.meals)
    loading.classList.add("d-none")
}
// function to display meals by ingrediants

function displayIngrediants(data){
    let html='';
    for(let i=0;i<data.length;i++){
        html+=`
        <div class="col-md-3">
            <div onclick="getIngrediantsMeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x text-light"></i>
                    <div class="text">
                            <h2>${data[i].strIngredient}</h2>
                            <p>${data[i].strDescription.split(" ").slice(0,20).join("")}</P>
                       
             
            </div>               </div>
        </div>
        `
    }
    mealsData.innerHTML=html;

}
//====================================================== end of funstions to get meals by ingrediants  ==================================================//

//========================================================= funstions to get meals by category from api ==========================================================//
async function getCategory(){
    loading.classList.remove("d-none");
    const api = await fetch (`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const response = await api.json();
    console.log(response);
    displayCategory(response.categories);
    loading.classList.add("d-none");
    $(".side-nav-menu").animate({left:-navWidth},700);
        $("#openBtn").addClass("bi bi-list");
    $("#openBtn").removeClass("bi bi-x");
    
};


async function getCategoryMeals(category){
    loading.classList.remove("d-none")
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const response= await api.json();
    console.log(response);
    displayMeals(response.meals.slice(0,20))
    loading.classList.add("d-none")
}

// function to display meals by category
function displayCategory(data){
    let html="";
    for(let i=0;i<data.length;i++ ){
        html+=`
        <div class="col-md-3">
        <div onclick="getCategoryMeals('${data[i].strCategory}')" class="mael-item">
                <img src="${data[i].strCategoryThumb}" class="w-100 " alt="">
                <div class="layer">
                    <h3 class=" top-0 ">${data[i].strCategory}</h3>
                    <p class="position-absolute top-50">${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
           
        </div>
      </div>
        `

    }
    mealsData.innerHTML=html;
};
//========================================================= end of funstions to get meals by category  ==========================================================//

//================================================================ functions search ======================================================//
 function searchMeal(){
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
 
   mealsData.innerHTML="";

   $(".side-nav-menu").animate({left:-navWidth},700);
   $("#openBtn").addClass("bi bi-list");
   $("#openBtn").removeClass("bi bi-x");
   
 }
 
 async function searchByName(temp){
    loading.classList.remove("d-none");
    mealsData.innerHTML=``;
    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${temp}`);
    const response = await api.json();
    console.log(response);
    
    response.meals ? displayMeals(response.meals) : displayMeals([])
    loading.classList.add("d-none")
    // searchMeal()
 }
 async function searchByLetter(temp){
    loading.classList.remove("d-none");
    mealsData.innerHTML=``;
    const api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${temp}`);
    const response = await api.json();
    console.log(response);
    response.meals ? displayMeals(response.meals) : displayMeals([])   ;
    loading.classList.add("d-none")
 }

async function getMealRecipe(id){
   
    console.log(id);
   
       const api=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
       const response =await api.json();
       console.log(response);
    //    displayMeals(response.meals[0])
       mealRecipeModal(response.meals[0])
       
}

function mealRecipeModal(data){
    console.log(data);
    let recipes = ``

    for (let i = 1; i <= 20; i++) {
        if (data[`strIngredient${i}`]) {
            recipes += `<li class="alert alert-info m-2 p-1">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
        }
    }

    let tags = data.strTags?.split(",")
   
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let html=""
    
        html=`
        <div class="row text-light">
        <div class="col-md-4">
                <img class="w-100 rounded-3" src="${data.strMealThumb}"
                    alt="">
                    <h2>${data.strMeal}</h2>
        </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${data.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${recipes}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
            </div>`;

              mealsData.innerHTML=html;
    
   
    data = data[0];
   


}
// ========================================================== VALIDATION && function contact ====================================================//
function contact() {
    mealsData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
$(".side-nav-menu").css("left",-navWidth);
$("#openBtn").addClass("bi bi-list");
$("#openBtn").removeClass("bi bi-x");
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
// ========================================================== END OF VALIDATION -====================================================//
// ========================================================== function ready ========================================================//
$(document).ready(() => {
    searchByName("").then(() => {
        loading.classList.remove("d-none");
        $("body").css("overflow", "visible");
        loading.classList.add("d-none")
    })
})
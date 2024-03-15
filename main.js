let searchButton=document.getElementById("searchbutton");

let mealListe=[];
let mainCardDiv=document.getElementById("maincarddiv");

let goToRezeptButton;
let landLabel;

let dessertButton=document.getElementById("dessertbutton");

let kategorie=document.getElementById("kategorie");

let canvasList=document.getElementById("canvaslist");

let mangelListe=[];



function allRezept(){
    let searchInput=document.getElementById("searchinput").value;

console.log(searchInput);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((res)=>{
        let resJson = res.json();
        console.log(`allrezept`,resJson);
        return resJson;      
    })
    .then((promise)=>{
       let PromiseData=promise.meals;
       mealListe=[];

       if(PromiseData!=null){
        for(let x=0 ; x<PromiseData.length; x++){
            mealListe.push(PromiseData[x]);
        }
       }else{
        alert("upps! Keine Rezepte gefunden.")
       }
       
    })
    .then((card)=>{
        cardCreate();
    })
    .catch((error)=>{
        console.log(`Error Mesage`,error);
    })
}
searchButton.addEventListener("click",allRezept);
allRezept();

function cardCreate(){
    //console.log(`Meal Liste:`,mealListe);
    mainCardDiv.innerHTML="";
    for(let i=0 ; i<mealListe.length; i++){
        let card=document.createElement("div");
        let header=document.createElement("p");
        card.classList.add("card");
        header.innerText=mealListe[i].strMeal;
        card.appendChild(header);
        let imgCard=document.createElement("img");
        imgCard.classList.add("cardimg");
        imgCard.src=mealListe[i].strMealThumb;
        card.appendChild(imgCard);
        mainCardDiv.appendChild(card);
        goToRezeptButton=document.createElement("button");
        goToRezeptButton.innerText=`Go to Recipe`;
        goToRezeptButton.classList.add("gotorezept");
        card.appendChild(goToRezeptButton);
        goToRezeptButton.setAttribute("onclick",`showmeal(${mealListe[i].idMeal})`);
        goToRezeptButton.addEventListener("click",showmeal);
        landLabel=document.createElement("label");
        landLabel.classList.add("label");
        card.appendChild(landLabel);
        
       // console.log(`meal liste`,mealListe[i].strMealThumb);
    }
}

function showmeal(idMeal){
    //alert(idMeal);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res)=>{
        let resJson = res.json();
        console.log(resJson);
        return resJson;      
    })
        .then((promise)=>{
            let promiseData=promise.meals;
            mealListe=[];
             for(let x=0 ; x<promiseData.length; x++){
                 mealListe.push(promiseData[x]);
                 //console.log(`mealliste id:`,mealListe[x].idMeal,mealListe[x].strMeal);
                 //console.log(`mealliste instr.:`, mealListe[x].strInstructions)
                 //console.log(`id mealparam`,idMeal);
                 //alert(mealListe[x].strInstructions)
                 cardCreate();
                 let neuediv=document.createElement("div");
                 let neueP=document.createElement("p");
                 neueP.classList.add("neuep");
                 let strIngredient = "";
                for(let i = 1; i <= 20; i++) {
                if(mealListe[x][`strIngredient${i}`]){
                strIngredient += `<div class="mainingdiv"><div class="kleiningdiv1"><p>${mealListe[x][`strIngredient${i}`]}:${mealListe[x][`strMeasure${i}`]}</div><div class="kleiningdiv2"><input onclick="checkList(event)" id="checkbox${i}" type="checkbox" class="checkbox"><button id="buttonId${i}" onclick="addList(event)" class="addbutton">Add</button></p></div></div>`;
            }
                }
                 let instructions = `<p><b>Vorbereitung von:</b></p><p>${mealListe[x].strInstructions}</p>`
                 neuediv.innerHTML=`<p><b>Zutaten:</b></p>${strIngredient}<hr>${instructions} </p>`
                 neuediv.classList.add("rezeptdiv");
                 let xbutton=document.createElement("button");
                 xbutton.classList.add("xbutton");
                 neuediv.appendChild(xbutton);
                 mainCardDiv.appendChild(neuediv);
                 neuediv.appendChild(neueP);
                 xbutton.addEventListener("click",allRezept);
             }
    })
       
};

function checkList(e){
    let checkBox= e.target.parentElement.previousSibling; 
    checkBox.parentElement.classList.toggle("checkin"); 
    //console.log("checkin",checkBox);
};


let mangelText;
function addList(e){
    let addBox=e.target;
    if(addBox.disabled)return;//isaretlendikten sonra tekrar calismiyor
    mangelElement=addBox.parentElement.previousSibling.firstChild;
    mangelText=mangelElement.textContent;
    console.log("find element",addBox.parentElement.previousSibling.firstChild); 
    console.log(`mangel element`,mangelText);
    mangelListe.push(mangelText);
    console.log(`mangelliste`,mangelListe);
    addBox.classList.add("addbox");
    canvasList.innerHTML = "";
    for(let x=0; x<mangelListe.length;x++){
        canvasList.innerHTML+=`<div class="offcanvasdiv"><p>${mangelListe[x]}</p><p><button onclick="removeMangel(event)" class="addbutton">Remove</button></p></div>`
    }    
    addBox.disabled=true; //isaretlendikten sonra tekrar calismiyor
};



function removeMangel(e){
    let removeBox=e.target.parentElement;
    let removeParent=removeBox.parentElement;
    removeParent.remove();
    console.log(removeParent);
};


function allRemove(){
    canvasList.innerHTML="";
};

function rundomMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res)=>{
        let resJson = res.json();
        console.log(resJson);
        return resJson;      
    })
    .then((promise)=>{
       let PromiseData=promise.meals;
       mealListe=[];
       for(let x=0; x<PromiseData.length; x++){
        mealListe.push(PromiseData[x]);
       }
       cardCreate();
       let rundomXButton=document.createElement("button");
       rundomXButton.classList.add("rundomxbutton");
       mainCardDiv.appendChild(rundomXButton);
       rundomXButton.addEventListener("click",allRezept)
    })
};



function kategorieFunc(){
    if(kategorie.value==="All"){
        allRezept()
    }else{
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${kategorie.value}`)
        .then((res)=>{
            let resJson = res.json();
            console.log(resJson);
            return resJson;    
    })
        .then((promise)=>{
        let PromiseData=promise.meals;
        mealListe=[];
        for(let x=0; x<PromiseData.length; x++){
         mealListe.push(PromiseData[x]);
        }
        cardCreate();
     })
    }  
};

function kategorieDessert(schnelParam){
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${schnelParam}`)
        .then((res)=>{
            let resJson = res.json();
            console.log(resJson);
            return resJson;    
    })
        .then((promise)=>{
        let PromiseData=promise.meals;
        mealListe=[];
        for(let x=0; x<PromiseData.length; x++){
         mealListe.push(PromiseData[x]);
        }
        cardCreate();
     }) 
};
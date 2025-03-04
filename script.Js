

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdownSt = document.querySelectorAll(".dropdown select");
const Btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const ToCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


window.addEventListener("load", () => {
    updateExchangeRate();
});


for( let select of dropdownSt){
    for( currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "form" && currCode === "USD" ){
            newOption.selected = "selected";
        }else if( select.name === "To" && currCode === "NPR" ){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newScr;

}


Btn.addEventListener("click", (evt) => {

     evt.preventDefault();
     updateExchangeRate();
    
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".Amcount input");

    let amtVal = amount.value;
    if( amtVal === "" || amtVal < 1){
       amtVal = 1;
       amount.value = "1";
    }
   
       const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
       let response = await fetch(URL);

       let data = await response.json();
       let Rate = data[fromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()];


       let finalAmount = amtVal * Rate;

       msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${ToCurr.value}`;
   
};
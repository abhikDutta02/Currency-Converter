console.log('hello');
// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/currencies";
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns=document.querySelectorAll('.dropdown select');
const fromCurr=document.querySelector('#from');
const toCurr=document.querySelector('#to');
const btn=document.querySelector('.btn');
let inputVal=document.querySelector('.amount input');
let msg=document.querySelector('.msg');

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name == 'from' && currCode == 'USD') {
            newOption.selected='selected';
        }
        if (select.name == 'to' && currCode == 'INR') {
            newOption.selected='selected';
        }
        select.append(newOption);

        select.addEventListener('change',(evt)=>{
            updateFlag(evt.target);
        })
    }
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');

    img.src=newSrc;
}

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let amt=inputVal.value;
    if (amt=="" ||  amt<1) {
        // amt=1;
        inputVal.value='1';
    }
    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    
    let response = await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalVal=rate*amt;
    msg.innerText=`${amt} ${fromCurr.value}=${finalVal} ${toCurr.value}`;

    console.log(data);
    console.log(rate);
    console.log(finalVal);

})


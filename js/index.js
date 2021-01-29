//const linxapi = "http://localhost:5655/";
const linxapi = "https://showcase.api.linx.twenty57.net/Form2Channel/";
let tab = document.getElementsByClassName("tab");
for (i=0;i<tab.length;i++) {
    let obj = tab[i];
    obj.addEventListener("click", function(){
        showTab(obj);
    });
}
async function postData(url = '', data = {}) {
    const params = new URLSearchParams(location.search);
    const token = params.getAll('token').toString();
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    if (response.status !== 200) {
        throw new Error(response.status)
    } else {
        return response.json();
    }
}
function showMessageBar(message,autoclose = false) {
    const oldMsgBar = document.getElementById("msgBar");
    const msgBar = document.createElement("div");
    msgBar.setAttribute("id","msgBar");
    const msg = document.createElement("span");
    const msgButton = document.createElement("button");
    msgButton.innerHTML = "OK";
    msgButton.addEventListener("click", function(){
        msgBar.classList.remove("visible");
    });
    msg.innerHTML = message;
    msgBar.appendChild(msg);
    msgBar.appendChild(msgButton);
    document.getElementsByTagName("body")[0].appendChild(msgBar);
    setTimeout(function(){
        msgBar.classList.add("visible");
    }, 500);
    if (autoclose) {
        setTimeout(function(){
            msgBar.classList.remove("visible");
        }, 3000);
    }
    if (typeof(oldMsgBar) != 'undefined' && oldMsgBar != null) {
        setTimeout(function(){
            oldMsgBar.remove();
        }, 750);
    }
}
function showLoader(obj){
    obj.classList.add("loading");
    const overlay = document.createElement("DIV")
    overlay.classList.add("overlay");
    var spinner = document.createElement("img");
    spinner.setAttribute("src","images/spinner.svg");
    spinner.classList.add("spinner");
    overlay.appendChild(spinner);
    obj.appendChild(overlay);
}
function removeLoader(obj){
    obj.classList.remove("loading");
    if (obj.querySelector(".overlay")) {
        obj.querySelector(".overlay").remove();
    }
}
function showPopup(obj){
    obj.classList.add("show");
    const overlay = document.createElement("DIV")
    overlay.classList.add("overlayfull");
    obj.prepend(overlay);
    overlay.addEventListener("click", function(){
        hidePopup(obj);
    });    
}
function hidePopup(obj){
    resetValidations();
    obj.classList.remove("show");
    const overlay = obj.querySelector(".overlayfull");
    if (overlay){
        overlay.remove();
    }
}
function showTab(obj){
    const tabs = document.getElementsByClassName("tab");
    for (i=0;i<tabs.length;i++) {
        tabs[i].classList.remove("active");
    }
    const tabContent = document.getElementsByClassName("tabContent");
    for (i=0;i<tabContent.length;i++) {
        tabContent[i].classList.remove("active");
    }
    obj.classList.add("active");
    const el = obj.getAttribute('tab');
    document.querySelector('[tabcontent="' + el + '"]').classList.add("active");
}
function resetValidations(){
    const errorMsgs = document.getElementsByClassName("errorMsg");
    for(i=0;i<errorMsgs.length;i++) {
        errorMsgs[i].innerHTML = "";
    }
    const errorFields = document.getElementsByClassName("fieldError");
    for (i=0;i<errorFields.length;i++) {
        errorFields[i].classList.remove("fieldError");
    }
}

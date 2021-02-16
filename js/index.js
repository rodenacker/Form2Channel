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

//const linx = "http://localhost:5655/?PageUrl="+window.location.href;
const linx = "https://showcase.api.linx.twenty57.net/Form2Channel?PageUrl="+window.location.href;
document.addEventListener("DOMContentLoaded", function(){
    const forms = document.getElementsByClassName("form2channel");
    let style = document.createElement('style');
    style.innerHTML =
        '.ftc_overlay {' +
            'width:100vw;' +
            'height:100vh;' +
            'position:absolute;' +
            'top:0;' +
            'left:0;' +
            'background-color:rgba(0,0,0,.5);' +
            'display: flex;' +
            'align-items: center;' +
            'justify-content: center;' +
        '}' + 
        '.ftc_spinner {' +
            'animation: rotate 2s linear infinite;' +
            'z-index: 2;' +
            'max-width: 50px;' +
            'max-height: 50px;' +
            'height:100%;' +
            'width:100%;' +
        '}' +
        '@keyframes rotate {' +
            '100% {' +
                'transform: rotate(360deg);' +
            '}' +
        '}';
    var ref = document.querySelector('script');
    ref.parentNode.insertBefore(style,ref);
    for (i=0;i<forms.length;i++) {
        let form = forms[i];
        form.addEventListener("submit", function(e){
            e.preventDefault();
            appendLoader();
            form2channel(form)
            .then(data => {
                console.log(data.Message);
                deleteLoader();
            })
            .catch((error) => {
                console.log(error)
                deleteLoader();
            });
        },false);
    }
});
async function form2channel(obj = ''){
    if (obj === '') {
        obj = document.getElementsByClassName("form2channel")[0];
    }
    const data = collector(obj);
    console.log("Submitting form");
    const response = await fetch(linx, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.status !== 200) {
        throw new Error(response.status);
    } else {
        return response.json();
    }
}
function collector(obj){
    const formFields = obj.querySelectorAll("input,textarea,select");
    let arrFormData = new Array();
    formFields.forEach(function(obj){
        let val = obj.value;
        if (((obj.type==="checkbox")||(obj.type==="radio"))&&(val==="on")){
            val = obj.checked;
        }
        arrFormData.push({key: obj.name, value: val});
    });
    return arrFormData;
}
function appendLoader(){
    const overlay = document.createElement("DIV")
    overlay.classList.add("ftc_overlay");
    var spinner = document.createElement("img");
    spinner.setAttribute("src","https://form2channel.com/images/spinner.svg");
    spinner.classList.add("ftc_spinner");
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
}
function deleteLoader(){
    if (document.body.querySelector(".ftc_overlay")){
        document.body.querySelector(".ftc_overlay").remove();
    }
}

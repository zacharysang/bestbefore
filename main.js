if(true){
    var warning = document.createElement("div");
    var warningText = document.createTextNode("This page might be old");
    warning.appendChild(warningText);
    warning.setAttribute("id","best_before_warning");
    warning.setAttribute("z-index","200");
    document.body.insertBefore(warning, document.body.firstChild);
}

function oldAge(){
    return 12;
}

function pageAge(){
    var age = 0;
    var dateRegEx = /[0-9]{,4}[\/\.\-][0-9]{,4}[\/\.\-][0-9]{,4}/;
    if(document.baseURI.match(/[0-9]/))
    return 2;
}
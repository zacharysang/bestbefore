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
    var today = new Date();
    var lastAuthored = new Date();
    var yyyymm = /([0-9]{,4})[\/\.\-]([0-9]{,2})/;
    var mmyyyy = /([0-9]{,2})[\/\.\-]([0-9]{,4})/;
        
    var yyyymmRes = yyyymmdd.exec(document.baseURI);
    var mmyyyyRes = mmyyyy.exec(document.baseURI);
    if(yyyymmRes.length > 1){
       lastAuthored.setYear(yyyymmRes[1]);
       lastAuthored.setMonth(yyyymmRes[2]);
    }else if(mmyyyyRes.length > 1){
       lastAuthored.setMonth(yyyymmRes[1]);
       lastAuthored.setYear(yyyymmRes[2]);
    }
    
    return 12*(today.getYear()-lastAuthored.getYear()) + (today.getMonth() - lastAuthored.getMonth());
}

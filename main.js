chrome.storage.sync.get('oldAge',function(result){
    console.log(`result from config: ${JSON.stringify(result)}`)
    if(result.oldAge){
        var configAge = result.oldAge || 12;
        console.log(`configAge: ${configAge}`);
        var oldAge = moment.duration(parseInt(configAge),'months');
        console.log(`oldAge: ${oldAge.asMonths()}, pageAge: ${pageAge().asMonths()}`);
        if(pageAge() > oldAge){
            displayWarning();
        }
    }
});

function displayWarning(){
    var warning = document.createElement("div");
    var warningText = document.createTextNode("This page might be old");
    warning.appendChild(warningText);
    warning.setAttribute('id','best_before_warning');
    warning.setAttribute('z-index','200');
    document.body.insertBefore(warning, document.body.firstChild);
}


function pageAge(){
    var today = moment();
    var lastAuthored = moment();
    var yyyymm = /(([12]{1}[8901]{1})?[0-9]{2})[\.\-\/]{0,1}([01]{1}[0-9]{1})/;
    var mmyyyy = /([01]{1}[0-9]{1})[\.\-\/]{0,1}(([12]{1}[8901]{1})?[0-9]{2})/;

    //check for 'time' tag
    var timeEl = document.getElementsByTagName('time');
    if(timeEl.length > 0){
        lastAuthored = moment(timeEl[0].innerHTML);
        console.log('time tag found');
    }else{
        console.log('No time tag found');
    }

    //check meta tags for property containing 'date'
    /*var metaEl = document.querySelectorAll("");*/

    //check other elements on page for hints
    /*
    check following attributes:
        * last-updated
        * 
     */
    
    //check URL for hints of last publish date
    var yyyymmRes = yyyymm.exec(document.baseURI);
    var mmyyyyRes = mmyyyy.exec(document.baseURI);
    if(yyyymmRes && yyyymmRes.length > 1){
       lastAuthored.setYear(yyyymmRes[1]);
       lastAuthored.setMonth(yyyymmRes[2]);
    }else if(mmyyyyRes && mmyyyyRes.length > 1){
       lastAuthored.setMonth(yyyymmRes[1]);
       lastAuthored.setYear(yyyymmRes[2]);
    }
    
    var age = moment.duration(today.diff(lastAuthored));
    //console.log("Page age: " + age.asMonths());
    return age;
}

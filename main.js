chrome.storage.sync.get('oldAge',function(result){
        var configAge = result.oldAge || 12;
        var oldAge = moment.duration(parseInt(configAge),'months');
        if(pageAge() > oldAge){
            displayWarning();
        }
});


function displayWarning(){
    var warning = document.createElement("div");
    warning.setAttribute('id','best_before_warning');
    warning.setAttribute('z-index','200');
    var warningText = document.createTextNode("This page might be old");
    warning.appendChild(warningText);

    warning.addEventListener('click',function(ev){
        
        ev.target.addEventListener('transitionend', function(){
            ev.target.style.display = 'none';
        });
        ev.target.setAttribute('class','best_before_hidden');
    })
    
    //check if shadow dom available, and if so, put it there

    document.body.insertBefore(warning, document.body.firstChild);
}


function pageAge(){
    var today = moment();
    var lastAuthored = today;
    var yyyymm = /(([12]{1}[8901]{1})?[0-9]{2})[\.\-\/]{0,1}([01]{1}[0-9]{1})/;
    var mmyyyy = /([01]{1}[0-9]{1})[\.\-\/]{0,1}(([12]{1}[8901]{1})?[0-9]{2})/;

    //check for 'time' tag
    var timeEl = document.getElementsByTagName('time');
    if(timeEl.length > 0){
        lastAuthored = moment(timeEl[0].innerHTML);
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
    /*var yyyymmRes = yyyymm.exec(document.baseURI);
    var mmyyyyRes = mmyyyy.exec(document.baseURI);
    if(yyyymmRes && yyyymmRes.length > 1){
       lastAuthored.setYear(yyyymmRes[1]);
       lastAuthored.setMonth(yyyymmRes[2]);
    }else if(mmyyyyRes && mmyyyyRes.length > 1){
       lastAuthored.setMonth(yyyymmRes[1]);
       lastAuthored.setYear(yyyymmRes[2]);
    }
    */
    var age = moment.duration(today.diff(lastAuthored));
    
    console.assert(lastAuthored != today, "Authored date could not be found");

    return age;
}

// Declare styling for shadow dom compatibility
const style = document.createElement('style');
    style.innerText = `
        #best_before_warning {
        position: sticky;
        width:100%;
        top:0;
        padding: 2.5rem;
        color: white;
        background-color: #D46a6a;
        text-align: center;
        font-size: 2rem;
        z-index: 90000;
        cursor: default;
    }

    #best_before_warning:hover {
        opacity: 0.8;
        transition: 0.3s;
        }

    #best_before_warning:not(hover) {
        opacity: 1;
        transition: 0.25s;
    }

    .best_before_hidden {
        transform: translate(-100%);
        transition: 0.4s;
    }
    `

// Get configuration
chrome.storage.sync.get('oldAge', function (result) {
    var configAge = result.oldAge || 12;
    var oldAge = moment.duration(parseInt(configAge), 'months');
    if (pageAge() > oldAge) {
        displayWarning();
    }
});


function displayWarning() {
    var warning = document.createElement("div");
    warning.setAttribute('id', 'best_before_warning');

    var warningText = document.createTextNode("This page might be old");
    warning.appendChild(warningText);

    warning.addEventListener('click', function (ev) {
        ev.target.addEventListener('transitionend', function () {
            ev.target.style.display = 'none';
        });
        ev.target.setAttribute('class', 'best_before_hidden');
    })

    //check if shadow dom available, and if so, append it there
    if (document.body.createShadowRoot || document.body.attachShadow) {

        var shadContainer = document.createElement('div');
        document.body.insertBefore(shadContainer,document.body.firstChild);

        var shadRoot = shadContainer.attachShadow({
            mode: 'open'
        });
        shadRoot.appendChild(style);
        shadRoot.appendChild(warning);

    } else {

        document.head.appendChild(style);
        document.body.insertBefore(warning, document.body.firstChild);
        
    }

}


function pageAge() {
    var today = moment();
    var lastAuthored = today;
    var yyyymm = /(([12]{1}[8901]{1})?[0-9]{2})[\.\-\/]{0,1}([01]{1}[0-9]{1})/;
    var mmyyyy = /([01]{1}[0-9]{1})[\.\-\/]{0,1}(([12]{1}[8901]{1})?[0-9]{2})/;

    //check for 'time' tag
    var timeEl = document.getElementsByTagName('time');
    if (timeEl.length > 0) {
        lastAuthored = moment(timeEl[0].innerHTML);
    }

    //check meta tags for property containing 'date'
    var metaEl = document.querySelectorAll("[date*='']");

    //check other elements on page for hints
    /*
    check following attributes:
        * last-updated
        * 
     */

    /* This code needs reworking. need to handle case where we get multiple dates. 
       Also need to handle dates existing in multiple sources
       
    var dateClassEls = document.querySelectorAll('[class*="date"]');
    dateClassEls.forEach(function(el){
       lastAuthored = moment(el.innerHTML);
    });
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

    return age;
}
function saveOptions(e) {
  e.preventDefault();

  var statusEl = document.createElement("div");
  document.body.appendChild(statusEl);

  chrome.storage.sync.set({
      oldAge:document.querySelector('#oldAge').value
    },function(){
          statusEl.setAttribute("style",`
          background-color: #81D274;
          padding: 0.5rem;
          margin: 0.5rem;
          `);
          statusEl.innerText = "Saved";        
  });

}

function restoreOptions() {
    var statusEl = document.createElement('div');
 
    chrome.storage.sync.get('oldAge',function(res){
            document.querySelector('#oldAge').value = res.oldAge;
    });

}

function setErr(err,el){
    /*statusEl.setAttribute("style",`
        background-color: #D75353;
        padding: 0.5rem;
        margin: 0.5rem;
          `);
    */
    statusEl.innerText = err;
    document.body.appendChild(statusEl);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
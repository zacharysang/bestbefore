function saveOptions(e) {
  e.preventDefault();

  var statusEl = document.querySelector("#status");

  chrome.storage.sync.set({
      oldAge:document.querySelector('#oldAge').value
    },function(){
        displaySucc(statusEl);
  });
  
}

function restoreOptions() {
    var statusEl = document.querySelector('#status');
 
    chrome.storage.sync.get('oldAge',function(res){
        if(!runtime.lastErr){
          document.querySelector('#oldAge').value = res.oldAge;
          displaySucc(statusEl);
        } else {
          displayFail(statusEl);
        }
    });

}

function displaySucc(el){
   el.style.backgroundColor = '#81D274';
   el.style.display = 'true';
   el.innerText = "Saved";   
}

function displayFail(el){
  el.style.backgroundColor = '#D75353';
  el.style.display = 'true';
  el.innerText = 'saved';
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#save").addEventListener("click", saveOptions);
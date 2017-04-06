function saveOptions(e) {
  e.preventDefault();
<<<<<<< HEAD
=======
  var statusEl = document.createElement('div');

  try{
  localStorage.setItem('oldAge',document.querySelector('#oldAge').value);
  statusEl.setAttribute('style',`
  background-color: #81D274;
  padding: 0.5rem;
  margin: 0.5rem;

  `);
  statusEl.innerText = 'Saved';

}catch(storageErr){
    
    statusEl.setAttribute('style',`
    background-color: #D75353;
    padding: 0.5rem;
    margin: 0.5rem;
    `);
    statusEl.innerText = storageErr;

  }
>>>>>>> 3bae989ed0fe945961c0d141578966e5d6919ba0

  var statusEl = document.createElement("div");
  document.body.appendChild(statusEl);
<<<<<<< HEAD

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
=======
}

function restoreOptions() {
    var configAge = localStorage.getItem('oldAge') || '12';
    document.querySelector('#oldAge').value = configAge;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
>>>>>>> 3bae989ed0fe945961c0d141578966e5d6919ba0

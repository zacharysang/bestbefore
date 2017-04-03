function saveOptions(e) {
  e.preventDefault();
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

  document.body.appendChild(statusEl);
}

function restoreOptions() {
    var configAge = localStorage.getItem('oldAge') || '12';
    document.querySelector('#oldAge').value = configAge;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);

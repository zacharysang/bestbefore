var warning = document.createElement("div");
var warningText = document.createTextNode("This page might be old");
warning.appendChild(warningText);
warning.setAttribute("id","best_before_warning");
warning.setAttribute("z-index","200");
document.body.insertBefore(warning, document.body.firstChild);
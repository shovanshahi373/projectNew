let views = document.querySelectorAll(".view-modal");
let modals = document.querySelectorAll(".history-modal");
let crosss = document.querySelectorAll(".cross");

for (let i = 0; i < views.length; i++) {
  views[i].onclick = () => {
    modals[i].style.display = "flex";
  };
}

for (let i = 0; i < crosss.length; i++) {
  crosss[i].onclick = () => {
    modals[i].style.display = "none";
  };
}

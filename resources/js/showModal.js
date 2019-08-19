let view = document.querySelector('.view-modal');
let modal = document.querySelector('.history-modal');
let cross = document.querySelector('.cross');
document.addEventListener('click',(e)=>{
  // let card = document.querySelector('.card');
  if(e.target == view) {
    modal.style.display = 'flex';
  }
  if(e.target == cross) {
    modal.style.display = 'none';
  }
})
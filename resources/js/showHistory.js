function showTab(id) {
  const tab1 = document.querySelector(".tab1");
  const tab2 = document.querySelector(".tab2");
  const tab3 = document.querySelector(".tab3");
  tab1.style.display = "none";
  tab2.style.display = "none";
  tab3.style.display = "none";
  id.bind(tab1).style.display = "block";
}

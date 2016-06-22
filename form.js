var lastCategorySelected;
function showCategoryForm() {
  if(lastCategorySelected !== undefined){
  toggleCategory(lastCategorySelected, false);
  }
  var obj = {
    1: "create-topAndTee",
    2: "create-bottom",
    3: "create-shoes"
  };
  var selectTag = document.getElementById("category");
  var selectedValue = selectTag.options[selectTag.selectedIndex].value;
  
  var newCategorySelected = obj[selectedValue];
  
  toggleCategory(newCategorySelected, true);
  
  lastCategorySelected = newCategorySelected;  

}



function toggleCategory(idElement, show) {
  var categorySelected = document.getElementById(idElement);;
  if(show) {
    categorySelected.className += "visible";
  } else {
    categorySelected.className = "";
  }
}
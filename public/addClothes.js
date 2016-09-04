// Module Pattern
// https://toddmotto.com/mastering-the-module-pattern/
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
var addClothes = (function() {
  var lastCategorySelected;

  function showCategoryForm() {
    if (lastCategorySelected !== undefined){
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
    if (show) {
      categorySelected.className += "visible";
    } else {
      categorySelected.className = "";
    }
  }

  //todo: FIX
  function getFormData(formId) {
    var formEl = document.getElementById(lastCategorySelected);

    function styleChecked(){
      var checkboxes = formEl.style;
      var selected = [];
      for (var i = 0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selected.push(checkboxes[i].value);
        }
      }
      return selected;
    }

    var formData = {
      model: formEl.model.value,
      color: formEl.color.value,
      design: formEl.design.value,
      brand: formEl.brand.value,
      style: styleChecked()
//      sleeveType: formEl.sleeveType.value,
//      fit: formEl.fit.value,

    };

     //(formEl.sleeveType.value.toString){
    //typeof(formEl.sleeveType.value) === "string"


//      var possibleKeys = ["sleeveType", "fit", "heels"];
//      for(var i = 0; i<possibleKeys.length; i++) {
//        if (formEl.possibleKeys[i] !== undefined) {
//          formData.possibleKeys[i] = formEl.possibleKeys[i].value;
//        }
//      }


    if (formEl.sleeveType !== undefined) {
      formData["sleeveType"] = formEl.sleeveType.value;
    }
    if (formEl.fit !== undefined) {
      formData["fit"] = formEl.fit.value;
    }
    if (formEl.heels !== undefined) {
      formData["heels"] = formEl.heels.value;
    }


    return formData;
  }

  return {
    showCategoryForm: showCategoryForm,
    getFormData: getFormData
  };
})();
// Self invoking anonymous function
// https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/
// http://stackoverflow.com/questions/592396/what-is-the-purpose-of-a-self-executing-function-in-javascript

// Module Pattern
// https://toddmotto.com/mastering-the-module-pattern/
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

System.import("jquery").then(function($) {
  $('button').on('click', function() {
    getFormData();
  });

  $('#category').on('change', function() {
    showCategoryForm();
  });

  var lastCategorySelected;

  function showCategoryForm() {
    if (lastCategorySelected !== undefined) {
      toggleCategory(lastCategorySelected, false);
    }
    var obj = {
      1: "create-topAndTee",
      2: "create-bottom",
      3: "create-shoes"
    };
    var selectTag = $("#category");
    var selectedValue = selectTag.val();

    var newCategorySelected = obj[selectedValue];
    toggleCategory(newCategorySelected, true);
    lastCategorySelected = newCategorySelected;
  }

  function toggleCategory(idElement, show) {
    var categorySelected = $('#' + idElement);
    categorySelected.toggleClass('visible', show);
  }

  // todo: FIX

  function showValues() {
    var str = $('#' + lastCategorySelected).serialize();
    console.log(str);
  }
  $("input[type='button']").on("click", showValues);

  function getFormData(formId) {
    var formEl = $('#' + lastCategorySelected);

    var formData = {
      model: formEl.find('[name="model"]').val(),
      color: formEl.find('[name="color"]').val(),
      design: formEl.find('[name="design"]').val(),
      brand: formEl.find('[name="brand"]').val(),
      style: formEl.find('[name="style"]').val()
    };

    if (formEl[0].sleeveType !== undefined) {
      formData["sleeveType"] = formEl[0].sleeveType.value;
    }
    if (formEl[0].fit !== undefined) {
      formData["fit"] = formEl[0].fit.value;
    }
    if (formEl[0].heels !== undefined) {
      formData["heels"] = formEl[0].heels.value;
    }
    return formData;
  }
  // Self invoking anonymous function
  // https://sarfraznawaz.wordpress.com/2012/01/26/javascript-self-invoking-functions/
  // http://stackoverflow.com/questions/592396/what-is-the-purpose-of-a-self-executing-function-in-javascript

});

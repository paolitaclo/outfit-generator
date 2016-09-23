System.import("jquery").then(function($) {
  $('#findClothesBtn').click(onFindClothes);


  function onFindClothes() {
    var criteria = getFormData();
    $.post('/outfit', {criteria: criteria})
    .then(function(outfit) {
      var resultElement = document.getElementById('outfit-result');
      resultElement.className += "visible";

      showOutfitPiece(outfit.topsAndTees, "display-topsAndTees");
      showOutfitPiece(outfit.bottoms, "display-bottoms");
      showOutfitPiece(outfit.shoes, "display-shoes");
    });
  }

  function showOutfitPiece (outfitProperty, id) {
    if (outfitProperty === undefined) {
      document.getElementById(id).innerHTML =
      "We didn't find any item that matches your requirements.";
    } else {
      document.getElementById(id).innerHTML = 'The ' + outfitProperty.color +
      ' ' + outfitProperty.brand + ' ' + outfitProperty.model;
    }
  }

  function getFormData() {
    var formEl = document.getElementById('find-clothes');
    var temperature = formEl.temperature.value;
    var style = formEl.style.value;
    var formData = {
      temperature: parseFloat(temperature),
      style: style
    };

    return formData;
  }
});

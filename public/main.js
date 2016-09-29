System.import("jquery").then(function($) {
  $('#findClothesBtn').click(onFindClothes);


  function onFindClothes() {
    var criteria = getFormData();
    $.post('/outfit', {criteria: criteria})
    .then(function(outfit) {
      var resultElement = $('#outfit-result');
      resultElement.addClass('visible');

      showOutfitPiece(outfit.topsAndTees, "display-topsAndTees");
      showOutfitPiece(outfit.bottoms, "display-bottoms");
      showOutfitPiece(outfit.shoes, "display-shoes");
    });
  }

  function showOutfitPiece (outfitProperty, id) {
    if (outfitProperty === undefined) {
      $('#' + id).html("We didn't find any item that matches your requirements.");
    } else {
      $('#' + id).html('The ' + outfitProperty.color +
      ' ' + outfitProperty.brand + ' ' + outfitProperty.model);
    }
  }

  function getFormData() {
    var formEl = $('#find-clothes');
    var temperature = formEl.find('input[name="temperature"]').val();
    var style = formEl.find('input[name="style"]').val();
    var formData = {
      temperature: parseFloat(temperature),
      style: style
    };

    return formData;
  }
});

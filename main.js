function onFindClothes() {
  var criteria = getFormData();
  var outfit = {
    topsAndTees: findRandomMatch(CLOTHES.topsAndTees, criteria),
    bottoms: findRandomMatch(CLOTHES.bottoms, criteria),
    shoes: findRandomMatch(CLOTHES.shoes, criteria)
  };
  var resultElement = document.getElementById('outfit-result');
  resultElement.className += "visible";
  
//  document.getElementById('display-topsAndTees').innerHTML ='The ' + outfit.topsAndTees.color + ' ' + outfit.topsAndTees.brand + ' ' + outfit.topsAndTees.model; 
//  
//  document.getElementById('display-bottoms').innerHTML = 'The ' + outfit.bottoms.color + ' ' + outfit.bottoms.brand + ' ' + outfit.bottoms.model;
//  
//  document.getElementById('display-shoes').innerHTML = 'The ' + outfit.shoes.color + ' ' + outfit.shoes.brand + ' ' + outfit.shoes.model;
  showOutfitPiece (outfit.topsAndTees, "display-topsAndTees");
  showOutfitPiece (outfit.bottoms, "display-bottoms");
  showOutfitPiece (outfit.shoes, "display-shoes");
}

function showOutfitPiece (outfitProperty, id) {
  if ( outfitProperty === undefined) {
    document.getElementById(id).innerHTML = "We didn't find any item that matches your requirements.";
  } else {
    document.getElementById(id).innerHTML = 'The ' + outfitProperty.color + ' ' + outfitProperty.brand + ' ' + outfitProperty.model; 
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

function findAllMatches(category, criteria) {
  var matches = [];
  for (var key in category) {
    if (matchesCriteria(category[key], criteria)) {
      matches.push(category[key]);
    }
  }
  return matches;
}

function matchesCriteria (item, criteria) {
  if (criteria.temperature >= 75){
    if ( item.typeOfSleeves === "sleeveless" || item.model === "shorts" || item.model === "skirt" || item.model === "sandals" || item.model === "wedge-sandals") {
      return item.style.includes(criteria.style);
    }//ADD MODEL: DRESS-PANT
  }
  if (criteria.temperature < 75 && criteria.temperature >= 65 ){
    if (item.typeOfSleeves === "short-sleeve" || item.model === "shorts" || item.model === "skirt" || item.model === "sneakers") {
      return item.style.includes(criteria.style);
    }
  }
  if (criteria.temperature < 65){
    if (item.typeOfSleeves === "long-sleeve" || item.model === "dress-pant" || item.model === "leggings" || item.model === "jeans" || item.model === "boots") {
      return item.style.includes(criteria.style);
    }
  }
}

function findRandomMatch (category, criteria) {
  var allMatches = findAllMatches(category, criteria);
  var number = Math.floor(Math.random()*allMatches.length);
  return allMatches[number];
}
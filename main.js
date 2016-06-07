function onFindClothes() {
  var criteria = getFormData();
  var outfit = {
    topsAndTees: findRandomMatch(CLOTHES.topsAndTees, criteria),
    bottoms: findRandomMatch(CLOTHES.bottoms, criteria) 
  };
  
  console.log('found :', outfit);  
}

function getFormData() {
  var formEl = document.getElementById('find-clothes');
  var temperature = formEl.temperature.value; //CONVERT STRING TO NUMBER
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
  return item.style.includes(criteria.style);
}

function findRandomMatch (category, criteria) {
  var allMatches = findAllMatches(category, criteria);
  var number = Math.floor(Math.random()*allMatches.length);
  return allMatches[number];
}
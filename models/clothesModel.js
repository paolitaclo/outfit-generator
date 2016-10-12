var Promise = require('bluebird');

function findClothes(db, criteria) {
  var topsAndTees = getClothesCollection(db, 'topsAndTees', criteria);
  var bottoms = getClothesCollection(db, 'bottoms', criteria);
  var shoes = getClothesCollection(db, 'shoes', criteria);

  return Promise.all([topsAndTees, bottoms, shoes])
  .then(function(clothes) { // clothes is an array
    var outfit = {
      topsAndTees: findRandomMatch(clothes[0], criteria),
      bottoms: findRandomMatch(clothes[1], criteria),
      shoes: findRandomMatch(clothes[2], criteria)
    };

    return outfit;
  });
}

function getClothesCollection(db, collectionName, criteria) {
  var collection = db.collection(collectionName);
  return new Promise(function(resolve, reject) {
    collection.find({style: criteria.style}).toArray(function(err, docs) {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

function findRandomMatch (category, criteria) { // category is an Array
  var allMatches = findAllMatches(category, criteria);
  var number = Math.floor(Math.random() * allMatches.length);
  return allMatches[number];
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
    if (item.typeOfSleeves === "sleeveless" ||
    item.model === "shorts" || item.model === "skirt" ||
    item.model === "sandals" || item.model === "wedge-sandals") {
      return true;
    }// ADD MODEL: DRESS-PANT
  }
  if (criteria.temperature < 75 && criteria.temperature >= 65 ){
    if (item.typeOfSleeves === "short-sleeve" || item.model === "shorts" || item.model === "skirt" || item.model === "sneakers") {
      return true;
    }
  }
  if (criteria.temperature < 65){
    if (item.typeOfSleeves === "long-sleeve" || item.model === "dress-pant" || item.model === "leggings" || item.model === "jeans" || item.model === "boots") {
      return true;
    }
  }
  return false;
}

function saveClothes(db, clothes) {
  var collectionName = clothes.type;
  delete clothes.type;
  return new Promise(function(resolve, reject) {
    db.collection(collectionName).insertOne(clothes, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function showClothesList(db, type){
  return new Promise(function(resolve, reject){
    db.collection(type).find().toArray(function(err, docs){
      if(err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

module.exports = {
  findOutfit: findClothes,
  saveClothes: saveClothes,
  showClothesList: showClothesList
};

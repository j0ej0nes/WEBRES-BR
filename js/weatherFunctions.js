/* WEATHER FUNCTIONS TAKES DIRECTION AND
SPEED OF WIND TO CHANGE CLOUD MOVEMENTS

This program has certain assumtions about the data provided:
- wind direction is in degrees NOT compass readings
- each wind object is for a 1 hour block
- units are Km thus Kmph
- results in change in x/y axis are in km (to be converted to px later)


*/

//----------------------------------TESTING-----------------------------------//
/*
console.log("dayWind(39, 1.25)");
dayWind(39, 1.25);
console.log("dayWind(20, 1.25)");
dayWind(20, 1.25);

var windArray = [
                  {dir:60, spd:1},
                  {dir:54, spd:2},
                  {dir:30, spd:3},
                  {dir:46, spd:2}
                ];

console.log("windFromArray(windData)");
windFromArray(windArray);
*/
//----------------------------------------------------------------------------//
//-------------------------------LIVE WEATHER---------------------------------//

//This is a key required by the api and given to an account
var openWeatherKey = "f563901b4512d118e1a1f3267c7a32fe";
var weatherRequest;

//creates a request to get a JSON response of real weather data
function getWeather(){
  var requestString = "http://api.openweathermap.org/data/2.5/forecast?q=London,GB&APPID=" + openWeatherKey;

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", requestString , true);
  xhttp.onreadystatechange = function(response1){
    if (xhttp.status == 200 && xhttp.readyState == 4){
      xhttp.addEventListener("load", proccessResults);
    }
  }
  xhttp.send();
}

//convert the JSON results to javascript
//loop through each result and plot on the map
function proccessResults(e){
  console.log(e.target.responseText);
  var results = JSON.parse(e.target.responseText);
  console.log("results: " + results);

  if (results.list.length > 0) {
    for (var i = 0; i < results.list.length; i++) {
      hourFromThreeWind(results.list[i].wind.deg, convertSpeed(results.list[i].wind.speed));
    }
  }
  else{
    noData();
  }
}

//change from m/s to kmph
function convertSpeed(spd){
  return ((spd*18)/5);
}

function noData(){
  console.log("NO DATA RECIEVED");
}


//gets the x and y changes for a 3 hours resulted change from wind
//function takes the 3 hour forecast from the api
function threeHourWind(dir, spd){
  var dist = (spd);
  var x = calcTri("x", dir, dist);
  var y = calcTri("y", dir, dist);
  moveCloud(x, y);
}

function hourFromThreeWind(dir, spd){
  var dist = (spd);
  var x = (calcTri("x", dir, dist)/3);
  var y = (calcTri("y", dir, dist)/3);
  moveCloud(x, y);
  moveCloud(x, y);
  moveCloud(x, y);
}

//gets the x and y changes for a 1 hour resulted change from wind
//function assumes wind data is valid for an hour and unlikely to change.
function hourWind(dir, spd){
  var dist = spd;
  var x = calcTri("x", dir, dist);
  var y = calcTri("y", dir, dist);
  moveCloud(x, y);
}

//----------------------------------------------------------------------------//

//these are 3 presets for the wind, being low, medium and high winds
//an array with each object in the array holding the direction and speed for
//an hour of weather.

var windWeakArray = [
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1},
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1},
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1},
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1},
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1},
  {dir:60, spd:1}, {dir:54, spd:2}, {dir:30, spd:1.5}, {dir:60, spd:1}
];

  var windMeduimArray = [
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6},
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6},
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6},
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6},
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6},
  {dir:260, spd:5}, {dir:254, spd:7.5}, {dir:240, spd:4}, {dir:260, spd:6}
];

var windStrongArray = [
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
  {dir:120, spd:12.5}, {dir:134, spd:14}, {dir:140, spd:16}, {dir:122, spd:18},
];

var chosenWind = windStrongArray;
//function loops through array and takes the data for each hour
function windFromArray(windData){
  for (var i = 0; i < windData.length; i++){
    hourWind(windData[i].dir, windData[i].spd);
  }
}

//gets the x and y changes for a 1 hour resulted change from wind
//function assumes wind data is valid for an hour and unlikely to change.
function hourWind(dir, spd){
  var dist = spd;
  var x = calcTri("x", dir, dist);
  var y = calcTri("y", dir, dist);
  moveCloud(x, y);
}

//gets the x and y changes for a 1 day resulted change from wind
//function assumes wind data is valid for an hour and unlikely to change all day
function dayWind(dir, spd){
  var dist = (spd*24);
  var x = calcTri("x", dir, dist);
  var y = calcTri("y", dir, dist);
  moveCloud(x, y);
}

//This function returns the amount in units e.g. Km for
//either X or Y axis that an object has to move with the wind
//if x = 20, object must be moved 20 km right on the map
//negX and negY is if it is moving backwards on the map (left or down respectivley)
//results need to be rounded later on
function calcTri(axis, dir, dist){
  var x, y, angle;
  var negX = false;
  var negY = false;

  //must change angles of wind direction to within 90 for trigonometry
  if(0<dir<90){angle = dir;  negY = true;}
  else if(90<dir<180){angle = dir - 90;}
  else if(180<dir<270){angle = dir - 180; negX = true;}
  else if(270<dir<360){angle = dir - 270; negX = true; negY = true;}
  else{angle = dir;}

  //find the length of x
  if(angle == 0 || angle == 180 || angle == 260){
    x = 0;
  }else{
    x = Math.sin(angle*(Math.PI/180)) * dist;
  }

  //find the length of y
  if(angle == 90 || angle == 270){
    y = 0;
  }else{
    y = Math.cos(angle*(Math.PI/180)) * dist;
  }

  //return either x or y result
  //if neg is true it changes the value to the negative to change movement direction
  if (axis == "x"){
    if(negX == true){ x = -x;}
    return x;
  }else if (axis == "y"){
    if(negY == true){y = -y;}
    return y;
  }else {
    return "error, no axis!"
  }
}

//use Joe's function to draw a new cloud.
function moveCloud(xcoord, ycoord){
  var newX = x + radiusToPixels(Math.round(xcoord));
  var newY = y + radiusToPixels(Math.round(ycoord));
  console.log(radiusToPixels(Math.round(xcoord)));
  console.log(radiusToPixels(Math.round(ycoord)));
  drawCricle(newX, newY, workingRadius, "rgba(255, 214, 102, 0.1)");
  x = newX;
  y = newY;
}

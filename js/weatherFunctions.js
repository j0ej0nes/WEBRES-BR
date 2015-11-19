/* WEATHER FUNCTIONS TAKES DIRECTION AND
SPEED OF WIND TO CHANGE CLOUD MOVEMENTS

This program has certain assumtions about the data provided:
- wind direction is in degrees NOT compass readings
- each wind object is for a 1 hour block
- units are Km thus Kmph
- results in change in x/y axis are in km (to be converted to px later)


*/

//----------------------------------TESTING-----------------------------------//
console.log("dayWind(39, 1.25)");
dayWind(39, 1.25);
console.log("dayWind(20, 1.25)");
dayWind(20, 1.25);


var windWeakArray = [];

var windMeduimArray = [];

var windStrongArray = [];
//an array with each object in the array holding the direction and speed for
//an hour of weather.
var windArray = [
                  {dir:60, spd:1},
                  {dir:54, spd:2},
                  {dir:30, spd:3},
                  {dir:46, spd:2}
                ];

console.log("windFromArray(windData)");
windFromArray(windArray);
//----------------------------------------------------------------------------//

//function loops through array and takes the data for each our
function windFromArray(windData){

  for (var i = 0; i < windData.length; i++){
    console.log("hourWind(windData[i].dir, windData[i].spd): ")
    hourWind(windData[i].dir, windData[i].spd);
  }
}

//gets the x and y changes for a 1 day resulted change from wind
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
  if(0<dir<90){angle = dir;}
  else if(90<dir<180){angle = dir - 90; negY = true;}
  else if(180<dir<270){angle = dir - 180; negX = true; negY = true;}
  else if(270<dir<360){angle = dir - 270; negX = true;}
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
    if(negX = true){x = -x;}
    return x;
  }else if (axis == "y"){
    if(negX = true){y = -y;}
    return y;
  }else {
    return "error, no axis!"
  }
}

//use Joe's function to draw a new cloud.
function moveCloud(x, y){
  console.log("x amount: " + x);//Math.round(x));
  console.log("y amount: " + y);//Math.round(y));
}

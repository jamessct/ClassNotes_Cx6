var guitars = ["fender", "gibson", "gretsch"];
console.log("guitars:", guitars)

var drums = new Array();

drums.push("gretsch");
drums.push("yamaha");

console.log("drums", drums);

console.log(guitars[0]);
console.log(drums[1]);

guitars[30] = "ibanez";

console.log( guitars[30] );
console.log( guitars[20] );
// console.log("guitars:", guitars)

console.log( guitars.length );


for (var i = 0; i < guitars.length; i++ ) {
  guitars[i]
}
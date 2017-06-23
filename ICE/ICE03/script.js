//1.create an array of colors and assign it to a variable colors
var colors = ['#FF0000', '#E2571E', '#FF7E00', '#FFFF00', '#00FF00', '#96bf33', '#0000FF', '#4B0082', '#8B00FF'];

// 2.set the preview color to the one entered in the input and display its color code using setPreviewColor function
// Display preview color and RGB value
function setPreviewColor(color) {
    $(".preview").css("backgroundColor", color); // Setter function
    $(".color-code").text($(".preview").css("backgroundColor")); // Getter : What color you have { attribute for the text }
}

//adds color boxes to the favorite colors
function addBox(color) {
    $('#colors').prepend("<div class='item' style='background-color: " + color + ";'><div>");
}

//3.As the page loads add each color in the colors array to the div '#colors'
$(document).ready(function(){
    colors.forEach(function(color) {
        addBox(color);
    });

    //4.set the preview color to one of the colors in the colors array randomly
    var randomColorSelect = colors[Math.floor(Math.random() * colors.length)];
    $(".preview").css("backgroundColor", randomColorSelect);
});


//5.Write an event handler for the key up event i.e. when the user types the color in the input and releases the key on the keyboard
//The event should set the preview color to the color typed in the input
$(document).on("keyup", "#color", function () {
    setPreviewColor($(this).val());
});


//6.Write an event handler to handle the click the event on the add to favorite button so that the color gets added to the list of favorite colors,
// the content of the input gets cleared and the focus gets back on the input
$(document).on("click", "#add-to-favorite", function () {
    addBox($("#color").val());
});



//7.Write events handlers such that whenever any item in the favorite colors is clicked or hovered, the color gets displayed in the preview div
$(document).on("mouseover", ".item", function () { // Event, target(item), function
    //console.log($(this).css("color")); //debugging
    setPreviewColor($(this).css("background-color")); // Getter
});




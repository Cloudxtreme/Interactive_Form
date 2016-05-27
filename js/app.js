//FUNCTION:
//1. Add class to all options of each group
function grouping(option, valueList, type ,className){
  $(option)
    .filter(function() {
      return $.inArray($( this ).attr(type), valueList) !== -1
    })
    .addClass(className);
}
//2. Disable other activities the same time with selected activity
function filterInput(list){
  $(".activities "+list).on("change",function(){
    if ($(this).is(':checked')){
      $(list).not(this).attr("disabled", true)
      } else {
      $(list).not(this).attr("disabled", false)
    }
  })
}
//3. Retrieve all prices from the Activities list
function price(){
  $(".activities ").val();
}
//4. Get cost from label
function getCost(text){
  for (var i=0;i< text.length; i++){
    if (text[i].startsWith('$')){
      return parseInt(text[i].replace("$", ""));
    }
  }
}

//ACTION
// Set focus on the first text field when the page load
$("input[type='text']")[0].focus();//focus first

// Job Role: if "Other" option is selected, reveal a text field with id "other-title" and placeholder "Your Title"
var titleField= "<input type=\"text\" id=\"other-title\" placeholder=\"Your Title\">";
$('#title').parent().append(titleField);
$('#other-title').hide();
$('#title').on("change",function(){
  if ($("#title").val()=='other'){
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
})
// T-Shirt Info: Display condition
//Organize colors to specific theme list. Better for future edit
var theme1Color =["cornflowerblue","darkslategrey", "gold"]
var theme2Color =["tomato", "steelblue", "dimgrey"]

grouping("#color option",theme1Color,"value","theme1")
grouping("#color option",theme2Color,"value","theme2")

$("#design").on("change",function(){
  $("#color option").show();
  if ($(this).val()=="js puns"){
    $("#color option").not(".theme1").hide();
  } else {
    $("#color option").not(".theme2").hide();
  }
})
// Register for Activities
//Grouping activities which are the same time together
var tue9to12 =["js-frameworks", "express"]
var tue1to4 =["js-libs", "node"]
grouping(".activities input",tue9to12, "name", "time1")
grouping(".activities input",tue1to4, "name", "time2")
//If one activity of a group is selected, selected activity is active and checked, the rest of the group is disable
filterInput('.time1')
filterInput('.time2')

// Display total cost
costHTML = '<div id=\'cost\' style="font-weight: bold;display:none">Total Cost: <cost></cost></div>';
var cost = 0;
$('.activities').append(costHTML);
$('.activities input').on("change",function(){
  if ($('.activities input').is(':checked') == false){
    $("#cost").hide();
  } else {
    $("#cost").show();
  }
  text = $(this).parent().text().split(' ')
  if ($(this).is(':checked')){
    cost += getCost(text);
  } else {
    cost -= getCost(text);
  }
  $("cost").empty().append('$'+cost);
})

// Display Payment Info based on chosen payment option

// Form validation. Display error messages if:
// 1.Name field is empty
// 2.Email field must be a validly formatted e-mail address. Use a regular expression to get this requirement.
// 3.At least one activity must be checked
// 4.Payment option must be selected.
// 5."Credit card" info is empty

//X-credit: Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

//X-credit: Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript).

//X-credit: Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)

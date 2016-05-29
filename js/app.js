$('select').addClass('turnintodropdown')
tamingselect();

$nameLabel = getLabel('#name')
$emailLabel = getLabel('#mail')
$ccnumLabel = getLabel('#cc-num')
$zipLabel = getLabel('#zip')
$cvvLabel = getLabel('#cvv')
$colorLabel = getLabel('#color')

var filter = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
//ACTION
// Set focus on the first text field when the page load
$("input[type='text']")[0].focus();//focus first


//Other-title field
var titleField= "<input type=\"text\" id=\"other-title\" placeholder=\"Your Title\">";
$('#title').parent().append(titleField);
$('#other-title').hide();
$(".dropcontainer li").on('click',function(){
  if ($(this).text()=='Other'){
    $('#title').val('other')
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
})
// T-Shirt Info: Display condition
//Organize colors to specific theme list. Better for future edit
$toDesignLegend = $('.shirt').children('legend')
$toPaymentLegend = $('#payment').siblings('legend')

var theme1Color =["Cornflower Blue (JS Puns shirt only)","Dark Slate Grey (JS Puns shirt only)", "Gold (JS Puns shirt only)"]
var theme2Color =["Tomato", "Steel Blue", "Dim Grey"]

// grouping(".shirt>div:nth-child(4)>div>ul>li>a",theme1Color,"theme1")
$(".shirt>div:nth-child(4)>div>ul>li>a").each(function(index,value){
 if ($(this).text().indexOf('Puns') >=0){
   $(this).addClass('theme1')
 } else {
  $(this).addClass('theme2')
 }
})
// grouping(".shirt>div:nth-child(4)>div>ul>li>a",theme2Color,"theme2")

$("#colors-js-puns").hide();//by default
// $(".shirt>div:nth-child(4)>label").hide();
$(".shirt>div:nth-child(3)>div>ul>li>a").click(function(){
  $("#colors-js-puns").show();
  // $(".shirt>div:nth-child(4)>label").show();
  $toDesignLegend.children('.message').remove();
  $("#colors-js-puns>a").click(function(){
    $('.theme1').show();
    $('.theme2').show();
    switch($('.shirt>div:nth-child(3)>a').text()){
      case "Theme - JS Puns":
        $(".shirt>div:nth-child(4)>div>ul>li>a").not(".theme1").hide();
        break
      case "Theme - I ♥ JS":
        $(".shirt>div:nth-child(4)>div>ul>li>a").not(".theme2").hide();
        break
      default:
        addMessage('Don\'t forget pick your shirt',$toDesignLegend)
        $("#colors-js-puns").hide();
        // $colorLabel.hide();
    }
  })
})
//ACTIVITIES
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
$toActivityLegend = $('.activities').children('legend')
$('.activities').append(costHTML);
$('.activities input').on("click",function(){
  $toActivityLegend.children('.message').remove()
  if ($('.activities input').is(':checked') == false){
    $("#cost").hide();
    addMessage('Please choose at least one activity', $toActivityLegend)
  } else {
    $("#cost").show();
    $toActivityLegend.children('message').remove()
  }
  text = $(this).parent().text().split(' ')
  if ($(this).is(':checked')){
    cost += getCost(text);
  } else {
    cost -= getCost(text);
  }
  $("cost").empty().append('$'+cost);
})
//PAYMENT
// Display Payment Info based on chosen payment option
$("fieldset:nth-child(4)>div").eq(1).hide()
$("fieldset:nth-child(4)>div").eq(2).hide()
$("fieldset:nth-child(4)>div").eq(3).hide()

$("#payment").siblings('a').on("click",function(){
  $('fieldset:nth-child(4)>.dropcontainer').show()
  $toPaymentLegend.children('.message').remove();
  $('fieldset:nth-child(4)>.dropcontainer>ul>li').click(function(){
    $('fieldset:nth-child(4)>.dropcontainer').hide()
    $("fieldset:nth-child(4)>div").eq(1).hide()
    $("fieldset:nth-child(4)>div").eq(2).hide()
    $("fieldset:nth-child(4)>div").eq(3).hide()
    switch ($(this).text()){
      case 'Credit Card':
        $("fieldset:nth-child(4)>div").eq(1).show();
        break
      case 'PayPal':
        $("fieldset:nth-child(4)>div").eq(2).show();
        break
      case 'Bitcoin':
        $("fieldset:nth-child(4)>div").eq(3).show();
        break
      case 'Select Payment Method':
        addMessage('Please select your payment method',$toPaymentLegend)
    }
  })
})

//Trigger when click
$("button").click(function(e){
  e.preventDefault();
  validate('#name',$nameLabel, ' (Your name cannot be blank)','')
  validate('#mail',$emailLabel, ' (Your email cannot be blank)', ' (Your email is not valid)')
  validate('#cc-num',$ccnumLabel, ' (required)','')
  validate('#zip',$zipLabel, ' (required)','')
  validate('#cvv',$cvvLabel, ' (required)','')
  $('input[type="text"]').trigger('keyup');
  $('input[type="email"]').trigger('keyup');
  $('#design').trigger('change');
  $('.activities').trigger('change');
  $('#payment').trigger('change');
})

//X-credit: Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.

//X-credit: Style the "select" menus (drop down menus) on the form, so they match the styling of the text fields (see Resources links for an article on how to improve the look of select menus using CSS and JavaScript).

//X-credit: Validate the credit card number so that it's a validly formatted credit card number. (see the Resources links for information on how to do this.)
//FUNCTION:
//1. Add class to all options of each group
function grouping(option, valueList, type, className){
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
//3. Extract cost from label
function getCost(text){
  for (var i=0;i< text.length; i++){
    if (text[i].startsWith('$')){
      return parseInt(text[i].replace("$", ""));
    }
  }
}
//4. Validate unselected option and display message
function addMessage(message, toLocation){
  messageHTML='<label class=\'message\' style=\'font-size:0.8em;\'>'+ message +'</label> '
  toLocation.append(messageHTML);
  $('.message').css('color','red')
}
//5. Validate empty fields, highlight label, and display message
function validate(field, label, messageIfEmpty, messageIfUnvalid){
  $(field).on('keyup',function(){
    label.children('text').remove()
      if ($(this).val() ==''){
        label.addClass('empty')
        label.append('<text>'+messageIfEmpty+'</text>')
        $('.empty').css({'color':'red','font-weight':'bold'})
      }
      else if($(this).val() !=='' && field == '#mail' && filter.test($(field).val()) == false){
        label.addClass('empty')
        label.append('<text>'+messageIfUnvalid+'</text>')
        $('.empty').css({'color':'red','font-weight':'bold'})
      }
      else {
        label.children('text').remove()
        label.removeAttr('style')
      }
  })
}
//6. Get label of field
function getLabel(field){
    return $("label[for='"+$(field).attr('id')+"']");
}

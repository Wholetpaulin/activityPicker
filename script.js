$(document).ready(function() { 

  // if(localstorage){

  // }
  // else{
  //   build array with default values
  // }

  //this will eventually be replaced with a function that reads from local storage
  var actArray = ["Korean Practice", "Sketching practice", "Meditation", "Walk", "Call roulette people", "Digital design practice"];
  var runAgain = true;

  buildList();        //dynamically creates the list based on actArray

  $(document).on("click", ".edit", function(event) {
    var listNum = $('[data-place="'+this.value+'"]');
    listNum.html('<span>   </span><input type="text" id="booboo" name="replace" value="'+actArray[this.value]+'">');
    listNum.append("<button class = 'btn-sm delete' data-attribute = " + this.value + "><icon class = 'fa fa-trash'></icon></button>");
    listNum.append("<button class = 'btn-sm update' value = " + this.value + "><icon class = 'fa fa-floppy-o'></icon></button>");
  });

  $(document).on("click", ".update", function(event) {
    var input = document.getElementById('booboo');    //selects the input field
    actArray[this.value] = input.value;         //reset the string in act array to what's in the appropiate input field
    var listNum = $('[data-place="'+this.value+'"]');
    listNum.html("<span>"+ actArray[this.value] + "</span>");
    listNum.append("<button class = 'btn-sm delete' data-attribute = " + this.value + "><icon class = 'fa fa-trash'></icon></button>");
    listNum.append("<button class = 'btn-sm edit' value = " + this.value + "><icon class = 'fa fa-pencil'></icon></button>");
  });

  $(document).on("click", ".delete", function(event) {    //What's the advantage of doing it the other way?
    var num = $(this).attr("data-attribute");             //selects out which delete button it is in the list
    actArray.splice(num, 1);//remove that particular element from the array 
    var listNum = document.getElementById('listy');
    listNum.remove();
    var numDum = document.getElementById('listDiv');
    $("#listDiv").append('<ul class="list-group" id = "listy"></ul>');
    buildList();
  });

  $(document).on("click", ".circle", function(event) {    //What's the advantage of doing it the other way?
      // See buildList() for a description of how this words
      actArray.push("undefined list item");
      console.log(actArray);
      console.log(actArray.length);
      var num = actArray.length-1;
      var listItem = $("<li>");
      listItem.addClass("list-group-item");
      listItem.attr("data-place", actArray.length-1);;
      listItem.append('<span>   </span><input type="text" id="booboo" name="replace" value="'+actArray[num]+'">');
      listItem.append("<button class = 'btn-sm delete' data-attribute = " + num + "><icon class = 'fa fa-trash'></icon></button>");
      listItem.append("<button class = 'btn-sm update' value = " + num + "><icon class = 'fa fa-floppy-o'></icon></button>");
      $("#listy").append(listItem);
  });

  $(".pick").on("click", function(event) {
    if(runAgain){           //This is an "if true" flip flop here
      runAgain = false; 
      var i = 0;
      var o = 0;
      var random = Math.floor(Math.random() * actArray.length);
      clearGreen();  //add a remove all function to clear all the green fields.
      setTimeout(roulette,100);
    }


    //----------------------------------Function Declaration-------------------
    function roulette(){
      var colorItem = $("#listy li[data-place='"+i+"']"); //selects the list element with i as the data attribute
      if(i !== 0) {   //This makes sure that a class can't be removed the first time
        var j = i - 1;
        var firstItem = $("#listy li[data-place='"+j+"']");
        firstItem.removeClass("list-group-item-success");
      }

      colorItem.addClass("list-group-item-success");  //Give it the class that makes it green

      i++;

      if(i < actArray.length+1) {
        setTimeout(roulette,100);
      }
      else{
        i = 0;
        o++;
        if(o < 5){  //pseduo for loop
        setTimeout(roulette,100);
        }
        if(o === 5){  //LAST TIME
        setTimeout(lastRoulette,100);
        }
      }
    }

    function lastRoulette(){
      //CHANGE THE LOGIC HERE TO MAKE THE TICKER GO BY SLOWER 
      //AND STOP ON THE CORRECT LIST ITEM
      var colorItem = $("#listy li[data-place='"+i+"']"); //selects the list element with i as the data attribute
      console.log("i = " + i);
      if(i !== 0) {   //This makes sure that a class can't be removed the first time
        var j = i - 1;
        var firstItem = $("#listy li[data-place='"+j+"']");
        firstItem.removeClass("list-group-item-success");
      }

      colorItem.addClass("list-group-item-success");  //Give it the class that makes it green

      if(i === random) {
        runAgain = true;
        return;
      }
      else{
        setTimeout(lastRoulette,600);
      }
      i++;
    }

    function clearGreen(){
        for(var t = 0; t < actArray.length; t++){ //This loops through the len of the array and removes the class that makes the list items green
            var item = $("#listy li[data-place='"+t+"']");
            item.removeClass("list-group-item-success");
        }
    }
    
  });//end of pick listener

  //--------------------GLOBAL FUNCTION DELCARATION------------------------

function buildList(){
    for (var i = 0; i < actArray.length; i++) {

      // 1. Create a variable named "listItem" equal to a list item
      var listItem = $("<li>");

      // 2. Gives each list item a list-group-item
      listItem.addClass("list-group-item");

      // 3. Then give each "listItem" a data-attribute called "place".
      listItem.attr("data-place", i);

      // 4. Then give each "listItem" a text equal to "letters[i]".
      //listItem.text(actArray[i]);
      listItem.append("<span>"+ actArray[i] + "</span>");

      listItem.append("<button class = 'btn-sm delete' data-attribute = " + i + "><icon class = 'fa fa-trash'></icon></button>");

      listItem.append("<button class = 'btn-sm edit' value = " + i + "><icon class = 'fa fa-pencil'></icon></button>");

      // 5. Finally, append each "letterItem" to the "#listy" div (provided).
      $("#listy").append(listItem);
    }
}
});
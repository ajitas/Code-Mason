/**************************Ajita*******************************/










/**************************Ajita*******************************/

/**************************Taylor*******************************/

/*****************SIDE BAR JQUERY ELEMENT GENERATION*************/
function languageSort() {

  var languages = [1,2,3,4,5];

//   for (var i = 0; i < /*dataFromServer.length*/; i++) {
//     languages.push(dataArr[i]);
//   };

  $(".language-sort").html("<h4>Find by Language</h4>" +  "<ul class=languageSortList style='list-style-type:none'>"
  + "</ul>")

  for (var i = 0; i < languages.length; i ++) {
    $(".languageSortList").append("<li>" + languages[i] + "</li>")
  }

}

function tagSort() {

    var tags = [1,2,3,4,5];

    // for (var i = 0; i < /*dataFromServer.length*/; i++) {
    //   tags.push(dataArr[i]);
    // };

    $(".tag-sort").html("<h4>Sort by Tag</h4>" +  "<ul class=tagSortList style='list-style-type:none'>"
  + "</ul>")

  for (var i = 0; i < tags.length; i ++) {
      $(".tagSortList").append("<li>" + tags[i] + "</li>");
  }
}

function recentSnippets() {

    var recentSnippets = [1, 2, 3, 4, 5];

    // for (var i = 0; i < /*dataFromServer.length*/; i++) {
    //   recentSnippets.push(dataArr[i]);
    // };

    $(".recent-snippets-and-search").html("<h4>Recent Snippets</h4>" +  "<ul class=recentSnippetsList style='list-style-type:none'>"
  + "</ul>");

  for (var i = 0; i < recentSnippets.length; i ++) {
      $(".recentSnippetsList").append("<li>" + recentSnippets[i] + "</li>");
  }
}

function sidebarSnippetSearch() {
  $(".user-snippet-search").html("<input class='uk-input uk-form-width-medium' type='text' placeholder='Search Your Snippets'></input>" + "<button class='uk-button uk-button-default'>Search</button>");
}

$(document).ready(function() {
    sidebarSnippetSearch();
    recentSnippets();
    tagSort();
    languageSort();
})

/*****************NAV BAR JQUERY ELEMENT GENERATION*************/


/*****************MAIN CONTENT JQUERY ELEMENT GENERATION*************/
// function renderPopSnippets() {

//   var popSnippets = [];

//  $(".snippets-container").append(`<h4>Popular Snippets</h4>`);

//   for (var i = 0; i < /*dataFromServer.length*/; i++) {
//     popSnippets.push(dataArr[i]);
//   };

//   for (var i = 0; i < popSnippets.length; i++) {
//   $(".snippets-container").html(`<div class='uk-card uk-card-default uk-width-1-2@m'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+Code block title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+Code description. ipsum ipsum.+`</p></div></div></div><div class='uk-card-body'><p>`+Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.+`</p></div></div>`);
//   }
// }

function renderUserSnippets() {
  var userSnippets = [1, 3, 2, 5];

  $(".snippets-container").append(`<h4>Your Snippets</h4>`);

//   for (var i = 0; i < /*dataFromServer.length*/; i++) {
//     userSnippets.push(dataArr[i]);
//   }

  for (var i = 0; i < userSnippets.length; i++) {
    $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+'Code block title'+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+'Code description. ipsum ipsum.'+`</p></div></div></div><div class='uk-card-body'><p>`+'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'+`</p></div></div>`);
  }
}
$(document).ready(function() {
    renderUserSnippets();
})
/**************************Taylor*******************************/

/**************************Craig*******************************/
//add new snippet and tags on click of modal submit button
$("#snippet-submit").on("click", function(){
  //create object from form inputs
  var newSnippet = {
    title: $("#new-snippet-name").val().trim(),
    description: $("#new-snippet-descrip").val().trim(),
    text: $("#new-snippet-code").val().trim(),
    public: $("input:radio[name='public']:checked").val(),
    language: $("input:radio[name='lang']:checked").val(),
    UserId: "123"
  };

  // get the comma seperated tag value
  var tags = $("#new-snippet-tags").val().trim();
  //split by comma into an array
  tags = tags.split(",");

  //query api to create new code snippet entry
  $.post("/codes", newSnippet, function(res){
    //new code snippet id returned from query
    var codeID = res.id;

    //loop tags array
    for (var i = 0; i < tags.length; i++) {
      //create object with tag and code snippet id to send in post request
      var tag = {
        tagname: tags[i].trim(),
        codeID: codeID
      };
      //send query to create new tag entry
      $.post("/tags", tag, function(){

      });
    }
  });
});

//google sign in function. Runs when a user signes up/in and when a user is already signed in
function onSignIn(googleUser) {
  //user data from google sign in
  var profile = googleUser.getBasicProfile();
  var name = profile.getName();
  var email = profile.getEmail();

  //get user id
  $.get("/users/" + email, function(res){
    if (res) {
      //set session storage with user id
      sessionStorage.setItem("userID", res.id);
      window.location.reload();
    }
    // if user id does not exist create a new user
    else {
      $.post("/users", {name: name, email: email}, function(res){
        //set session storage with user id
        sessionStorage.setItem("userID", res.id);
        window.location.reload();
      });
    }
  });
}
//sign user out of app via google sign in
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    //remove session id
    sessionStorage.removeItem("userID");
    //reload page so the user sees the public view after signing out
    window.location.reload();
    console.log('User signed out.');
  });
}









/**************************Craig*******************************/

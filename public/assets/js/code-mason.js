/**************************Ajita*******************************/










/**************************Ajita*******************************/

/**************************Taylor*******************************/

//USER SIDE MENU RENDERING
function languageSort(userID) {

  var languages = [];
$.get("/languages/user/"+ userID, function(results) {
    console.log(results);
  for (var i = 0; i < results.length; i++) {
    languages.push(results[i]);
  };
  $(".language-sort").html("<h4>Your Snippets by Language</h4>" +  "<ul class=languageSortList style='list-style-type:none'>"
  + "</ul>")

  for (var i = 0; i < languages.length; i ++) {
    $(".languageSortList").append("<li><a href='#' data-lang='"+ languages[i].language + "' class='user-language-link'>" + languages[i].language + "</a></li>")
  }
})
}

//USER SIDE BAR LANGUAGES ON CLICK LISTENER
$(document).on("click", ".user-language-link", function() {
    var language = $(this).attr("data-lang");
    var userID = sessionStorage.getItem("userID");
    console.log(language);
    $.get("/search/codes/language/"+ language +"/user/" + userID, function(results) {
        $(".snippets-container").empty();
        for (var i = 0; i < results.length; i++) {
        $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+results[i].id +">" + results[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + results[i].description + "</p></div><div class='render-likes-div'><p class='total-likes'>"+results[i].likes+ " Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>"+results[i].text.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
        }  
      includeHilights();    
    })
})

//USER SNIPPETS RENDER RECENT SNIPPETS
function renderUserSnippets(userID) {
    var userSnippets = [];
  
    $.get("/codes/latest/user/" + userID, function(results) {
      for (var i = 0; i < results.length; i++) {
          userSnippets.push(results[i]);
        } 
  console.log(userSnippets);
    $(".snippets-container").empty();
    $(".snippets-container").append(`<h4>Your Snippets</h4>`);
  
    for (var i = 0; i < userSnippets.length; i++) {
        $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+userSnippets[i].id +">" + userSnippets[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + userSnippets[i].description + "</p></div><div class='render-likes-div'><p class='total-likes'><span class='number-of-likes'>"+userSnippets[i].likes+ "</span> Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>"+userSnippets[i].text.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
    }
    includeHilights();
  })
  };
  
  //SIDE MENU USER'S TOP LIKED SNIPPETS
function userTopSnippets(userID) {

    var topSnippets = [];
$.get("/codes/liked/user/" +userID, function(results) {
    for (var i = 0; i < results.length; i++) {
        topSnippets.push(results[i]);
      };
      
      $(".top-snippets").html("<h4>Your Top Snippets</h4>" +  "<ul class=topSnippetsList style='list-style-type:none'>"
    + "</ul>");
    
    for (var i = 0; i < topSnippets.length; i ++) {
        $(".topSnippetsList").append("<li><a href='#' class='single-snippet-link' data-snippetID="+ topSnippets[i].id + ">" + topSnippets[i].title + "</a></li>");
    }
})
}

//SIDE MENU SNIPPETS USER HAS LIKED
function userFavoriteSnippets() {
    var UserID = sessionStorage.getItem("userID");
    $.get("/codes/likes/user/"+ UserID, function(results) {
        $(".user-favorites").html("<h4>Your Liked Snippets</h4>" +  "<ul class=user-liked-snippets style='list-style-type:none'>"
        + "</ul>");
        for (var i = 0; i < results.length; i++) {
          $(".user-liked-snippets").append("<li><a href='#' class='single-snippet-link' data-snippetID="+ results[i].id + ">" + results[i].title + "</a></li>");
        }    
    })
}

//SIDE MENU USER SEARCH OWN SNIPPETS
function sidebarSnippetSearch(userID) {
    $(".user-snippet-search").html("<div class='uk-button-group'><input id='user-search' data-user=" +userID+ "type='text' placeholder='Search Your Snippets'></input>" + "<button id='search'>Search</button></div>");
  }
  
  //SIDE MENU USER SEARCH OWN SNIPPETS ON CLICK LISTENER AND RESULTS GENERATION IN MAIN CONTENT
  $(document).on("click", "#search", function() {
    var searchTerm = $("#user-search").val().trim();
    var userID = $("#user-search").attr("data-user");
  
    $.get("/search/codes/user/"+ userID +"/word/" + searchTerm, function(result) {
        $(".snippets-container").empty();
  
        $(".snippets-container").append(`<h4>Search Results</h4>`);
  
        for (var i = 0; i < result.length; i++) {
          $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+result[i].id +">" + result[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + result[i].description + "</p></div><div class='render-likes-div'><p class='total-likes'>"+result[i].likes+ " Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>"+result[i].text.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
        }
        includeHilights();
    })
  })

//SIDE MENU USER ADD SNIPPET BUTTON RENDER
function renderAddSnippet() {
  $(".add-snippet-div").html("<button id='add-snippet' type='button'><i class='fas fa-plus'></i>  Add Snippet</button>");
}
    

//ADD SNIPPET BUTTON SHOW AFTER CLICK FUNCTION
var modal = UIkit.modal("#add-snippet-modal");
$(document).on('click','#add-snippet', function() {
  modal.toggle();
});

//SIDE MENU PUBLIC PAGE SORT BY LANGUAGE LIST
function RenderPubliclanguages() {

    var languages = [];
  $.get("/languages", function(results) {
      console.log(results);
    for (var i = 0; i < results.length; i++) {
      languages.push(results[i]);
    };
    $(".language-sort").html("<h4>Snippets by Language</h4>" +  "<ul class=languageSortList style='list-style-type:none'>"
    + "</ul>")
  
    for (var i = 0; i < languages.length; i ++) {
      $(".languageSortList").append("<li><a href='#' data-lang='"+ languages[i].language + "' class='language-link'>" + languages[i].language + "</a></li>")
    }
  })
  }
  
  //SIDE MENU PUBLIC PAGE LANGUAGES ON CLICK LISTENER & MAIN CONTENT RENDER SNIPPETS OF THAT LANGUAGE
  $(document).on("click", ".language-link", function() {
      var language = $(this).attr("data-lang");
      console.log(language);
      $.get("/search/codes/language/"+ language, function(results) {
          $(".snippets-container").empty();
          for (var i = 0; i < results.length; i++) {
          $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID='` +results[i].id +`'>`+results[i].title+`</a></h3><p class='uk-text-meta uk-margin-remove-top'>`+results[i].description+`</p></div><div class='render-likes-div'><p class='total-likes'>`+results[i].likes+ ` Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>`+results[i].text.replace(/\</g,"&lt;")+`</code></pre></p></div></div>`);
          }    
          includeHilights();
      })
  })

  //SIDE MENU PUBLIC PAGE MOST RECENT ADDED SNIPPETS LIST
  function publicRecentSnippets() {
      $.get("/codes/latest", function(result) {
          $(".recent-snippets").html("<h4>Recently Added Snippets</h4>" + "<ul class=sidebarRecentSnippets style='list-style-type:none'>"
          + "</ul>");
          for (var i = 0; i < result.length; i ++) {
            $(".sidebarRecentSnippets").append("<li><a href='#' data-snippetID='"+ result[i].id + "' class='recent-snippets-link'>" + result[i].title + "</a></li>")
          }
      
        })
  }

  //SIDE MENU PUBLIC PAGE ON CLICK LISTENER FOR MOST RECENT SNIPPETS & RENDER TO MAIN SNIPPETS CONTAINER
  $(document).on("click", ".recent-snippets-link", function() {
      var snippetID = $(this).attr("data-snippetID");

      $.get("/codes/code/" + snippetID, function(result) {
        $(".snippets-container").empty();
            renderSingleSnippet(snippetID);
            includeHilights();
            console.log("SIDE MENU SNIPPET ID BUG 3 FIX", snippetID);
            renderSnippetComments(parseInt(snippetID));
      })
  })

//NAV BAR SEARCH ALL SITE ON CLICK LISTENER
  $(document).on("click", "#nav-search-submit", function() {
    var searchTerm = $("#nav-search-input").val().trim();
  
  
    $.get("/search/codes/word/" + searchTerm, function(result) {
        $(".snippets-container").empty();
        $(".snippets-container").append(`<h4>Search Results</h4>`);
        for (var i = 0; i < result.length; i++) {
            $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+result[i].id +">" + result[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + result[i].description + "</p></div><div class='render-likes-div'><p class='total-likes'>"+result[i].likes+ " Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>"+result[i].text.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
        }
        includeHilights();
    })
  })

  //NAV BAR LOG IN HIDE
  function logInHide() {
    $(".g-signin2").hide();
  }

  //NAV BAR LOG OUT HIDE
  function logOutShow() {
      $(".sign-out-button").show();
  }


//PUBLIC PAGE TOP SNIPPETS FOR MAIN CONTENT
function renderTopSnippets(cb) {
  var topSnippets = [];

  $.get("/top10", function(results) {
    
    for (var i = 0; i < results.length; i++) {
      topSnippets.push({id: results[i].id, title:results[i].title, description:results[i].description, snippet:results[i].text, likes: results[i].likes});
    } 
  
    $(".snippets-container").append(`<h4 id='top-snippets-title'>Top Snippets</h4>`);
   
    for (var i = 0; i < topSnippets.length; i++) {
      $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+topSnippets[i].id +">" + topSnippets[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + topSnippets[i].description + "</p></div><div class='render-likes-div'><p class='total-likes'>"+topSnippets[i].likes+ " Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>"+topSnippets[i].snippet.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
    }
  cb();
  });

};

function renderSingleSnippet(singleSnippet){
  $.get("/codes/code/" + singleSnippet, function(result) {
      console.log("SINGLE SNIPPET RESULT: " , result);
       $(".snippets-container").empty();
       $("#comments-container").remove();
      
  if(sessionStorage.getItem("userID"))
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div><div class='render-likes-div'><p class='like-button'><button type='button' data-snippetID='`+result.id+`' class='add-like icon-style'><i class='fas fa-thumbs-up fa-2x'></i></button></p><p class='total-likes'>`+result.likes+ ` Likes</p></div></div></div><div class='uk-card-body snippet-render-area single-snippet-render-area'><p><pre><code>`+result.text.replace(/\</g,"&lt;")+`</code></pre></p></div><div class='delete-div uk-card-footer'></div></div>`);
  else
    $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div><div class='render-likes-div'><p class='total-likes'>`+result.likes+ ` Likes</p></div></div></div><div class='uk-card-body snippet-render-area single-snippet-render-area'><p><pre><code>`+result.text.replace(/\</g,"&lt;")+`</code></pre></p></div><div class='delete-div uk-card-footer'></div></div>`);
    
      $(".snippets-container").append('<div id="comments-container"></div>');

      if (parseInt(sessionStorage.getItem("userID")) === result.UserId) {
        $(".delete-div").html("<button type='button' data-snippetID='"+ result.id +"' class='delete-snippet icon-style'><i class='fas fa-trash-alt'></i></button>")  
      }
      else {
        $(".delete-div").hide();
      }
      renderSnippetComments(singleSnippet);
      includeHilights();
  })
}


//ON CLICK LISTENER FOR DELETING A SNIPPET
$(document).on("click", ".delete-snippet", function() {
   var codeID = $(this).attr("data-snippetID");
    $.ajax("/codes/code/"+codeID, {
        type: "DELETE"
    }).then(function() {
        window.location.href="/";
    });
})

//ON CLICK LISTENER FOR ANY TIME A SINGLE SNIPPET IS CLICKED
$(document).on("click", ".single-snippet-link", function() {
  renderSingleSnippet(parseInt($(this).attr("data-snippetID")));
  })

  //SINGLE SNIPPET RENDER COMMENTS CARD & ADD COMMENT CARD
  function renderSnippetComments (snipID) {
    $.get("/comments/code/" + snipID, function(result) {
        if(sessionStorage.getItem("userID")){
            $(".snippets-container").append("<div class='uk-card uk-card-default uk-card-body add-comment-card'><textarea class='uk-textarea' id='new-comment' rows='2' placeholder='Join the conversation'></textarea><button id='add-comment' data-codeID='" + snipID + "'>Add comment</button></div>");
        }
      for (var i = 0; i < result.length; i++) {
            
            console.log(result);
            $("#comments-container").append("<div class='uk-card uk-card-default uk-card-body comment-card'><p>"+result[i].text+"</p><p> Posted By: " + result[i].User.name + "</p></div>");
      }  
    });
  }

  //ON CLICK LISTENER FOR ADD NEW COMMENT
  $(document).on("click", "#add-comment", function() {
     var commentObj = { 
      text: $("#new-comment").val().trim(),
      userID: sessionStorage.getItem("userID"),
      codeID:  $(this).attr("data-codeID")
     }
      $.post("/comments", commentObj, function() {
        renderSingleSnippet(parseInt(commentObj.codeID));
      })
  })

  //ON CLICK LISTENER FOR LIKING SNIPPET
  $(document).on("click",".add-like", function(){
    var codeID=parseInt($(this).attr("data-snippetID"));
    var userID = parseInt(sessionStorage.getItem("userID"));
    $.get("/likes/user/"+userID+"/code/"+codeID, function(result){
        console.log("LIKE RESULT" , result);
        if(!result){
            var newLikeObj = {userID:userID, codeID:codeID}
            $.post("/likes", newLikeObj, function() {
                $.ajax("/code/likes/"+codeID, {
                    type: "PUT"
                }).then(function() {
                    renderSingleSnippet(codeID);
                    userFavoriteSnippets();
                });
            });
        }
    });
});

//ADDS HILIGHTS TO OUR CODE SNIPPETS
function includeHilights() {
$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
    });
}

//FUNCTION TO CHECK IF WE NEED TO LOAD PUBLIC PAGE OR USER PAGE & THEN CORRECT FUNCTIONS FOR SPECIFIC VIEW
function renderPageCheck() { 
if (sessionStorage.getItem("userID")) {
    var userID = sessionStorage.getItem("userID");
    $(".recent-snippets").empty();
    renderUserSnippets(userID);
    renderAddSnippet();
    sidebarSnippetSearch(userID);
    userTopSnippets(userID);
    languageSort(userID);
    userFavoriteSnippets();
    logInHide();
    logOutShow();
}

else {
    renderTopSnippets(includeHilights);
    RenderPubliclanguages();
    publicRecentSnippets();
}
} 

//WHEN PAGE LOADS WE IMMEDIATELY CHECK IF USER OR PUBLIC
$(document).ready(function() {
    renderPageCheck(); 
})


   
 
/**************************Taylor*******************************/

/**************************Craig*******************************/

//add new snippet and tags on click of modal submit button
$(document).on("click", "#snippet-submit", function(){
    //create object from form inputs
    var newSnippet = {
      title: $("#new-snippet-name").val().trim(),
      description: $("#new-snippet-descrip").val().trim(),
      text: $("#new-snippet-code").val().trim(),
      public: $("input:radio[name='private']:checked").val(),
      language: $("input:radio[name='lang']:checked").val(),
      userID: parseInt(sessionStorage.getItem("userID"))
    };

    console.log("newSnippet");
    // get the comma seperated tag value
    var tags = $("#new-snippet-tags").val().trim();
    //split by comma into an array
    tags = tags.split(",");
    console.log(newSnippet);
    //query api to create new code snippet entry
    $.post("/codes", newSnippet, function(res){
      //new code snippet id returned from query
      var codeID = res.id;
        console.log(codeID);
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
    $.get("/user/" + email, function(res){  
      if (res) {
        //set session storage with user id
        sessionStorage.setItem("userID", res.id);
        renderPageCheck();
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
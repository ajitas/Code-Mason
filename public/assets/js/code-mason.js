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
    $(".languageSortList").append("<li><a href='#' data-lang='"+ languages[i].language + "' class='language-link'>" + languages[i].language + "</a></li>")
  }
})
}

//USER SIDE BAR LANGUAGES ON CLICK LISTENER
$(document).on("click", ".language-link", function() {
    var language = $(this).attr("data-lang");
    console.log(language);
    $.get("/search/codes/language/"+ language +"/user/2", function(results) {
        $(".snippets-container").empty();
        for (var i = 0; i < results.length; i++) {
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+results[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+results[i].description+`</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>`+results[i].text.replace(/\</g,"&lt;")+`</code></pre></p></div></div>`);
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
  
  //USER SIDE MENU 
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

// //USER SIDE MENU TOP SNIPPETS ON CLICK LISTENER
// $(document).on("click", ".", function() {
//     var codeID = $(this).attr("data-ID");
//     console.log(codeID);
//     $.get("/codes/code/" + codeID, function(result) {
//         $(".snippets-container").empty();
//         $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div></div></div><div class='uk-card-body'><p><pre><code>`+result.text+`</code></pre></p></div></div>`);
//         includeHilights();
//     })
    
// })

//MODAL BUTTON WORK AROUND
var modal = UIkit.modal("#add-snippet-modal");
$(document).on('click','#add-snippet', function() {
  modal.toggle();
});

//PUBLIC PAGE SIDE BAR RENDERING
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
  
  //PUBLIC PAGE SIDE BAR LANGUAGES ON CLICK LISTENER
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

  function publicRecentSnippets() {
      $.get("/codes/latest", function(result) {
          $(".recent-snippets").html("<h4>Recently Added Snippets</h4>" + "<ul class=sidebarRecentSnippets style='list-style-type:none'>"
          + "</ul>");
          for (var i = 0; i < result.length; i ++) {
            $(".sidebarRecentSnippets").append("<li><a href='#' data-snippetID='"+ result[i].id + "' class='recent-snippets-link'>" + result[i].title + "</a></li>")
          }
      })
  }

  $(document).on("click", ".recent-snippets-link", function() {
      var snippetID = $(this).attr("data-snippetID");

      $.get("/codes/code/" + snippetID, function(result) {
        $(".snippets-container").empty();
            $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div><div class='render-likes-div'><p class='total-likes'>`+result.likes+ ` Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>`+result.text.replace(/\</g,"&lt;")+`</code></pre></p></div></div>`);
            includeHilights();
      })
  })


function likedSnippets() {

  var likedSnippets = [];

  $.get("/codes/likes/user/:userID", function(results) {
    for (var i = 0; i < results; i++) {
      likedSnippets.push(results[i]);
    };
  })
    
    $(".liked-snippets").html("<h4>Liked Snippets</h4>" +  "<ul class=likedSnippetsList style='list-style-type:none'>"
  + "</ul>");
  
  for (var i = 0; i < likedSnippets.length; i ++) {
      $(".likedSnippetsList").append("<li><a href='#' class='liked-link' data-snippetID=" +likedSnippets[i].id + ">" + likedSnippets[i] + "</a></li>");
  }
}

$(document).on("click", ".liked-link", function() {
    var likedID = $(this).attr("data-snippetID");
    console.log(likedID);
    $.get("/codes/code/" + likedID, function(result) {
        $(".snippets-container").empty();
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div></div></div><div class='uk-card-body'><p><pre><code>`+result.text.replace(/\</g,"&lt;")+`</code></pre></p></div></div>`);
    })
})

//USER SIDE BAR SEARCH OWN SNIPPETS
function sidebarSnippetSearch(userID) {
  $(".user-snippet-search").html("<input id='user-search' data-user=" +userID+ "type='text' placeholder='Search Your Snippets'></input>" + "<button id='search'>Search</button>");
}

//USER SIDE BAR SEARCH OWN SNIPPETS ON CLICK LISTENER AND RESULTS GENERATION IN MAIN CONTENT
$(document).on("click", "#search", function() {
  var searchTerm = $("#user-search").val().trim();
  var userID = $("#user-search").attr("data-user");

  $.get("/search/codes/user/"+ userID +"/word/" + searchTerm, function(result) {
      $(".snippets-container").empty();

      $(".snippets-container").append(`<h4>Search Results</h4>`);

      for (var i = 0; i < result.length; i++) {
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre><code>`+result[i].text+`</code></pre></p></div></div>`);
      }
  })
})



//SIDE BAR ADD SNIPPET RENDER
function renderAddSnippet() {

$(".add-snippet-div").html("<button id='add-snippet' type='button'>Add Snippet</button>");
}

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


/****** PUBLIC PAGE TOP SNIPPETS FOR MAIN CONTENT ********/
function renderTopSnippets(cb) {
  var topSnippets = [];

  $.get("/top10", function(results) {
    
    for (var i = 0; i < results.length; i++) {
      topSnippets.push({id: results[i].id, title:results[i].title, description:results[i].description, snippet:results[i].text, likes: results[i].likes});
    } 
  
    $(".snippets-container").append(`<h4>Top Snippets</h4>`);
   
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
        // $(".snippets-container").append(`<h4>Search Results</h4>`);
        
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div><div class='render-likes-div'><p class='like-button'><button type='button' data-snippetID='`+result.id+`' class='add-like'><i class='fas fa-thumbs-up fa-3x'></i></button></p><p class='total-likes'>`+result.likes+ ` Likes</p></div></div></div><div class='uk-card-body snippet-render-area'><p><pre><code>`+result.text.replace(/\</g,"&lt;")+`</code></pre></p></div></div>`);
        $(".snippets-container").append('<div id="comments-container"></div>');
        renderSnippetComments(singleSnippet);
        includeHilights();
    })
}
$(document).on("click", ".single-snippet-link", function() {
  renderSingleSnippet(parseInt($(this).attr("data-snippetID")));
  })

  //SINGLE SNIPPET RENDER COMMENTS & ADD COMMENT CARD
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
  //ON CLICK LISTENER FOR ADD COMMENT
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

  //ON CLICK LISTENER FOR LIKING COMMENT
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
                });
            });
        }
    });
});

  function includeHilights() {
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
  }
  
  function renderPageCheck() { 
    if (sessionStorage.getItem("userID")) {
        var userID = sessionStorage.getItem("userID");
        console.log(userID);
      renderUserSnippets(userID);
      renderAddSnippet();
      sidebarSnippetSearch(userID);
      userTopSnippets(userID);
      languageSort(userID);
      userFavoriteSnippets();
    }
    
    else {
      renderTopSnippets(includeHilights);
      RenderPubliclanguages();
      publicRecentSnippets();
    }
  } 

    $(document).ready(function() {
      renderPageCheck(); 
    })
/*****MODAL INPUTS TO DATABASE ********/

   
 
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
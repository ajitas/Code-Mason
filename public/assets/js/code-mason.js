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
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+results[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+results[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+results[i].text+`</pre></p></div></div>`);
        }    
    })
})

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
          $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+results[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+results[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+results[i].text+`</pre></p></div></div>`);
          }    
      })
  })

//USER SIDE MENU 
function userTopSnippets(userID) {

    var topSnippets = [];
$.get("/codes/liked/user/" +userID, function(results) {
    for (var i = 0; i < results.length; i++) {
        topSnippets.push(results[i]);
      };
      
      $(".top-snippets").html("<h4>Top Snippets</h4>" +  "<ul class=topSnippetsList style='list-style-type:none'>"
    + "</ul>");
    
    for (var i = 0; i < topSnippets.length; i ++) {
        $(".topSnippetsList").append("<li><a href='#' class='code-link' data-ID="+ topSnippets[i].id + ">" + topSnippets[i].title + "</a></li>");
    }
})
}

$(document).on("click", ".code-link", function() {
    var codeID = $(this).attr("data-ID");
    console.log(codeID);
    $.get("/codes/code/" + codeID, function(result) {
        $(".snippets-container").empty();
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+result.text+`</pre></p></div></div>`);
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
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+result.text+`</pre></p></div></div>`);
    })
})

//USER SIDE BAR SEARCH OWN SNIPPETS
function sidebarSnippetSearch(userID) {
  $(".user-snippet-search").html("<input class='uk-input uk-form-width-medium' id='user-search' data-user=" +userID+ "type='text' placeholder='Search Your Snippets'></input>" + "<button class='uk-button uk-button-default' id='search'>Search</button>");
}

//USER SIDE BAR SEARCH OWN SNIPPETS ON CLICK LISTENER
$(document).on("click", "#search", function() {
  var searchTerm = $("#user-search").val().trim();
  var userID = $("#user-search").attr("data-user");


  $.get("/search/codes/user/"+ userID +"/word/" + searchTerm, function(result) {
      $(".snippets-container").empty();

      $(".snippets-container").append(`<h4>Search Results</h4>`);

      for (var i = 0; i < result.length; i++) {
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+result[i].text+`</pre></p></div></div>`);
      }
  })
})



/*****************NAV BAR JQUERY ELEMENT GENERATION*************/
function renderAddSnippet() {

$(".left-nav").html("<button class='uk-button uk-button-default uk-margin-small-right' id='add-snippet' type='button' uk-toggle='target: #add-snippet-modal'>Add Snippet</button>");
}
/*****************MAIN CONTENT JQUERY ELEMENT GENERATION*************/


/*****NAVBAR SEARCH  **********/
  $(document).on("click", "#nav-search-submit", function() {
    var searchTerm = $("#nav-search-input").val().trim();
  
  
    $.get("/search/codes/word/" + searchTerm, function(result) {
        $(".snippets-container").empty();
        $(".snippets-container").append(`<h4>Search Results</h4>`);
        for (var i = 0; i < result.length; i++) {
          $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+result[i].text+`</pre></p></div></div>`);
        }
    })
  })

/****** USER PAGE USERS SNIPPETS ********/
function renderUserSnippets(userID) {
  var userSnippets = [];

  $.get("/codes/latest/user/" + userID, function(results) {
    for (var i = 0; i < results.length; i++) {
        userSnippets.push(results[i]);
      } 

  $(".snippets-container").append(`<h4>Your Recent Snippets</h4>`);

  for (var i = 0; i < userSnippets.length; i++) {
    $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+userSnippets[i].title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+userSnippets[i].description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+userSnippets[i].text+`</pre></p></div></div>`);
  }
})
};

/****** PUBLIC PAGE TOP SNIPPETS FOR MAIN CONTENT ********/
function renderTopSnippets() {
  var topSnippets = [];

  $.get("/top10", function(results) {
    
    for (var i = 0; i < results.length; i++) {
      topSnippets.push({id: results[i].id, title:results[i].title, description:results[i].description, snippet:results[i].text});
    } 
  
    $(".snippets-container").append(`<h4>Top Snippets</h4>`);
   
    for (var i = 0; i < topSnippets.length; i++) {
      $(".snippets-container").append("<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'><a href='#' class='single-snippet-link' data-snippetID="+topSnippets[i].id +">" + topSnippets[i].title + "</a></h3><p class='uk-text-meta uk-margin-remove-top'>" + topSnippets[i].description + "</p></div><div class='uk-width-expand render-likes-div'></div></div></div><div class='uk-card-body'><p><pre><code>"+topSnippets[i].snippet.replace(/\</g,"&lt;")+"</code></pre></p></div></div>");
      getTotalLikes(topSnippets[i].id);  
    }
  
  });

};

function getTotalLikes(snipID) {
    $.get("/codes/likes/"+snipID, function(result) {
        console.log(result);
        $(".render-likes-div").append("<h5 class='total-likes uk-margin-remove-bottom'>" +result+ "Likes</h5><a href='#' class='add-like' uk-icon='heart'></a>")
    })
}

$(document).on("click", ".single-snippet-link", function() {
  var singleSnippet = $(".single-snippet-link").attr("data-snippetID");
  
    $.get("/codes/code/" + singleSnippet, function(result) {
        $(".snippets-container").empty();
        // $(".snippets-container").append(`<h4>Search Results</h4>`);
        
        $(".snippets-container").append(`<div class='uk-card uk-card-default'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+result.title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+result.description+`</p></div></div></div><div class='uk-card-body'><p><pre>`+result.text+`</pre></p></div></div>`);
        renderSnippetComments(singleSnippet);
    })
  })

  function renderSnippetComments (snipID) {
    $.get("/comments/code/" + snipID, function(result) {

      $(".snippets-container").append("<div class='uk-card uk-card-default comment-card'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><textarea class='uk-textarea' rows='2' placeholder='Join the conversation'></textarea><button class='uk-button uk-button-default'>Add comment</button></div></div></div></div>");
      for (var i = 0; i < result.length; i++) {
          console.log(result[i].UserId);
        $(".comment-card").append("<div class='comment-body uk-card-body'><p>" + getUserName(result[i].UserId) + "</p><p>"+result[i].text+"</p></div>");
      }  
    });
  }

  function getUserName (userID) {
      $.get(""+userID, function(result) {
          return result.name;
      })
  }
  
    $(document).ready(function() {
        if (sessionStorage.getItem("userID")) {
            var userID = sessionStorage.getItem("userID");
          renderUserSnippets(userID);
          renderAddSnippet();
          sidebarSnippetSearch(userID);
          userTopSnippets(userID);
          languageSort(userID);
        }
        
        else {
          renderTopSnippets();
          RenderPubliclanguages();
        }
      })
/*****MODAL INPUTS TO DATABASE ********/

   
 
/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/
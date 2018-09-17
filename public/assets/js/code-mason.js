/**************************Ajita*******************************/










/**************************Ajita*******************************/

/**************************Taylor*******************************/

/*****************SIDE BAR JQUERY ELEMENT GENERATION*************/
function languageSort() {

  var languages = [];

  for (var i = 0; i < /*dataFromServer.length*/; i++) {
    languages.push(dataArr[i]);
  };
  
  $(".language-sort").html("<h4>Find by Language</h4>" +  "<ul class=languageSortList style='list-style-type:none'>"
  + "</ul>")

  for (var i = 0; i < languages.length; i ++) {
    $(".languageSortList").html("<li>" + languages[i] + "</li>")
  }
  
}

function tagSort() {

    var tags = [];

    for (var i = 0; i < /*dataFromServer.length*/; i++) {
      tags.push(dataArr[i]);
    };
    
    $(".tag-sort").html("<h4>Sort by Tag</h4>" +  "<ul class=tagSortList style='list-style-type:none'>"
  + "</ul>")
  
  for (var i = 0; i < tags.length; i ++) {
      $(".tagSortList").html("<li>" + tags[i] + "</li>");
  }
}

function recentSnippets() {

    var recentSnippets = [];

    for (var i = 0; i < /*dataFromServer.length*/; i++) {
      recentSnippets.push(dataArr[i]);
    };
    
    $(".recent-snippets-and-search").html("<h4>Recent Snippets</h4>" +  "<ul class=recentSnippetsList style='list-style-type:none'>"
  + "</ul>");
  
  for (var i = 0; i < tags.length; i ++) {
      $(".recentSnippetsList").html("<li>" + recenetSnippets[i] + "</li>");
  }
}

function sidebarSnippetSearch() {
  $(".user-snippet-search").html("<input class='uk-input uk-form-width-medium' type='text' placeholder='Search Your Snippets'></input>" + "<button class='uk-button uk-button-default'>Search</button>");
}

// $(document).ready(function() {
//     sidebarSnippetSearch();
//     recentSnippets();
//     tagSort();
//     languageSort();
// })

/*****************NAV BAR JQUERY ELEMENT GENERATION*************/


/*****************MAIN CONTENT JQUERY ELEMENT GENERATION*************/
function popularSnippets() {
  
  var popSnippets = [];   

  for (var i = 0; i < /*dataFromServer.length*/; i++) {
    popSnippets.push(dataArr[i]);
  };

  for (var i = 0; i < popSnippets.length; i++) {
  $(".snippets-container").html(`<div class='uk-card uk-card-default uk-width-1-2@m'><div class='uk-card-header'><div class='uk-grid-small uk-flex-middle' uk-grid><div class='uk-width-expand'><h3 class='uk-card-title uk-margin-remove-bottom'>`+Code block title+`</h3><p class='uk-text-meta uk-margin-remove-top'>`+Code description. ipsum ipsum.+`</p></div></div></div><div class='uk-card-body'><p>`+Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.+`</p></div></div>`);
  }
}

/**************************Taylor*******************************/

/**************************Craig*******************************/










/**************************Craig*******************************/
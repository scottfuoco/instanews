$(function() {
  $('#section-select').on('change', function(e) {
    e.preventDefault();
    
    var $newsStoriesList = $('#new-stories-list');    
    var selection = $('#section-select').val();
    
var url = "https://api.nytimes.com/svc/topstories/v2/"+selection+".json";
url += '?' + $.param({
  'api-key': "193e3d7d6bf949bc9e5d62ae2565e5eb"
});
   
    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {        
        var newsStoriesMarkup = '';
        var storiesCount = 0;
        
        $.each(data.results, function( key, value ){
          if (value.multimedia.length > 0){
            newsStoriesMarkup +=   '<li><img src="'+ value.multimedia[3].url + '" />';
            newsStoriesMarkup +=   '<p>'+value.abstract+'<p/></li>';
            storiesCount++;
            
            if(storiesCount >= 11){
              return false;
            }
          }
        });

      $newsStoriesList.html(newsStoriesMarkup);
    })
    .fail(function(err) {
      throw err;
    });
    
  });
});

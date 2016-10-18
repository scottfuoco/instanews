$(function() {
  
var firstTimeSelecting = true;
var $newsStoriesList = $('#news-stories-list');
var $header = $('header');
  
 $('#section-select').heapbox({
'onChange':function(){
  $('.loading-image').show();

  if (firstTimeSelecting) {
    $('.logoContainer').width('100px');

      var curHeight = $header.height();
      var autoHeight = $header.height('auto').height();
            
      $header.height(curHeight);
      $header.height(autoHeight);
      
      $header.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
      function() {
        $header.height('auto');
      }); 

      $('#section-select option[value=sections]').remove();
      $('#section-select').heapbox('update');
      
      firstTimeSelecting = false;
    }    
    
    var selection = $('#section-select').val();

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': '193e3d7d6bf949bc9e5d62ae2565e5eb'
    });
    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {        

      $('.loading-image').hide();
        var filteredData = data.results.filter(function(value){
          return value.multimedia.length >= 5;
        });

        filteredData.splice(12);
        
        var newsStoriesMarkup = '';
        $.each(filteredData, function ( key, value ) {
            newsStoriesMarkup += '<li>';
            newsStoriesMarkup += '<a href="'+value.url+'">'
            newsStoriesMarkup += '<div class="article-background" style="background-image:url('+ value.multimedia[4].url + ')">';
            newsStoriesMarkup += '<p class="article-abstract">'+value.abstract;
            newsStoriesMarkup += '</p></div></a></li>';
        })

      $newsStoriesList.html(newsStoriesMarkup);
    })
    .fail(function(err) {
      throw err;
    })
    .always(function(){              
      
    })    

}
});
  
  $('#news-stories-list').on('mouseenter mouseleave', 'li', function(){
    $(this).find('.article-abstract').slideToggle(1000);
  });
});

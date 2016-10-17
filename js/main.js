$(function() {
  
var firstTimeSelecting = true;
var $newsStoriesList = $('#news-stories-list');
//var $header = $('header');
  
 $('#section-select').heapbox({
'onChange':function(){
     
  if (firstTimeSelecting) {
      $('header').height('auto');   
      $('#section-select option[value=sections]').remove();
      $('#section-select').heapbox('update');
      $('.logoContainer').width('100px');

      firstTimeSelecting = false;
    }
    
    $('.loading-image').show();

    $newsStoriesList.find('.article-background').removeClass('article-background-animate');
    
    var selection = $('#section-select').val();

    var url = 'https://api.nytimes.com/svc/topstories/v2/'+selection+'.json';
    url += '?' + $.param({
      'api-key': '193e3d7d6bf949bc9e5d62ae2565e5eb'
    });

    $.ajax({
      url: url,
      method: 'GET',
    })
    .done(function(data) {        

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
      $newsStoriesList.find('.article-background').addClass('article-background-animate');
    })
    .fail(function(err) {
      throw err;
    })
    .always(function(){              
      $('.loading-image').hide();
    })    

}
});
  
  $('#news-stories-list').on('mouseenter', 'li', function(){
    $(this).find('.article-abstract').slideDown(1000);
  });

  $('#news-stories-list').on('mouseleave', 'li', function(){
    $(this).find('.article-abstract').slideUp(1000);
  });
});

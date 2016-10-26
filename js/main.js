$(function() {
  
let firstTimeSelecting = true;
const $newsStoriesList = $('#news-stories-list');
const $header = $('header');

 $('#section-select').heapbox({
'onChange': () => {

  $('.loading-image').show();

  if (firstTimeSelecting) {
    $('.logoContainer').width('100px');

      let curHeight = $header.height();
      let autoHeight = $header.height('auto').height();
            
      $header.height(curHeight);
      $header.height(autoHeight);
      
      $header.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
      () => {
        $header.height('auto');
      }); 

      $('#section-select option[value=sections]').remove();
      $('#section-select').heapbox('update');
      
      firstTimeSelecting = false;
    }    
    
    const selection = $('#section-select').val();

    let url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': '193e3d7d6bf949bc9e5d62ae2565e5eb'
    });
    $.ajax({
      url: url,
      method: 'GET',
    })
    .done((data) => {        
      $('.loading-image').hide();
        let filteredNewsStories = data.results.filter((value) =>
          value.multimedia.length >= 5
        ).splice(0,12);
        
        let newsStoriesMarkup = '';

        for(const {url, multimedia, abstract} of filteredNewsStories){
            newsStoriesMarkup += `<li>
                                  <a href="${url}">
                                  <div class="article-background" style="background-image:url(${multimedia[4].url})">
                                  <p class="article-abstract">${abstract}
                                  </p></div></a></li>`;
        }
      $newsStoriesList.html(newsStoriesMarkup);
    })
    .fail((err) => {
      throw err;
    })
    .always(() => {              
      
    })    
}
});
  
  $('#news-stories-list').on('mouseenter mouseleave', 'li', function(){
    $(this).find('.article-abstract').slideToggle(500);
  });
});

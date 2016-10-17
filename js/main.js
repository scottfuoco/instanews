$(function () {

  var firstTimeSelecting = true;
  var el = $('header');
  $('#section-select').on('change', function () {
    if (firstTimeSelecting) {
      var curHeight = el.height(),
        autoHeight = el.css('height', 'auto').height();

      el.height(curHeight);
      el.height(autoHeight);

      firstTimeSelecting = false;

    }
    var $newsStoriesList = $('#news-stories-list');
    var selection = $('#section-select').val();

    var url = 'https://api.nytimes.com/svc/topstories/v2/' + selection + '.json';
    url += '?' + $.param({
      'api-key': '193e3d7d6bf949bc9e5d62ae2565e5eb'
    });
    $('.loading-image').show();
    $.ajax({
      url: url,
      method: 'GET',
    })
      .done(function (data) {
        var newsStoriesMarkup = '';

        var filteredData = data.results.filter(function (value) {
          return value.multimedia.length >= 5;
        });

        filteredData.splice(12);

        $.each(filteredData, function (key, value) {
          newsStoriesMarkup += '<li>';
          newsStoriesMarkup += '<a href="' + value.url + '">'
          newsStoriesMarkup += '<div class="article-background" style="background-image:url(' + value.multimedia[4].url + ')">';
          newsStoriesMarkup += '<p class="article-abstract">' + value.abstract;
          newsStoriesMarkup += '</p></div></a></li>';
        })

        $newsStoriesList.html(newsStoriesMarkup);
        el.height('auto');
      })
      .fail(function (err) {
        throw err;
      })
      .always(function () {
        $('.loading-image').hide();
      })
  });

  $('#news-stories-list').on('mouseenter', 'li', function () {
    $(this).find('.article-abstract').slideDown(1000);
  });

  $('#news-stories-list').on('mouseleave', 'li', function () {
    $(this).find('.article-abstract').slideUp(1000);
  });
});

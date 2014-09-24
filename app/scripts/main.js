$(document).ready(function() {
  var $header = $('header.navbar'),
      $window = $(window),
      $main = $('.main'),
      $wrapper = $('.projects-wrapper'),
      $footer = $('.footer')
      projectsHeight = 0,
      projectW = 0,
      width = 0,
      height = 0;

  $wrapper.extraScrollbar({
      paddingLeft: 60,
      suppressScrollY: true,
      useBothWheelAxes: true,
      enableMouseWheel: true
  });

  function resizeHandler() {
    if( $window.width() !== width || $window.height() !== height) {
      width = $window.width();
      height = $window.height();
      projectsHeight = height - $header.outerHeight(true) - $footer.outerHeight(true);

      if ( projectsHeight > 360 ) {
        projectsHeight = Math.round(projectsHeight / 2) * 2;
        projectW = projectsHeight / 2;
      } else {
        projectW = projectsHeight;
      }

      $main.height(projectsHeight);
      $('.project',$wrapper).each(function() {
        //  1px border left and 1px boder right
        $(this).height(projectW - 2).width(projectW - 2);
        if ( $(this).hasClass('large') ) {
          $(this).width(projectW * 2 - 2);
        }
      });
      if ($wrapper.data("isotope")) {
          $wrapper.isotope('layout');
          $main.extraScrollbar('update');
      }
    }
  }
  resizeHandler();

  $wrapper.isotope({
    itemselector: '.project',
    layoutMode: 'masonryHorizontal',
    masonryHorizontal: { rowHeight: '.project'}
  });
  $wrapper.isotope('on', 'layoutComplete', function() {
      $main.extraScrollbar('update');
  });

  $window.resize(resizeHandler);
});

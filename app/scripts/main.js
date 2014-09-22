$(document).ready(function() {
  var $header = $('.header'),
      $window = $(window),
      $projects = $('.projects'),
      $wrapper = $('.projects-wrapper'),
      projectsH = 0,
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
      projectsH = height - $header.outerHeight(true);

      if ( projectsH > 360 ) {
        projectsH = Math.round(projectsH / 2) * 2;
        projectW = projectsH / 2;
      } else {
        projectW = projectsH;
      }

      $wrapper.height(projectsH);
      $('.project',$wrapper).each(function() {
        //  1px border left and 1px boder right
        $(this).height(projectW - 2).width(projectW - 2);
        if ( $(this).hasClass('large') ) {
          $(this).width(projectW * 2 - 2);
        }
      });
      if ($wrapper.data("isotope")) {
          $wrapper.isotope('layout');
          $projects.extraScrollbar('update');
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
      $projects.extraScrollbar('update');
  });

  $window.resize(resizeHandler);
});

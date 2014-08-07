(function() {
  /*  var mySwiper = null;

    var MenuItem = function MenuItem() {};
    MenuItem.prototype = {
        constructor: MenuItem,
        load: function () {
            var $this = $(this);

            $('.backstretch').hide();
            $('section.container').addClass('hidden');

            if ( $this.hasClass('folders') ) {
                loadSelectProject.call(this, $this.prop('href'));
            } else {
                loadProject.call(this, $this.prop('href'));
            }

            return false;
        },
        onClick: function ( event ) {
            var $this = $(this),
                $parent = $this.parent('nav');

            $('.active', $parent).removeClass('active');
            $this.addClass('active');
            MenuItem.prototype.load.call($this);

            return false;
        },
        onToggle: function( event ){
            var $this = $(this),
                $parent = $this.parent('nav');
            console.log('TODO: Implement this.')

        }
    }

    function openProject( event ) {
        var url = $(this).prop('href');

        loadProject.call(this, url);

        return false;
    }

    function loadProject( url ) {
        $('.project-load').load(url, function() {
            $('section.container').addClass('hidden');
            $(this).removeClass('hidden');

            var mySwiper = new Swiper('.project-load', {
                wrapperClass: 'container-wrapper',
                slideClass: 'project-image',
                slidesPerView: 'auto',
                scrollContainer: true,
                mousewheelControl: true
            });

            setTimeout(imageSize, 100);
        });
    }

    function loadSelectProject( url ) {
        $('.project-load').load(url, function() {
            $('section.container').addClass('hidden');
            $(this).removeClass('hidden');

            var mySwiper = new Swiper('.project-load', {
                wrapperClass: 'container-wrapper',
                slideClass: 'project-item',
                slidesPerView: 'auto',
                scrollContainer: true,
                mousewheelControl: true
            });
        });
    }

    function imageSize() {
        var height = $(window).height();

        $('.project-image').height( height - 200 );
    }*/

    $(document)
        .on('click','.navigation nav a', MenuItem.prototype.onClick)
        .on('click', '.navigation .toggle', MenuItem.prototype.onToggle)
        .on('click', '.container .project-item a', openProject)
        .ready(function() {
            $.backstretch([
                "images/panorama/01_Panarama 2x.jpg"
              , "images/panorama/02_Panarama 2x.jpg"
              , "images/panorama/03_Panarama 2x.jpg"
              , "images/panorama/04_Panarama 2x.jpg"
              , "images/panorama/05_Panarama 2x.jpg"
              , "images/panorama/06_Panarama 2x.jpg"
              , "images/panorama/07_Panarama 2x.jpg"
              , "images/panorama/08_Panarama 2x.jpg"
              , "images/panorama/09_Panarama 2x.jpg"
              , "images/panorama/10_Panarama 2x.jpg"
              , "images/panorama/11_Panarama 2x.jpg"
              , "images/panorama/12_Panarama 2x.jpg"
            ], {duration: 3000, fade: 750});
        });


    $(window)
        .on('resize', imageSize);

})(window.jQuery);

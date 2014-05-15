(function() {

    var MenuItem = function MenuItem() {};
    MenuItem.prototype = {
        constructor: MenuItem,
        load: function ( src, callback ) {
            $('.container').load(src, callback)
        },
        onClick: function (event) {
            var $this = $(this);

            $this.parent('.nav').find('.active').removeClass('active');
            $this.addClass('active');

            MenuItem.prototype.load($this.data('src'), function() {
                $('div.container .personal-box').onScreen({
                    container: '.personal-wrap',
                    direction: 'horizontal',
                    toggleClass: 'show',
                    tolerance: 50
                });
            });
        }
    }

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;

        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        $('.portfolio').find('.portfolio-item').each(function () {
            $(this).css( {
                width : postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
    }

    $(document)
        .on('click','header .nav a', MenuItem.prototype.onClick)
        .ready(function() {
            $.backstretch([
                "/images/panorama/buerchenMystik1.2x.jpg"
              , "/images/panorama/buerchenMystik2.2x.jpg"
              , "/images/panorama/buerchenMystik3.2x.jpg"
              , "/images/panorama/drawing1.2x.jpg"
              , "/images/panorama/drawing2.2x.jpg"
              , "/images/panorama/drawing3.2x.jpg"
              , "/images/panorama/graduationProject1.2x.jpg"
              , "/images/panorama/graduationProject2.2x.jpg"
              , "/images/panorama/graduationProject3.2x.jpg"
            ], {duration: 3000, fade: 750});

            //$('.nav .active').trigger('click');
        });

    $(window)
        .on('resize', setProjects);

})(window.jQuery);
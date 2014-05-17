(function() {
    var mySwiper = null;

    var MenuItem = function MenuItem() {};
    MenuItem.prototype = {
        constructor: MenuItem,
        load: function ( name ) {
            $('.backstretch').hide();
            $('section.container').addClass('hidden')
            switch (name) {
                case 'architecture':
                    $('section.architecture').removeClass('hidden');
                    break;
                case 'development':
                    $('section.development').removeClass('hidden');
                    break;
                case 'contact':
                    $('section.contact').removeClass('hidden');
                    break;
                case 'personal':
                    $('section.personal').removeClass('hidden');
                    break;
                default:
                    $('section.load').load($(this).data('src'), function() {
                        //.removeClass('hidden');
                    });
            }
        },
        onClick: function (event) {
            var $this = $(this),
                $parent = $this.parent('nav');

            $('.active', $parent).removeClass('active');
            $this.addClass('active');
            MenuItem.prototype.load.call($this, $this.data('name'));
            mySwiper.resizeFix();

            /*
            MenuItem.prototype.load($this.data('src'), function() {
                $('div.container .personal-box').onScreen({
                    container: '.personal-wrap',
                    direction: 'horizontal',
                    toggleClass: 'show',
                    tolerance: 50
                });*/
            //});
        }
    }
/*
    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;

        if (winWidth > 1024) {
            columnNumb = 3;
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
        //setColumns();
    }
*/
    $(document)
        .on('click','.navigation a', MenuItem.prototype.onClick)
        .ready(function() {
            $.backstretch([
                "images/panorama/buerchenMystik1.2x.jpg"
              , "images/panorama/buerchenMystik2.2x.jpg"
              , "images/panorama/buerchenMystik3.2x.jpg"
              , "images/panorama/drawing1.2x.jpg"
              , "images/panorama/drawing2.2x.jpg"
              , "images/panorama/drawing3.2x.jpg"
              , "images/panorama/graduationProject1.2x.jpg"
              , "images/panorama/graduationProject2.2x.jpg"
              , "images/panorama/graduationProject3.2x.jpg"
            ], {duration: 3000, fade: 750});

            mySwiper = new Swiper('section.architecture', {
                wrapperClass: 'container-wrapper',
                slideClass: 'project-item',
                slidesPerView: 'auto',
                scrollContainer: true,
                mousewheelControl: true
            })
        });

/*
    $(window)
        .on('resize', setProjects);
*/
})(window.jQuery);
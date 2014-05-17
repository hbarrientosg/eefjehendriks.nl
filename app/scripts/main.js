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
                    loadProject.call(this, $(this).prop('href'));
            }
            return false;
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
            return false;
        },
        onToggle: function( event ){
            var $this = $(this),
                $parent = $this.parent('nav');
            console.log('TODO: Implement this.')

        }
    }

    function openProject(event) {
        var url = $(this).prop('href');

        loadProject.call(this, url);

        return false;
    }

    function loadProject(url) {
        $('.project-load').load(url, function() {
            $('section.container').addClass('hidden');
            $(this).removeClass('hidden');

            var mySwiper = new Swiper(this, {
                wrapperClass: 'container-wrapper',
                slideClass: 'project-image',
                slidesPerView: 'auto',
                scrollContainer: true,
                mousewheelControl: true
            });

            imageSize();
        });
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
*/
    function imageSize() {
        var height = $(window).height();

        $('.project-image').height( height - 200 );
    }

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

            mySwiper = new Swiper('section.architecture', {
                wrapperClass: 'container-wrapper',
                slideClass: 'project-item',
                slidesPerView: 'auto',
                scrollContainer: true,
                mousewheelControl: true
            })
        });


    $(window)
        .on('resize', imageSize);

})(window.jQuery);
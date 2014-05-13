(function() {

    var MenuItem = function MenuItem() {};
    MenuItem.prototype = {
        constructor: MenuItem,
        load: function ( src ) {
            $('.container').load(src)
        },
        onClick: function (event) {
            var $this = $(this);

            $this.parent('.nav').find('.active').removeClass('active');
            $this.addClass('active');

            MenuItem.prototype.load($this.data('src'));
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
        .on('click','header .nav a', MenuItem.prototype.onClick);
    $(window)
        .on('resize', setProjects);

})(window.jQuery);
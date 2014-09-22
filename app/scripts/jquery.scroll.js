(function($) {
		'use strict';
    var defaultSettings = {enableMouseWheel: true,paddingTop: 10,paddingRight: 10,paddingBottom: 10,paddingLeft: 10,minScrollbarLength: null,suppressScrollX: false,suppressScrollY: false,useBothWheelAxes: false,useKeyboard: true,wheelSpeed: 100,wheelPropagation: false};
    $.fn.extraScrollbar = function(suppliedSettings, option) {
        return this.each(function() {
            var settings = $.extend(true, {}, defaultSettings), $this = $(this);
            if (typeof suppliedSettings === "object") {
                $.extend(true, settings, suppliedSettings);
            } else {
                option = suppliedSettings;
            }
            if (option === 'update') {
                if ($this.data('extra-scrollbar-update')) {
                    $this.data('extra-scrollbar-update')();
                }
                return $this;
            } else if (option === 'destroy') {
                if ($this.data('extra-scrollbar-destroy')) {
                    $this.data('extra-scrollbar-destroy')();
                }
                return $this;
            }
            if ($this.data('extra-scrollbar')) {
                return $this.data('extra-scrollbar');
            }
            $this.addClass('extra-container');
            var $scrollbarXRail = $("<div class='extra-scrollbar-x-rail'></div>").insertAfter($this), $scrollbarYRail = $("<div class='extra-scrollbar-y-rail'></div>").insertAfter($this), $scrollbarX = $("<div class='extra-scrollbar-x'></div>").appendTo($scrollbarXRail), $scrollbarY = $("<div class='extra-scrollbar-y'></div>").appendTo($scrollbarYRail), scrollbarXActive, scrollbarYActive, containerWidth, containerHeight, contentWidth, contentHeight, scrollHeight, scrollWidth, scrollbarXWidth, scrollbarXLeft, scrollbarYHeight, scrollbarYTop;
            var updateContentScrollTop = function() {
                var scrollTop = parseInt(scrollbarYTop * (contentHeight - scrollHeight) / (scrollHeight - scrollbarYHeight), 10);
                $this.scrollTop(scrollTop);
            };
            var updateContentScrollLeft = function() {
                var scrollLeft = parseInt(scrollbarXLeft * (contentWidth - scrollWidth) / (scrollWidth - scrollbarXWidth), 10);
                $this.scrollLeft(scrollLeft);
            };
            var getSettingsAdjustedThumbSize = function(thumbSize) {
                if (settings.minScrollbarLength) {
                    thumbSize = Math.max(thumbSize, settings.minScrollbarLength);
                }
                return thumbSize;
            };
            var updateScrollbarCss = function() {
                $scrollbarXRail.css({width: $this.outerWidth() - (settings.paddingLeft + settings.paddingRight),left: settings.paddingLeft});
                $scrollbarX.css({left: scrollbarXLeft,width: scrollbarXWidth});
                $scrollbarYRail.css({height: $this.outerHeight() - (settings.paddingTop + settings.paddingBottom),top: settings.paddingTop});
                $scrollbarY.css({top: scrollbarYTop,height: scrollbarYHeight});
            };
            var updateBarSizeAndPosition = function() {
                containerWidth = $this.parent().outerWidth();
                containerHeight = $this.parent().outerHeight();
                scrollWidth = $this.outerWidth() - (settings.paddingLeft + settings.paddingRight);
                scrollHeight = $this.outerHeight() - (settings.paddingTop + settings.paddingBottom);
                contentWidth = $this.prop('scrollWidth');
                contentHeight = $this.prop('scrollHeight');
                if (!settings.suppressScrollX && containerWidth < contentWidth) {
                    scrollbarXActive = true;
                    scrollbarXWidth = getSettingsAdjustedThumbSize(parseInt(scrollWidth * scrollWidth / contentWidth, 10));
                    scrollbarXLeft = parseInt($this.scrollLeft() * (scrollWidth - scrollbarXWidth) / (contentWidth - scrollWidth), 10);
                } else {
                    scrollbarXActive = false;
                    scrollbarXWidth = 0;
                    scrollbarXLeft = 0;
                    $this.scrollLeft(0);
                }
                if (!settings.suppressScrollY && containerHeight < contentHeight) {
                    scrollbarYActive = true;
                    scrollbarYHeight = getSettingsAdjustedThumbSize(parseInt(scrollHeight * containerHeight / contentHeight, 10));
                    scrollbarYTop = parseInt($this.scrollTop() * (scrollHeight - scrollbarYHeight) / (contentHeight - scrollHeight), 10);
                } else {
                    scrollbarYActive = false;
                    scrollbarYHeight = 0;
                    scrollbarYTop = 0;
                    $this.scrollTop(0);
                }
                if (scrollbarYTop >= scrollHeight - scrollbarYHeight) {
                    scrollbarYTop = scrollHeight - scrollbarYHeight;
                }
                if (scrollbarXLeft >= scrollWidth - scrollbarXWidth) {
                    scrollbarXLeft = scrollWidth - scrollbarXWidth;
                }
                if (Math.abs(contentWidth - containerWidth) < 5) {
                    $scrollbarX.hide();
                } else {
                    $scrollbarX.show();
                }
                if (Math.abs(contentHeight - containerHeight) < 5) {
                    $scrollbarY.hide();
                } else {
                    $scrollbarY.show();
                }
                updateScrollbarCss();
            };
            var moveBarX = function(currentLeft, deltaX) {
                var newLeft = currentLeft + deltaX, maxLeft = scrollWidth - scrollbarXWidth;
                if (newLeft < 0) {
                    scrollbarXLeft = 0;
                } else if (newLeft > maxLeft) {
                    scrollbarXLeft = maxLeft;
                } else {
                    scrollbarXLeft = newLeft;
                }
                $scrollbarX.css({left: scrollbarXLeft});
            };
            var moveBarY = function(currentTop, deltaY) {
                var newTop = currentTop + deltaY, maxTop = scrollHeight - scrollbarYHeight;
                if (newTop < 0) {
                    scrollbarYTop = 0;
                } else if (newTop > maxTop) {
                    scrollbarYTop = maxTop;
                } else {
                    scrollbarYTop = newTop;
                }
                $scrollbarY.css({top: scrollbarYTop});
            };
            var bindMouseScrollXHandler = function() {
                var currentLeft, currentPageX;
                $scrollbarX.bind('mousedown.extra-scrollbar', function(e) {
                    currentPageX = e.pageX;
                    currentLeft = $scrollbarX.position().left;
                    $scrollbarXRail.addClass('in-scrolling');
                    e.stopPropagation();
                    e.preventDefault();
                });
                $(document).bind('mousemove.extra-scrollbar', function(e) {
                    if ($scrollbarXRail.hasClass('in-scrolling')) {
                        updateContentScrollLeft();
                        moveBarX(currentLeft, e.pageX - currentPageX);
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });
                $(document).bind('mouseup.extra-scrollbar', function(e) {
                    if ($scrollbarXRail.hasClass('in-scrolling')) {
                        $scrollbarXRail.removeClass('in-scrolling');
                    }
                });
                currentLeft = currentPageX = null;
            };
            var bindMouseScrollYHandler = function() {
                var currentTop, currentPageY;
                $scrollbarY.bind('mousedown.extra-scrollbar', function(e) {
                    currentPageY = e.pageY;
                    currentTop = $scrollbarY.position().top;
                    $scrollbarYRail.addClass('in-scrolling');
                    e.stopPropagation();
                    e.preventDefault();
                });
                $(document).bind('mousemove.extra-scrollbar', function(e) {
                    if ($scrollbarYRail.hasClass('in-scrolling')) {
                        updateContentScrollTop();
                        moveBarY(currentTop, e.pageY - currentPageY);
                        e.stopPropagation();
                        e.preventDefault();
                    }
                });
                $(document).bind('mouseup.extra-scrollbar', function(e) {
                    if ($scrollbarYRail.hasClass('in-scrolling')) {
                        $scrollbarYRail.removeClass('in-scrolling');
                    }
                });
                currentTop = currentPageY = null;
            };
            var bindMouseWheelHandler = function() {
                var shouldPreventDefault = function(deltaX, deltaY) {
                    var scrollTop = $this.scrollTop();
                    if (scrollTop === 0 && deltaY > 0 && deltaX === 0) {
                        return !settings.wheelPropagation;
                    } else if (scrollTop >= contentHeight - containerHeight && deltaY < 0 && deltaX === 0) {
                        return !settings.wheelPropagation;
                    }
                    var scrollLeft = $this.scrollLeft();
                    if (scrollLeft === 0 && deltaX < 0 && deltaY === 0) {
                        return !settings.wheelPropagation;
                    } else if (scrollLeft >= contentWidth - containerWidth && deltaX > 0 && deltaY === 0) {
                        return !settings.wheelPropagation;
                    }
                    return true;
                };
                var shouldPrevent = false;
                $this.bind('mousewheel.extra-scrollbar', function(e, delta, deltaX, deltaY) {
                    if (!settings.useBothWheelAxes) {
                        $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                        $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
                    } else if (scrollbarYActive && !scrollbarXActive) {
                        if (deltaY) {
                            $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                        } else {
                            $this.scrollTop($this.scrollTop() + (deltaX * settings.wheelSpeed));
                        }
                    } else if (scrollbarXActive && !scrollbarYActive) {
                        if (deltaX) {
                            $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
                        } else {
                            $this.scrollLeft($this.scrollLeft() - (deltaY * settings.wheelSpeed));
                        }
                    }
                    updateBarSizeAndPosition();
                    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });
                $this.bind('MozMousePixelScroll.extra-scrollbar', function(e) {
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });
            };
            var bindKeyboardHandler = function() {
                var shouldPreventDefault = function(deltaX, deltaY) {
                    var scrollTop = $this.scrollTop();
                    if (scrollTop === 0 && deltaY > 0 && deltaX === 0) {
                        return false;
                    } else if (scrollTop >= contentHeight - containerHeight && deltaY < 0 && deltaX === 0) {
                        return false;
                    }
                    var scrollLeft = $this.scrollLeft();
                    if (scrollLeft === 0 && deltaX < 0 && deltaY === 0) {
                        return false;
                    } else if (scrollLeft >= contentWidth - containerWidth && deltaX > 0 && deltaY === 0) {
                        return false;
                    }
                    return true;
                };
                var hovered = false;
                $this.bind('mouseenter.extra-scrollbar', function(e) {
                    hovered = true;
                });
                $this.bind('mouseleave.extra-scrollbar', function(e) {
                    hovered = false;
                });
                var shouldPrevent = false;
                $(document).bind('keydown.extra-scrollbar', function(e) {
                    if (!hovered) {
                        return;
                    }
                    var deltaX = 0, deltaY = 0;
                    switch (e.which) {
                        case 37:
                            deltaX = -3;
                            break;
                        case 38:
                            deltaY = 3;
                            break;
                        case 39:
                            deltaX = 3;
                            break;
                        case 40:
                            deltaY = -3;
                            break;
                        default:
                            return;
                    }
                    $this.scrollTop($this.scrollTop() - (deltaY * settings.wheelSpeed));
                    $this.scrollLeft($this.scrollLeft() + (deltaX * settings.wheelSpeed));
                    updateBarSizeAndPosition();
                    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
                    if (shouldPrevent) {
                        e.preventDefault();
                    }
                });
            };
            var bindRailClickHandler = function() {
                var stopPropagation = function(e) {
                    e.stopPropagation();
                };
                $scrollbarY.bind('click.extra-scrollbar', stopPropagation);
                $scrollbarYRail.bind('click.extra-scrollbar', function(e) {
                    var halfOfScrollbarLength = parseInt(scrollbarYHeight / 2, 10), positionTop = e.pageY - $scrollbarYRail.offset().top - halfOfScrollbarLength, maxPositionTop = containerHeight - scrollbarYHeight, positionRatio = positionTop / maxPositionTop;
                    if (positionRatio < 0) {
                        positionRatio = 0;
                    } else if (positionRatio > 1) {
                        positionRatio = 1;
                    }
                    $this.scrollTop((contentHeight - containerHeight) * positionRatio);
                    updateBarSizeAndPosition();
                });
                $scrollbarX.bind('click.extra-scrollbar', stopPropagation);
                $scrollbarXRail.bind('click.extra-scrollbar', function(e) {
                    var halfOfScrollbarLength = parseInt(scrollbarXWidth / 2, 10), positionLeft = e.pageX - $scrollbarXRail.offset().left - halfOfScrollbarLength, maxPositionLeft = containerWidth - scrollbarXWidth, positionRatio = positionLeft / maxPositionLeft;
                    if (positionRatio < 0) {
                        positionRatio = 0;
                    } else if (positionRatio > 1) {
                        positionRatio = 1;
                    }
                    $this.scrollLeft((contentWidth - containerWidth) * positionRatio);
                    updateBarSizeAndPosition();
                });
            };
            var destroy = function() {
                $this.unbind('.extra-scrollbar');
                $(window).unbind('.extra-scrollbar');
                $(document).unbind('.extra-scrollbar');
                $this.data('extra-scrollbar', null);
                $this.data('extra-scrollbar-update', null);
                $this.data('extra-scrollbar-destroy', null);
                $scrollbarX.remove();
                $scrollbarY.remove();
                $scrollbarXRail.remove();
                $scrollbarYRail.remove();
                $scrollbarX = $scrollbarY = containerWidth = containerHeight = contentWidth = contentHeight = scrollbarXWidth = scrollbarXLeft = scrollbarYHeight = scrollbarYTop = null;
            };
            var initialize = function() {
                updateBarSizeAndPosition();
                bindMouseScrollXHandler();
                bindMouseScrollYHandler();
                bindRailClickHandler();
                if (settings.enableMouseWheel && $this.mousewheel) {
                    bindMouseWheelHandler();
                }
                if (settings.useKeyboard) {
                    bindKeyboardHandler();
                }
                $this.data('extra-scrollbar', $this);
                $this.data('extra-scrollbar-update', updateBarSizeAndPosition);
                $this.data('extra-scrollbar-destroy', destroy);
            };
            initialize();
            return $this;
        });
    };
})(jQuery);

/**
 *  Информация о загрузках
 *
 *  var myLoader = $.loader({
 *      on: {duration: 500, message: 'Сохраняю...', addClass: 'save-on'},
 *      off: {duration: 1500, message: 'Сохранено.', addClass: 'save-off'}
 *  });
 *
 *  $.loader('off', myLoader);
 */
(function($){
    var id = 0;
    var items = [];
    var container = $('<div class="loader-container"></div>');
    var block = $('<div class="loader-block"></div>');
    var init = false;

    $.extend({
        loader: function(action, options){
            if (!init) {
                init = true;
                $('body').append(container);
            }

            if (typeof action == 'object' && typeof options == 'undefined') {
                options = action;
                action = 'on';
            }

            if (action == 'on') {
                id = ++id;
                var item = $.extend(options, {id: id});

                item.block = block.clone();
                item.block
                    .hide()
                    .html(item.on.message)
                    .addClass(item.on.addClass);
                container
                    .append(item.block)
                    .show();
                item.block.fadeIn(item.on.duration);

                items.push(item);

                return id;
            }

            if (action == 'off') {
                var item = null;

                if (items.length) {
                    var _items = [];
                    for (var k = 0; k < items.length; k++) {
                        if (items[k].id == options) {
                            item = items[k];
                        } else {
                            _items.push(items[k]);
                        }
                    }
                    items = _items;
                    _items = null;
                }

                if (item) {
                    item.block
                        .html(item.off.message)
                        .removeClass(item.on.addClass)
                        .addClass(item.off.addClass)
                        .fadeOut(item.off.duration, function(){
                            item.block.remove();

                            if (!items.length) {
                                container.hide();
                            }
                        });
                }
            }
        }
    });
})(jQuery);
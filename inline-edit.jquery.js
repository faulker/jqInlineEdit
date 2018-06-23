/**
 * Created by Winter Faulk
 * https://github.com/faulker/jqInlineEdit
 */
$(function ($) {
    $.fn.inlineEdit = function (options) {
        var running = false,
            $oldThis,
            newHtml,
            newValue,
            $this = $(this),
            settings = $.extend({}, $.fn.inlineEdit.defaults, options);

        var init = function () {
            $this.on(settings.on, function () {
                if (running === false) {
                    var html;

                    running = true;
                    $oldThis = $this.clone();

                    switch (settings.type.toLowerCase()) {
                        case 'textarea':
                            html = buildInlineTextarea($this);
                            $this.html(html);
                            $this.find('textarea').focusout(saveChanges).focus();
                            break;
                        case 'select':
                            html = buildInlineSelect($this);
                            $this.html(html);
                            $this.find('select').change(saveChanges).focusout(saveChanges).focus();
                            break;
                        case 'text':
                        default:
                            html = buildInlineText($this);
                            $this.html(html);
                            $this.find('input').focusout(saveChanges).focus();
                    }

                    if (settings.hasOwnProperty('onEdit')) {
                        settings.onEdit($this);
                    }

                    $this.trigger('inlineEdit.on.edit');
                }
            })
        }

        var saveChanges = function () {
            var oldStr = $oldThis.text().trim();

            switch (this.nodeName) {
                case 'SELECT':
                    newValue = $(this).find(':selected').text();
                    break;
                case 'TEXTAREA':
                default:
                    newValue = $(this).val();
            }

            newHtml = $oldThis.html().replace(oldStr, newValue);

            $(this).parent().html(newHtml);

            saveEvent(this);
            running = false;
        }

        var saveEvent = function (e) {
            var oldStr = $oldThis.text();

            if (settings.trim) {
                oldStr = oldStr.trim();
            }

            if (oldStr !== newValue) {
                if (settings.hasOwnProperty('onChange')) {
                    settings.onChange($this, $(e).val(), newHtml);
                }

                $this.trigger('inlineEdit.on.change');
            }
            else {
                if (settings.hasOwnProperty('onNoChange')) {
                    settings.onNoChange($this);
                }

                $this.trigger('inlineEdit.on.noChange');
            }
        }

        var buildInlineSelect = function ($this) {
            var output = [],
                $value = settings.data,
                customData = '',
                className = (settings.className !== undefined) ? settings.className : '';

            if (settings.hasOwnProperty('customData')) {
                for (var cdKey in settings.customData) {
                    customData = customData + ' ' + cdKey + '="' + settings.customData[cdKey] + '"';
                }
            }

            output.push('<select class="' + className + '" ' + customData + '>');

            for (var key in $value) {
                var selected = '',
                    oldStr = $this.text().trim(),
                    newStr = $value[key].trim();

                if (oldStr === newStr) {
                    selected = 'selected="selected"'
                }

                output.push('<option value="' + key + '"' + selected + '>' + newStr + '</option>');
            }
            output.push('</select>');

            return output.join('\n');
        }

        var buildInlineText = function ($this) {
            var className = (settings.className !== undefined) ? settings.className : '',
                customData = '',
                str = $this.text();

            if (settings.trim) {
                str = str.trim();
            }

            if (settings.hasOwnProperty('customData')) {
                for (var cdKey in settings.customData) {
                    customData = customData + ' ' + cdKey + '="' + settings.customData[cdKey] + '"';
                }
            }

            return '<input type="text" class="' + className + '" value="' + str + '" ' + customData + '>';
        }

        var buildInlineTextarea = function ($this) {
            var className = (settings.className !== undefined) ? settings.className : '',
                customData = '',
                str = $this.text();

            if (settings.trim) {
                str = str.trim();
            }

            if (settings.hasOwnProperty('customData')) {
                for (var cdKey in settings.customData) {
                    customData = customData + ' ' + cdKey + '="' + settings.customData[cdKey] + '"';
                }
            }

            return '<textarea class="' + className + '" ' + customData + '>' + str + '</textarea>';
        }

        // Init each instance of the plugin
        return this.each(function () {
            if (this.inlineEdit) return;

            init();
        });
    }

    $.fn.inlineEdit.defaults = {
        type: 'text',
        on: 'click',
        className: null,
        data: null,
        trim: true,
        onChange: function (el, theText, theHtml) {
        },
        onEdit: function (el) {
        },
        onNoChange: function (el) {
        }
    };
}(jQuery));
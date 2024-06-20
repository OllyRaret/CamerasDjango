;/*
jbForm v0.84 2013-2021
by Jet Bit - http://JetBit.ru

For more information, visit:
http://jetbit.ru/market/jbcallme
*/
(function(a, b, c) {
    function d(b, c) {
        this.element = b,
        this.options = a.extend({}, e, c),
        this._defaults = e,
        this._name = "jbform",
        this.init()
    }
    var e = {
        title: "\u041E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A",
        progress: "\u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435 \u0441\u0435\u043A\u0443\u043D\u0434\u043E\u0447\u043A\u0443",
        success: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E",
        fail: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E",
        modal: !0,
        clickout: !1,
        delay: 4e3,
        fields: {},
        onShow: function() {},
        onSendSuccess: function() {},
        onSendFail: function() {},
        copyright: !0,
        captcha: !1,
        dev_mode: !0,
        key: "null",
        postfix: "default"
    };
    d.prototype.init = function() {
        return this.build()
    }
    ,
    d.prototype.build = function() {
        var d = this;
        if (!a("#jbForm_overlay").length && d.options.modal && (a("<div id=\"jbForm_overlay\" class=\"jbForm_overlay\" style=\"display:none\"></div>").appendTo(a("body")),
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && a("body").addClass("jbIsMobile")),
        !a("#jbForm_" + d.options.postfix).length) {
            d._uid = Math.random().toString(36).substring(5);
            var f = "jbIframe_" + d._uid
              , g = "<div id=\"jbForm_" + d.options.postfix + "\" class=\"jbForm" + (d.options.modal ? "" : " jbInbuilt") + "\"><div class=\"jb_inset\"><div class=\"jb_title\">" + d.options.title + "</div>" + (d.options.modal ? "<a title=\"\u0417\u0430\u043A\u0440\u044B\u0442\u044C\" class=\"jb_close\">\xD7</a>" : "") + "<form class=\"jb_form\" action=\"" + ("https:" == location.protocol ? "https:" : "http:") + "//jbcallme.ru/api/\" enctype=\"multipart/form-data\" accept-charset=\"utf-8\" method=\"POST\" target=\"" + f + "\"></form><div class=\"jb_success\">" + d.options.success + "</div><div class=\"jb_progress\">" + d.options.progress + "</div><div class=\"jb_fail\">" + d.options.fail + "</div></div></div>";
            d.options.modal ? a(g).appendTo(a("body")) : a(d.element).html(g),
            d.$container = a("#jbForm_" + d.options.postfix),
            d.$success = d.$container.find(".jb_success").hide().hide(),
            d.$fail = d.$container.find(".jb_fail").hide(),
            d.$progress = d.$container.find(".jb_progress").hide(),
            d.$overlay = a("#jbForm_overlay"),
            d.$inset = d.$container.find(".jb_inset"),
            d.$form = d.$container.find(".jb_form"),
            a.each(d.options.fields, function(b, c) {
                var e = "";
                if (c.type && "textarea" == c.type)
                    e = "<textarea " + (c.required ? "required=\"required\" " : "") + (c.readonly ? "readonly=\"readonly\" " : "") + (c.input_class ? "class=\"" + c.input_class + "\" " : "") + (c.placeholder ? "placeholder=\"" + c.placeholder + "\" " : "") + "name=\"" + b + "\">" + (c.value ? c.value : "") + "</textarea>";
                else if (c.type && "select" == c.type) {
                    e = "<select " + (c.input_class ? "class=\"" + c.input_class + "\" " : "") + (c.readonly ? "readonly=\"readonly\" " : "") + "name=\"" + b + "\">",
                    e += c.placeholder ? "<option disabled selected hidden>" + c.placeholder + "</option>" : "";
                    for (var f = 0; f < c.options.length; f++)
                        e += "<option value=\"" + c.options[f] + "\"" + (c.value && c.value == c.options[f] ? " selected=\"selected\"" : "") + ">" + c.options[f] + "</option>";
                    e += "</select>"
                } else if (c.type && "checkbox" == c.type)
                    e = "<label class=\"jbForCheckbox\"><input " + (c.input_class ? "class=\"" + c.input_class + "\" " : "") + (c.readonly ? "readonly=\"readonly\" " : "") + (c.required ? "required=\"required\" " : "") + (c.checked ? "checked=\"checked\" " : "") + "type=\"checkbox\" value=\"" + (c.value ? c.value : "Yes") + "\" name=\"" + b + "\"/> " + c.label + "</label>";
                else if (c.type && "radio" == c.type) {
                    e = "<div class=\"jb_ingroup\">";
                    for (var f = 0; f < c.options.length; f++)
                        e += "<label class=\"jbForRadio\"><input " + (c.input_class ? "class=\"" + c.input_class + "\" " : "") + (c.required ? "required=\"required\" " : "") + (c.readonly ? "readonly=\"readonly\" " : "") + "type=\"radio\" value=\"" + c.options[f] + "\" name=\"" + b + "\"" + (c.value && c.value == c.options[f] ? " checked=\"checked\"" : "") + "/> " + c.options[f] + "</label>";
                    e += "</div>"
                } else
                    c.type && "file" == c.type ? e = "<div class=\"jbFileUpload\"><span>" + (c.placeholder ? c.placeholder : "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B") + "</span><input onchange=\"this.innerHTML=this.innerHTML;var fname=jQuery(this).parents('.jb_input').find('.jbFileName').text('');if(window.File && window.FileReader && window.FileList){for(var i=0;i<this.files.length;i++){fname.append('<span>'+this.files[i].name+'</span>')}}else{'<span>'+fname.append($(this).val()+'</span>')}\" " + (c.required ? "required=\"required\" " : "") + (c.multiple ? "multiple=\"multiple\" " : "") + "type=\"file\" name=\"" + b + "[]\" /></div><div class=\"jbFileName\"></div>" : (c.input_class = 0 <= jQuery.inArray(c.type, ["date", "time", "datetime"]) ? "jb_type_" + c.type + (c.input_class ? " " + c.input_class : "") : c.input_class,
                    e = "<input " + (c.required ? "required=\"required\" " : "") + (c.readonly ? "readonly=\"readonly\" " : "") + (c.pattern ? "pattern=\"" + c.pattern + "\" " : "") + (c.placeholder ? "placeholder=\"" + c.placeholder + "\" " : "") + (c.input_class ? "class=\"" + c.input_class + "\" " : "") + (c.value ? "value=\"" + c.value + "\" " : "") + "type=\"" + (c.type && 0 <= jQuery.inArray(c.type, ["submit", "hidden", "text", "email", "number", "tel"]) ? c.type : "text") + "\" name=\"" + b + "\" />");
                "submit" == c.type && d.options.captcha && !d.$form.find(".jb_captcha")[0] && a("<div class=\"jb_input jb_captcha\"><img onClick=\"javascript:this.src='" + ("https:" == location.protocol ? "https:" : "http:") + "//jbcallme.ru/api/captcha.png?uid=" + d._uid + "&'+Math.random();\" alt=\"\"/><input type=\"text\" class=\"jb_captcha_text\" name=\"jb_captcha\" required=\"required\" value=\"\"/></div>").appendTo(d.$form),
                a(("hidden" == c.type ? "" : "<div class=\"jb_input" + (c.wrapper_class ? " " + c.wrapper_class : "") + "\">" + (c.label && "checkbox" != c.type ? "<label>" + c.label + "</label>" : "")) + e + ("hidden" == c.type ? "" : "</div>")).appendTo(d.$form)
            }),
            a("<input type=\"hidden\" name=\"jb_uid\" value=\"" + d._uid + "\"/>").appendTo(d.$form),
            a("<input type=\"hidden\" name=\"jb_API_key\" value=\"" + d.options.key + "\"/>").appendTo(d.$form),
            a("<input type=\"hidden\" name=\"jb_referrer\" value=\"" + document.referrer + "\"/>").appendTo(d.$form),
            a("<input type=\"hidden\" name=\"jb_href\" value=\"" + location.href + "\"/>").appendTo(d.$form),
            "placeholder"in c.createElement("input") || d.$form.find("[placeholder]").focus(function() {
                var b = a(this);
                b.val() == b.attr("placeholder") && (b.val(""),
                b.removeClass("placeholder"))
            }).blur(function() {
                var b = a(this);
                ("" == b.val() || b.val() == b.attr("placeholder")) && (b.addClass("placeholder"),
                b.val(b.attr("placeholder")))
            }),
            d.options.modal ? (a(c).bind("keydown", function(a) {
                if (27 == a.which)
                    return d.end(),
                    !1
            }),
            d.options.modal && d.options.clickout && d.$container.on("click", function(b) {
                if (a(b.target).hasClass("jbForm"))
                    return d.end(),
                    !1
            }),
            d.$container.hide().find(".jb_close").on("click", function() {
                return d.end(),
                !1
            }),
            d.$overlay.hide()) : d.show(),
            d.$form.on("submit", function(c) {
                var e = a("<iframe/>", {
                    id: f,
                    name: f,
                    src: "javascript:;",
                    width: "0",
                    height: "0",
                    tabindex: "-1",
                    sandbox: "allow-forms allow-scripts allow-top-navigation",
                    style: "display:none;border:0px none"
                });
                d.$form.append(e);
                var g = {};
                e.on("load", function() {
                    setTimeout(function() {
                        a("#" + f).remove();
                        var c = g[f];
                        if (void 0 === c)
                            d.$progress.hide(),
                            d.$fail.html("<div class=\"error_msg\">\u0424\u043E\u0440\u043C\u0430 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u0441\u0430\u0439\u0442\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0443\u043A\u0430\u0437\u0430\u043B\u0438 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445.</div> <br/><small>\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0431\u044B\u043B\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043E\u043C.</small>").show(),
                            d.options.onSendFail.call();
                        else if (d.$progress.hide(),
                        "success" == c.result)
                            d.$success.show(),
                            d.options.onSendSuccess.call();
                        else {
                            if ("wrong captcha" == c.message)
                                return d.$form.find(".jb_captcha img").attr("src", ("https:" == location.protocol ? "https:" : "http:") + "//jbcallme.ru/api/captcha.png?uid=" + d._uid + "&" + Math.random()),
                                d.$container.find("form").show(),
                                d.$form.find(".jb_captcha_text").addClass("jbError").val(""),
                                a(b).resize(),
                                !1;
                            c.message && d.options.dev_mode && d.$fail.html("<div class=\"error_msg\">" + c.message + "</div>").show(),
                            d.$fail.show(),
                            d.options.onSendFail.call()
                        }
                        setTimeout(function() {
                            d.$fail.html(d.options.fail),
                            d.end()
                        }, d.options.delay),
                        delete g[f]
                    }, 500)
                }),
                a(b).on("message", function(a) {
                    var b;
                    try {
                        b = jQuery.parseJSON(a.originalEvent.data)
                    } catch (a) {
                        b = jQuery.parseJSON("{\"result\":\"fail\", \"plugin\":\"null\" }")
                    }
                    "jbcallme" == b.plugin && (g[f] = b)
                }),
                d.submit() || c.preventDefault()
            })
        }
        d.options.modal && a(d.element).on("click", function() {
            return d.show(),
            !1
        })
    }
    ,
    d.prototype.submit = function() {
        var c = this
          , d = 0;
        return (c.$container = a("#jbForm_" + c.options.postfix),
        c.$container.find(".jbError").removeClass("jbError"),
        c.$container.find("input[type=text],input[type=email],input[type=number],input[type=tel],textarea").each(function() {
            a(this).val(a.trim(a(this).val()))
        }),
        c.$container.find("input[required], select[required], textarea[required]").each(function() {
            var b = a(this);
            "" != b.val() && b.val() != b.attr("placeholder") && ("checkbox" != b.prop("type") || b.prop("checked")) || (b.addClass("jbError").focus(function() {
                a(this).removeClass("jbError")
            }),
            d++)
        }),
        !d) && (c.$container.find("[placeholder]").each(function() {
            var b = a(this);
            b.val() == b.attr("placeholder") && b.val("")
        }),
        c.$container.find(".jb_progress").show(),
        c.$container.find("form").hide(),
        a(b).resize(),
        !0)
    }
    ,
    d.prototype.end = function() {
        var b = this;
        b.$container = a("#jbForm_" + b.options.postfix),
        a("#jbForm_" + b.options.postfix).find("iframe").remove(),
        b.options.modal ? (b.$overlay = a("#jbForm_overlay").fadeOut(),
        b.$container.hide(),
        a("body").removeClass("jbNoScroll")) : (b.$form[0].reset(),
        b.$container.find("[type=file]").each(function() {
            a(this)[0].innerHTML = a(this)[0].innerHTML
        }),
        a(".jbForm .jb_success, .jbForm .jb_fail, .jbForm .jb_progress").hide(),
        b.$form = b.$container.find(".jb_form").show())
    }
    ,
    d.prototype.getCookie = function(a) {
        var b = " " + c.cookie
          , d = " " + a + "="
          , e = null
          , f = 0
          , g = 0;
        return 0 < b.length && (f = b.indexOf(d),
        -1 != f && (f += d.length,
        g = b.indexOf(";", f),
        -1 == g && (g = b.length),
        e = unescape(b.substring(f, g)))),
        e
    }
    ,
    d.prototype.show = function() {
        var c = this;
        c.$container = a("#jbForm_" + c.options.postfix),
        c.$inset = c.$container.find(".jb_inset"),
        c.$form = c.$container.find(".jb_form").show(),
        c.$overlay = a("#jbForm_overlay"),
        c.$form[0].reset(),
        c.$other = a(".jbForm:not(#jbForm_" + c.options.postfix + "):not(.jbInbuilt)").hide(),
        a(".jbForm:not(.jbInbuilt) .jb_success, .jbForm:not(.jbInbuilt) .jb_fail, .jbForm:not(.jbInbuilt) .jb_progress").hide(),
        c.$container.find("[placeholder]").blur(),
        c.$container.find("[type=file]").each(function() {
            a(this)[0].innerHTML = a(this)[0].innerHTML
        }),
        c.options.captcha && c.$form.find(".jb_captcha img").attr("src", ("https:" == location.protocol ? "https:" : "http:") + "//jbcallme.ru/api/captcha.png?uid=" + c._uid + "&" + Math.random()),
        c.$container.find(".jbFileName").html(""),
        c.$container.find("input,textarea,select").each(function() {
            a(c.element).attr("data-" + a(this).attr("name")) && a(this).val(a(c.element).data(a(this).attr("name")))
        }),
        c.options.modal && (a("body").addClass("jbNoScroll"),
        c.$overlay.fadeIn()),
        c.$container.show(),
        c.$container.find(".jbError").removeClass("jbError"),
        a(b).resize(function() {
            if (c.options.modal) {
                var d = a(b).height() - c.$inset.outerHeight();
                0 < d && !a("body").hasClass("jbIsMobile") ? c.$inset.css("margin-top", parseInt(d / 2)) : c.$inset.css("margin-top", 0)
            }
        }),
        a(b).resize(),
        c.options.onShow.call()
    }
    ,
    a.fn.jbform = function(b) {
        return this.each(function() {
            a.data(this, "plugin_jbform") || a.data(this, "plugin_jbform", new d(this,b))
        })
    }
}
)(jQuery, window, document);
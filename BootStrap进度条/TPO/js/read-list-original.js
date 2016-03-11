define("toefl_exam/js/channel/read/read_list", ["jquery", "../../../../toefl/js/mod/practise/practice_sort", "../../../../toefl/js/mod/practise/read_scrollto", "../../mod/nextPart", "../../mod/keepTime", "../../../../toefl/js/mod/timeformat"], function(a, b, c) {
	var d = a("jquery"),
		e = a("../../../../toefl/js/mod/practise/practice_sort"),
		f = a("../../../../toefl/js/mod/practise/read_scrollto"),
		g = a("../../mod/nextPart");
	a("../../mod/keepTime"), d(function() {
		f({
			sParent: ".view-text-r"
		}), d(".js-answer-note").click(function() {
			d("#tpo-practice_pre").submit()
		}), d(".view-quit").click(function() {
			confirm({
				title: "提示",
				message: "确定退出吗？",
				confirm: {
					text: "确定",
					callBack: function() {
						var a = d(".view-quit").attr("data-url");
						d("#practiseForm").attr("action", a), d("#practiseForm").submit()
					}
				},
				cancel: {
					text: "取消",
					callBack: function() {}
				}
			})
		}), function() {
			var a = !1;
			d(".view-text-r").bind("scroll", function() {
				d(".view-text-r-main").height() + d(".view-text-r-tit").height() - d(".view-text-r").height() <= d(".view-text-r").scrollTop() && (a = !0)
			}), d(".btn-next").click(function() {
				if (a) {
					if (!g(d(this))) return !1;
					d("#practiseForm").submit()
				} else alert({
					title: "Massage!",
					message: "You should use the scroll bar to read the whole passage before you begin to answer the question.  However, the passage will appear again with each question.",
					confirm: {
						text: "Ok",
						callBack: function() {
							return !1
						}
					}
				})
			})
		}(), function() {
			var a = d(".view-text-r-main").find("i.strong-insert"),
				b = d('<span class="strong-line"></span');
			b.html(d(".view-read-use").text()), d(".view-text-r-main").delegate("i.strong-insert", "click", function() {
				d(".view-text-r-main span.strong-line").length > 0 && (d(".view-text-r-main span").siblings("i.active-i").addClass("strong-insert").removeClass("active-i").css({
					display: "inline-block"
				}), d(".view-text-r-main span").remove(".strong-line")), d("input[name='answer_0[]']").val(d(this).data("aid")), a.addClass("strong-insert"), a.removeClass("active-i"), a.css({
					display: "inline-block"
				}), d(".view-text-r-main").remove("strong-line"), d(this).after(b), d(this).addClass("active-i"), d(this).removeClass("strong-insert"), d(this).css({
					display: "none"
				})
			})
		}(), function() {
			function a(a) {
				var b = d(a).data("url");
				d("#practiseForm").attr("action", b), d("#practiseForm").submit()
			}
			d(".view-review").click(function() {
				a(d(this))
			}), d(".btn-back").click(function() {
				a(d(this))
			}), d(".view-text").click(function() {
				a(d(this))
			}), d(".view-return").click(function() {
				a(d(this))
			}), d(".view-bottom").click(function() {
				a(d(this))
			})
		}(), e(d(".g-tof-wrapper")), d(".btn-next-summary").click(function() {
			var a = d(".view-text-r-main i.active-i"),
				b = a.data("aid"),
				c = d('input[name="answer_0[]"]');
			c.attr("value", b);
			return g(d(this)) ? void d("#practiseForm").submit() : !1
		}), function() {
			var a = d(".read-view-list li.read-view-fulfil");
			a.hover(function() {
				d(this).addClass("active-view")
			}, function() {
				d(this).removeClass("active-view")
			}), a.click(function() {
				var a = d(this).data("url");
				d("#practiseForm").attr("action", a), d("#practiseForm").submit()
			})
		}()
	})
}), define("toefl/js/mod/practise/practice_sort", ["jquery"], function(a, b, c) {
	var d = a("jquery"),
		e = function(a, b) {
			var c, e, f, g, h = {
				origin: ".sort-origin",
				target: ".sort-target"
			},
				i = !1,
				j = "js-dragging",
				k = "in-selecting";
			h = d.extend(h, b), a.length < 1 || (a.delegate(h.origin, "mousedown", function(a) {
				var b = (d(this).offset(), d(this).css("top")),
					h = d(this).css("left");
				c = a.pageX, e = a.pageY, f = "auto" == h ? 0 : parseInt(h), g = "auto" == b ? 0 : parseInt(b), d(this).addClass(j), i = !0
			}), d(document).on({
				mousemove: function(b) {
					if (i) {
						var l = b.pageX,
							m = b.pageY,
							n = a.find("." + j),
							o = n.offset(),
							p = o.left,
							q = o.top,
							r = p + n.width(),
							s = q + n.height(),
							t = (n.width() / 2, n.height() / 2),
							u = l - c + f,
							v = m - e + g;
						d(this);
						b.preventDefault(), a.find("." + j).css({
							left: u,
							top: v
						}), a.find(h.target).each(function(b) {
							var c = d(this).offset().left,
								e = d(this).offset().top,
								f = d(this).outerWidth(),
								g = d(this).outerHeight(),
								h = e + g,
								i = c + f;
							return s - t > e && h > q + t && r > c && i > p ? (a.find("." + k).removeClass(k), d(this).addClass(k), !1) : void a.find("." + k).removeClass(k)
						})
					}
				},
				mouseup: function() {
					var b, c, e = a.find("." + j),
						f = a.find("." + k),
						g = f.siblings("input"),
						l = d.trim(e.text());
					f.length > 0 && "" == d.trim(f.val()) ? (b = e.data("sn"), c = e.data("aid"), f.val(l), g.val(c), f.data("sn", b), e.removeAttr("style").hide()) : e.stop().animate({
						top: 0,
						left: 0
					}, 300), e.removeClass(j), f.removeClass(k), i = !1, "function" == typeof h.moveupBack && h.moveupBack()
				}
			}), a.delegate(h.target, "click", function() {
				var b, c = "" == d.trim(d(this).val());
				c || (b = d(this).data("sn"), a.find(h.origin).eq(b).fadeIn(), d(this).val(""), d(this).removeData("sn"), d(this).siblings("input").val(""), "function" == typeof h.deleteBack && h.deleteBack())
			}))
		};
	c.exports = e
}), define("toefl/js/mod/practise/read_scrollto", ["jquery"], function(a, b, c) {
	var d = a("jquery");
	c.exports = function(a) {
		var b, c, e, f, g, h, i, j = {
			sEle: ".js-scrollto",
			sParent: "#js-article",
			marginTop: 140,
			vAlign: ""
		};
		b = d.extend({}, j, a), e = d(b.sParent), c = e.find(b.sEle), c.length < 1 || (c = c.eq(0), f = c.position().top, g = c.outerHeight(), h = e.outerHeight(), i = "top" == b.vAlign ? f : "middle" == b.vAlign ? f + g / 2 - h / 2 : f - b.marginTop, 0 > i || e.stop(!0, !1).animate({
			scrollTop: i
		}))
	}
}), define("toefl_exam/js/mod/nextPart", [], function(a, b, c) {
	c.exports = function(a) {
		var b = ($("#practiseForm"), $("#isOver")),
			c = "#overTime";
		a || $(".js-continue");
		return b.length < 1 ? !0 : 0 == $.trim(b.val()) && $.trim($(c).val()) > 0 ? (confirm({
			title: "Finish Warning",
			message: "You still have time to work on this section. As long as there is time remaining, you will be able to review your response and continue to work on it. Click on Return to go back to the current question. Click on Continue to leave this section. Once you leave this section, you will NOT be able to return to it.",
			confirm: {
				text: "return"
			},
			cancel: {
				text: "continue",
				callBack: function() {
					$("#practiseForm").submit()
				}
			}
		}), !1) : !0
	}
}), define("toefl_exam/js/mod/keepTime", ["toefl/js/mod/timeformat"], function(a, b, c) {
	$(function() {
		var b = a("toefl/js/mod/timeformat"),
			c = $("#beginTime"),
			d = "#showTime",
			e = $.trim(c.val()) || 0,
			f = parseInt(e),
			g = $(".js-exam-time"),
			h = $("#overTime"),
			i = ".js-btn-showtime",
			j = "#examBeyond",
			k = $("#isAutoJump"),
			l = null,
			m = 1 == $(d).val();
		$(document).delegate(i, "click", function() {
			1 == $(d).val() ? (g.hide(), $(this).text("SHOW TIME"), $(d).val(0)) : (g.show(), $(this).text("HIDE TIME"), $(d).val(1))
		}), g.text(b(f)), l = setInterval(function() {
			if (f--, g.text(b(f)), h.val(f), l && 1 > f) {
				if ($(j).val(0), clearInterval(l), k.length > 0 && 1 == k.val()) return void $("#practiseForm").submit();
				alert({
					title: "Finish Warning",
					message: "Your time for this section is over.You have to go on.Click on Continue to go on.",
					confirm: {
						text: "continue",
						callBack: function() {
							$("#practiseForm").submit()
						}
					},
					closeBack: function() {
						$("#practiseForm").submit()
					}
				})
			}
		}, 1e3), m ? g.show() : g.hide()
	})
}), define("toefl/js/mod/timeformat", [], function(a, b, c) {
	c.exports = function(a, b) {
		var c, d, e, f, g, h, i, j, k, l, m, n = 3600,
			o = "string" == typeof b ? b : "HH:MM:SS",
			p = /[\u4e00-\u9fa5]/g.test(o);
		return f = new Date(1e3 * a), d = f.getUTCMinutes(), e = f.getUTCSeconds(), c = Math.floor(a / n), c > 0 ? (g = 10 > c ? "0" + c : c, k = /HH/) : (g = "", k = /([^MS\u4e00-\u9fa5])*HH([^MS])*/g), d > 0 || c > 0 || !p ? (h = 10 > d ? "0" + d : d, l = /MM/) : (h = "", l = /([^HS\u4e00-\u9fa5])*MM([^HS])*/g), i = 10 > e ? "0" + e : e, m = /SS/, j = o.replace(k, g), j = j.replace(l, h), j = j.replace(m, i)
	}
});
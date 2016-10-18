(function($) {
	// var e = document.querySelectorAll(".form-group");
	// e = [].slice.call(e),
	// e.forEach(function(e) {
	//     var n = e.querySelector("input");
	//     n && n.addEventListener("focus", function() {
	//         e.classList.add("focused")
	//     }),
	//     n && n.addEventListener("blur", function() {
	//         e.classList.remove("focused")
	//     }),
	//     e.addEventListener("click", function() {
	//         n && n.focus()
	//     })
	// });
	var n = document.querySelector(".home");
	if (n) {
		var c, t = 5, o = document.querySelector("header"), r = function() {
			var e = window.scrollY;
			e > t ? o.classList.add("scrolled") : o.classList.remove("scrolled")
		}
		;
		window.addEventListener("scroll", function() {
			c = !0
		}),
		setInterval(function() {
			c && (r(),
			c = !1)
		}, 0)
	}
	!function() {
		var e = document.querySelector("header .nav-toggle")
		  , n = document.querySelector("header .menu");
		n && e && e.addEventListener("click", function() {
			n.classList.toggle("show-menu")
		})
	}()

	$(document).ready(function() {
		$('#showOnload').modal('show');

		if ($("#pricing-form select").length > 0) {
			loadPriceCalc();
		}
	})

	function loadPriceCalc() {
		updatePricing();
		$("#pricing-form select").change(function() {
			updatePricing();
		});
		$("#self-hosted select").change(function() {
			updatePricing();
		});
	}

	$(".anchor").on("click", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top-50}, 1000);
	});

})(jQuery);
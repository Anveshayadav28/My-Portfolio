$(document).ready(init);

function shouldManageDropdown() {
	return window.innerWidth >= 1000;
}

function windowSizeAwareDropdownFn(fn) {
	return function () {
		if (!shouldManageDropdown()) return true;
		fn();
	};
}

function manageDropdowns() {
	var dropdowns = document.querySelectorAll(
			'#navbarSupportedContent ul li.dropdown'
		),
		fadeInOutOptions = {
			duration: 150,
		};

	dropdowns.forEach(function (dropdown) {
		var toggleBtn = dropdown.querySelector('.dropdown-toggle'),
			dropdownMenu = dropdown.querySelector('.dropdown-menu'),
			doNotFadeOutYet = true,
			dropdownRemainAwakeTimeout = 50;

		function fadeOutDropdown() {
			if (doNotFadeOutYet) return;
			$(dropdownMenu).slideUp(fadeInOutOptions);
		}

		$(toggleBtn).on(
			'mouseenter',
			windowSizeAwareDropdownFn(function () {
				doNotFadeOutYet = true;
				$(dropdownMenu).slideDown(fadeInOutOptions);
			})
		);

		$(toggleBtn).on(
			'mouseover',
			windowSizeAwareDropdownFn(function () {
				doNotFadeOutYet = true;
			})
		);

		$(toggleBtn).on(
			'mouseleave',
			windowSizeAwareDropdownFn(function () {
				doNotFadeOutYet = false;
				setTimeout(fadeOutDropdown, dropdownRemainAwakeTimeout);
			})
		);

		$(dropdownMenu).on(
			'mouseenter',
			windowSizeAwareDropdownFn(function () {
				doNotFadeOutYet = true;
			})
		);

		$(dropdownMenu).on(
			'mouseleave',
			windowSizeAwareDropdownFn(function () {
				doNotFadeOutYet = false;
				setTimeout(fadeOutDropdown, dropdownRemainAwakeTimeout);
			})
		);
	});
}

function manageCurves() {
	/*
	 * if header is defined, then manage navbar curves on scroll otherwise just display them
	 *
	 * !IMPORTANT: i'm assuming that <header> will only be used to define the whole header image part
	 *              and nothing else in this whole website
	 */

	let $navbar = $('#navbar');

	if ($('header').length) {
		$(document).on('scroll', function () {
			if ($(document).scrollTop() > 25) {
				$navbar.addClass('navbar-curves');
			} else {
				$navbar.removeClass('navbar-curves');
			}
		});
	} else {
		$navbar.addClass('navbar-curves');
	}
}

function init() {
	manageDropdowns();
	manageCurves();
}

window.onresize = function () {
	if ($(window).width() > 992) {
		$('#sideNav').modal('hide');
	}
};

ScrollReveal().reveal('.row', { delay: 200, easing: 'ease-in-out' });
ScrollReveal().reveal('.para', { delay: 250, easing: 'ease-in-out' });
ScrollReveal().reveal('.image', { delay: 300, easing: 'ease-in-out' });
ScrollReveal().reveal('.main-head', { delay: 200, easing: 'ease-in-out' });
ScrollReveal().reveal('.card', { delay: 250, easing: 'ease-in-out' });
ScrollReveal().reveal('#testimonial-parent', {
	delay: 250,
	easing: 'ease-in-out',
});

function throttle(func, time) {
	var timeout, hadCalledInBetween;

	return function () {
		if (!timeout) {
			func.apply(this, arguments);

			timeout = setTimeout(function () {
				if (hadCalledInBetween) {
					func.apply(this, arguments);
					hadCalledInBetween = false;
				}
				timeout = null;
			}, time);
		} else {
			hadCalledInBetween = true;
		}
	};
}

window.onload = function () {
	const $win = $(window),
		$jump = $(document.getElementById('jump')),
		$jumpicon = $(document.getElementById('jumpicon')),
		coverPageHeight = window.outerHeight + 100;

	function checkScroll() {
		var hiddenClass = 'hiddenJumpIcon',
			scrollTop = $win.scrollTop();

		if (scrollTop > coverPageHeight) {
			$jump.removeClass(hiddenClass);
			$jumpicon.removeClass(hiddenClass);
		} else {
			$jump.addClass(hiddenClass);
			$jumpicon.addClass(hiddenClass);
		}
	}

	$jump.click(function () {
		$('body, html').animate(
			{
				scrollTop: 0,
			},
			500
		);
	});

	checkScroll();
	$win.on('scroll load resize', throttle(checkScroll, 100));
};


window.addEventListener("load", function(){
    $("#close-button").click(() => {
        $("#banner").hide();
    });
});


function sendEmail() {
	document.getElementById("contact-form").addEventListener("submit", function(event) {
		// Prevent the default form submission
		event.preventDefault();
		sendEmail();
	});
    // Get form data
    const name = document.getElementById("inp-name").value;
    const email = document.getElementById("inp-email").value;
    const subject = document.getElementById("inp-subject").value;
    const message = document.getElementById("inp-message").value;

    // Configure SMTPJS
    Email.send({
        Host: "smtp.elasticemail.com", // Replace with your SMTP host
        Username: "anveshay07@gmail.com", // Replace with your email
        Password: "88EC618D57B5332866A0C2DE45FCDE1D950A", // Replace with your email password
        To: "ecell@sstc.ac.in", // Replace with the recipient email
        From: "anveshay07@gmail.com", // Replace with your email
        Subject: subject,
        Body: `Name: ${name} <br> Email: ${email} <br> Message: ${message}`,
    }).then(
        (message) => {
            if (message === "OK") {
                alert("Email sent successfully!");
            } else {
                alert("Failed to send email. Please try again.");
            }
        }
    ).catch((error) => {
		console.error("Error sending email:", error);
		alert("An error occurred while sending the email.");
	});
}
var IBP = IBP || {};

$(document).ready(function () {
	IBP.Master.buttonClickFixOnAppleDevice();
	if (!IBP.MVC) {
		IBP.Master.detectWebkitBrowserForMsAjax();
	}

	IBP.Master.checkIeLegacy();
	IBP.Master.initSideNavClickHandler();
});

IBP.Master = (function () {

	var ibp = {};
	var $htmlTemplate;
	var hasCallbackModal = false;

	ibp.endAjax = function () {
		return true;
	};

	ibp.showQuestionaire = function () {
		$("#kycModal").modal("show");
	};

	ibp.checkIeLegacy = function () {
		// Check if IE legacy alert has been closed
		var legacyCookie = $.cookie("ielegacy");
		if ($("#ie-legacy").length && legacyCookie !== "closed") {
			$("#ie-legacy").show();
		}

		$("#ie-legacy .close").click(function (e) {
			// Do not perform default action when button is clicked
			e.preventDefault();

			$.cookie("ielegacy", "closed", { path: "/" });
			$("#ie-legacy").hide();
		});
	};

	ibp.initSideNavClickHandler = function () {
			$(".m-navbar__trigger").on("click", function() {
				$("body").toggleClass("show-menu");
				$("html").toggleClass("no-scroll");
			});
	};

	ibp.viewMessageDialog = function () {
		$("#error-modal").modal();
	}

	ibp.showEmbeddedValidationMessage = function (targetSelector, errorMessage) {
		$htmlTemplate = $("#embeddedValidationMessageTemplate").html();
		$htmlTemplate = $htmlTemplate.replace("{{errorMessage}}", errorMessage);
		$(targetSelector).html($htmlTemplate).show();
	};

	ibp.hideEmbeddedValidationMessage = function () {
		$(".error-message").html("").hide();
	};

	ibp.buttonClickFixOnAppleDevice = function () {
		if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) {
			$(".btn-primary").on("touchstart", function () {
				$(this).blur();
			});
		}
	};

	ibp.showFlashMessage = function (alertClass, message) {
		$htmlTemplate = $("#flashMessageTemplate").html();
		$htmlTemplate = $htmlTemplate.replace("{{alertClass}}", alertClass)
																 .replace("{{message}}", message);
		$("#master-flashmessage-holder").html($htmlTemplate).show();
	};

	ibp.showFlashMessage = function (alertClass, targetSelector, message) {
		$htmlTemplate = $("#flashMessageTemplate").html();
		$htmlTemplate = $htmlTemplate.replace("{{alertClass}}", alertClass)
			.replace("{{message}}", message);
		$(targetSelector).html($htmlTemplate).show();
	};

	ibp.ajaxError = function (supportId) {
		HideAllModals();
		removeAjaxLoader();

		var cookie = $.cookie('WOW');

		if (cookie != "XXXXXXXXXXXXXXX") {
			$htmlTemplate = $("#ajaxErrorFirstHtmlTemplate").html();

			if (supportId == null) {
				$htmlTemplate = $htmlTemplate.replace("{{supportId}}", "");
			}
			else {
				$htmlTemplate = $htmlTemplate.replace("{{supportId}}", "<p style='text-align: left;'><strong>Support ID:</strong>&nbsp;" + supportId + "</p>");
			}
			$("#main-container").html($htmlTemplate);
		}
		else {
			$htmlTemplate = $("#ajaxErrorSecondHtmlTemplate").html();
			$("html").addClass("errorpage");
			$("body").html($htmlTemplate);
		}
	};

	ibp.detectWebkitBrowserForMsAjax = function () {
		Sys.Browser.WebKit = {};

		if (navigator.userAgent.indexOf("WebKit/") > -1) {
			Sys.Browser.agent = Sys.Browser.WebKit;
			Sys.Browser.version = parseFloat(navigator.userAgent.match(/WebKit\/(\d+(\.\d+)?)/)[1]);
			Sys.Browser.name = "WebKit";
		}
	};

	ibp.createLogonStatistics = function (LoginMethod, YearOfBirth, Gender, UniqueId) {
		try {
			var omt_s2 = s_gi(setAccount());
			omt_s2.visitorNamespace = 'seb';
			omt_s2.trackingServer = 'seb.d3.sc.omtrdc.net';
			if (UniqueId.length > 0) {
				omt_s2.linkTrackVars = 'eVar35,eVar36,eVar37,eVar68,eVar18,events';
				omt_s2.eVar68 = UniqueId;
			}
			else {
				omt_s2.linkTrackVars = 'eVar35,eVar36,eVar37,eVar18,events';
			}
			omt_s2.eVar35 = LoginMethod + ': IKP';
			omt_s2.eVar36 = YearOfBirth;
			omt_s2.eVar37 = Gender;
			omt_s2.eVar18 = '1000';
			omt_s2.events = omt_s.linkTrackEvents = 'event28';
			omt_s2.tl(true, 'o', 'Login complete');
		}
		catch (e) {
		}
	}
	ibp.setTrackingCookie = function () {
		var domain = '.' + location.hostname;
		var parts = location.hostname.split('.');
		domain = '.' + parts.slice(-2).join('.');
		var tc = $.cookie('TC');
		var tcP = '1000';
		if (tc != null) {
			if (tc.indexOf(tcP) < 0) {
				tcP = tc += ', ' + tcP;
			}
		}
		$.cookie('TC', tcP, { path: '/', domain: domain, expires: 90, secure: false });

	};
	ibp.doCallMeBack = function (tel, page, serviceGroupId) {
		watchForCallbackModal();

		$.ajax({
			url: "/wow/4000/4400/wow4402.aspx?A1=" + tel + "&A2=" + page + "&A4=" + serviceGroupId,
			type: "GET",
			dataType: "html",
			error: function (xhr, textStatus, errorThrown) {
				ibp.ajaxError();
			},
			success: function (data, textStatus, xhr) {
                $("#calllbackButton").removeAttr("disabled");
				if (data.indexOf("CallBackFeedback") > -1) {
					$("#CallBackFeedbackDialog").html(data);
				} else {
					ibp.ajaxError();
				}
			}
		});
	}

	ibp.CBPlac = function (page) {
		var tel = $("#tel").val();
		ibp.doCallMeBack(tel, page, "24");
	}

	ibp.CBTLD = function (page) {
	    var tel = $("#tel").val();
	    ibp.doCallMeBack(tel, page, "170");
	}

	ibp.CBBOL = function (page) {
	    var tel = $("#tel").val();
	    ibp.doCallMeBack(tel, page, "131");
	}

	ibp.CloseCallBack = function () {
		if ($("#lblErrorText").text() == '') {
			$("#tel").val("");
		}
	}

	var watchForCallbackModal = function () {

		if (hasCallbackModal == false) {
			$("#CallBackFeedback").livequery(function () {
				$(this).modal();
			});
		}

		hasCallbackModal = true;
	}

	var removeAjaxLoader = function () {
		$(".ajax-overlay").remove();
	};

	return ibp;

})();


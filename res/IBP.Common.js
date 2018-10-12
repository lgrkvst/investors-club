var IBP = IBP || {};

$(document).ready(function () {
	IBP.Common.CheckPageWidth();
	IBP.Common.refreshLinkClick();
	IBP.Common.CollapsePanelsInMobile();
	IBP.Common.Init();
});

function launchHelpFile(sFile) {
	function updateUrlToEnglish(fileUrl) {
		var result = fileUrl.replace(".htm", "_en.htm");
		return result;
	}

	var langsFile = "";
	/*Bugfix for be able to open english documents if english is the choosen language based on html document*/
	var isItEn = IBP.Common.getDocumentLang();
	if (isItEn === "en") {
		langsFile = updateUrlToEnglish(sFile);
	} else {
		langsFile = sFile;
	}
	/*Bugfix for not be able to reopen document once opened */
	/*var helpEl = this.document.activeElement;
		if(helpEl.className === "already-clicked"){
			helpEl.classList.remove("already-clicked");
		}*/
	helpFile = window.open(langsFile, "helpFile", "status=no,toolbar=no,scrollbars=yes,width=760,height=480,resizable=yes");
}

function startHTX(sMyGroup, bHaveInstruction, sMyName, updateLocation) {
	IBP.Common.startHTX(sMyGroup, bHaveInstruction, sMyName, updateLocation)
}

IBP.Common = (function () {

	var ibp = {};

	ibp.Init = function () {

		setTimeout(function () {
			ibp.AddToggleClassToPuffs();
			ibp.TogglePuffContent();
			PreventDoubleclick();
		}, 1000);

		ibp.collapsibleTableRows();
		ibp.helpPopup();

		setupGlobalSEBShellObject();
	};

	function setupGlobalSEBShellObject() {
		window.$$SEB = window.$$SEB || {
			lang: ibp.getDocumentLang(),
			onLangChange: function () { }
		};
	}

	ibp.AddToggleClassToPuffs = function () {
		$(".panel").each(function () {
			if ($(this).find("> h3, > h4").length > 0) {
				$(this).addClass("js-toggle-puff");
			}
		});
	};

	ibp.TogglePuffContent = function () {
		$(".js-toggle-puff").on("click", function (event) {
			var target = $(event.target);

			if (target.is("h4") || target.is("h3") || target.is("h2")) {

				var firstDivEl = $(this).find("> div:first-of-type");

				if (firstDivEl.is(':visible')) {
					firstDivEl.hide();
					target.addClass('is-collapsed');
				} else {
					firstDivEl.show();
					target.removeClass('is-collapsed');
				}
			}
		});

		$(".m-panel__heading").on("click", function () {
			var target = $(event.target);
			target.closest("div.call-me").find(".panel-content").toggle();
		});
	};

	ibp.CollapsePanelsInMobile = function () {
		if (window.matchMedia('(max-width: 767px)').matches) {
			$('.panel').find("> h3, > h4").each(function (index) {
				$(this).addClass("is-collapsed");
			});
		}
	};

	ibp.startHTX = function (sMyGroup, bHaveInstruction, sMyName, updateLocation) {
		this.showPageMessage();
	};

	ibp.CheckPageWidth = function () {
		if ($("body.l-responsive") && $("body.l-responsive").length > 0) return;

		if ($("#sidebody").length) {
			$("#spanwidth").attr("class", "span9");
		} else {
			$("#spanwidth").attr("class", "span12");
		}
	};

	ibp.refreshLinkClick = function () {
		$("a[data-link-event='refresh']").on("click", function () {
			refreshThis();
		});
	};

	ibp.allowSpecialCharacter = function () {
		$(".pgbg").numeric({
			allow: "-"
		});
	};

	ibp.LogStatistic = function (linkTrackVars, linkTrackEvents, action, actionSpec, actionText, actionParam) {
		if (typeof (omt_s) != "undefined") {
			omt_s.linkTrackVars = linkTrackVars;
			omt_s.linkTrackEvents = linkTrackEvents;
			omt_s.prop4 = action + " " + actionText + " " + actionSpec;
			omt_s.tl(this, actionParam, action);
		}
	};

	ibp.showPageMessage = function () {
		var instruction = $("#sideBodyInstructionTemplate").html();
		//instruction = instruction.replace(/\\"/g, '"');
		$("#sidebody").html(instruction);
	};

	var refreshThis = function () {
		window.location.href = window.location.href;
	};

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	ibp.IsMobileDevice = function () {
		if (isMobile.any() != null) {
			return true;
		} else {
			return false;
		}
	};

	ibp.IsAndroid = function () {
		if (isMobile.Android() != null) {
			return true;
		} else {
			return false;
		}
	};

	ibp.collapsibleTableRows = function () {
		$('.m-table-collapsible').on('click', 'tr', function (event) {
			var target = $(event.target);
			if (target.parent().hasClass('m-table-row m-table-row--is-open')) {
				target.parent().removeClass('m-table-row--is-open');
			} else {
				target.parent().addClass('m-table-row--is-open');
			}
			event.stopPropagation();
		});
	};

	ibp.helpPopup = function () {
		var modal = document.getElementById('m-modal');
		var modalOverlay = document.getElementsByClassName('m-modal__overlay');
		var modalClose = document.getElementById('m-modal__close');

		if (!modal) return;
		if (modal && modal.length === 0) return;

		var modalContent = modal.getElementsByClassName('m-modal__content');

		modalClose.addEventListener('click', function (event) {
			modalOverlay[0].style.display = 'none';
			modalContent[0].innerHTML = '';
		});

		$(".m-help-popup").livequery(function () {
			var $this = $(this);
			$this.popover({
				trigger: "manual",
				placement: $this.data("placement") ? $this.data("placement") : 'right',
				html: true,
				container: "body"
			});
			if (!$this.prop("tabindex")) {
				$this.prop("tabindex", "0");
			}
		});


		$('body').on('touchstart click', '.m-help-popup', function (event) {
			if (window.matchMedia('(max-width: 767px)').matches) {
				modalOverlay[0].style.display = 'block';
				modalContent[0].innerHTML = event.target.dataset.content;
				event.stopPropagation();
			} else {
				var popovers = document.getElementsByClassName('popover');
				if (popovers.length > 0) {
					$('.popover').remove();
				}

				if ($(event.target).hasClass('clicked')) {
					$(event.target).popover('hide');
					$(event.target).removeClass('clicked');
				} else {
					$(event.target).addClass('clicked');
					$(event.target).popover('show');
				}
			}
		});

		$('body').on('touchstart click', function (event) {
			if (!$(event.target).hasClass('m-help-popup') && !$(event.target).hasClass('popover-content')) {
				var popovers = document.getElementsByClassName('popover');
				if (popovers && popovers.length > 0) {
					$('.popover').remove();
				}
			}
		});
	};


	ibp.getDocumentLang = function getDocumentLang() {
		var result = document.documentElement.lang;
		return result;
	}

	function PreventDoubleclick() {

		$("body").on("click", 'a, button, input[type="submit"], input[type="button"], header[data-toggle]', function (event) {
			if (event.originalEvent !== undefined && event.originalEvent.detail >= 2) {
				//console.log("removing already-clicked and prevent default event.detail >= 2: ", event.originalEvent);
				clickStopper(event.originalEvent);
			}
			else if (!event.originalEvent) {
				//console.log("Second click e.originalEvent is undefined, button is probably disabled. Showing current element: ", this);
			} else {
				//console.log("Removing already-clicked on single event.detail <= 1: ", event.originalEvent);
				removealready();
			}
		});
		$("body").on("dblclick", 'a, button, input[type="submit"], input[type="button"], header[data-toggle]', function (event) {
			//console.log("double click prevented event.detail >= 2:", event.originalEvent);
			event.preventDefault();
		});
	}

	/*prevents already-clicked class functionality*/
	function removealready() {
		var ele = this.document.activeElement;
		var nameOfClass = "already-clicked";
		if (elementHasClass(ele, nameOfClass)) {
			removeClass(ele, nameOfClass);
		}
	}

	function clickStopper(event) {
		var ele = this.document.activeElement;
		var nameOfClass = "already-clicked";
		if (elementHasClass(ele, nameOfClass)) {
			removeClass(ele, nameOfClass);
		}
		event.preventDefault();
	}

	/*checking element for defined class*/
	function elementHasClass(element, nameOfClass) {
		if (element) {
			var hasClass = (' ' + element.className + ' ').indexOf(' ' + nameOfClass + ' ') > -1;
			return hasClass;
		}
	}

	/*the actual removing of 'already-clicked' class*/
	function removeClass(event, val) {
		event.classList = event.classList.remove(val);
	}


	/*User-AgentChecker*/
	setTimeout(function () {
		var currentVer = {
			desktop: {
				Edge: 15,
				IE: 10,
				Firefox: 57,
				Chrome: 63,
				Safari: 10
			},
			mobile: {
				IE: 10,
				Firefox: 57,
				Chrome: 63,
				Safari: 10.2,
				Android: "4.4.4"
			}
		};

		function init() {
			checkBrowserVersion();
			checkCookie();
		}

		function checkBrowserVersion() {
			var patt = new RegExp(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g);
			var isMobile = patt.test(navigator.userAgent);

			if (isMobile) {
				//checkMobileBrowserPolicy();
				//console.log("Mobile device... dont do anything.", navigator.userAgent);
			} else {
				checkDesktopBrowserPolicy();
			}
		}

		function checkMobileBrowserPolicy() {

			var mobAgent = navigator.userAgent;
			var moBrName = navigator.appName;
			var mobFullVersion = '' + parseFloat(navigator.appVersion);
			var mobBrMajorVersion = parseInt(navigator.appVersion, 10);
			var mobObjOffsetName, mobObjOffsetVersion, mobIx;


			// In Chrome 
			if ((mobObjOffsetVersion = mobAgent.indexOf("CriOS") !== -1 || mobAgent.indexOf("Chrome") !== -1)) {
				var cvm = "";
				//iPhone
				if (mobAgent.match(/(CriOS\D\d{1,2}\D\d\D\d{1,4}\D\d{1,3})/g)) {
					cvm = mobAgent.match(/(CriOS\D\d{1,2}\D\d\D\d{1,4}\D\d{1,3})/g)[0];
				}
				else {
					//Everyting else just like Android
					cvm = mobAgent.match(/(Chrome\D\d{1,2}\D\d\D\d{1,4}\D\d{1,3})/g)[0];
				}
				moBrName = "Chrome";
				mobFullVersion = cvm.slice(7, 16);
				mobBrMajorVersion = cvm.slice(7, 9);
			}
			//Android browser
			else if (mobObjOffsetVersion = mobAgent.indexOf("Android") !== -1) {
				var cvm = mobAgent.match(/(Android\D\d\D\d\D\d)/g)[0];
				moBrName = "Android";
				mobFullVersion = cvm.slice(8, 16);
				mobBrMajorVersion = cvm.slice(8, 16);

			}
			// In Microsoft internet explorer 
			else if (((mobObjOffsetVersion = mobAgent.indexOf("MSIE") !== -1) || (mobObjOffsetVersion = mobAgent.indexOf("Trident") !== -1))
				&& mobAgent.indexOf("Edge") === -1 && mobAgent.indexOf("OPR") === -1) {
				var iem = "";
				var Idx = mobAgent.indexOf("MSIE");
				if (Idx > 0) {
					iem = mobAgent.match(/(MSIE\D\d{1,2}\D\d{1,3})/g)[0];
					moBrName = "Microsoft Internet Explorer";
					mobBrMajorVersion = iem.slice(5, 7);
					mobFullVersion = iem.slice(5, 9);
				}
				else if (iem = mobAgent.match(/(Trident\D7\D\d{0,3})/g)[0]) {
					moBrName = "Microsoft Internet Explorer";
					mobBrMajorVersion = 11;
					mobFullVersion = iem.slice(7, 11);
				} else {
					moBrName = "Not MS IE...";
					mobBrMajorVersion = 0;
					mobFullVersion = "unknown";
				}
			}
			//In Edge
			else if ((mobObjOffsetVersion = mobAgent.indexOf("Edge")) !== -1) {
				var mev = mobAgent.match(/(Edge\D\d{1,2}\D\d{1,5})/g)[0];
				moBrName = "Edge";
				mobFullVersion = mev.slice(5, 15);
				mobBrMajorVersion = mev.slice(5, 7);
			}
			// In Firefox 
			else if ((mobObjOffsetVersion = mobAgent.indexOf("Firefox")) !== -1) {
				var mrv = mobAgent.match(/(rv:\d{1,2})/g)[0];
				moBrName = "Firefox";
				mobBrMajorVersion = mrv.slice(3, 5);
				mobFullVersion = objBrMajorVersion;
			}
			// In Safari 
			else if ((mobObjOffsetVersion = mobAgent.indexOf("Safari")) !== -1 && mobAgent.indexOf("Chrome") === -1
				&& mobAgent.indexOf("Edge") === -1 && mobAgent.indexOf("OPR") === -1 && mobAgent.indexOf("Firefox") === -1) {
				moBrName = "Safari";
				mobFullVersion = mobAgent.substring(mobObjOffsetVersion + 7);
				if ((mobObjOffsetVersion = mobAgent.indexOf("Version")) !== -1)
					mobFullVersion = mobAgent.substring(mobObjOffsetVersion + 8);
			}
			// For other browser "name/version" is at the end of userAgent 
			else if ((mobObjOffsetName = mobAgent.lastIndexOf(' ') + 1) < (mobObjOffsetVersion = mobAgent.lastIndexOf('/'))) {
				moBrName = mobAgent.substring(mobObjOffsetName, mobObjOffsetVersion);
				mobFullVersion = mobAgent.substring(mobObjOffsetVersion + 1);
				if (moBrName.toLowerCase() == moBrName.toUpperCase()) {
					moBrName = navigator.appName;
				}
			}
			// trimming the fullVersion string at semicolon/space if present 
			if ((ix = mobFullVersion.indexOf(";")) != -1) mobFullVersion = mobFullVersion.substring(0, ix);
			if ((ix = mobFullVersion.indexOf(" ")) != -1) mobFullVersion = mobFullVersion.substring(0, ix);
			if (moBrName !== "Android") {
				mobBrMajorVersion = parseInt('' + mobFullVersion, 10);
				if (isNaN(mobBrMajorVersion)) {
					mobFullVersion = '' + parseFloat(navigator.appVersion);
					mobBrMajorVersion = parseInt(navigator.appVersion, 10);
				}
			}

			/*
			console.log("is a mobile: ", mobAgent);
			console.log("Browser name  = ", moBrName);
			console.log("Full version  = ", mobFullVersion);
			console.log("Major version  = ", mobBrMajorVersion);
			console.log("navigator.userAgent = ", navigator.userAgent);
			*/

			checkBrowserPolicy("mobile", moBrName, mobBrMajorVersion);
		}

		function checkDesktopBrowserPolicy() {
			var deskAgent = navigator.userAgent;
			var objbrowserName = navigator.appName;
			var objfullVersion = '' + parseFloat(navigator.appVersion);
			var objBrMajorVersion = parseInt(navigator.appVersion, 10);
			var objOffsetName, objOffsetVersion, ix;
			// In Microsoft internet explorer 
			if (((objOffsetVersion = deskAgent.indexOf("MSIE") !== -1) || (objOffsetVersion = deskAgent.indexOf("Trident") !== -1))
				&& deskAgent.indexOf("Edge") === -1 && deskAgent.indexOf("OPR") === -1) {

				var mv = "";
				var Idx = deskAgent.indexOf("MSIE");
				if (Idx > 0) {
					mv = deskAgent.match(/(MSIE\D\d{1,2}\D\d{1,3})/g)[0];
					objbrowserName = "IE";
					objBrMajorVersion = mv.slice(5, 7);
					objfullVersion = mv.slice(5, 9);
				}
				else if (mv = deskAgent.match(/(Trident\D7\D\d{0,3})/g)[0]) {
					objbrowserName = "IE";
					var ieRv = deskAgent.match(/(rv:\d\d)/g)[0];
					objBrMajorVersion = ieRv.slice(3, 5);
					objfullVersion = objBrMajorVersion;
				} else {
					objbrowserName = "Not MS IE";
					objBrMajorVersion = 0;
					objfullVersion = "unknown";

				}
				/*
				console.log("is a desktop: ", deskAgent);
				console.log("Browser name  = ", objbrowserName);
				console.log("Full version  = ", objfullVersion);
				console.log("Major version  = ", objBrMajorVersion);
				console.log("navigator.userAgent = ", navigator.userAgent);
				*/
				checkBrowserPolicy("desktop", objbrowserName, objBrMajorVersion);
			}

			//In Edge
			/*Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246*/
			/*else if ((objOffsetVersion = deskAgent.indexOf("Edge")) !== -1) {
				objbrowserName = "Edge";
				var ev = deskAgent.match(/(Edge\D\d{1,2}\D\d{1,3})/g)[0];
				objBrMajorVersion = ev.slice(5, 7);
				objfullVersion = ev.slice(5, 10);

			}
				
			// In Chrome 			
			else if ((objOffsetVersion = deskAgent.indexOf("Chrome") !== -1 && deskAgent.indexOf("Edge") === -1 && deskAgent.indexOf("OPR")) === -1) {
				objbrowserName = "Chrome";
				var cv = deskAgent.match(/(Chrome\D\d{1,2}\D\d\D\d{1,4}\D\d{1,3})/g)[0];
				objBrMajorVersion = cv.slice(7, 9);
				objfullVersion = cv.slice(7, 20);
			}

			// In Firefox 
			else if ((objOffsetVersion = deskAgent.indexOf("Firefox")) !== -1) {
				objbrowserName = "Firefox";
				var rv = deskAgent.match(/(rv:\d{1,2})/g)[0];
				objBrMajorVersion = rv.slice(3, 5);
				objfullVersion = objBrMajorVersion;
			}
			// In Opera 
			else if ((objOffsetVersion = deskAgent.indexOf("OPR")) !== -1) {
				objbrowserName = "Opera";
				var oprv = deskAgent.match(/(OPR\D\d{1,2}D\d\D\d{1,4}D\d{1,2})/g)[0];
				objBrMajorVersion = oprv.slice(4, 6);
				objfullVersion = oprv.slice(4, 16);
			}
			// In Safari 
			//Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7
			else if ((objOffsetVersion = deskAgent.indexOf("Safari")) !== -1 && deskAgent.indexOf("Chrome") === -1 && deskAgent.indexOf("Edge") === -1
				&& deskAgent.indexOf("OPR") === -1 && deskAgent.indexOf("Firefox") === -1) {
				objbrowserName = "Safari";
				objfullVersion = deskAgent.substring(objOffsetVersion + 7);
				if ((objOffsetVersion = deskAgent.indexOf("Version")) !== -1)
					objfullVersion = deskAgent.substring(objOffsetVersion + 8);
			}
			// For other browser "name/version" is at the end of userAgent 
			else if ((objOffsetName = deskAgent.lastIndexOf(' ') + 1) < (objOffsetVersion = deskAgent.lastIndexOf('/'))) {
				objbrowserName = deskAgent.substring(objOffsetName, objOffsetVersion);
				objfullVersion = deskAgent.substring(objOffsetVersion + 1);
				if (objbrowserName.toLowerCase() == objbrowserName.toUpperCase()) {
					objbrowserName = navigator.appName;
				}
			}
			// trimming the fullVersion string at semicolon/space if present 
			if ((ix = objfullVersion.indexOf(";")) != -1) objfullVersion = objfullVersion.substring(0, ix);
			if ((ix = objfullVersion.indexOf(" ")) != -1) objfullVersion = objfullVersion.substring(0, ix);
			objBrMajorVersion = parseInt('' + objfullVersion, 10);
			if (isNaN(objBrMajorVersion)) {
				objfullVersion = '' + parseFloat(navigator.appVersion);
				objBrMajorVersion = parseInt(navigator.appVersion, 10);
			}
			*/
			else {
				//console.log("Not MS IE...: ", navigator.userAgent);
			}
		}

		function checkBrowserPolicy(hardware, bName, version) {

			var vers = currentVer;
			if (hardware === "mobile") {
				switch (bName) {
					case "Android":
						/*if (version <= 4.4.4) {*/
						if (version <= vers.mobile.Android) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Chrome":
						/*if (version <= 65) {*/
						if (version <= vers.mobile.Chrome) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "IE":
						console.log("Microsoft Internet Explorer : " + bName + " " + version);
						if (version <= vers.mobile.IE) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Edge":
						console.log("Edge : " + bName + " " + version);
						if (version <= vers.mobile.Edge) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Firefox":
						console.log("Firefox : " + bName + " " + version);
						if (version <= vers.mobile.Firefox) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Safari":
						console.log("Safari : " + bName + " " + version);
						if (version <= vers.mobile.Safari) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case (bName !== "Chrome" && bName !== "Microsoft Internet Explorer" && bName !== "Firefox" && bName !== "Safari"):
						console.log("Övriga mobile browsers..." + bName + " " + version);
						break;
				}
			} else {
				switch (bName) {

					case "IE":
						//console.log("Microsoft Internet Explorer : " + bName + " " + version);
						if (version <= vers.desktop.IE) {
							//console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Not MS IE":
						//console.log("Not MS IE, kom in till IE logiken men kan inte identifiera version av IE", bName, version );
						break;

					/* case "Chrome":
						if (version <= vers.desktop.Chrome) {
							oldBrowserWarning();
						}
						break;
					case "Edge":
						console.log("Edge : " + bName + " " + version);
						if (version <= vers.desktop.Edge) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Firefox":
						console.log("Firefox : " + bName + " " + version);
						if (version <= vers.desktop.Firefox) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case "Safari":
						console.log("Safari : " + bName + " " + version);
						if (version <= vers.desktop.Safari) {
							console.log("To low version", version);
							oldBrowserWarning();
						}
						break;
					case (bName !== "Chrome" && bName !== "IE" && bName !== "Firefox" && bName !== "Safari"):
						console.log("Övriga desktop browsers..." + bName + " " + version);
						break; The one below replaces this one for the moment*/
					case (bName !== "IE" && bName !== "Safari"):
						//console.log("Övriga desktop browsers..." + bName + " " + version);
						break;
				}
			}

		}


		function setBrowserPolicyCookie() {
			//Time based cookie
			//var date = new Date();
			/*example: var minutes = 1.5; = 1min 30 sec*/
			//var minutes = 20;
			//date.setTime(date.getTime() + (minutes * 60 * 1000));
			//document.cookie = "browserPolicyCookie" + "=" + "browserPolicyCookie" + ";" + "expires=" + date.toUTCString() + ";path=/";
			document.cookie = "browserPolicyCookie" + "=" + "browserPolicyCookie" + ";path=/";
		}

		function getCookie() {
			var name = "browserPolicyCookie" + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

		function checkCookie() {
			var cookieExist = getCookie();
			if (cookieExist != "") {
				var x = document.getElementById("oldBrowser");
				x.style.display = "none";
			}
			else {
				if (cookieExist != "" && cookieExist != null) {
					setBrowserPolicyCookie();
				}
			}
		}

		function oldBrowserWarning() {
			var x = document.getElementById("oldBrowser");
			x.style.display = "inherit";
			document.getElementById("setBpCookie").onclick = function () {
				setBrowserPolicyCookie();
			};
			checkCookie();
		}

		//Init
		init();

	}, 0);

	return ibp;
})();
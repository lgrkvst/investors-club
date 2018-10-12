var IBF = IBF || {};

$(document).ready(function () {
	IBF.GlobalEvents.Init();
});

IBF.GlobalEvents = (function () {
	var ibf = {};

	ibf.Init = function () {
		addIgnoreEnterPressListenters();
	};

	var addIgnoreEnterPressListenters = function () {
		$("body").on("keydown", "input[data-ignore-enter-press], textarea[data-ignore-enter-press]", function (e) {
			var code = e.code ? e.code : e.which;
			if (code == 13) {
				e.preventDefault();
				e.stopPropagation();
			}
		});
	};

	return ibf;
})();

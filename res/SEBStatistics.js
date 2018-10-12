/* Global variable */
var hasCallmenowStarted = false;
var hasTransferStarted = {};
var hasQuickTransferStarted = false;

$(document).ready(function () {
    $("body").on("click", "div.left-menu ul ul a, div.in-page-menu a", function () {
        trackNavigation("Menu_link_header");
    });
});

/* Transfer start */
function transferStart(name) {
	var started = hasTransferStarted[name] ? hasTransferStarted[name] : false;
	if (typeof (omt_s) != "undefined" && name && !started) {
		hasTransferStarted[name] = true;
		omt_s.linkTrackVars = "events,prop20,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "event75";
		omt_s.events = "event75";
        omt_s.products = ';' + name + ';;;event75=1';
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", 'overforing-start');
	}
}

/* Transfer complete */
function transferComplete(products) {
	if (typeof (omt_s) != "undefined" && products) {
		hasTransferStarted = {};
		omt_s.linkTrackVars = "events,prop20,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "purchase,event76,event81";
		omt_s.events = "purchase,event76,event81";
        omt_s.products = products;
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", "overforing-complete");
	}
}

/* QuickTransfer start */
function quickTransferStart() {
	if (typeof (omt_s) != "undefined" && !hasQuickTransferStarted) {
		hasQuickTransferStarted = true;
		omt_s.linkTrackVars = "events,prop20,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "event75";
		omt_s.events = "event75";
		omt_s.products = ";overforingegnakonton;;;event75=1";
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", "overforingegnakonton-start");
	}
}

/* QuickTransfer complete */
function quickTransferComplete(amount) {
	if (typeof (omt_s) != "undefined" && hasQuickTransferStarted && amount) {
		hasQuickTransferStarted = false;
		omt_s.linkTrackVars = "events,prop20,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "purchase,event76,event81";
		omt_s.events = "purchase,event76,event81";
		omt_s.products = ";overforingegnakonton;1;0;event76=1|event81=" + amount;
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", "overforingegnakonton-complete");
	}
}

/* interaction */
function interaction(name, list) {
	if (typeof (omt_s) != "undefined" && name) {
		omt_s.linkTrackVars = "events,prop20,eVar69,eVar70,eVar72,eVar74,eVar75,eVar95,list2";
		omt_s.linkTrackEvents = "event70";
		omt_s.events = "event70";
		omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar70 = 'IBx Interaction';
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.eVar95 = name;
		omt_s.list2 = list ? list : "empty";
		omt_s.tl(true, "o", "interaction");
	}
}

/* form errors */
function formErrors(list) {
	if (typeof (omt_s) != "undefined" && omt_s.pageName && list) {
		omt_s.linkTrackVars = "events,eVar69,eVar71,eVar72,eVar74,eVar75,list3";
		omt_s.linkTrackEvents = "event82";
		omt_s.events = "event82";
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = omt_s.eVar71 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.list3 = list;
		omt_s.tl(true, "o", "formerrors");
	}
}

/* page errors */
function pageErrors(list) {
	if (typeof (omt_s) != "undefined" && omt_s.pageName && list) {
		omt_s.linkTrackVars = "events,prop20,eVar69,eVar71,eVar72,eVar74,eVar75,list3";
		omt_s.linkTrackEvents = "event83";
		omt_s.events = "event83";
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = omt_s.eVar71 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.list3 = list;
		omt_s.tl(true, "o", "pageerrors");
	}
}

/* Call me now start */
function leadCallmenowStart() {
	if (typeof (omt_s) != "undefined" && !hasCallmenowStarted) {
		hasCallmenowStarted = true;
		omt_s.linkTrackVars = "events,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "event73";
		omt_s.events = "event73";
		omt_s.products = ";ringuppmig;;;event73=1";
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", "lead-start");
	}
}

/* Call me now complete */
function leadCallmenowComplete() {
	if (typeof (omt_s) != "undefined" && hasCallmenowStarted) {
		hasCallmenowStarted = false;
		omt_s.linkTrackVars = "events,prop20,products,eVar69,eVar72,eVar74,eVar75";
		omt_s.linkTrackEvents = "purchase,event74";
		omt_s.events = "purchase,event74";
		omt_s.products = ";ringuppmig;;;event74=1";
        omt_s.eVar69 = (omt_s.prop42 ? omt_s.prop42 : 'D=v75');
		omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = (omt_s.pageName ? omt_s.pageName : '');
		omt_s.tl(true, "o", "lead-complete");
	}
}

/* ajaxpagename */
function ajaxPageName(name) {
	if (typeof (omt_s) != "undefined" && name) {
		name = name.replace(/-/g, ':');
		omt_s.linkTrackVars = "pageName,eVar69,eVar72,eVar74,eVar75,prop42,prop43";
        omt_s.linkTrackEvents = "None";
        omt_s.eVar69 = 'D=pageName';
        omt_s.eVar72 = 'D=r';
		omt_s.eVar74 = 'D=g';
		omt_s.eVar75 = omt_s.pageName = sSite ? sSite + ' : ' + name : name;
		omt_s.prop42 = 'D=pageName';
		omt_s.prop43 = 'D=pageName';
		omt_s.tl(true, "o", "ajaxpagename");
	}
}

/* Track navigation */
function trackNavigation(action) {
    if (typeof (omt_s) != "undefined" && action) {
        omt_s.linkTrackVars = "events,prop20,eVar6";
        omt_s.linkTrackEvents = "event40";
        omt_s.events = "event40";
        omt_s.eVar6 = action;

        omt_s.tl(true, "o", action);
    }
}

/* Track monthly fund savings removal */
function removeFundSavingStart() {
    $(document).ready(function() {
        var action = ";Fonder – Ändra fondsparande – Ta bort";
        if (typeof (omt_s) != "undefined") {
            omt_s.linkTrackVars = "events,prop20,products";
            omt_s.linkTrackEvents = "event6";
            omt_s.events = "event6";
            omt_s.products = action;

            omt_s.tl(true, "o", action);
        }
    });
}
function removeFundSavingComplete() {
    $(document).ready(function () {
        var action = ";Fonder – Ändra fondsparande – Ta bort";
        if (typeof (omt_s) != "undefined") {
            omt_s.linkTrackVars = "events,prop20,products";
            omt_s.linkTrackEvents = "event7";
            omt_s.events = "event7";
            omt_s.products = action;

            omt_s.tl(true, "o", action);
        }
    });
}

var IBP = IBP || {};

IBP.WebStatistics = (function () {
    var ibp = {};

    ibp.trackInteraction = function (action) {
        if (typeof (omt_s) != "undefined" && action) {
            omt_s.linkTrackVars = "events,prop20,eVar19";
            omt_s.linkTrackEvents = "event4";
            omt_s.events = "event4";
            omt_s.eVar19 = action;

            omt_s.tl(true, "o", action);
        }
    };

    return ibp;
})();

IBP.WebStatistics.wowc1257 = (function () {
    var ibp = {};

    ibp.trackCustomerDropDownUsage = function () {
        IBP.WebStatistics.trackInteraction("manadsspara : drop-down");
    };

    ibp.trackViewFundAllocation = function () {
        IBP.WebStatistics.trackInteraction("manadsspara : visa fondfordelning");
    };

    return ibp;
})();

IBP.WebStatistics.wowc1254 = (function () {
    var ibp = {};

    ibp.trackTopDropDownUsage = function () {
        IBP.WebStatistics.trackInteraction("mina fonder : drop-down big");
    };

    ibp.trackRadioButtonUsage = function () {
        IBP.WebStatistics.trackInteraction("mina fonder : radiobutton");
    };

    ibp.trackRateDevelopmentSelection = function () {
        IBP.WebStatistics.trackInteraction("mina fonder : drop-down small");
    };

    return ibp;
})();
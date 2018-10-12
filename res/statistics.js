/*
 * SEB-specific code for Omniture SiteCatalyst
 * Created 2008-07-11 by S67143
 */

var sSite = 'ikp';

/* Modify the String prototype to allow for trimming */
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function setAccount() {
    //root account with Omniture
    var sAccount = 'sebse';
    var sSiteEnv = '';
    var sDomain = document.domain;
    if (sDomain.indexOf('privat') == -1) {
    	sSiteEnv = 'test';
    }
    return sAccount + sSiteEnv;
}

function replaceSwedishEntities(text) {
    text = text.replace(/&aring;/g, 'a');
    text = text.replace(/&auml;/g, 'a');
    text = text.replace(/&ouml;/g, 'o');
    text = text.replace(/&Aring;/g, 'A');
    text = text.replace(/&Auml;/g, 'A');
    text = text.replace(/&Ouml;/g, 'O');
    text = text.replace(/å/g, 'a');
    text = text.replace(/ä/g, 'a');
    text = text.replace(/ö/g, 'o');
    text = text.replace(/Å;/g, 'A');
    text = text.replace(/Ä/g, 'A');
    text = text.replace(/Ö/g, 'O');
    text = text.replace(/&amp;/g, unescape('%26'));
    return text;
}

function trackCustom(groupname, subname) {
    omt_s.linkTrackVars = 'prop4';
    omt_s.linkTrackEvents = 'none';
    omt_s.prop4 = subname;
    omt_s.tl(true, 'o', groupname);
}

function trackLink(obj, groupname, subname) {
    omt_s.linkTrackVars = 'prop4';
    omt_s.linkTrackEvents = 'none';
    omt_s.prop4 = subname;
    omt_s.tl(obj, 'o', groupname);
}

function trackExitLink(obj, name) {
    omt_s.linkTrackVars = 'none';
    omt_s.linkTrackEvents = 'none';
    omt_s.tl(obj, 'e', name);
}

var i_LoginAttempts = 0;
function trackLoginStart(o_form, s_method) {
    i_LoginAttempts += 1;
    if (i_LoginAttempts == 1) {
        omt_s.linkTrackVars = 'eVar35,prop20,prop19,events';
        omt_s.eVar35 = s_method;
        omt_s.prop19 = 'Login started: ' + omt_s.eVar35;
        omt_s.events = omt_s.linkTrackEvents = 'event26';
        omt_s.tl(o_form, 'o', 'Login started');
    }
}

function resetLoginCount() {
    i_LoginAttempts = 0;
}

/* FUNCTION USED TO TRACK CLICKS ON CAMPAIGN LINKS */
/* s = campaign identifier, o = link object */
function omt_cmpclick(s, o) {
    if (omt_s) {
        omt_s.linkTrackVars = 'events,prop20,eVar34';
        omt_s.eVar34 = s;
        omt_s.linkTrackEvents = 'event24';
        omt_s.events = 'event24';
        omt_s.tl(true, 'o', 'Campaign link');
        setTimeout('window.open(\'' + o.href + '\',\'' + (o.target ? o.target : '_self') + '\')', 5000);
        return false;
    }
    return true;
}
/* Function used to track clicks on Notifications(Ej utförda betalningar) */
function notificationShow() {
    try {
        if (typeof omt_s != 'undefined') {
            omt_s.linkTrackVars = 'events,prop20,eVar57,eVar70,eVar72,eVar74,eVar75';
            omt_s.linkTrackEvents = 'event47,event70';
            omt_s.events = 'event47,event70';
            omt_s.eVar57 = 'mina meddelanden';
            omt_s.eVar70 = 'meddelande visad';
            omt_s.eVar72 = 'D=r';
            omt_s.eVar74 = 'D=g';
            omt_s.eVar75 = 'D=pageName';
            omt_s.tl(true, 'o', 'notification show');
        }
    } catch (e) {

    }
}
/* Function used to track clicks on Notifications(Ej utförda betalningar) */
function notificationClick() {
    try {
        if (typeof omt_s != 'undefined') {
            omt_s.linkTrackVars = 'events,prop20,eVar57,eVar70,eVar72,eVar74,eVar75';
            omt_s.linkTrackEvents = 'event48,event70';
            omt_s.events = 'event48,event70';
            omt_s.eVar57 = 'mina meddelanden';
            omt_s.eVar70 = 'meddelande klick';
            omt_s.eVar72 = 'D=r';
            omt_s.eVar74 = 'D=g';
            omt_s.eVar75 = 'D=pageName';
            omt_s.tl(true, 'o', 'notification click');
        }
    } catch (e) {

    }
}
/* Function used to track clicks on Notifications(Ej utförda betalningar) */
function notificationView(eventType, paymentType) {
    try {
        if (typeof omt_s != 'undefined' && eventType && paymentType) {
            omt_s.linkTrackVars = 'events,prop20,eVar42,eVar43,eVar57,eVar70,eVar72,eVar74,eVar75';
            omt_s.linkTrackEvents = 'event49,event70';
            omt_s.events = 'event49,event70';
            omt_s.eVar42 = eventType;
            omt_s.eVar43 = paymentType;
            omt_s.eVar57 = 'mina meddelanden';
            omt_s.eVar70 = 'meddelande oppnad';
            omt_s.eVar72 = 'D=r';
            omt_s.eVar74 = 'D=g';
            omt_s.eVar75 = 'D=pageName';
            omt_s.tl(true, 'o', 'notification view');
        }
    } catch (e) {

    }
}
/* Function used to track clicks on Notifications(Ej utförda betalningar) */
function notificationAction(eventType, paymentType) {
    try {
        if (typeof omt_s != 'undefined' && eventType && paymentType) {
            omt_s.linkTrackVars = 'events,prop20,eVar42,eVar43,eVar57,eVar70,eVar72,eVar74,eVar75';
            omt_s.linkTrackEvents = 'event50,event70';
            omt_s.events = 'event50,event70';
            omt_s.eVar42 = eventType;
            omt_s.eVar43 = paymentType;
            omt_s.eVar57 = 'mina meddelanden';
            omt_s.eVar70 = 'meddelande action klick';
            omt_s.eVar72 = 'D=r';
            omt_s.eVar74 = 'D=g';
            omt_s.eVar75 = 'D=pageName';
            omt_s.tl(true, 'o', 'notification action');
        }
    } catch (e) {

    }
}
var s_account = setAccount();
var omt_s = new AppMeasurement('2.2.0');
omt_s.account = s_account ? s_account : 'sebsetest';
try {
    //***** Set Language *****//
    omt_s.prop20 = document.getElementsByTagName('html')[0].getAttribute('lang');

    //***** Set title and hierarchy *****//
    omt_s.pageName = document.getElementsByTagName('title')[0].innerHTML;

    var aStatMeta = document.getElementsByTagName('meta');
    var numOfMetaElems = aStatMeta.length;

    for (var i = 0; i < numOfMetaElems; i++) {
    	if (aStatMeta[i].name == 'statistics' || (aStatMeta[i].name == 'keywords' && aStatMeta[i].content.indexOf("statistics") >= 0)) {
    		var content = aStatMeta[i].content.replace(/^statistics:/, '');
    		content = replaceSwedishEntities(content);
    		omt_s[aStatMeta[i].content] = content;
    		omt_s[aStatMeta[i].id] = content;
    	}
    }

    //* Clean pagename *//
    if (omt_s.pageName) {
        omt_s.pageName = omt_s.pageName ? replaceSwedishEntities(omt_s.pageName).trim().toLowerCase() : '';
        omt_s.pageName = omt_s.pageName.replace(/–/g, '-').replace(/^ikp - |ikf - /, '').replace(/ - /g, ' : ').replace(/-/g, ' : ');
        omt_s.pageName = omt_s.pageName.replace(/^ : /, '').replace(/^:/, '').replace(/ : $/, '').replace(/:$/, '').trim();
        omt_s.pageName = sSite + ' : ' + omt_s.pageName;
        omt_s.hier1 = omt_s.pageName.split(' : ').join('|');
    }
    
    if (omt_s.prop42) {
        omt_s.prop42 = omt_s.prop42 ? replaceSwedishEntities(omt_s.prop42).trim().toLowerCase() : '';
        omt_s.prop42 = omt_s.prop42.replace(/–/g, '-').replace(/^ikp - |ikf - /, '').replace(/ - /g, ' : ').replace(/-/g, ' : ');
        omt_s.prop42 = omt_s.prop42.replace(/^ : /, '').replace(/^:/, '').replace(/ : $/, '').replace(/:$/, '').trim();
        omt_s.prop42 = sSite + ' : ' + omt_s.prop42;
        omt_s.eVar69 = 'D=c42';
    }

} catch (err) {}

/************************** CONFIG SECTION **************************/

/* Allow swedish characters */
omt_s.charSet = "ISO-8859-1";

/* Link Tracking Config */
omt_s.trackDownloadLinks = true;
omt_s.trackExternalLinks = true;
omt_s.trackInlineStats = true;
omt_s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
omt_s.linkInternalFilters = "javascript:,sebank.se,seb.se,wsp9006c,wsp9004c" + (location.hostname ? ',' + location.hostname : '');
omt_s.linkLeaveQueryString = false;
omt_s.linkTrackVars = "None";
omt_s.linkTrackEvents = "None";
omt_s.prop41 = "ver 2.1 ikp";
omt_s.eVar73 = sSite;

/* Plugin Config */
omt_s.usePlugins = true;

function s_doPlugins(s) {
    try {
        /* Language tracking */
        if (omt_s.Util.getQueryParam('chglng') == 'true') {
	        omt_s.eVar70 = "page language changed";
	        omt_s.events = omt_s.apl(omt_s.events, "event70", ",", 1)
        }

        /* External Campaign Tracking */
        omt_s.campaign = omt_s.Util.getQueryParam('cmpid');
        omt_s.eVar2 = omt_s.Util.getQueryParam('intcmp');
        omt_s.eVar29 = omt_s.Util.getQueryParam('adg');
	    omt_s.eVar30 = omt_s.Util.getQueryParam('adkw');
	    omt_s.eVar31 = omt_s.Util.getQueryParam('scmp');
	    omt_s.eVar32 = omt_s.Util.getQueryParam('icmp');
        omt_s.eVar33 = omt_s.Util.getQueryParam('xcmp');
        if (omt_s.campaign) {
	        omt_s.campaign = omt_s.getValOnce(omt_s.campaign, 'ecamp', 0);
	    }
	    if (omt_s.campaign) {
	        omt_s.events = omt_s.apl(omt_s.events, 'event25', ',', 1);
	        omt_s.events = omt_s.apl(omt_s.events, 'event32', ',', 1);
        }
        if (omt_s.eVar2) {
	        omt_s.eVar2=omt_s.getValOnce(omt_s.eVar2,'icamp',0);
        }
	    if (omt_s.eVar29) {
	        omt_s.eVar29 = omt_s.getValOnce(omt_s.eVar29, 'adg', 0);
	    }
	    if (omt_s.eVar30) {
	        omt_s.eVar30 = omt_s.getValOnce(omt_s.eVar30, 'adkw', 0);
	    }
	    if (omt_s.eVar31) {
	        omt_s.eVar31 = omt_s.getValOnce(omt_s.eVar31, 'scmp', 0);
	    }
	    if (omt_s.eVar32) {
	        omt_s.eVar32 = omt_s.getValOnce(omt_s.eVar32, 'icmp', 0);
	    }
        if (omt_s.eVar32) {
            omt_s.events = omt_s.apl(omt_s.events, 'event22', ',', 1);
	        omt_s.prop35 = omt_s.prop37 = 'D=v32';
        }
	    if (omt_s.eVar33) {
	        omt_s.eVar33 = omt_s.getValOnce(omt_s.eVar33, 'xcmp', 0);
	    }
        if (omt_s.eVar33) {
            omt_s.events = omt_s.apl(omt_s.events, 'event23', ',', 1);
	        omt_s.prop36 = omt_s.prop37 = 'D=v33';
        }

	    /* Pathing on cmpid */
	    if (omt_s.campaign) {
	        omt_s.prop23 = "cmpid_" + omt_s.campaign + ": " + omt_s.pageName;
	        omt_s.prop24 = omt_s.prop37 = 'D=v0';
	    } else {
	        omt_s.prop23 = 'D=pageName';
        }

	    /* Adgroup pathing */
	    if (omt_s.eVar29) {
	        omt_s.prop29 = "adg_" + omt_s.eVar29 + ": " + omt_s.pageName;
        } else {
	        omt_s.prop29 = "D=pageName";
        }

	    /* Adkeyword pathing */
	    if (omt_s.eVar30) {
	        omt_s.prop30 = "adkw_" + omt_s.eVar30 + ": " + omt_s.pageName;
        } else {
	        omt_s.prop30 = "D=pageName";
        }

	    /* Lowercase variables */
	    if (omt_s.prop1) {
	        omt_s.eVar1 = omt_s.prop1 = omt_s.prop1.toLowerCase();
		    omt_s.events=s.apl(omt_s.events,'event1',',',1);
	    }

        /* Plugin: timeparting - EST - hour,day,weekday */
        var tpA = s.getTimeParting('n','+1');
	    omt_s.prop7 = omt_s.eVar7 = tpA[1]; // set hour of day
	    omt_s.prop8 = omt_s.eVar8 = tpA[2]; // set day of week
	    omt_s.prop9 = omt_s.eVar9 = tpA[3]; // set weekend/weekday
	    if (omt_s.prop3) {
	        omt_s.eVar3 = omt_s.getValOnce(omt_s.prop3, 'omt_s_eVar3', 0);
	    }
	    if (omt_s.prop4) {
	        omt_s.eVar4 = omt_s.prop4;
	    }
	    if (omt_s.prop5) {
	        omt_s.eVar5 = omt_s.getValOnce(omt_s.prop5, 'omt_s_eVar5', 0);
	    }
	    if (omt_s.prop6) {
	        omt_s.eVar6 = omt_s.getValOnce(omt_s.prop6, 'omt_s_eVar6', 0);
	    }
	    if (omt_s.prop10) {
	        omt_s.eVar10 = omt_s.getValOnce(omt_s.prop10, 'omt_s_eVar10', 0);
	    }
        omt_s.eVar72 = 'D=r';
        omt_s.eVar74 = 'D=g';
        omt_s.eVar75 = 'D=pageName';

        if (!omt_s.prop42) {
            omt_s.prop42 = 'D=pageName';
            omt_s.eVar69 = 'D=pageName';
        }

        if (!omt_s.prop43) {
            omt_s.prop43 = 'D=pageName';
        }

        /* Handling for OMX-reporting s-prop */
        try {
            if (omt_s.prop9 == "Weekday") {
                var currentDate = new Date();
                var hour = parseInt(omt_s.prop7.substr(0, 2), 10);
                var minutes = currentDate.getMinutes();
                if (omt_s.prop7.indexOf("PM") > -1 && hour != 12) {
                    hour += 12;
                }
                if (hour >= 9 && hour <= 17) {
                    omt_s.prop16 = "open";
                }
                else if (hour == 8 && minutes >= 15) {
                    omt_s.prop16 = "open";
                }
                else if (hour == 18 && minutes <= 15) {
                    omt_s.prop16 = "open";
                }
                else {
                    omt_s.prop16 = "closed";
                }
            }
        }
        catch (err) {}

    } catch(e) {
		omt_s.eVar52 = location.href;
		omt_s.events = omt_s.apl(omt_s.events,'event58',',',1);
        omt_s.eVar72 = 'D=r';
        omt_s.eVar74 = 'D=g';
        omt_s.eVar75 = 'D=pageName';    
    }

    if (omt_s.list2) {
    	omt_s.list2 = omt_s.list2 ? replaceSwedishEntities(omt_s.list2).trim().toLowerCase() : '';
    }
    if (omt_s.list3) {
    	omt_s.list3 = omt_s.list3 ? replaceSwedishEntities(omt_s.list3).trim().toLowerCase() : '';
    }

}
omt_s.doPlugins = s_doPlugins

omt_s.loadModule("Media");
omt_s.Media.autoTrack=false;
omt_s.Media.trackVars="None";
omt_s.Media.trackEvents="None";
omt_s.Media.trackMilestones = "25,50,75";
omt_s.Media.segmentByMilestones = true;
omt_s.Media.trackUsingContextData = true;
omt_s.Media.contextDataMapping = {
    "a.media.name":"eVar45,prop45",
    "a.media.segment":"eVar46",
    "a.contentType":"eVar47",
    "a.media.timePlayed":"event54",
    "a.media.view":"event55",
    "a.media.complete":"event56",
    "a.media.segmentView":"event57",
    "a.media.milestones":{
  	    25:"event51",
  	    50:"event52",
  	    75:"event53"
      }
    }

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
omt_s.visitorNamespace = "seb"
omt_s.trackingServer = "seb.d3.sc.omtrdc.net"

/************************** PLUGINS SECTION *************************/

/*
 * Plugin: getValOnce 0.2 - get a value once per session or number of days
 */
omt_s.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");

/*
 * Plugin: getTimeParting 3.4
 */
omt_s._tpDST = {
	2012:'3/25,10/28',
	2013:'3/31,10/27',
	2014:'3/30,10/26',
	2015:'3/29,10/25',
	2016:'3/27,10/30',
	2017:'3/26,10/29',
	2018:'3/25,10/28',
	2019:'3/31,10/27'}
/*
 * Plugin: getTimeParting 3.3
 */
omt_s.getTimeParting=new Function("h","z",""
+ "var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+ "h()!=0){return'Data Not Available';}else{var H,M,D,W,U,ds,de,tm,tt,"
+ "da=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sa"
+ "turday'],d=new Date(),a=[];z=z?z:0;z=parseFloat(z);if(s._tpDST){var"
+ " dso=s._tpDST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d."
+ "getFullYear());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d"
+ ">ds&&d<de){z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime"
+ "()+(d.getTimezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getH"
+ "ours();M=d.getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U='AM';W='Wee"
+ "kday';if(H>=12){U='PM';H=H-12;}if(H==0){H=12;}if(D==6||D==0){W='Wee"
+ "kend';}D=da[D];tm=H+':'+M+U;tt=H+':'+((M>30)?'30':'00')+U;a=[tm,tt,"
+ "D,W];return a;}");

/*
 * Plugin Utility: Replace v1.0
 */
omt_s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: apl v1.1
 */
omt_s.apl = new Function("L", "v", "d", "u", ""
+ "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
omt_s.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: Form Analysis 2.1 (Success, Error, Abandonment)
 */
omt_s.setupFormAnalysis=new Function();
omt_s.sendFormEvent=new Function();

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/

/*
 * AppMeasurement Media Module
 */
var j=null;function E(){return function(){}}
function AppMeasurement_Module_Media(s){var m=this;m.s=s;var w=window;if(!w.s_c_in)w.s_c_il=[],w.s_c_in=0;m._il=w.s_c_il;m._in=w.s_c_in;m._il[m._in]=m;w.s_c_in++;m._c="s_m";m.list=[];m.open=function(e,g,d,l){var c={},a=new Date,b="",h;g||(g=-1);if(e&&d){if(!m.list)m.list={};m.list[e]&&m.close(e);if(l&&l.id)b=l.id;if(b)for(h in m.list)!Object.prototype[h]&&m.list[h]&&m.list[h].Rf==b&&m.close(m.list[h].name);c.name=e;c.length=g;c.xc=0;c.U=0;c.playerName=m.playerName?m.playerName:d;c.Rf=b;c.ce=0;c.aa=
0;c.timestamp=Math.floor(a.getTime()/1E3);c.za=0;c.wc=c.timestamp;c.T=-1;c.Dc="";c.ha=-1;c.Ic=0;c.Qd={};c.Mc=0;c.Ja=0;c.V="";c.Ob=0;c.Yd=0;c.Cc=0;c.Kc=0;c.xa=!1;c.Jb="";c.yc="";c.zc=0;c.sc=!1;c.na="";c.complete=0;c.Af=0;c.Hb=0;c.Ib=0;m.list[e]=c;c.Ud=!1}};m.openAd=function(e,g,d,l,c,a,b,h){var f={};m.open(e,g,d,h);if(f=m.list[e])f.xa=!0,f.Jb=l,f.yc=c,f.zc=a,f.na=b};m.Oe=function(e){var g=m.list[e];m.list[e]=0;g&&g.monitor&&clearTimeout(g.monitor.O)};m.close=function(e){m.ja(e,0,-1)};m.play=function(e,
g,d,l){var c=m.ja(e,1,g,d,l);if(c&&!c.monitor)c.monitor={},c.monitor.update=function(){c.za==1&&m.ja(c.name,3,-1);c.monitor.O=setTimeout(c.monitor.update,1E3)},c.monitor.update()};m.click=function(e,g){m.ja(e,7,g)};m.complete=function(e,g){m.ja(e,5,g)};m.stop=function(e,g){m.ja(e,2,g)};m.track=function(e){m.ja(e,4,-1)};m.yf=function(e,g){var d="a.media.",l=e.linkTrackVars,c=e.linkTrackEvents,a="m_i",b,h=e.contextData,f;if(g.xa){d+="ad.";if(g.Jb)h["a.media.name"]=g.Jb,h[d+"pod"]=g.yc,h[d+"podPosition"]=
g.zc;if(!g.Mc)h[d+"CPM"]=g.na}if(g.sc)h[d+"clicked"]=!0,g.sc=!1;h["a.contentType"]="video"+(g.xa?"Ad":"");h["a.media.channel"]=m.channel;h[d+"name"]=g.name;h[d+"playerName"]=g.playerName;if(g.length>0)h[d+"length"]=g.length;h[d+"timePlayed"]=Math.floor(g.aa);Math.floor(g.aa)>0&&(h[d+"timePlayed"]=Math.floor(g.aa));if(!g.Mc)h[d+"view"]=!0,a="m_s",m.Heartbeat&&m.Heartbeat.enabled&&(a=g.xa?m.__primetime?"mspa_s":"msa_s":m.__primetime?"msp_s":"ms_s"),g.Mc=1;if(g.V){h[d+"segmentNum"]=g.Ja;h[d+"segment"]=
g.V;if(g.Ob>0)h[d+"segmentLength"]=g.Ob;g.Cc&&g.aa>0&&(h[d+"segmentView"]=!0)}if(!g.Af&&g.complete)h[d+"complete"]=!0,g.gg=1;if(g.Hb>0)h[d+"milestone"]=g.Hb;if(g.Ib>0)h[d+"offsetMilestone"]=g.Ib;if(l)for(f in h)Object.prototype[f]||(l+=",contextData."+f);b=h["a.contentType"];e.pe=a;e.pev3=b;var B,C;if(m.contextDataMapping){if(!e.events2)e.events2="";l&&(l+=",events");for(f in m.contextDataMapping)if(!Object.prototype[f]){a=f.length>d.length&&f.substring(0,d.length)==d?f.substring(d.length):"";b=m.contextDataMapping[f];
if(typeof b=="string"){B=b.split(",");for(C=0;C<B.length;C++)b=B[C],f=="a.contentType"?(l&&(l+=","+b),e[b]=h[f]):a=="view"||a=="segmentView"||a=="clicked"||a=="complete"||a=="timePlayed"||a=="CPM"?(c&&(c+=","+b),a=="timePlayed"||a=="CPM"?h[f]&&(e.events2+=(e.events2?",":"")+b+"="+h[f]):h[f]&&(e.events2+=(e.events2?",":"")+b)):a=="segment"&&h[f+"Num"]?(l&&(l+=","+b),e[b]=h[f+"Num"]+":"+h[f]):(l&&(l+=","+b),e[b]=h[f])}else if(a=="milestones"||a=="offsetMilestones")f=f.substring(0,f.length-1),h[f]&&
m.contextDataMapping[f+"s"][h[f]]&&(c&&(c+=","+m.contextDataMapping[f+"s"][h[f]]),e.events2+=(e.events2?",":"")+m.contextDataMapping[f+"s"][h[f]]);h[f]&&(h[f]=0);a=="segment"&&h[f+"Num"]&&(h[f+"Num"]=0)}}e.linkTrackVars=l;e.linkTrackEvents=c};m.ja=function(e,g,d,l,c){var a={},b=(new Date).getTime()/1E3,h,f,B=m.trackVars,C=m.trackEvents,F=m.trackSeconds,n=m.trackMilestones,q=m.trackOffsetMilestones,v=m.segmentByMilestones,p=m.segmentByOffsetMilestones,r,t,y=1,k={},G;if(!m.channel)m.channel=m.s.w.location.hostname;
if(a=e&&m.list&&m.list[e]?m.list[e]:0){if(a.xa)F=m.adTrackSeconds,n=m.adTrackMilestones,q=m.adTrackOffsetMilestones,v=m.adSegmentByMilestones,p=m.adSegmentByOffsetMilestones;d<0&&(d=a.za==1&&a.wc>0?b-a.wc+a.T:a.T);a.length>0&&(d=d<a.length?d:a.length);d<0&&(d=0);a.xc=d;if(a.length>0)a.U=a.xc/a.length*100,a.U=a.U>100?100:a.U;if(a.T<0)a.T=d;G=a.Ic;k.name=e;k.ad=a.xa;k.length=a.length;k.openTime=new Date;k.openTime.setTime(a.timestamp*1E3);k.offset=a.xc;k.percent=a.U;k.playerName=a.playerName;k.mediaEvent=
a.ha<0?"OPEN":g==1?"PLAY":g==2?"STOP":g==3?"MONITOR":g==4?"TRACK":g==5?"COMPLETE":g==7?"CLICK":"CLOSE";if(g>2||g!=a.za&&(g!=2||a.za==1)){if(!c)l=a.Ja,c=a.V;if(g){if(g==1)a.T=d;if((g<=3||g>=5)&&a.ha>=0)if(y=!1,B=C="None",a.ha!=d){f=a.ha;if(f>d)f=a.T,f>d&&(f=d);r=n?n.split(","):0;if(a.length>0&&r&&d>=f)for(t=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)&&f/a.length*100<h&&a.U>=h)y=!0,t=r.length,k.mediaEvent="MILESTONE",a.Hb=k.milestone=h;if((r=q?q.split(","):0)&&d>=f)for(t=0;t<r.length;t++)if((h=
r[t]?parseFloat(""+r[t]):0)&&f<h&&d>=h)y=!0,t=r.length,k.mediaEvent="OFFSET_MILESTONE",a.Ib=k.offsetMilestone=h}if(a.Yd||!c){if(v&&n&&a.length>0){if(r=n.split(",")){r.push("100");for(t=f=0;t<r.length;t++)if(h=r[t]?parseFloat(""+r[t]):0){if(a.U<h)l=t+1,c="M:"+f+"-"+h,t=r.length;f=h}}}else if(p&&q&&(r=q.split(","))){r.push(""+(a.length>0?a.length:"E"));for(t=f=0;t<r.length;t++)if((h=r[t]?parseFloat(""+r[t]):0)||r[t]=="E"){if(d<h||r[t]=="E")l=t+1,c="O:"+f+"-"+h,t=r.length;f=h}}if(c)a.Yd=!0}if((c||a.V)&&
c!=a.V){a.Kc=!0;if(!a.V)a.Ja=l,a.V=c;a.ha>=0&&(y=!0)}if((g>=2||a.U>=100)&&a.T<d)a.ce+=d-a.T,a.aa+=d-a.T;if(g<=2||g==3&&!a.za)a.Dc+=(g==1||g==3?"S":"E")+Math.floor(d),a.za=g==3?1:g;if(!y&&a.ha>=0&&g<=3&&(F=F?F:0)&&a.aa>=F)y=!0,k.mediaEvent="SECONDS";a.wc=b;a.T=d}if(!g||g<=3&&a.U>=100)a.za!=2&&(a.Dc+="E"+Math.floor(d)),g=0,B=C="None",k.mediaEvent="CLOSE";if(g==7)y=k.clicked=a.sc=!0;if(g==5||m.completeByCloseOffset&&(!g||a.U>=100)&&a.length>0&&d>=a.length-m.completeCloseOffsetThreshold)y=k.complete=
a.complete=!0;b=k.mediaEvent;b=="MILESTONE"?b+="_"+k.milestone:b=="OFFSET_MILESTONE"&&(b+="_"+k.offsetMilestone);a.Qd[b]?k.eventFirstTime=!1:(k.eventFirstTime=!0,a.Qd[b]=1);k.event=k.mediaEvent;k.timePlayed=a.ce;k.segmentNum=a.Ja;k.segment=a.V;k.segmentLength=a.Ob;m.monitor&&g!=4&&m.monitor(m.s,k);if(m.Heartbeat&&m.Heartbeat.enabled){k=[];k.push(a.name);if(!a.Ud)a.Ud=!0,k.push(a.length),k.push(a.playerName),a.xa?(k.push(a.Jb),k.push(a.yc),k.push(a.zc),k.push(a.na),m.Heartbeat.callMethodWhenReady("openAd",
k)):m.Heartbeat.callMethodWhenReady("open",k),k=[],k.push(a.name);g==0?m.Heartbeat.callMethodWhenReady("close",k):(k.push(d),g==1?(k.push(a.Ja),k.push(a.V),k.push(a.Ob),m.Heartbeat.callMethodWhenReady("play",k)):g==2?m.Heartbeat.callMethodWhenReady("stop",k):g==3?m.Heartbeat.callMethodWhenReady("monitor",k):g==5?m.Heartbeat.callMethodWhenReady("complete",k):g==7&&m.Heartbeat.callMethodWhenReady("click",k));a.ha>=0&&(y=!1)}g==0&&m.Oe(e);if(y&&a.Ic==G){e={};e.contextData={};e.linkTrackVars=B;e.linkTrackEvents=
C;if(!e.linkTrackVars)e.linkTrackVars="";if(!e.linkTrackEvents)e.linkTrackEvents="";m.yf(e,a);e.linkTrackVars||(e["!linkTrackVars"]=1);e.linkTrackEvents||(e["!linkTrackEvents"]=1);m.s.track(e);if(a.Kc)a.Ja=l,a.V=c,a.Cc=!0,a.Kc=!1;else if(a.aa>0)a.Cc=!1;a.Dc="";a.Hb=a.Ib=0;a.aa-=Math.floor(a.aa);a.ha=d;a.Ic++}}}return a};m.vf=function(e,g,d,l,c){var a=0;if(e&&(!m.autoTrackMediaLengthRequired||g&&g>0)){if(!m.list||!m.list[e]){if(d==1||d==3)m.open(e,g,"HTML5 Video",c),a=1}else a=1;a&&m.ja(e,d,l,-1,0)}};
m.attach=function(e){var g,d,l;if(e&&e.tagName&&e.tagName.toUpperCase()=="VIDEO"){if(!m.hb)m.hb=function(c,a,b){var h,f;if(m.autoTrack){h=c.currentSrc;(f=c.duration)||(f=-1);if(b<0)b=c.currentTime;m.vf(h,f,a,b,c)}};g=function(){m.hb(e,1,-1)};d=function(){m.hb(e,1,-1)};m.ra(e,"play",g);m.ra(e,"pause",d);m.ra(e,"seeking",d);m.ra(e,"seeked",g);m.ra(e,"ended",function(){m.hb(e,0,-1)});m.ra(e,"timeupdate",g);l=function(){!e.paused&&!e.ended&&!e.seeking&&m.hb(e,3,-1);setTimeout(l,1E3)};l()}};m.ra=function(m,
g,d){m.attachEvent?m.attachEvent("on"+g,d):m.addEventListener&&m.addEventListener(g,d,!1)};if(m.completeByCloseOffset==void 0)m.completeByCloseOffset=1;if(m.completeCloseOffsetThreshold==void 0)m.completeCloseOffsetThreshold=1;var D=new function(m){this.Je=function(g){this.s=g;this.enabled=!1;this.v=new this.Ka.Of.ne(g)};this.open=function(g,d,m){this.v.open(g,d,m)};this.openAd=function(g,d,m,c,a,b,h){this.v.openAd(g,d,m,c,a,b,h)};this.close=function(g){this.v.close(g)};this.play=function(g,d,m,c,
a){this.v.play(g,d,m,c,a)};this.monitor=function(g,m){this.v.monitor(g,m)};this.stop=function(g,m){this.v.stop(g,m)};this.click=function(g,m){this.v.click(g,m)};this.complete=function(g,m){this.v.complete(g,m)};this.setup=function(g){this.v.Wf(g)};this.bufferStart=function(){this.v.xf()};this.bitrateChange=function(g){this.v.wf(g)};this.updateQoSInfo=function(g,m,e){this.v.bg(g,m,e)};this.adBreakStart=function(m){this.v.sf(m)};this.adBreakEnd=function(){this.v.rf()};this.trackError=function(m,d,e){this.v.$f(m,
d,e)};this.sessionComplete=function(){this.v.Uf()};this.__setPsdkVersion=function(m){this.v.Ke(m)};(function(m){if(typeof d==="undefined")var d={};if(typeof e==="undefined")var e={};e.event||(e.event={});e.a||(e.a={});e.H||(e.H={});e.bb||(e.bb={});e.M||(e.M={});(function(c){c.extend=function(a,b){function c(){this.constructor=a}for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f]);c.prototype=b.prototype;a.prototype=new c;a.r=b.prototype;return a}})(d);(function(c){c.Q=function(a,b){var c=[],f;for(f in b)b.hasOwnProperty(f)&&
typeof b[f]==="function"&&c.push(f);for(f=0;f<c.length;f++){var B=c[f];a.prototype[B]=b[B]}}})(d);(function(c){c.Md={Pd:function(){this.ea&&this.ea.apply(this,arguments);this.ea=j}}})(d);(function(c){c.Oa=!1;c.P={N:function(a){this.Ua=!0;this.Ab=a},jg:function(){this.Ua=!1},log:function(a){c.Oa&&this.Ua&&window.console&&window.console.log&&window.console.log(this.Ab+a)},info:function(a){c.Oa&&this.Ua&&window.console&&window.console.info&&window.console.info(this.Ab+a)},warn:function(a){c.Oa&&this.Ua&&
window.console&&window.console.warn&&window.console.warn(this.Ab+a)},error:function(a){if(c.Oa&&this.Ua&&window.console&&window.console.error)throw a=this.Ab+a,window.console.error(a),Error(a);}}})(d);(function(c){function a(a,c){this.type=a;this.data=c}a.wb="success";a.Xb="error";c.S=a})(d);(function(c){function a(){this.F={}}a.prototype.addEventListener=function(a,c,f){a&&c&&(this.F[a]=this.F[a]||[],this.F[a].push({zf:c,Ld:f||window}))};a.prototype.dispatchEvent=function(a){if(a.type)for(var c in this.F)if(this.F.hasOwnProperty(c)&&
a.type===c){var f=this.F[c];for(c=0;c<f.length;c++)f[c].zf.call(f[c].Ld,a);break}};a.prototype.eb=function(a){if(a){var c,f;for(f in this.F)if(this.F.hasOwnProperty(f)){for(c=this.F[f].length-1;c>=0;c--)this.F[f][c].Ld===a&&this.F[f].splice(c,1);this.F[f].length||delete this.F[f]}}else this.F={}};c.kd=a})(d);(function(c){function a(){if(!a.prototype.Ta)a.prototype.Ta=new b;return a.prototype.Ta}var b=c.kd;c.ca=a})(d);(function(c){function a(){}function b(){b.r.constructor.call(this)}var h=c.S,f=c.kd;
a.ld="GET";c.extend(b,f);b.prototype.Cf=function(a){a.I=new window.XMLHttpRequest;if(!("withCredentials"in a.I)&&(a.I=typeof window.XDomainRequest!=="undefined"?new window.XDomainRequest:j,a.I)){var f=this;a.I.onreadystatechange=function(){if(a.I.readyState===4){var m={};m[b.pd]=a.I.status;a.I.status>=200&&a.I.status<400?(m[b.od]=a.I.responseText,m[b.qb]=f,f.dispatchEvent(new c.S(h.wb,m))):f.dispatchEvent(new c.S(h.Xb,m))}}}};b.Eb=j;b.prototype.Mf=function(a){if(!b.Eb)b.Eb=new Image,b.Eb.alt="";b.Eb.src=
a.url;a={};a[b.pd]=200;a[b.od]="";a[b.qb]=this;this.dispatchEvent(new c.S(h.wb,a))};b.prototype.close=function(){this.eb()};b.prototype.load=function(a){a&&a.method&&a.url&&(this.Cf(a),a.I?(a.I.open(a.method,a.url,!0),a.I.send()):this.Mf(a))};b.pd="status";b.od="response";b.qb="instance";c.Ie=a;c.He=function(a,b){this.url=a||j;this.method=b;this.I=j};c.Ge=b})(d);(function(c,a){function b(){}b.Fa="report";b.qa="what";b.Ga="reset";b.Sb="account";b.cc="sc_tracking_server";b.xb="tracking_server";b.lb=
"check_status_server";b.rb="job_id";b.Pa="publisher";b.fc="stream_type";b.$b="ovp";b.ec="sdk";b.bd="channel";b.nb="debug_tracking";b.yb="track_local";b.Ha="visitor_id";b.Aa="analytics_visitor_id";b.Da="marketing_cloud_visitor_id";b.i="name";b.Ca="length";b.Ea="player_name";b.X="timer_interval";b.rd="tracking_interval";b.cd="check_status_interval";b.gc="track_external_errors";b.ac="parent_name";b.nd="parent_pod";b.bc="parent_pod_position";b.ub="parent_pod_offset";b.na="parent_pod_cpm";b.B="offset";
b.vb="source";b.Yb="error_id";b.kb="bitrate";b.Zb="fps";b.Vb="dropped_frames";a.event.ba=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.La="api_destroy";b.Tb="api_config";b.Uc="api_open_main";b.Tc="api_open_ad";b.Qc="api_close";b.Vc="api_play";b.Sc="api_monitor";b.Yc="api_stop";b.Pc="api_click";b.Rc="api_complete";b.Zc="api_track_error";b.Wc="api_qos_info";b.Nc="api_bitrate_change";b.Oc="api_buffer_start";b.Ub="api_pod_offset";b.Xc="api_session_complete";
a.event.Ma=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.Ba="context_data_available";a.event.dd=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.oa="data_request";b.mb="data_response";b.ya={Qa:"tracking_timer_interval",md:"main_video_publisher"};a.event.Wb=b})(d,e);(function(c,a){function b(a,f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.sb="network_check_status_complete";a.event.tb=b})(d,e);(function(c,a){function b(a,
f){b.r.constructor.call(this,a,f)}c.extend(b,c.S);b.CLOCK_TRACKING_TICK="CLOCK_TRACKING_TICK";b.CLOCK_TRACKING_ENABLE="CLOCK_TRACKING_ENABLE";b.CLOCK_TRACKING_DISABLE="CLOCK_TRACKING_DISABLE";b.CLOCK_CHECK_STATUS_TICK="CLOCK_CHECK_STATUS_TICK";b.CLOCK_CHECK_STATUS_ENABLE="CLOCK_CHECK_STATUS_ENABLE";b.CLOCK_CHECK_STATUS_DISABLE="CLOCK_CHECK_STATUS_DISABLE";a.event.Na=b})(d,e);(function(c,a){function b(a,b){this.value=a;this.hint=b}function h(a){this.Bc=a;this.data={}}b.pa="short";h.prototype.c=function(a,
b,c){var h=this;return function(){arguments.length&&(h[a]=arguments[0],h.Pb(b,arguments[0],c));return h[a]}};h.prototype.Pb=function(a,c,h){this.data[a]=new b(c,h)};a.a.R=h;a.a.ed=b})(d,e);(function(c,a){function b(a,c){b.r.constructor.call(this,a);this.cg=this.c("_year","year",h.pa);this.Qf=this.c("_month","month",h.pa);this.Df=this.c("_day","day",h.pa);this.Kf=this.c("_hour","hour",h.pa);this.Pf=this.c("_minute","minute",h.pa);this.Sf=this.c("_second","second",h.pa);this.cg(c.getUTCFullYear());
this.Qf(c.getUTCMonth()+1);this.Df(c.getUTCDate());this.Kf(c.getUTCHours());this.Pf(c.getUTCMinutes());this.Sf(c.getUTCSeconds())}var h=a.a.ed;c.extend(b,a.a.R);a.a.he=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"asset");this.Fb=this.c("_cpm","cpm",j);this.L=this.c("_adId","ad_id",j);this.Nb=this.c("_resolver","resolver",j);this.Kb=this.c("_podId","pod_id",j);this.Lb=this.c("_podPosition","pod_position",j);this.Mb=this.c("_podSecond","pod_second",j);this.length=this.c("_length",
"length",j);this.Fb("");this.L("");this.Nb("");this.Kb("");this.Lb("");this.Mb(0);this.length(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.Fb(a.Fb());this.L(a.L());this.Nb(a.Nb());this.Kb(a.Kb());this.Lb(a.Lb());this.Mb(a.Mb());this.length(a.length())}}c.extend(b,a.a.R);a.a.$c=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"asset");this.type=this.c("_type","type",j);this.k=this.c("_videoId","video_id",j);this.K=this.c("_publisher","publisher",j);this.q=
this.c("_adData","ad_data",j);this.duration=this.c("_duration","duration",j);this.type("");this.k("");this.K("");this.q(j);this.duration(0);if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.type(a.type());this.k(a.k());this.K(a.K());this.duration(a.duration());(a=a.q())&&this.q(new h(a))}}var h=a.a.$c;c.extend(b,a.a.R);b.sd="vod";b.Ce="live";b.Be="linear";b.Ra="ad";a.a.jb=b})(d,e);(function(c,a){function b(a){b.r.constructor.call(this,"event");this.pf=a;this.type=this.c("_type",
"type",j);this.count=this.c("_count","count",j);this.Gc=this.c("_totalCount","total_count",j);this.duration=this.c("_duration","duration",j);this.Hc=this.c("_totalDuration","total_duration",j);this.ka=this.c("_playhead","playhead",j);this.id=this.c("_id","id",j);this.source=this.c("_source","source",j);this.Ac=this.c("_prevTs","prev_ts",j);this.qf=function(){var a=this.pf*1E3;this.pc=new Date(Math.floor(this.oc/a)*a);this.Pb("ts_as_date",new h(this.Bc,this.pc),j)};this.Rb=function(){if(arguments.length)this.oc=
arguments[0],this.Pb("ts",this.oc,j),this.qf();return this.oc};this.ag=function(){if(arguments.length)this.pc=arguments[0],this.Pb("ts_as_date",new h(this.Bc,this.pc),j)};this.type("");this.count(0);this.Gc(0);this.duration(0);this.Hc(0);this.ka(0);this.id("");this.source("");this.Ac(-1);this.Rb((new Date).getTime())}var h=a.a.he;c.extend(b,a.a.R);b.le="load";b.me="unload";b.ob="start";b.jd="play";b.hd="pause";b.je="buffer";b.ie="bitrate_change";b.ke="error";b.fd="active";b.gd="complete";a.a.pb=b})(d,
e);(function(c,a){function b(){b.r.constructor.call(this,"stream");this.qc=this.c("_bitrate","bitrate",j);this.Rd=this.c("_fps","fps",j);this.Od=this.c("_droppedFrames","dropped_frames",j);this.qc(0);this.Rd(0);this.Od(0)}c.extend(b,a.a.R);a.a.re=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"sc");this.Xd=this.c("_reportSuiteId","rsid",j);this.trackingServer=this.c("_trackingServer","tracking_server",j);this.Xd("");this.trackingServer("")}c.extend(b,a.a.R);a.a.Ae=b})(d,e);(function(c,
a){function b(){b.r.constructor.call(this,"sp");this.ia=this.c("_ovp","ovp",j);this.la=this.c("_sdk","sdk",j);this.channel=this.c("_channel","channel",j);this.playerName=this.c("_playerName","player_name",j);this.ia("unknown");this.la("unknown");this.channel("unknown");this.playerName("")}c.extend(b,a.a.R);a.a.xe=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"event");this.Ec=this.c("_sessionId","sid",j);this.Ec("")}c.extend(b,a.a.R);a.a.ye=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,
"stream");this.rc=this.c("_cdn","cdn",j);this.name=this.c("_name","name",j);this.rc("");this.name("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.rc(a.rc());this.name(a.name())}}c.extend(b,a.a.R);a.a.qd=b})(d,e);(function(c,a){function b(){b.r.constructor.call(this,"user");this.uc=this.c("_device","device",j);this.country=this.c("_country","country",j);this.city=this.c("_city","city",j);this.latitude=this.c("_latitude","latitude",j);this.longitude=this.c("_longitude","longitude",
j);this.ib=this.c("_visitorId","id",j);this.$a=this.c("_analyticsVisitorId","aid",j);this.ab=this.c("_marketingCloudVisitorId","mid",j);this.uc("");this.country("");this.city("");this.latitude("");this.longitude("");this.ib("");this.$a("");this.ab("");if(arguments.length&&arguments[0]instanceof b){var a=arguments[0];this.uc(a.uc());this.country(a.country());this.city(a.city());this.latitude(a.latitude());this.longitude(a.longitude());this.ib(a.ib());this.$a(a.$a());this.ab(a.ab())}}c.extend(b,a.a.R);
a.a.vd=b})(d,e);(function(c,a){a.a.ue=function(a,c,f,m,e){this.ga=a;this.g=c;this.Lc=f;this.Fc=m;this.cb=e}})(d,e);(function(c,a){var b=a.a.pb;a.a.te=function(a,c,m){this.Xf=a;this.Tf=c;this.Vf=m;this.G=[];this.Za=function(a){this.G.push(a)};this.lg=function(){return this.G};this.Gf=function(){if(this.G.length)for(var a=this.G.length-1;a>=0;a--)this.G[a].ga.type()===b.hd&&this.G.splice(a,1)}}})(d,e);(function(c,a){function b(){}b.prototype.$d=E();b.prototype.ae=E();b.prototype.W=E();b.prototype.Zd=
E();b.prototype.be=E();a.a.we=b})(d,e);(function(c,a){function b(){this.N("[media-fork::QuerystringSerializer] > ");this.da=function(a){return a?a+"&":""};this.Gd=function(a){a&&a.length>0&&(a=a.substring(0,a.length-1));return a};this.mf=function(a){var b=[],c;for(c in a.data)if(a.data.hasOwnProperty(c)){var f=a.data[c],p=f.value;f=f.hint;var m=j,h=a.Bc;p===j||typeof p==="undefined"||(typeof p==="number"?m=this.Zd(c,p,h,f):typeof p==="string"?m=this.be(c,p,h,f):p instanceof e?m=this.W(p):this.warn("#_processDao() > Unable to serialize DAO. Field: "+
c+". Value: "+p+"."),m&&b.push(m))}return b}}var m=c.Q,f=c.P,e=a.a.R,g=a.a.ed;c.extend(b,a.a.we);m(b,f);b.prototype.$d=function(a){for(var b=[],c=a.G,f=0;f<c.length;f++){var p=this.ae(c[f])+"&";p+=this.da(this.W(a.Xf));p+=this.da(this.W(a.Tf));p+=this.da(this.W(a.Vf));p=this.Gd(p);b.push(p)}return b};b.prototype.ae=function(a){var b=this.da(this.W(a.ga));b+=this.da(this.W(a.g));b+=this.da(this.W(a.Lc));b+=this.da(this.W(a.Fc));b+=this.da(this.W(a.cb));return b=this.Gd(b)};b.prototype.W=function(a){a=
this.mf(a);for(var b="",c=0;c<a.length;c++)b+=c==a.length-1?a[c]:a[c]+"&";return b};b.prototype.Zd=function(a,b,c,f){var p="l";if(b!=j&&b!==void 0&&!isNaN(b))return f&&typeof f==="string"&&f===g.pa&&(p="h"),p+":"+c+":"+a+"="+b;return j};b.prototype.be=function(a,b,c){if(b)return"s:"+c+":"+a+"="+window.encodeURIComponent(b);return j};a.a.se=b})(d,e);(function(c,a){function b(a){this.Qb=0;this.O=a;this.Gb=!1}function m(){if(m.prototype.Ta)return m.prototype.Ta;var a=this;this.N("[media-fork::TimerManager] > ");
this.Ad=0;this.fa={};this.ua=function(){this.log("#_onApiDestroy()");clearInterval(this.yd);n().eb(this)};this.jf=function(){this.log("#_onTick() > ------------------- ("+this.Ad+")");this.Ad++;for(var a in this.fa)if(this.fa.hasOwnProperty(a)){var b=this.fa[a];if(b.Gb&&(b.Qb++,b.Qb%b.O===0)){var c={};c[d.X]=b.O;n().dispatchEvent(new g(g[a],c))}}};n().addEventListener(e.La,this.ua,this);this.yd=setInterval(function(){a.jf()},q*1E3);this.Lf=function(a){return(a=this.fa[a])&&a.Gb};this.Kd=function(a,
c){this.fa[a]=new b(c)};this.Ef=function(a){delete this.fa[a]};this.Yf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.fa[a];if(c&&(c.Gb=!0,b))this.log("Resseting timer: "+a),c.Qb=0};this.Zf=function(a,b){this.log("#startTimer(name="+a+", reset="+b+")");var c=this.fa[a];if(c&&(c.Gb=!1,b))this.log("Resseting timer: "+a),c.Qb=0};m.prototype.Ta=this}var f=c.Q,e=a.event.Ma,g=a.event.Na,d=a.event.ba,n=c.ca,q=1;f(m,c.P);new m;a.M.Ee=m})(d,e);(function(c,a){function b(a,b,c,m){this.N("[media-fork::Timer] > ");
this.O=m;this.ma=a;this.Hf=b;this.Ff=c;g().Kd(this.ma,this.O);this.ua=function(){this.Nd()};this.lf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.start(b)};this.kf=function(a){a=a.data;var b=!1;a&&a.hasOwnProperty(d.Ga)&&(b=a[d.Ga]);this.stop(b)};f().addEventListener(e.La,this.ua,this);f().addEventListener(this.Hf,this.lf,this);f().addEventListener(this.Ff,this.kf,this)}var m=c.Q,f=c.ca,e=a.event.Ma,g=a.M.Ee,d=a.event.ba;m(b,c.P);b.prototype.start=function(a){this.log("#start("+
this.ma+")");g().Yf(this.ma,a)};b.prototype.stop=function(a){this.log("#stop("+this.ma+")");g().Zf(this.ma,a)};b.prototype.Nd=function(){f().eb(this);g().Ef(this.ma)};b.prototype.setInterval=function(a){var b=g().Lf(this.ma);this.stop(!0);this.O=a;g().Kd(this.ma,this.O);b&&this.start(!0)};a.M.ud=b})(d,e);(function(c,a){function b(){this.N("[media-fork::TrackingTimer] > ");b.r.constructor.call(this,n.CLOCK_TRACKING_TICK,n.CLOCK_TRACKING_ENABLE,n.CLOCK_TRACKING_DISABLE,v);this.kc=function(a){a=a.data[q.rd];
this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.O?this.log("#_onCheckStatusComplete() > Interval value not changed."):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),this.setInterval(v))};this.lc=function(a){a=a.data[q.qa];this.log("#_onDataRequest(what="+a+")");switch(a){case g.ya.Qa:a={},a[q.X]=this.O,e().dispatchEvent(new g(g.mb,a))}};e().addEventListener(d.sb,this.kc,this);e().addEventListener(g.oa,
this.lc,this)}var m=c.Q,f=c.P,e=c.ca,g=a.event.Wb,d=a.event.tb,n=a.event.Na,q=a.event.ba,v=10;c.extend(b,a.M.ud);m(b,f);a.M.Fe=b})(d,e);(function(c,a){function b(){this.N("[media-fork::CheckStatusTimer] > ");b.r.constructor.call(this,v.CLOCK_CHECK_STATUS_TICK,v.CLOCK_CHECK_STATUS_ENABLE,v.CLOCK_CHECK_STATUS_DISABLE,f);var a=this;setTimeout(function(){a.Qe()},200);this.Qe=function(){this.log("#_initialCheck()");var a={};a[q.X]=this.O;d().dispatchEvent(new v(v.CLOCK_CHECK_STATUS_TICK,a))};this.kc=function(a){a=
a.data[q.cd];this.log("#_onCheckStatusComplete(interval="+a+")");a?a===this.O?this.log("#_onCheckStatusComplete() > Interval value not changed."):a>m?(this.warn("#_onCheckStatusComplete() > Interval value too large: "+a),this.setInterval(m)):(this.log("#_onCheckStatusComplete() > Interval changed to: "+a),this.setInterval(a)):(this.warn("#_onCheckStatusComplete() > Invalid interval value."),this.setInterval(f))};d().addEventListener(n.sb,this.kc,this)}var m=600,f=60,e=c.Q,g=c.P,d=c.ca,n=a.event.tb,
q=a.event.ba,v=a.event.Na;c.extend(b,a.M.ud);e(b,g);a.M.de=b})(d,e);(function(c,a){var b=a.M.de,m=a.M.Fe;a.M.ee=function(){this.dg=new b;this.fg=new m}})(d,e);(function(c,a){function b(a){this.N("[media-fork::SettingsParser] > ");this.Bd=a;this.log("#SettingsParser(data="+a+")")}var m=c.Q,f=c.ca,e=a.event.ba,g=a.event.tb;m(b,c.P);b.prototype.parse=function(){var a,b,c,m;if(this.Bd){window.DOMParser?m=(new window.DOMParser).parseFromString(this.Bd,"text/xml"):(m=new window.ActiveXObject("Microsoft.XMLDOM"),
m.async=!1,m.loadXML(this.data));var p;(p=parseInt(m.getElementsByTagName("trackingInterval")[0].childNodes[0].nodeValue,10))&&(a=p);(p=parseInt(m.getElementsByTagName("setupCheckInterval")[0].childNodes[0].nodeValue,10))&&(b=p);(p=parseInt(m.getElementsByTagName("trackExternalErrors")[0].childNodes[0].nodeValue,10))&&(c=p===1);m={};m[e.rd]=a;m[e.cd]=b;m[e.gc]=c;this.log("#parse() > Obtained configuration settings: "+JSON.stringify(m));f().dispatchEvent(new g(g.sb,m))}else this.warn("#SettingsParser() > No data available for parsing.")};
a.bb.ze=b})(d,e);(function(c,a){function b(a){this.N("[media-fork::Network] > ");this.ta=this.Hd=this.Cd=!1;this.of=a;this.Ed=this.xd=this.Id=j;this.jc=function(a){a=a.data;this.log("#_onApiConfig(sb_server="+a[p.xb]+", check_status_server="+a[p.lb]+", job_id="+a[p.rb]+", debug_tracking="+a[p.nb]+", track_local="+a[p.yb]+")");this.Id=a[p.xb];this.xd=a[p.lb];this.Ed=a[p.rb];this.Cd=a[p.nb];this.Hd=a[p.yb];this.ta=!0};this.ua=function(){this.log("#_onApiDestroy()");g().eb(this)};this.gf=function(a){if(this.ta){if(a=
this.of.$d(a.data[p.Fa]),!this.Hd)for(var b=0;b<a.length;b++){var c=new l(this.Id+"/?__job_id="+this.Ed+"&"+a[b],n.ld);this.Cd&&window.console&&window.console.info&&window.console.info(c.method+" : "+c.url);(function(a,b){a.addEventListener(e.wb,function(){a.close()},this);a.addEventListener(e.Xb,function(c){b.warn("#_onContextDataAvailable() > Failed to send heartbeat report: "+JSON.stringify(c));a.close()},this);a.load(c)})(new v,this)}}else this.warn("#_onContextDataAvailable() > Unable to send request: not configured.")};
this.ef=function(){function a(b){b.data&&(new k(b.data.response)).parse();b.data[v.qb].close()}function b(a){c.warn("_onClockCheckStatusTick() > Failed to obtain the config. settings: "+JSON.stringify(a));a.data[v.qb].close()}if(this.ta){var c=this;this.ea=function(c){if(c=c[p.Pa]){c=c.replace(/[^a-zA-Z0-9]+/,"-").toLocaleLowerCase();c=this.xd+c+".xml?r="+(new Date).getTime();var f=new l(c,n.ld),m=new v;m.addEventListener(e.wb,a,this);m.addEventListener(e.Xb,b,this);this.log("#_onClockCheckStatusTick() > Get new settings from: "+
c);m.load(f)}else this.warn("#_onClockCheckStatusTick() > Publisher is NULL.")};var f={};f[p.qa]=r.ya.md;g().dispatchEvent(new r(r.oa,f))}else this.warn("#_onClockCheckStatusTick() > Unable to send request: not configured.")};this.mc=function(a){this.Pd(a.data)};g().addEventListener(r.mb,this.mc,this);g().addEventListener(d.Tb,this.jc,this);g().addEventListener(d.La,this.ua,this);g().addEventListener(y.Ba,this.gf,this);g().addEventListener(t.CLOCK_CHECK_STATUS_TICK,this.ef,this)}var m=c.Q,f=c.P,e=
c.S,g=c.ca,d=a.event.Ma,n=c.Ie,l=c.He,v=c.Ge,p=a.event.ba,r=a.event.Wb,t=a.event.Na,y=a.event.dd,k=a.bb.ze;m(b,c.Md);m(b,f);a.bb.qe=b})(d,e);(function(c,a){function b(){this.N("[media-fork::Counters] > ");this.va={};this.wa={};this.Sd=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=0);this.log("#getTotalCount(key="+a+")");return this.va[a]};this.mg=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalCount(key="+a+")");this.va[a]=0};this.Wd=function(a,b,c){a=b+"."+c+"."+a;this.va[a]||(this.va[a]=
0);this.log("#incrementTotalCount(key="+a+")");this.va[a]++};this.Td=function(a,b,c){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#getTotalDuration(key="+a+")");return this.wa[a]};this.ng=function(a,b,c){a=b+"."+c+"."+a;this.log("#resetTotalDuration(key="+a+")");this.wa[a]=0};this.Vd=function(a,b,c,m){a=b+"."+c+"."+a;this.wa[a]||(this.wa[a]=0);this.log("#increaseTotalDuration(key="+a+", amount="+m+")");this.wa[a]+=m}}var m=c.Q;m(b,c.P);a.H.ge=b})(d,e);(function(c,a){function b(){this.N("[media-fork::History] > ");
this.Dd={};this.zd=function(a){var b=a.g;return(b.q()?b.q().L():b.k())+"."+b.type()+"."+a.$};this.gb=function(a){var b=this.zd(a);this.log("#updateWith(key="+b+")");this.Dd[b]=a};this.J=function(a){a=this.zd(a);this.log("#getPreviousItemOfSameTypeWith(key="+a+")");return this.Dd[a]}}var m=c.Q;m(b,c.P);a.H.oe=b})(d,e);(function(c,a){var b=a.a.pb,m=a.a.jb,f=a.a.vd,e=a.a.qd;a.H.td=function(a,c,g,d,v,p){this.timestamp=new Date;this.g=new m(a);this.Lc=new f(c);this.Fc=new e(g);this.$=v;this.cb=d;this.ka=
p;this.A=void 0;this.If=function(){if(this.$===b.fd)return this.g.k();return this.g.type()===m.Ra?this.g.q().L():this.g.k()};this.kg=function(){return 1}}})(d,e);(function(c,a){a.H.De=function(){this.Z=[];this.Jf=function(){return this.Z.slice()};this.tf=function(a){for(var c=-1,m=this.Z.length-1;m>=0;m--){if(a.timestamp>=this.Z[m].timestamp)break;c=m}c>0?this.Z.splice(m,0,a):this.Z.push(a)}}})(d,e);(function(c,a){function b(a){this.N("[media-fork::ReporterHelper] > ");this.j=a;this.Fd=j;this.Ne=
function(a,b,c){c*=1E3;a=a.getTime()===0?b.getTime()-c/2:a.getTime()/2+b.getTime()/2;a=Math.floor(a/c)*c;this.Fd==a&&(a+=c);this.Fd=a;return new Date(a)};this.Sa=function(a,b,c){var m=this.j.ic,f=a.$,g=a.If(),h=a.g.type(),n=f===e.ob?0:a.ka;m.Wd(f,g,h);m.Vd(f,g,h,b);c=new e(c);c.type(f);c.count(1);c.duration(b);c.Gc(m.Sd(f,g,h));c.Hc(m.Td(f,g,h));c.ka(n);c.Rb(a.timestamp.getTime());c.Ac(a.A?a.A.timestamp.getTime():-1);return new d(c,a.g,a.Lc,a.Fc,a.cb)};this.wd=function(a,b,c){if(a.G.length){var m=
new g(this.j.e);m.type(this.j.Bb);m.q(j);m=new n(m,this.j.n,this.j.C,this.j.u,e.fd,this.j.p[this.j.e.k()]);m.A=this.j.o.J(m);this.j.o.gb(m);a.Za(this.Sa(m,b*1E3,b));if(c!=j)for(b=0;b<a.G.length;b++)a.G[b].ga.ag(c)}};this.Xa=function(a,b){return b.getTime()-a.getTime()};this.tc=function(a,b,c){var m=new f(this.j.Db,this.j.Ia,this.j.Wa);m.Za(this.Sa(a,0,b));c&&this.wd(m,b,j);return m};this.Jd=function(a,b,c){var m,d,h=new f(this.j.Db,this.j.Ia,this.j.Wa),n=this.j.Z.Jf(),l=[];d=j;var o=0;for(o=m=0;o<
n.length;o++)m=n[o],m.timestamp>a&&m.timestamp<=b&&l.push(m),m.timestamp<=a&&(d=m);this.log("#createReportForQuantum() > -------------TRACK REPORT----------------");this.log("#createReportForQuantum() > Interval: ["+a.getTime()+" , "+b.getTime()+"]. Tracking interval: "+c);this.log("#createReportForQuantum() > -----------------------------------------");for(o=0;o<n.length;o++)this.log("#createReportForQuantum() > ["+n[o].timestamp.getTime()+"] :"+n[o].$+" | "+n[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");
for(o=0;o<l.length;o++)this.log("#createReportForQuantum() > ["+l[o].timestamp.getTime()+"] :"+l[o].$+" | "+l[o].g.type());this.log("#createReportForQuantum() > -----------------------------------------");if(d){if(d.A)d.A.timestamp=d.timestamp;d.timestamp=new Date(a.getTime()+1);m=d.g.q()?d.g.q().L():d.g.k();d.ka=this.j.p[m]}if(l.length){n=0;d&&(n=d.$===e.ob&&d.g.type()!==g.Ra?this.Xa(d.timestamp,l[0].timestamp):this.Xa(a,l[0].timestamp),h.Za(this.Sa(d,n,c)));for(o=0;o<l.length;o++){var q=l[o];n=
o==l.length-1?this.Xa(q.timestamp,b):this.Xa(q.timestamp,l[o+1].timestamp);var x=!1,u=h.G;for(m=0;m<u.length;m++)if(d=u[m],q.g.type()===d.g.type()&&q.$===d.ga.type()&&(x=q.g.type()===g.Ra?d.g.q().L()===q.g.q().L():d.g.k()===q.g.k()),x){u=d.ga;var z=d.g.type();m=d.g.q()?d.g.q().L():d.g.k();var i=this.j.ic;i.Wd(u.type(),m,z);i.Vd(u.type(),m,z,n);d.cb=q.cb;u.ka(this.j.p[m]);u.duration(u.duration()+n);u.Gc(i.Sd(u.type(),m,z));u.Hc(i.Td(u.type(),m,z));u.Rb(q.timestamp.getTime());break}if(!x)this.log("#createReportForQuantum() > Adding event to report: "+
q.$),m=q.g.q()?q.g.q().L():q.g.k(),q.ka=this.j.p[m],h.Za(this.Sa(q,n,c))}}else d&&h.Za(this.Sa(d,this.Xa(a,b),c));h.Gf();o=this.Ne(a,b,c);this.wd(h,c,o);this.log("#createReportForQuantum() > Final report ----- START -----");for(o=0;o<h.G.length;o++)d=h.G[o],c=d.ga,m=d.g.q()?d.g.q().L():d.g.k(),this.log("#createReportForQuantum() > Final report ["+c.Rb()+"/"+c.Ac()+"] :"+c.type()+" | type="+d.g.type()+", name="+m+", duration="+c.duration()+", playhead="+c.ka());this.log("#createReportForQuantum() > Final report ----- END -----");
return h}}var m=c.Q,f=a.a.te,e=a.a.pb,g=a.a.jb,d=a.a.ue,n=a.H.td;m(b,c.P);a.H.ve=b})(d,e);(function(c,a){function b(){this.N("[media-fork::Context] > ");this.zb=this.z=!1;this.Bb=j;this.hc=!1;this.l=this.Cb=j;this.f={fb:j,K:j};this.Ya=this.ea=j;this.p={};this.Va=new g(this);this.Z=new e;this.o=new l;this.Wa=new v;this.Db=new p;this.Ia=new t;this.e=new r;this.n=new y;this.C=new k;this.u=new G;this.ic=new w;this.jc=function(a){a=a.data;this.log("#_onApiConfig(account="+a[i.Sb]+", sc_server="+a[i.cc]+
", sb_server="+a[i.xb]+", check_status_server="+a[i.lb]+", job_id="+a[i.rb]+", publisher="+a[i.Pa]+", ovp="+a[i.$b]+", sdk="+a[i.ec]+", debug_tracking="+a[i.nb]+", track_local="+a[i.yb]+")");this.Db.Xd(a[i.Sb]);this.Db.trackingServer(a[i.cc]);this.f.K=a[i.Pa];this.Ia.ia(a[i.$b]);this.Ia.la(a[i.ec]);this.Ia.channel(a[i.bd]);d().dispatchEvent(new o(o.CLOCK_CHECK_STATUS_ENABLE))};this.ua=function(){this.log("#_onApiDestroy()");d().eb(this)};this.Ye=function(a){a=a.data;this.log("#_onApiOpenMain(name="+
a[i.i]+", length="+a[i.Ca]+", type="+a[i.fc]+", player_name="+a[i.Ea]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")");this.nf();this.l=a[i.i];this.p[this.l]=0;this.Ia.playerName(a[i.Ea]);this.n.ib(a[i.Ha]);this.n.$a(a[i.Aa]);this.n.ab(a[i.Da]);this.e.k(this.l);this.e.duration(a[i.Ca]);this.e.type(a[i.fc]);this.Bb=this.e.type();this.C.name(this.l);this.Pe();a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE,a));this.ea=function(a){a=a[i.X];var b=new n(this.e,this.n,this.C,this.u,
A.le,0);b.A=this.o.J(b);this.o.gb(b);a=this.Va.tc(b,a,!0);b={};b[i.Fa]=a;d().dispatchEvent(new z(z.Ba,b))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.J(a);this.Y(a);this.z=!0};this.Xe=function(a){if(this.z){this.info("Call detected: onApiOpenAd().");a=a.data;this.log(this,"#_onApiOpenAd(name="+a[i.i]+", length="+a[i.Ca]+", player_name="+a[i.Ea]+", parent_name="+a[i.ac]+", pod_pos="+a[i.bc]+", pod_offset="+a[i.ub]+", cpm="+a[i.na]+")");
this.e.k()||this.e.k(a[i.ac]);this.l=a[i.i];this.p[this.l]=0;var b=new s;b.L(this.l);b.length(a[i.Ca]);b.Nb(a[i.Ea]);b.Fb(a[i.na]);b.Kb(a[i.nd]);b.Mb(this.Cb);b.Lb(a[i.bc]+"");this.e.q(b);this.e.type(r.Ra);a=new n(this.e,this.n,this.C,this.u,A.ob,0);a.A=this.o.J(a);this.Y(a);a=new n(this.e,this.n,this.C,this.u,A.jd,this.p[this.l]);a.A=this.o.J(a);this.Y(a)}else this.warn("#_onApiOpenAd() > No active viewing session.")};this.Ue=function(a){this.z?(a=a.data[i.i],this.log("#_onApiClose(name="+a+")"),
a===this.e.k()?this.Me():this.Le()):this.warn("#_onApiClose() > No active viewing session.")};this.Ze=function(a){if(this.z){if(a=a.data,this.log("#_onApiPlay(name="+a[i.i]+", offset="+a[i.B]+", vid="+a[i.Ha]+", aid="+a[i.Aa]+", mid="+a[i.Da]+")"),!(a[i.i]==this.e.k&&this.zb))this.n.ib(a[i.Ha]),this.n.$a(a[i.Aa]),this.n.ab(a[i.Da]),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),d().dispatchEvent(new o(o.CLOCK_TRACKING_ENABLE)),a=new n(this.e,this.n,this.C,this.u,A.jd,this.p[this.l]),a.A=this.o.J(a),
this.Y(a)}else this.warn("#_onApiPlay() > No active viewing session.")};this.cf=function(a){this.z?(a=a.data,this.log("#_onApiStop(name="+a[i.i]+", offset="+a[i.B]+")"),this.l=a[i.i],this.p[this.l]=Math.floor(a[i.B]),a=new n(this.e,this.n,this.C,this.u,A.hd,this.p[this.l]),a.A=this.o.J(a),this.Y(a),d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE))):this.warn("#_onApiStop() > No active viewing session.")};this.Te=function(a){this.z?(a=a.data,this.log("#_onApiClick(name="+a[i.i]+", offset="+a[i.B]+
")")):this.warn("#_onApiClick() > No active viewing session.")};this.Ve=function(a){this.z?(a=a.data,this.log("#_onApiComplete(name="+a[i.i]+", offset="+a[i.B]+")")):this.warn("#_onApiComplete() > No active viewing session.")};this.af=function(a){this.z?(a=a.data,this.log("#_onApiQoSInfo(bitrate="+a[i.i]+", fps="+a[i.Zb]+", dropped_frames="+a[i.Vb]+")"),this.u.qc(a[i.kb]),this.u.Rd(a[i.Zb]),this.u.Od(a[i.Vb])):this.warn("#_onApiQoSInfo() > No active viewing session.")};this.Re=function(a){if(this.z){a=
a.data;this.log("#_onApiBitrateChange(bitrate="+a[i.i]+")");this.u.qc(a[i.kb]);var b=new n(this.e,this.n,this.C,this.u,A.ie,this.p[this.l]);b.A=this.o.J(b);this.o.gb(b);this.ea=function(a){a=this.Va.tc(b,a[i.X],!1);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}else this.warn("#_onApiBitrateChange() > No active viewing session.")};this.Se=function(){if(this.z){this.log("#_onApiBufferStart()");var a=new n(this.e,this.n,this.C,this.u,A.je,
this.p[this.l]);a.A=this.o.J(a);this.Y(a)}else this.warn("#_onApiBufferStart() > No active viewing session.")};this.df=function(a){if(this.z){var b=a.data;this.log("#_onApiTrackError(source="+b[i.vb]+", err_id="+b[i.Yb]+", offset="+b[i.B]+")");if(!(this.hc&&b[i.vb]!==H)){var c=new n(this.e,this.n,this.C,this.u,A.ke,Math.floor(b[i.B]));c.A=this.o.J(c);this.o.gb(c);this.ea=function(a){a=this.Va.tc(c,a[i.X],!1);var m=a.G[0];m.ga.id(b[i.Yb]);m.ga.source(b[i.vb]);m={};m[i.Fa]=a;d().dispatchEvent(new z(z.Ba,
m))};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a))}}else this.warn("#_onApiTrackError() > No active viewing session.")};this.$e=function(a){this.z?(this.Cb=Math.floor(a.data[i.ub]),this.log("#_onApiPodOffset(podOffset="+this.Cb+")")):this.warn("#_onApiPodOffset() > No active viewing session.")};this.bf=function(){if(this.z){this.log("#_onApiSessionComplete()");var a=new n(this.e,this.n,this.C,this.u,A.me,0);a.A=this.o.J(a);this.Y(a);this.ea=function(a){var b=new Date;a=this.Va.Jd(this.Ya||
new Date(0),b,a[i.X]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b};a={};a[i.qa]=x.ya.Qa;d().dispatchEvent(new x(x.oa,a));a={};a[i.Ga]=!0;d().dispatchEvent(new o(o.CLOCK_TRACKING_DISABLE,a));this.z=!1}else this.warn("#_onApiSessionComplete() > No active viewing session.")};this.We=function(a){if(this.z){var b=a.data;this.log("#_onApiMonitor(name="+b[i.i]+", offset="+b[i.B]+")");this.l=b[i.i];this.p[this.l]=Math.floor(a.data[i.B])}else this.warn("#_onApiMonitor() > No active viewing session.")};
this.ff=function(a){if(this.z){this.log("#_onClockTrackingTick(interval="+a.data[i.X]+")");var b=new Date;a=this.Va.Jd(this.Ya||new Date(0),b,a.data[i.X]);var c={};c[i.Fa]=a;d().dispatchEvent(new z(z.Ba,c));this.Ya=b}else this.warn("#_onClockTrackingTick() > No active viewing session.")};this.hf=function(a){this.log("#_onNetworkCheckStatusComplete(track_ext_err="+a.data[i.gc]+")");a=a.data[i.gc];if(a!==j)this.hc=a};this.lc=function(a){a=a.data[i.qa];this.log("#_onDataRequest(what="+a+")");switch(a){case x.ya.md:a=
{},a[i.Pa]=this.f.K,d().dispatchEvent(new x(x.mb,a))}};this.mc=function(a){this.log("#_onDataResponse()");this.Pd(a.data)};this.nf=function(){this.log("#_resetInternalState()");this.zb=this.z=!1;this.Bb=j;this.hc=!1;this.p={};this.Ya=this.Cb=j;this.ic=new w;this.o=new l;this.Z=new e;this.n=new y;this.C=new k;this.u=new G;this.Wa=new v;this.e=new r;this.e.K(this.f.K);this.e.type(this.f.fb)};this.Pe=function(){this.Wa.Ec(""+(new Date).getTime()+Math.floor(Math.random()*1E9));this.log("#_generateSessionId() > New session id: "+
this.Wa.Ec)};this.Y=function(a){this.log("#_placeItemOnTimeline(type="+a.$+")");this.Z.tf(a);this.o.gb(a)};this.Me=function(){if(this.zb)this.warn("#_closeMainVideo() > The main video content was already closed.");else{this.p[this.e.k()]==-1&&(this.p[this.e.k()]=this.e.duration());var a=new n(this.e,this.n,this.C,this.u,A.gd,this.p[this.e.k()]);a.A=this.o.J(a);this.Y(a);this.zb=!0}};this.Le=function(){var a=new n(this.e,this.n,this.C,this.u,A.gd,this.p[this.l]);a.A=this.o.J(a);this.Y(a);this.e.type(this.Bb);
this.l=this.e.k();this.e.q(j)};d().addEventListener(u.Tb,this.jc,this);d().addEventListener(u.La,this.ua,this);d().addEventListener(u.Uc,this.Ye,this);d().addEventListener(u.Tc,this.Xe,this);d().addEventListener(u.Qc,this.Ue,this);d().addEventListener(u.Vc,this.Ze,this);d().addEventListener(u.Yc,this.cf,this);d().addEventListener(u.Pc,this.Te,this);d().addEventListener(u.Rc,this.Ve,this);d().addEventListener(u.Wc,this.af,this);d().addEventListener(u.Nc,this.Re,this);d().addEventListener(u.Oc,this.Se,
this);d().addEventListener(u.Zc,this.df,this);d().addEventListener(u.Ub,this.$e,this);d().addEventListener(u.Xc,this.bf,this);d().addEventListener(u.Sc,this.We,this);d().addEventListener(o.CLOCK_TRACKING_TICK,this.ff,this);d().addEventListener(D.sb,this.hf,this);d().addEventListener(x.oa,this.lc,this);d().addEventListener(x.mb,this.mc,this)}var m=c.Q,f=c.P,d=c.ca,g=a.H.ve,e=a.H.De,n=a.H.td,l=a.H.oe,v=a.a.ye,p=a.a.Ae,r=a.a.jb,t=a.a.xe,y=a.a.vd,k=a.a.qd,G=a.a.re,w=a.H.ge,o=a.event.Na,D=a.event.tb,x=
a.event.Wb,u=a.event.Ma,z=a.event.dd,i=a.event.ba,A=a.a.pb,s=a.a.$c,H="player";m(b,c.Md);m(b,f);a.H.fe=b})(d,e);(function(c){function a(a){this.N("[media-fork::HeartbeatMediaFork] > ");this.m=a;this.D=function(){var a=this.ta&&(this.m.analyticsVisitorID||this.m.marketingCloudVisitorID||this.m.visitorID);a||this.warn("Unable to track! Is configured: "+this.ta+" analyticsVisitorID: "+this.m.analyticsVisitorID+" marketingCloudVisitorID: "+this.m.marketingCloudVisitorID+" visitorID: "+this.m.visitorID);
return a};this.ta=!1;this.j=new n;this.eg=new l(new v);this.yd=new g;this.nc=j;this.f={trackingServer:j,vc:j,K:j,fb:j,ia:j,la:j,channel:j,debugTracking:!1,Jc:!1}}var b=d.Q,m=d.ca,f=c.event.ba,e=c.event.Ma,g=c.M.ee,l=c.bb.qe,n=c.H.fe,q=c.a.jb,v=c.a.se;b(a,d.P);a.prototype.Wf=function(a){if(a&&a.hasOwnProperty("debugLogging"))d.Oa=a.debugLogging;this.log("#setup(configData={trackingServer: "+a.trackingServer+", jobId: "+a.vc+", streamType: "+a.fb+", publisher: "+a.K+", ovp: "+a.ia+", sdk: "+a.la+", debugLogging: "+
a.ig+"})");this.f.debugTracking=this.m.debugTracking;this.f.Jc=this.m.trackLocal;this.f.channel=this.m.Media.channel;if(a){if(a.hasOwnProperty("trackingServer"))this.f.trackingServer=a.trackingServer;if(a.hasOwnProperty("jobId"))this.f.vc=a.jobId;if(a.hasOwnProperty("publisher"))this.f.K=a.publisher;if(a.hasOwnProperty("ovp"))this.f.ia=a.ovp;if(a.hasOwnProperty("sdk"))this.f.la=a.sdk;if(a.hasOwnProperty("streamType"))this.f.fb=a.streamType===q.sd||a.streamType===q.Ce||a.streamType===q.Be||a.streamType===
q.Ra?a.streamType:q.sd;if(this.m.Media.__primetime)this.f.ia="primetime";if(this.nc!=j)this.f.la=this.nc;this.log("#setup() > Applying configuration: {account: "+this.m.account+", scTrackingServer: "+this.m.trackingServer+", sbTrackingServer: "+this.f.trackingServer+", jobId: "+this.f.trackingServer+", publisher: "+this.f.K+", ovp: "+this.f.ia+", sdk: "+this.f.la+", channel: "+this.f.channel+", debugTracking: "+this.f.debugTracking+", trackLocal: "+this.f.Jc+"}");a={};a[f.Sb]=this.m.account;a[f.cc]=
this.m.trackingServer;a[f.xb]=this.f.trackingServer;a[f.lb]=this.f.trackingServer+"/settings/";a[f.rb]=this.f.vc;a[f.Pa]=this.f.K;a[f.$b]=this.f.ia;a[f.ec]=this.f.la;a[f.bd]=this.f.channel;a[f.nb]=this.f.debugTracking;a[f.yb]=this.f.Jc;m().dispatchEvent(new e(e.Tb,a));this.ta=!0}};a.prototype.open=function(a,b,c){this.log("#open(name="+a+", length="+b+", playerName="+c+")");if(this.D()){var d={};d[f.Ha]=this.m.visitorID;d[f.Aa]=this.m.analyticsVisitorID;d[f.Da]=this.m.Nf;d[f.i]=a;d[f.Ca]=b;d[f.fc]=
this.f.fb;d[f.Ea]=c;m().dispatchEvent(new e(e.Uc,d))}};a.prototype.openAd=function(a,b,c,d,g,l,n){this.log("#openAd(name="+a+", length="+b+", playerName="+c+", parentName="+d+", parentPod="+g+", parentPodPosition="+l+", cpm="+n+", )");if(this.D()){var o={};o[f.i]=a;o[f.Ca]=b;o[f.Ea]=c;o[f.ac]=d;o[f.nd]=g;o[f.bc]=l;o[f.na]=n;m().dispatchEvent(new e(e.Tc,o))}};a.prototype.close=function(a){this.log("#close(name="+a+")");if(this.D()){var b={};b[f.i]=a;m().dispatchEvent(new e(e.Qc,b))}};a.prototype.play=
function(a,b,c,d,g){this.log("#play(name="+a+", offset="+b+", segmentNum="+c+", segment="+d+", segmentLength="+g+")");if(this.D())c={},c[f.Ha]=this.m.visitorID,c[f.Aa]=this.m.analyticsVisitorID,c[f.Da]=this.m.Nf,c[f.i]=a,c[f.B]=b,m().dispatchEvent(new e(e.Vc,c))};a.prototype.monitor=function(a,b){this.log("#monitor(name="+a+", offset="+b+")");var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Sc,c))};a.prototype.stop=function(a,b){this.log("#stop(name="+a+", offset="+b+")");if(this.D()){var c={};
c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Yc,c))}};a.prototype.click=function(a,b){this.log("#click(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Pc,c))}};a.prototype.complete=function(a,b){this.log("#complete(name="+a+", offset="+b+")");if(this.D()){var c={};c[f.i]=a;c[f.B]=b;m().dispatchEvent(new e(e.Rc,c))}};a.prototype.Nd=function(){Logger.hg(this,"#destroy()");m().dispatchEvent(new e(e.La))};a.prototype.$f=function(a,b,c){this.log("#trackError(source="+
a+", errorId="+b+", offset="+c+")");if(this.D()){var d={};d[f.vb]=a;d[f.Yb]=b;d[f.B]=c;m().dispatchEvent(new e(e.Zc,d))}};a.prototype.bg=function(a,b,c){this.log("#updateQoSInfo(bitrate="+a+", fps="+b+", droppedFrames="+c+")");if(this.D()){var d={};d[f.kb]=a;d[f.Zb]=b;d[f.Vb]=c;m().dispatchEvent(new e(e.Wc,d))}};a.prototype.wf=function(a){this.log("#bitrateChange(bitrate="+a+")");if(this.D()){var b={};b[f.kb]=a;m().dispatchEvent(new e(e.Nc,b))}};a.prototype.xf=function(){this.log("#bufferStart()");
this.D()&&m().dispatchEvent(new e(e.Oc))};a.prototype.sf=function(a){this.log("#adBreakStart(offset="+a+")");if(this.D()){var b={};b[f.ub]=a;m().dispatchEvent(new e(e.Ub,b))}};a.prototype.rf=function(){this.log("#adBreakEnd()");if(this.D()){var a={};a[f.ub]=j;m().dispatchEvent(new e(e.Ub,a))}};a.prototype.Uf=function(){this.log("#sessionComplete()");this.D()&&m().dispatchEvent(new e(e.Xc))};a.prototype.Ke=function(a){this.log("#__setPsdkVersion(version="+a+")");this.nc=a};c.ne=a})(e);m.Ka||(m.Ka=
{});m.Ka.Bf||(m.Ka.Bf=d);m.Ka.Of=e})(this);this.Je(m)}(m.s);D.callMethodWhenReady=function(m,g){s.visitor!=j&&(s.isReadyToTrack()?D[m].apply(this,g):s.callbackWhenReadyToTrack(D,D[m],g))};m.Heartbeat=D;m.uf=function(){var e,g;if(m.autoTrack&&(e=m.s.d.getElementsByTagName("VIDEO")))for(g=0;g<e.length;g++)m.attach(e[g])};m.ra(w,"load",m.uf)}

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.2.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.2.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();

/* Moved to end of file 2008-12-19 by S10026 */
try {
    var s_code = omt_s.t(); if (s_code) document.write(s_code);
} catch (err) {}
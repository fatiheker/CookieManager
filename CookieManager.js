var sessionCookie = {
    isExist: function () {
        var sessionStartTime = cookieManager.getCookie(checkoutSessionStartCookieName);
        if (sessionStartTime == "")
            return false;
        else {
            if (this.getValue() > 0)
                return true;
            else
                return false;
        }
    },
    create: function () {
        var now = new Date();
        cookieManager.setCookie(checkoutSessionStartCookieName, now, 365);
    },
    getValue: function () {
        var sTime = cookieManager.getCookie(checkoutSessionStartCookieName);
        if (sTime != "") {
            var sTimeDate = new Date(sTime);
            var now = new Date();
            var diff = now - sTimeDate;
            return diff;
        }
        else
            return 0;    
    },
    delete: function () {
        cookieManager.setCookie(checkoutSessionStartCookieName, "", -1);
    }
};

var cookieManager = {
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        console.log(cname + " cookie created!");
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
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
}

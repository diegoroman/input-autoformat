var groupingSeparator = ".",
    decimalSeparator = ",";

function currencyFormat(a, c, b, d) {
    if (!/(android)/i.test(navigator.userAgent)) {
        if (9 == c.keyCode) return !0;
        var f;
        j = 0;
        var e;
        len2 = 0;
        var h;
        aux2 = "";
        f = window.event ? c.keyCode : c.charCode;
        if (13 == f) return !0;
        var g;
        "selectionStart" in a ? (c = a.selectionStart, g = a.selectionEnd) : (g = document.selection.createRange().getBookmark(), c = a.createTextRange(), c.moveToBookmark(g), g = a.createTextRange(), g.collapse(!0), g.setEndPoint("EndToStart", c), g = g.text.length, e = c.text.length, c = a.value, document.selection.clear(), a.value = c, c = g, g +=
            e);
        f = String.fromCharCode(f);
        if (-1 == "0123456789".indexOf(f)) return !1;
        e = a.value.length;
        void 0 == b && (b = 12);
        void 0 == d && (d = 2);
        b = largoTotalNumerico(b, d);
        if (e >= b) return !1;
        if (c != g || c < e) a.value = a.value.substring(0, c) + f + a.value.substring(g, e);
        e = a.value.length;
        for (b = 0; b < e && ("0" == a.value.charAt(b) || a.value.charAt(b) == decimalSeparator); b++);
        for (h = ""; b < e; b++) - 1 != "0123456789".indexOf(a.value.charAt(b)) && (h += a.value.charAt(b));
        c == g && c == e && (h += f);
        e = h.length;
        0 == e && (a.value = "");
        if (e <= d) {
            a.value = "0" + decimalSeparator;
            for (b = d - e; 0 < b; b--) a.value += "0";
            a.value += h
        }
        if (e > d) {
            aux2 = "";
            j = 0;
            for (b = e - d - 1; 0 <= b; b--) 3 == j && (aux2 += groupingSeparator, j = 0), aux2 += h.charAt(b), j++;
            a.value = "";
            len2 = aux2.length;
            for (b = len2 - 1; 0 <= b; b--) a.value += aux2.charAt(b);
            a.value += decimalSeparator + h.substr(e - d, e)
        }
        return !1
    }
}

function largoTotalNumerico(a, c) {
    return a + (Math.ceil(a / 3) - 1) + 1 + 2
}

function keyPressed(a, c, b) {
    if (!/(android)/i.test(navigator.userAgent)) {
        b || (b = 2);
        var d = 0;
        "Netscape" == navigator.appName && (d = 1);
        var f = c.keyCode;
        c = 8 == f ? !0 : !1;
        var f = 46 == f ? !0 : !1,
            e, h;
        if ("selectionStart" in a) e = a.selectionStart, h = a.selectionEnd;
        else {
            var g = document.selection.createRange().getBookmark();
            e = a.createTextRange();
            e.moveToBookmark(g);
            g = a.createTextRange();
            g.collapse(!0);
            g.setEndPoint("EndToStart", e);
            g = g.text.length;
            h = e.text.length;
            e = g;
            h = g + h
        }
        len = a.value.length;
        g = "0" + decimalSeparator;
        for (i = b; 0 < i; i--) g +=
            "0";
        c ? (a.value == g && (a.value = ""), e != h ? a.value = a.value.substring(0, e) + a.value.substring(h, len + d) : e == len ? a.value = a.value.substring(0, e - d) : e < len && 0 < e && (a.value = a.value.substring(0, e - d) + a.value.substring(h, len))) : f && (e != h ? a.value = a.value.substring(0, e) + a.value.substring(h, len) : 0 == e ? a.value = a.value.substring(d, len) : e < len && 0 < e && (a.value = a.value.substring(0, e) + a.value.substring(h + d, len)));
        d = a.value;
        d = replace(d, groupingSeparator, "");
        d = replace(d, decimalSeparator, "");
        d = addDecimalSeparator(d, decimalSeparator,b, g);
        d = addGroupingSeparator(d, groupingSeparator, b);
        a.value = d;
        c && a.value == g && (a.value = "")
    }
}

function replace(a, c, b) {
    newText = "";
    arr = a.split(c);
    if (1 < arr.length)
        for (a = 0; a < arr.length; a++) newText += arr[a], a + 1 < arr.length && (newText += b);
    else newText = a;
    return newText
}

function addDecimalSeparator(a, c, b, d) {
    var f = a.length;
    if (0 == f) a = d;
    else if (f <= b) {
        c = "0" + c;
        for (b -= f; 0 < b; b--) c += "0";
        a = c + a
    } else d = a.substr(0, f - b), a = a.substr(f - b), a = d + c + a;
    return a
}

function addGroupingSeparator(a, c, b) {
    var d = a.length,
        f = a.substr(0, d - b - 1);
    b = a.substr(d - b - 1);
    if (3 < f.length) {
        for (a = ""; 3 < f.length;) d = f.substr(f.length - 3), f = f.substr(0, f.length - 3), a = d + a, 0 < f.length && 3 < f.length && (a = c + a);
        0 < f.length && (a = f + c + a);
        a += b
    }
    return a
}
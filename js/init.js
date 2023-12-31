document.documentElement.dataset.block_cursor = false;
var block_cursor = document.documentElement.dataset.block_cursor;
var storage_data = {};
var anibase_ext = {};
var statbase_ext = {};
var click_x = 0;
var click_y = 0;
var data_base = "";
var ext_link =
    "https://chrome.google.com/webstore/detail/cursorland-custom-cursor/oinkhgpjmeccknjbbccabjfonamfmcbn";
var top_base = "";
var base = "";
var ani_base = "";
var base_selected = "top";
var sort_type = "top";
var preview_index = 0;
var cur_base = "top";
var isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var ovf = isChrome ? "overlay" : "scroll";
const isInstalled = !!document.getElementsByTagName("html")[0].dataset.cursorStyle;
var editorExtensionId = document.documentElement.dataset.chromeId;

function hideLoader() {
    document.body.style.overflow = ovf;
    loader.style.display = "none";
}

function setTop(type, id) {
    $.ajax("/settop", {
        method: "post",
        data: {
            _token: $("[name=csrf-token]").attr("content"),
            type: type,
            id: id,
        },
    });
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

window.addEventListener("load", function () {
});
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.dataset.hasOwnProperty("installed"))
        if (document.querySelector("#install_container"))
            install_container.style.display = "none";
    document.body.onclick = function (e) {
        s = document.elementFromPoint(e.clientX, e.clientY);
        if (s.hasAttribute("data-type") && s.className != "inactive_btn") {
            if (s.parentNode.className == "main__btns")
                rs = s.parentNode.parentNode.children[1].children[0].src;
            if (s.parentNode.id == "prev_btn")
                rs =
                    s.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                        .children[0].children[0].src;
            if (s.parentNode.id == "mbtis")
                rs =
                    s.parentNode.parentNode.parentNode.parentNode.children[0].children[0]
                        .children[0].children[0].children[0].src;
            temp_img = document.createElement("img");
            if (document.getElementById("temp_img"))
                document.getElementById("temp_img").remove();
            temp_img.id = "temp_img";
            temp_img.style.top = e.clientY + "px";
            temp_img.style.left = e.clientX + "px";
            temp_img.style.width = "64px";
            temp_img.style.height = "64px";
            temp_img.style.zIndex = "99999";
            temp_img.src = rs;
            temp_img.className = "temp_img";
            document.body.appendChild(temp_img);
            setTimeout(function () {
                temp_img.classList.add("temp_img_animate");
            }, 50);
        }
    };
    getBaseFromExtension();
    links = document.getElementsByClassName("top_menu_link");
    [].forEach.call(links, function (cl) {
        cl.className = "top_menu_link";
        if (location.href == cl.href) cl.classList.add("active");
    });
    hideLoader();
});

function addToBtn(e) {
    if (!isInstalled) {
        openModal();
    } else {
        addToCollection(e);
    }
}

function checkDisabledButtons() {
    r = Array.from(document.querySelectorAll(".inactive_btn"));
    r.forEach(function (el) {
        type = el.dataset.type;
        cat = el.dataset.cat;
        id = el.dataset.id;
        name = el.dataset.name;
        offsetX = el.dataset.offsetX;
        offsetY = el.dataset.offsetY;
        offsetX_p = el.dataset.offsetX_p;
        offsetY_p = el.dataset.offsetY_p;
        c_file = el.dataset.c_file;
        p_file = el.dataset.p_file;
        if (type == "stat") {
            for (r in statbase_ext) {
                if (statbase_ext[r].id == cat) {
                    list = statbase_ext[r].items;
                    list.forEach(function (els) {
                        if (els.id == id && els.removed == 1) {
                            btn = document.createElement("a");
                            btn.dataset.type = type;
                            btn.dataset.id = id;
                            btn.dataset.cat = cat;
                            btn.dataset.name = name;
                            btn.dataset.offsetX = offsetX;
                            btn.dataset.offsetY = offsetY;
                            btn.dataset.offsetX_p = offsetX_p;
                            btn.dataset.offsetY_p = offsetY_p;
                            btn.dataset.c_file = c_file;
                            btn.dataset.p_file = p_file;
                            btn.className = "hvr-shutter-out-horizontal-g";
                            btn.dataset.cur = "pointer";
                            btn.innerHTML = i18n.collections["add_button"];
                            btn.onclick = function (e) {
                                addToBtn(this);
                            };
                            el.parentNode.replaceChild(btn, el);
                        }
                    });
                }
            }
        }
        if (type == "anim") {
            anibase_ext.forEach(function (els) {
                if (els.id == id && els.removed == 1) {
                    btn = document.createElement("a");
                    btn.dataset.type = type;
                    btn.dataset.id = id;
                    btn.dataset.cat = cat;
                    btn.dataset.name = name;
                    btn.dataset.offsetX = offsetX;
                    btn.dataset.offsetY = offsetY;
                    btn.dataset.offsetX_p = offsetX_p;
                    btn.dataset.offsetY_p = offsetY_p;
                    btn.dataset.c_file = c_file;
                    btn.dataset.p_file = p_file;
                    btn.className = "hvr-shutter-out-horizontal-g";
                    btn.dataset.cur = "pointer";
                    btn.innerHTML = i18n.collections["add_button"];
                    btn.onclick = function (e) {
                        addToBtn(this);
                    };
                    el.parentNode.replaceChild(btn, el);
                }
            });
        }
    });
}

function checkEnabledButtons() {
    if (!isInstalled) return;
    r = Array.from(document.querySelectorAll(".hvr-shutter-out-horizontal-g"));
    r.forEach(function (el) {
        type = el.dataset.type;
        cat = el.dataset.cat;
        id = el.dataset.id;
        name = el.dataset.name;
        offsetX = el.dataset.offsetX;
        offsetY = el.dataset.offsetY;
        offsetX_p = el.dataset.offsetX_p;
        offsetY_p = el.dataset.offsetY_p;
        c_file = el.dataset.c_file;
        p_file = el.dataset.p_file;
        if (type == "stat") {
            for (r in statbase_ext) {
                if (statbase_ext[r].id == cat) {
                    list = statbase_ext[r].items;
                    list.forEach(function (els) {
                        if (els.id == id && els.removed == 0) {
                            var btn = document.createElement("span");
                            btn.innerHTML = i18n.collections["added_button"];
                            btn.dataset.id = id;
                            btn.dataset.cat = cat;
                            btn.dataset.name = name;
                            btn.dataset.type = type;
                            btn.dataset.offsetX = offsetX;
                            btn.dataset.offsetY = offsetY;
                            btn.dataset.offsetX_p = offsetX_p;
                            btn.dataset.offsetY_p = offsetY_p;
                            btn.dataset.c_file = c_file;
                            btn.dataset.p_file = p_file;
                            btn.className = "inactive_btn";
                            el.parentNode.replaceChild(btn, el);
                        }
                    });
                }
            }
        }
        if (type == "anim") {
            anibase_ext.forEach(function (els) {
                if (els.id == id && els.removed == 0) {
                    var btn = document.createElement("span");
                    btn.innerHTML = i18n.collections["added_button"];
                    btn.dataset.id = id;
                    btn.dataset.name = name;
                    btn.dataset.type = type;
                    btn.dataset.offsetX = offsetX;
                    btn.dataset.offsetY = offsetY;
                    btn.dataset.offsetX_p = offsetX_p;
                    btn.dataset.offsetY_p = offsetY_p;
                    btn.dataset.c_file = c_file;
                    btn.dataset.p_file = p_file;
                    btn.className = "inactive_btn";
                    el.parentNode.replaceChild(btn, el);
                }
            });
        }
    });
}

function checkButton(el) {
    if (!isInstalled) return;
    if (!el.dataset.type) return;
    type = el.dataset.type;
    id = el.dataset.id;
    cat = el.dataset.cat ? el.dataset.cat : -1;
    if (type == "stat") {
        for (item in statbase_ext) {
            if (statbase_ext[item].id == cat) {
                list = statbase_ext[item].items;
                list.forEach(function (elem) {
                    if (elem.id == id) {
                        if (!elem.removed) {
                            var btn = document.createElement("span");
                            btn.innerHTML = i18n.collections["added_button"];
                            btn.dataset.id = id;
                            btn.dataset.cat = cat;
                            btn.dataset.type = type;
                            btn.dataset.name = el.dataset.name;
                            btn.dataset.offsetX = el.dataset.offsetX;
                            btn.dataset.offsetX_p = el.dataset.offsetX_p;
                            btn.dataset.offsetY = el.dataset.offsetY;
                            btn.dataset.offsetY_p = el.dataset.offsetY_p;
                            btn.dataset.c_file = "/resources/cursors/" + el.dataset.c_file;
                            btn.dataset.p_file = "/resources/pointers/" + el.dataset.p_file;
                            btn.className = "inactive_btn";
                            el.parentNode.replaceChild(btn, el);
                        }
                        return;
                    }
                });
            }
        }
    }
    if (type == "anim") {
        anibase_ext.forEach(function (elem) {
            if (elem.id == id) {
                if (!elem.removed) {
                    var btn = document.createElement("span");
                    btn.innerHTML = i18n.collections["added_button"];
                    btn.dataset.id = id;
                    btn.dataset.cat = cat;
                    btn.dataset.type = type;
                    btn.dataset.name = el.dataset.name;
                    btn.dataset.offsetX = el.dataset.offsetX;
                    btn.dataset.offsetX_p = el.dataset.offsetX_p;
                    btn.dataset.offsetY = el.dataset.offsetY;
                    btn.dataset.offsetY_p = el.dataset.offsetY_p;
                    btn.dataset.c_file =
                        "/resources/animated/cursors/" + el.dataset.c_file;
                    btn.dataset.p_file =
                        "/resources/animated/pointers/" + el.dataset.p_file;
                    btn.className = "inactive_btn";
                    el.parentNode.replaceChild(btn, el);
                }
                return;
            }
        });
    }
}

function setStateInLocalBase(id, cat, type) {
    if (!type) return;
    cat = cat ? cat : -1;
    if (type == "stat") {
        for (item in statbase_ext) {
            if (statbase_ext[item].id == cat) {
                list = statbase_ext[item].items;
                list.forEach(function (elem, i) {
                    if (elem.id == id) {
                        statbase_ext[item].items[i].removed = 0;
                        return;
                    }
                });
            }
        }
    } else if (type == "anim") {
        anibase_ext.forEach(function (elem, i) {
            if (elem.id == id) {
                anibase_ext[i].removed = 0;
                return;
            }
        });
    }
}

function replaceInstallBtn(base, ind, type) {
    if (!isInstalled) return;
    base[ind].cat = base[ind].cat ? base[ind].cat : -1;
    var btn = document.createElement("a");
    btn.innerHTML = i18n.collections["add_button"];
    btn.className = "hvr-shutter-out-horizontal-g";
    btn.dataset.type = type;
    btn.dataset.cat = base[ind].cat;
    btn.dataset.id = base[ind].id;
    btn.dataset.name = base[ind].name;
    btn.dataset.offsetX = base[ind].offsetX;
    btn.dataset.offsetX_p = base[ind].offsetX_p;
    btn.dataset.offsetY = base[ind].offsetY;
    btn.dataset.offsetY_p = base[ind].offsetY_p;
    if (type == "stat") {
        btn.dataset.c_file = "/resources/cursors/" + base[ind].c_file;
        btn.dataset.p_file = "/resources/pointers/" + base[ind].p_file;
    } else {
        btn.dataset.c_file = "/resources/animated/cursors/" + base[ind].c_file;
        btn.dataset.p_file = "/resources/animated/pointers/" + base[ind].p_file;
    }
    btn.onclick = function (e) {
        addToBtn(this);
    };
    if (document.getElementById("banner_install_btn"))
        banner_install_btn.parentNode.replaceChild(btn, banner_install_btn);
    if (document.querySelector("#prev_container .inactive_btn")) {
        document
            .querySelector("#prev_container .inactive_btn")
            .parentNode.replaceChild(
            btn,
            document.querySelector("#prev_container .inactive_btn")
        );
    }
    if (document.querySelector("#prev_container .hvr-shutter-out-horizontal-g")) {
        document
            .querySelector("#prev_container .hvr-shutter-out-horizontal-g")
            .parentNode.replaceChild(
            btn,
            document.querySelector("#prev_container .hvr-shutter-out-horizontal-g")
        );
    }
    if (document.querySelector("#prev_container .hvr-shutter-out-horizontal-g")) {
        btn_prev = document.querySelector(
            "#prev_container .hvr-shutter-out-horizontal-g"
        );
        checkButton(btn_prev);
    }
}

function getBaseFromExtension() {
}

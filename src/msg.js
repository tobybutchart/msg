/* configurable global vars */
let MSG_HEADER_FONT = "Verdana, sans-serif";
let MSG_CONTENT_FONT = "Verdana, sans-serif";

let MSG_HEADER_FONT_COLOUR = "#FFFFFF";
let MSG_CONTENT_FONT_COLOUR = "#000000";

let MSG_CONTENT_COLOUR = "#FFFFFF";

let MSG_CONTENT_MAX_WIDTH = "386px";

let MSG_SUCCESS_COLOUR = "#4caf50";
let MSG_INFO_COLOUR = "#2196F3";
let MSG_WARNING_COLOUR = "#ff9800";
let MSG_ERROR_COLOUR = "#d32f2f";
let MSG_CONFIRM_COLOUR = "#7308B0";
let MSG_INPUT_COLOUR = "#7308B0";
let MSG_CUSTOM_COLOUR = "#4caf50";

let MSG_TEXT_OK = "OK";
let MSG_TEXT_CANCEL = "Cancel";
let MSG_TEXT_CONFIRM_OK = "OK";
let MSG_TEXT_CONFIRM_CANCEL = "Cancel";

let MSG_TEXT_SUCCESS = "Success!";
let MSG_TEXT_INFO = "Info...";
let MSG_TEXT_WARNING = "Warning!";
let MSG_TEXT_ERROR = "Error!";
let MSG_TEXT_CONFIRM = "Confirm?";
let MSG_TEXT_INPUT = "Input";

let MSG_USE_ICONS = true;

/*Add CSS that cannot be added inline*/
let css = `.msg-close:hover,
.msg-close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.msg-content {
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

@-webkit-keyframes animatetop {
    from {
        top:-300px; opacity:0
    }
    to {
        top:0; opacity:1
    }
}

@keyframes animatetop {
    from {
        top:-300px; opacity:0
    }
    to {
        top:0; opacity:1
    }
}`;

let style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

/*load material icons*/
let link = document.createElement('link');
let head = document.getElementsByTagName('head')[0];
let materialIconsLoaded = false;

link.addEventListener('load', function() {
    materialIconsLoaded = true;
})

link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
head.appendChild(link);

/*checks if running as a Chrome extension*/
function isExtension() {
    const ext = "chrome-extension://";
    let url = window.location.href;

    return url.includes(ext);
}

function mainMsg() {
    return document.getElementById("msg-main");
}

var onMsgKeyDown = function(e) {
    const btnOK = document.getElementById('msg-close');
    const btnCancel = document.getElementById('msg-cancel');

    var event = e || window.event;

    if (event.key === "Escape") {
        if (btnCancel) {
            btnCancel.click();
        } else if (btnOK) {
            btnOK.click();
        }
    }

    if (event.key === "Enter") {
        if (btnOK) {
            btnOK.click();
        }
    }
}

function buildMsg(msgType, onConfirm, onDecline, sender) {
    let divMain = document.createElement("div");
    let divContent = document.createElement("div");
    let divHeader = document.createElement("div");
    let headerIcon = document.createElement("i");
    let h2Title = document.createElement("h2");
    let divBody = document.createElement("div");
    let divFooter = document.createElement("div");
    let btnOK = document.createElement("button");
    let icoOK = document.createElement("i");

    let btnCancel;
    let icoCancel;
    let inp;

    if (msgType.toLowerCase() == "confirm" || msgType.toLowerCase() == "input") {
        btnCancel = document.createElement("button");
        icoCancel = document.createElement("i");
    }

    if (msgType.toLowerCase() == "input") {
        inp = document.createElement("input");
        inp.type = "text";
        inp.id = "msg-input";
        inp.setAttribute("autocomplete", "off");
    }

    divMain.style.display = "none";
    divMain.id = "msg-main";
    divMain.classList.add("msg-main");
    divMain.style.display = "none";
    divMain.style.position = "fixed";
    divMain.style.zIndex = "2";
    divMain.style.paddingTop = "50px";
    divMain.style.left = "0";
    divMain.style.top = "0";
    divMain.style.width = "100%";
    divMain.style.height = "100%";
    divMain.style.overflow = "auto";
    divMain.style.backgroundColor = "rgb(0,0,0)";
    divMain.style.backgroundColor = "rgba(0,0,0,0.4)";

    divContent.id = "msg-content";
    divContent.classList.add("msg-content");
    divContent.style.position = "relative";
    divContent.style.backgroundColor = MSG_CONTENT_COLOUR;
    divContent.style.margin = "auto";
    divContent.style.padding = "0";
    divContent.style.width = "80%";
    divContent.style.border = "1px solid black";
    divContent.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)";
    divMain.appendChild(divContent);

    divHeader.id = "msg-header";
    divHeader.classList.add("msg-header");
    divHeader.style.padding = "2px 16px";
    divContent.appendChild(divHeader);

    if (MSG_USE_ICONS && materialIconsLoaded) {
        headerIcon.id = "msg-icon";
        headerIcon.classList.add("material-icons", "msg-icon");
        headerIcon.style.float = "right";
        headerIcon.style.paddingTop = "15px";
        headerIcon.style.fontSize = "48px";
        //if installed as Chrome extension
        if (typeof isExtension === 'function' && isExtension()) {
            headerIcon.style.paddingTop = "5px";
        }
        divHeader.appendChild(headerIcon);
    }

    h2Title.id = "msg-title";
    h2Title.classList.add("msg-title");
    divHeader.appendChild(h2Title);

    divBody.id = "msg-body";
    divBody.classList.add("msg-body");
    divBody.style.textAlign = "center";
    divBody.style.padding = "25px";
    divBody.style.color = "black";
    divContent.appendChild(divBody);

    if (msgType.toLowerCase() == "input") {
        const br = document.createElement("br");
        divBody.appendChild(br);
        divBody.appendChild(inp);
    }

    divFooter.id = "msg-footer";
    divFooter.classList.add("msg-footer");
    divFooter.style.textAlign = "center";
    divFooter.style.padding = "15px";
    divFooter.style.paddingTop = "0px";
    divFooter.style.backgroundColor = MSG_CONTENT_COLOUR;
    divContent.appendChild(divFooter);

    btnOK.id = "msg-close";
    btnOK.classList.add("msg-close");
    btnOK.style.fontSize = "28px";
    btnOK.style.margin = "5px";
    btnOK.innerHTML = msgType.toLowerCase() == "confirm" ? MSG_TEXT_CONFIRM_OK : MSG_TEXT_OK + "&nbsp;";
    btnOK.onclick = function() {
        let elem = document.getElementById("msg-input");
        let value = elem ? elem.value : "";

        if (elem && !value) {
            elem.focus();
            return false;
        }

        closeMsg();

        if (typeof onConfirm === 'function') {
            if (msgType.toLowerCase() == "input") {
                onConfirm(sender, value);
            } else {
                onConfirm(btnOK);
            }
        }
    };
    divFooter.appendChild(btnOK);

    if (MSG_USE_ICONS && materialIconsLoaded) {
        icoOK.classList.add("material-icons");
        icoOK.innerHTML = "check";
        btnOK.appendChild(icoOK);
    }

    if (msgType.toLowerCase() == "confirm" || msgType.toLowerCase() == "input") {
        btnCancel.id = "msg-cancel";
        btnCancel.classList.add("msg-close");
        btnCancel.style.fontSize = "28px";
        btnCancel.style.margin = "5px";
        btnCancel.innerHTML = msgType.toLowerCase() == "confirm" ? MSG_TEXT_CONFIRM_CANCEL : MSG_TEXT_CANCEL + "&nbsp;";
        btnCancel.onclick = function() {
            let elem = document.getElementById("msg-input");
            let value = elem ? elem.value : "";

            closeMsg();

            if (typeof onDecline === 'function') {
                onDecline(btnCancel, value);
            }
        };
        divFooter.appendChild(btnCancel);

        if (MSG_USE_ICONS && materialIconsLoaded) {
            icoCancel.classList.add("material-icons");
            icoCancel.innerHTML = "close";
            btnCancel.appendChild(icoCancel);
        }
    }

    document.body.appendChild(divMain);
}

function showMsg(msgType, msgHTML, onConfirm, onDecline, inputText, sender) {
    //validation
    if (typeof msgHTML === 'undefined' || msgHTML === '') {
        return false;
    }

    buildMsg(msgType, onConfirm, onDecline, sender);

    let content = document.getElementById("msg-content");
    let icon = document.getElementById("msg-icon");
    let title = document.getElementById("msg-title");
    let header = document.getElementById("msg-header");
    let footer = document.getElementById("msg-footer");
    let body = document.getElementById("msg-body");
    let btnOK = document.getElementById("msg-close");
    let btnCancel = document.getElementById("msg-cancel");

    header.style.color = MSG_HEADER_FONT_COLOUR;
    content.style.color = MSG_CONTENT_FONT_COLOUR;
    content.style.maxWidth = MSG_CONTENT_MAX_WIDTH;

    if (icon) {
        icon.style.color = MSG_HEADER_FONT_COLOUR;
    }

    switch(msgType.toLowerCase()) {
        case "success":
            header.style.backgroundColor = MSG_SUCCESS_COLOUR;
            title.innerHTML = MSG_TEXT_SUCCESS;
            if (icon) {
                icon.innerHTML = "check_circle";
            }
            break;
        case "info":
            header.style.backgroundColor = MSG_INFO_COLOUR;
            title.innerHTML = MSG_TEXT_INFO;
            if (icon) {
                icon.innerHTML = msgType.toLowerCase();
            }
            break;
        case "warning":
            header.style.backgroundColor = MSG_WARNING_COLOUR;
            title.innerHTML = MSG_TEXT_WARNING;
            if (icon) {
                icon.innerHTML = msgType.toLowerCase();
            }
            break;
        case "error":
            header.style.backgroundColor = MSG_ERROR_COLOUR;
            title.innerHTML = MSG_TEXT_ERROR;
            if (icon) {
                icon.innerHTML = msgType.toLowerCase();
            }
            break;
        case "confirm":
            header.style.backgroundColor = MSG_CONFIRM_COLOUR;
            title.innerHTML = MSG_TEXT_CONFIRM;
            if (icon) {
                icon.innerHTML = "help";
            }
            break;
        case "input":
            header.style.backgroundColor = MSG_INPUT_COLOUR;
            title.innerHTML = MSG_TEXT_INPUT;
            if (icon) {
                icon.innerHTML = msgType.toLowerCase();
            }
            break;
        default:
            header.style.backgroundColor = MSG_CUSTOM_COLOUR;
            title.innerHTML = msgType.toLowerCase();
            if (icon) {
                icon.innerHTML = "";
            }
            break;
    }

    //appended as may contain input
    body.innerHTML = msgHTML + body.innerHTML;
    body.style.color = MSG_CONTENT_FONT_COLOUR;

    let inp;
    if (inputText) {
        inp = document.getElementById("msg-input");

        if (inp) {
            inp.value = inputText;
        }
    }

    header.style.fontFamily = MSG_HEADER_FONT;
    footer.style.fontFamily = MSG_HEADER_FONT;
    content.style.fontFamily = MSG_CONTENT_FONT;
    btnOK.style.fontFamily = MSG_HEADER_FONT;

    if (btnCancel) {
        btnCancel.style.fontFamily = MSG_HEADER_FONT;
    }

    mainMsg().style.display = "block";
    document.addEventListener('keydown', onMsgKeyDown, false);

    if (inp) {
        inp.focus();
    } else {
        btnOK.focus();
    }

    return true;
}

function closeMsg() {
    mainMsg().style.display = "none";
    mainMsg().remove();
    document.removeEventListener('keydown', onMsgKeyDown, false);
}

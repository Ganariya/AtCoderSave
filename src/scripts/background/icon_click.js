export function iconClick() {
    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({"url": "./../../htmls/index.html"});
    });
};

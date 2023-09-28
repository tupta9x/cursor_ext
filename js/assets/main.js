function addCursor(e, cursor) {
    if (!document.body.dataset.hasOwnProperty('installed')) { window.open(ext_link); }
    e.target.classList.add('disabled'); chrome.runtime.sendMessage(document.body.dataset.chromeId, { cursor: cursor }, function (response) { if (!response.success) { } });
}
div = document.createElement('div');
div.className = 'chrome-notification';

img = document.createElement('img');
img.src = chrome.runtime.getURL("./assets/logo.png")

h2 = document.createElement('h2');
h2.innerText = 'SessionID copied to clipboard!'

div.appendChild(img)
div.appendChild(h2)
document.body.appendChild(div);
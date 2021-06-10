chrome.browserAction.onClicked.addListener((tab) => {
  let url = new URL(tab.url)
  let urlString = url.protocol +'//'+ url.host +'/'
  try {
    chrome.cookies.getAll({ 
      url: urlString,
      name: 'sessionid'
    }, (cookies) => {
      if (cookies.length != 1) {
        console.log(cookies);
        throw new Error('Error retrieving cookies: '+cookies.length+' cookies found.')
      }
      
      copyTextToClipboard(cookies[0].value);

      runScript("content.js", tab)
    })
  } catch(e) {
    runScript("error.js", tab)
  }
});

const copyTextToClipboard = (text) => {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
};

const runScript = (filename, tab) => {
  chrome.tabs.executeScript(tab.id, {
    file: filename
  }, () => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
    }
  });
};
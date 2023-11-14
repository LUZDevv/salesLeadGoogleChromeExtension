let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
const copyAllBtn = document.getElementById("copy-all-btn");

// Assuming you have a buttonCopy variable to hold your image URL
const buttonCopy = "images/copy-two-paper-sheets-interface-symbol.png";

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

// eventListener that gives us the current page's we're on's url
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
    ulEl.innerHTML = ""; // Clear the existing list
  
    for (let i = 0; i < leads.length; i++) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.target = "_blank";
      link.href = leads[i];
      link.textContent = leads[i];
  
      const buttonCopy = createButtonCopy("images/copy-two-paper-sheets-interface-symbol.png");  // Change the parameter name
  
      listItem.appendChild(link);
      listItem.appendChild(buttonCopy);
  
      ulEl.appendChild(listItem);
    }
  }

// Deletes all/resets our list of links/leads
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function createButtonCopy(iconSrc) {
  const buttonCopyClipBoard = document.createElement("button");

  buttonCopyClipBoard.style.border = "none"; // Remove button border
  buttonCopyClipBoard.style.background = "none"; // Set button background to transparent
  buttonCopyClipBoard.style.padding = "0"; // Remove button padding

  buttonCopyClipBoard.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from being followed
    const linkText = this.previousSibling.textContent; // Get the link/text to copy
    copyToClipboard(linkText);
  });

  const iconImg = document.createElement("img");
  iconImg.style.width = "20px"; // Set the width of the icon (adjust as needed)
  iconImg.style.height = "20px"; // Set the height of the icon (adjust as needed)
  iconImg.style.marginLeft = "5px"; // Set the margin
  iconImg.src = iconSrc;
  iconImg.alt = "clipboard icon for copying text/control+c hotkey button";
  iconImg.style.filter = "invert(1)"; // Invert the colors to make it whit

  buttonCopyClipBoard.appendChild(iconImg);
  return buttonCopyClipBoard;
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  console.log("Text copied to clipboard:", text);
}

copyAllBtn.addEventListener("click", function () {
  // Combine all links in the array into a single string, separated by line breaks
  const allLinks = myLeads.join('\n');

  // Use the Clipboard API to copy the combined links to the clipboard
  navigator.clipboard.writeText(allLinks)
    .then(() => {
      console.log("All links copied to clipboard:", allLinks);
    })
    .catch((error) => {
      console.error("Failed to copy links to clipboard:", error);
    });
});

/*Program made by Scrimba's project instructions given by instructor 'Per Harald Borgen' that were coded up by me, with further added functionalities devised and programed by me, 'Luis Uribe Zambrano' 
that consist of: allowing you to copy all links into text that formats each new link in a new line break, gives you the ability to only copy one link from your visible list at a time if needed, added copy clipboard icons,
gave each button different colors for further differentation, and did further css work to add a bit more visual and UX support for the chrome extension.
"name": "Leads tracker",
Since I made edits, we can consider this version of "Leads tracker" to be 'version 1.1'.
*/
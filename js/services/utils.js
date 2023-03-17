

export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  getColors
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return (data) ? JSON.parse(data) : undefined;
}

function makeId(length = 7) {
  var txt = '';
  var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return txt;
}

function getColors() {
  return ["aliceblue", "aquamarine", "lavender", "lavenderblush", "lightgoldenrodyellow", "lightgreen", "mistyrose", "peachpuff", "plum", "lightBlue", "wheat", "beige", "crimson", "sandybrown", "salmon",
  ]
}

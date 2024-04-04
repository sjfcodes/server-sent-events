const stream1Ul = document.getElementById("date");
const stream2Ul = document.getElementById("loading");

const onDateEvent = (event) => {
  const ulEl = document.createElement("li");
  ulEl.textContent = event.data;
  stream1Ul.prepend(ulEl);
};

const onColorsEvent = (event) => {
  const {r,g,b} = JSON.parse(event.data)
  const color = `rgb(${r}, ${g}, ${b})`
  stream2Ul.textContent = color;
  stream2Ul.style.color = color;
};

function addEventSrc(
  url = "",
  path = "",
  handlers = [["default", () => null]]
) {
  const sse = new EventSource(url + path);
  if (typeof handlers === 'function') {
    sse.onmessage = handlers;
  } else {
    handlers.forEach(([event, cb]) => sse.addEventListener(event, cb));
  }
  return sse;
}

addEventSrc("http://localhost:3000", "/date?interval=1000", [["stream0", onDateEvent]])
addEventSrc("http://localhost:3000", "/colors", onColorsEvent)
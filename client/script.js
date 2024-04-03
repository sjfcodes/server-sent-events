const stream1Ul = document.getElementById('stream1');
const stream2Ul = document.getElementById('stream2');
const eventSrc = new EventSource('http://localhost:3000/events');


const handleStream1 = (event) => {
    const ulEl = document.createElement('li');
    ulEl.textContent = event.data;
    stream1Ul.appendChild(ulEl);
  }

const handleStream2 = (event) => {
    const ulEl = document.createElement('li');
    ulEl.textContent = event.data;
    stream2Ul.appendChild(ulEl);
  }

  eventSrc.addEventListener('stream1', handleStream1);
eventSrc.addEventListener('stream2', handleStream2);

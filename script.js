const arrivals = [
  {
    route: 'Blue Line',
    destination: 'Downtown Central',
    mode: 'Metro',
    arrivesIn: 2,
    platform: 'Track 1',
    status: 'Delayed',
    routeInfo: 'Stops: Civic Center · Market Street',
    tag: 'Heavy Rider Volume',
    color: 'var(--route-blue)'
  },
  {
    route: 'Green Line',
    destination: 'North Park',
    mode: 'Metro',
    arrivesIn: 5,
    platform: 'Track 2',
    status: 'On Time',
    routeInfo: 'Stops: Museum District · University',
    tag: 'Best Transfer',
    color: 'var(--route-green)'
  },
  {
    route: 'Bus 22',
    destination: 'East Terminal',
    mode: 'Bus',
    arrivesIn: 7,
    platform: 'Bay B',
    status: 'On Time',
    routeInfo: 'Serves: Hospital · East Market',
    tag: 'Blue Line Alt',
    color: 'var(--route-amber)'
  },
  {
    route: 'Express 9',
    destination: 'Airport Connector',
    mode: 'Express Bus',
    arrivesIn: 11,
    platform: 'Bay D',
    status: 'Boarding Soon',
    routeInfo: 'Limited stops to Airport',
    tag: 'Fastest Route',
    color: 'var(--express-orange)'
  },
  {
    route: 'Red Line',
    destination: 'South Station',
    mode: 'Rail',
    arrivesIn: 14,
    platform: 'Track 4',
    status: 'On Time',
    routeInfo: 'Stops: Grand Avenue · Midtown',
    tag: 'Standard Service',
    color: 'var(--delay-red)'
  },
  {
    route: 'Bus 48',
    destination: 'West Village',
    mode: 'Bus',
    arrivesIn: 18,
    platform: 'Bay A',
    status: 'Minor Delay',
    routeInfo: 'Serves: Library · West Market',
    tag: 'Local Route',
    color: 'var(--route-purple)'
  }
];

function getStatusClass(status) {
  if(status.includes('Delay')) return 'delayed';
  if(status.includes('Boarding')) return 'boarding';
  return 'on-time';
}

function getModeIcon(mode) {
  if (mode.includes('Bus')) {
    return `<svg viewBox="0 0 24 24"><path d="M19 17h2v2h-2v-2zm-12 0h-2v2h2v-2zm11-13h-12c-2.21 0-4 1.79-4 4v9h2v1c0 .55.45 1 1 1s1-.45 1-1v-1h10v1c0 .55.45 1 1 1s1-.45 1-1v-1h2v-9c0-2.21-1.79-4-4-4zm-11 2h10c.55 0 1 .45 1 1v4h-12v-4c0-.55.45-1 1-1zm11 8h-12v-2h12v2z"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24"><path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zm0 2c3.71 0 5.13.46 5.67 1H6.33c.54-.54 1.96-1 5.67-1zm-4.5 11c-.83 0-1.5-.67-1.5-1.5S6.67 12 7.5 12s1.5.67 1.5 1.5S8.33 15 7.5 15zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 10H7V6h10v4z"/></svg>`;
}

function renderArrivals() {
  const container = document.getElementById('arrivals-container');
  container.innerHTML = '';

  arrivals.forEach((arr, index) => {
    const isActive = index === 0;
    const card = document.createElement('div');
    card.className = `arrival-card ${isActive ? 'active' : ''}`;
    card.style.setProperty('--card-color', arr.color);

    if (isActive) {
      card.innerHTML = `
        <div class="card-left">
          <div class="route-badge">${arr.route}</div>
          <div class="mode-icon">${getModeIcon(arr.mode)} ${arr.mode}</div>
        </div>
        <div class="card-center">
          <div class="destination">${arr.destination}</div>
          <div class="route-info">${arr.routeInfo}</div>
          <div class="tag">${arr.tag}</div>
        </div>
        <div class="card-right">
          <div class="arrives-label">ARRIVES IN</div>
          <div class="time-val-container">
            <div class="time-val">${arr.arrivesIn} MIN</div>
          </div>
          <div class="platform">${arr.platform}</div>
          <div class="status-chip ${getStatusClass(arr.status)}">${arr.status}</div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="card-left">
          <div class="route-badge">${arr.route}</div>
        </div>
        <div class="card-center">
          <div class="destination">${arr.destination}</div>
        </div>
        <div class="card-right-compact">
          <div class="time-val-compact">${arr.arrivesIn} MIN</div>
          <div class="status-group">
            <div class="platform">${arr.platform}</div>
            <div class="status-chip ${getStatusClass(arr.status)}">${arr.status}</div>
          </div>
        </div>
      `;
    }
    container.appendChild(card);
  });
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  document.getElementById('clock').innerText = hours + ':' + minutes + ' ' + ampm;
}

// Update timer logic
let secondsSinceUpdate = 0;
function updateTimer() {
  secondsSinceUpdate++;
  const timerSpan = document.getElementById('update-timer');
  if (secondsSinceUpdate < 10) {
    timerSpan.innerText = 'just now';
  } else if (secondsSinceUpdate < 60) {
    timerSpan.innerText = `${secondsSinceUpdate} sec ago`;
  } else {
    timerSpan.innerText = '1 min ago';
  }
}

// Data refresh simulation
setInterval(() => {
  // Simulate data update
  arrivals.forEach(a => {
    if (a.arrivesIn > 0 && Math.random() > 0.5) {
      // randomly decrement arrival times slightly to show live updates
      // in a real app, this would fetch from an API
    }
  });
  renderArrivals();
  secondsSinceUpdate = 0;
  document.getElementById('update-timer').innerText = 'just now';
}, 30000);

// Initialize
renderArrivals();
updateClock();
setInterval(updateClock, 1000);
setInterval(updateTimer, 1000);

// ============================================
// Athlete Hydration Dashboard - JavaScript
// ============================================

// Configuration
const DAILY_GOAL = 1000; // Athlete daily goal: 1000ml

// State variables
let waterIntake = 0;
let sensorConnected = false; // Design placeholder - will be true when sensor is connected

// Flow sensor simulation data for chart (design only - will be replaced by real sensor data)
const flowData = [
  { time: 0, flow: 0 },
  { time: 2, flow: 15 },
  { time: 4, flow: 45 },
  { time: 6, flow: 30 },
  { time: 8, flow: 60 },
  { time: 10, flow: 40 },
  { time: 12, flow: 75 },
  { time: 14, flow: 50 },
  { time: 16, flow: 35 },
  { time: 18, flow: 20 },
  { time: 20, flow: 55 },
  { time: 22, flow: 25 },
  { time: 24, flow: 10 },
];

// Calculate flow-based intake (design only - will be replaced by real sensor data)
function calculateFlowBasedIntake() {
  return flowData.reduce((total, data) => total + data.flow * 2, 0);
}

const flowBasedIntake = calculateFlowBasedIntake();
const flowPercentage = Math.min(100, Math.round((flowBasedIntake / DAILY_GOAL) * 100));
const flowRemaining = Math.max(0, DAILY_GOAL - flowBasedIntake);

// ============================================
// Water Intake Functions
// ============================================

function addWater(amount) {
  const newValue = waterIntake + amount;
  // Cap at 1000ml max and 0ml min
  waterIntake = Math.max(0, Math.min(DAILY_GOAL, newValue));
  updateWaterDisplay();
}

function updateWaterDisplay() {
  const percentage = Math.round((waterIntake / DAILY_GOAL) * 100);
  
  // Update intake value
  document.getElementById('intake-value').textContent = waterIntake;
  
  // Update glass fill height
  document.getElementById('glass-fill').style.height = percentage + '%';
  
  // Update percentage text
  document.getElementById('glass-percentage').textContent = percentage + '%';
}

// ============================================
// Alert Functions
// ============================================

function closeAlert() {
  document.getElementById('alert').classList.add('hidden');
}

function updateAlert() {
  const alertIcon = document.getElementById('alert-icon');
  const alertTitle = document.getElementById('alert-title');
  const alertMessage = document.getElementById('alert-message');

  if (!sensorConnected) {
    alertIcon.textContent = '📡';
    alertTitle.textContent = 'Flow Sensor Status';
    alertMessage.textContent = 'Awaiting flow sensor connection...';
  } else if (flowRemaining > 0) {
    alertIcon.textContent = '💧';
    alertTitle.textContent = 'Keep Drinking!';
    alertMessage.textContent = `Flow detected: ${flowBasedIntake}ml consumed. ${flowRemaining}ml remaining.`;
  } else {
    alertIcon.textContent = '💧';
    alertTitle.textContent = 'Goal Reached!';
    alertMessage.textContent = `Excellent! Flow sensor tracked ${flowBasedIntake}ml today!`;
  }
}

// ============================================
// Summary Functions
// ============================================

function updateSummary() {
  if (sensorConnected) {
    document.getElementById('summary-hydration').textContent = flowPercentage + '%';
    document.getElementById('summary-consumed').textContent = flowBasedIntake + 'ml';
    document.getElementById('summary-remaining').textContent = flowRemaining + 'ml';
    document.getElementById('sensor-note').classList.add('hidden');
    
    // Activity page
    const flowEvents = flowData.filter(d => d.flow > 0).length;
    document.getElementById('activity-flow-events').textContent = flowEvents;
    document.getElementById('activity-total-volume').textContent = flowBasedIntake + 'ml';
  } else {
    document.getElementById('summary-hydration').textContent = '--';
    document.getElementById('summary-consumed').textContent = '--';
    document.getElementById('summary-remaining').textContent = '--';
    document.getElementById('sensor-note').classList.remove('hidden');
    
    // Activity page
    document.getElementById('activity-flow-events').textContent = '--';
    document.getElementById('activity-total-volume').textContent = '--';
  }
}

// ============================================
// Navigation Functions
// ============================================

function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('active');
  });
  
  // Remove active from all nav buttons
  document.querySelectorAll('.nav-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected page
  document.getElementById('page-' + pageName).classList.add('active');
  
  // Activate nav button
  document.getElementById('nav-' + pageName).classList.add('active');
}

// ============================================
// Chart Functions
// ============================================

function generateFlowChartPoints() {
  const maxFlow = 100; // Max flow rate for visualization
  const chartWidth = 560;
  const chartHeight = 110;
  const startX = 40;
  const startY = 10;

  const linePoints = [];
  const areaPoints = [];

  flowData.forEach((data) => {
    const xPosition = startX + (data.time / 24) * chartWidth;
    const yPosition = startY + chartHeight - (data.flow / maxFlow) * chartHeight;
    linePoints.push(`${xPosition},${yPosition}`);
    areaPoints.push(`${xPosition},${yPosition}`);
  });

  // Create area polygon (add bottom points for fill)
  let areaPolygon = areaPoints.join(' ');
  if (areaPoints.length > 0) {
    const lastX = startX + (flowData[flowData.length - 1].time / 24) * chartWidth;
    const firstX = startX + (flowData[0].time / 24) * chartWidth;
    areaPolygon += ` ${lastX},${startY + chartHeight} ${firstX},${startY + chartHeight}`;
  }

  return { linePoints: linePoints.join(' '), areaPolygon };
}

function drawChart() {
  const { linePoints, areaPolygon } = generateFlowChartPoints();
  
  // Update chart area and line
  document.getElementById('chart-area').setAttribute('points', areaPolygon);
  document.getElementById('chart-line').setAttribute('points', linePoints);
  
  // Draw data points
  const pointsContainer = document.getElementById('chart-points');
  pointsContainer.innerHTML = ''; // Clear existing points
  
  const maxFlow = 100;
  const chartWidth = 560;
  const chartHeight = 110;
  const startX = 40;
  const startY = 10;
  
  flowData.forEach((data) => {
    const xPosition = startX + (data.time / 24) * chartWidth;
    const yPosition = startY + chartHeight - (data.flow / maxFlow) * chartHeight;
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', xPosition);
    circle.setAttribute('cy', yPosition);
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', '#275CCC');
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '2');
    
    pointsContainer.appendChild(circle);
  });
}

// ============================================
// Flow Sensor Functions (For Future Integration)
// ============================================

// This function will be called when you connect a real flow sensor
function connectFlowSensor() {
  sensorConnected = true;
  updateAlert();
  updateSummary();
  console.log('Flow sensor connected!');
}

// This function will be called when the sensor disconnects
function disconnectFlowSensor() {
  sensorConnected = false;
  updateAlert();
  updateSummary();
  console.log('Flow sensor disconnected.');
}

// This function will receive real flow data from the sensor
// Replace flowData array updates with real sensor readings
function updateFlowData(time, flowRate) {
  // Example: Add new flow reading
  // flowData.push({ time: time, flow: flowRate });
  // drawChart();
  // recalculate flowBasedIntake, etc.
}

// ============================================
// Initialize Dashboard
// ============================================

function init() {
  // Initialize displays
  updateWaterDisplay();
  updateAlert();
  updateSummary();
  drawChart();
  
  console.log('Dashboard initialized');
  console.log('Daily Goal:', DAILY_GOAL + 'ml');
  console.log('Sensor Connected:', sensorConnected);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', init);

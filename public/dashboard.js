// Water intake data (User input via buttons)
let currentIntake = 0;
const dailyGoal = 1000;

// Drinking history throughout the day (timestamp -> ml consumed by user)
let drinkingHistory = [];

// Water flow sensor data (separate from user intake)
let sensorHistory = [];

// Generate mock sensor data for the chart
function generateSensorData() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentTime = now.getTime();
    
    // Generate realistic sensor flow readings throughout the day
    sensorHistory = [];
    
    // Start at beginning of day
    let sensorReading = 0;
    sensorHistory.push({ time: startOfDay.getTime(), ml: sensorReading });
    
    // Add readings every hour with some variation
    for (let i = 1; i < 24; i++) {
        const timeAtHour = startOfDay.getTime() + (i * 60 * 60 * 1000);
        
        // Only add data points up to current time
        if (timeAtHour > currentTime) break;
        
        // Simulate water flow from a faucet or pipe (irregular pattern)
        // Higher flow during morning (6-9am), mid-day (12-1pm), and evening (6-8pm)
        let flowAmount = 0;
        if (i >= 6 && i < 9) flowAmount = 150 + Math.random() * 100;
        else if (i >= 12 && i < 13) flowAmount = 200 + Math.random() * 80;
        else if (i >= 18 && i < 20) flowAmount = 120 + Math.random() * 100;
        else if (i >= 20 && i < 22) flowAmount = 50 + Math.random() * 60;
        else if (i > 22 || i < 6) flowAmount = Math.random() * 30; // Low flow at night
        
        sensorReading += flowAmount;
        sensorHistory.push({ time: timeAtHour, ml: Math.min(sensorReading, 3000) }); // Cap at 3000ml
    }
    
    // Add current time reading if not already added
    const lastEntry = sensorHistory[sensorHistory.length - 1];
    if (lastEntry.time < currentTime) {
        let currentReading = lastEntry.ml;
        // Add a small increment based on current hour
        const currentHour = now.getHours();
        if (currentHour >= 6 && currentHour < 9) currentReading += Math.random() * 50;
        else if (currentHour >= 18 && currentHour < 20) currentReading += Math.random() * 30;
        
        sensorHistory.push({ time: currentTime, ml: Math.min(currentReading, 3000) });
    }
}

// Initialize with starting data point
function initializeDrinkingHistory() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Add initial entry for start of day (user intake)
    drinkingHistory = [
        { time: startOfDay.getTime(), ml: 0 }
    ];
    
    // Generate sensor data for the chart
    generateSensorData();
}

// Initialize chart on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDrinkingHistory();
    updateWaterCard();
    updateChart();
});

// Add water function
function addWater(amount) {
    currentIntake = Math.max(0, Math.min(dailyGoal, currentIntake + amount));
    
    // Update water intake card only (user input box)
    // Chart displays sensor data separately and is not affected by user input
    updateWaterCard();
}

// Update water card UI
function updateWaterCard() {
    const percentage = Math.round((currentIntake / dailyGoal) * 100);
    
    // Update intake value
    document.getElementById('intake-value').textContent = currentIntake;
    
    // Update glass fill
    const glassFill = document.getElementById('glass-fill');
    glassFill.style.height = percentage + '%';
    
    // Update percentage text
    document.getElementById('glass-percentage').textContent = percentage + '%';
    
    // Update alert message
    const remaining = Math.max(0, dailyGoal - currentIntake);
    const alertMessage = document.getElementById('alert-message');
    if (remaining > 0) {
        alertMessage.textContent = 'Drink ' + remaining + 'ml more to reach your daily goal';
    } else {
        alertMessage.textContent = 'You have reached your daily hydration goal! 🎉';
    }
    
    // Update hydration percentage
    document.getElementById('hydration-percent').textContent = percentage + '%';
}

// Update chart (displays sensor data, not user intake)
function updateChart() {
    // Use sensor data for the chart (max is 3000ml from sensor)
    const maxMl = 3000;
    const svgWidth = 600;
    const svgHeight = 150;
    const chartWidth = svgWidth - 60;
    const chartHeight = svgHeight - 30;
    const startX = 40;
    const startY = 10;
    
    if (sensorHistory.length === 0) {
        return;
    }
    
    // Build SVG points for line and area using SENSOR data
    let linePoints = [];
    let areaPoints = [];
    
    // Get start of day timestamp
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = startOfDay + (24 * 60 * 60 * 1000);
    
    // Calculate points based on time of day (using sensor data)
    sensorHistory.forEach((data, index) => {
        const timeElapsed = data.time - startOfDay;
        const dayProgress = Math.min(timeElapsed / (24 * 60 * 60 * 1000), 1); // Cap at 1.0 (100% of day)
        const xPosition = startX + dayProgress * chartWidth;
        const yPosition = startY + chartHeight - (data.ml / maxMl) * chartHeight;
        linePoints.push(xPosition + ',' + yPosition);
        areaPoints.push(xPosition + ',' + yPosition);
    });
    
    // Create area polygon (add bottom points for fill)
    let areaPolygon = areaPoints.join(' ');
    if (areaPoints.length > 0) {
        areaPolygon += ' ' + (startX + chartWidth) + ',' + (startY + chartHeight) + ' ' + startX + ',' + (startY + chartHeight);
    }
    
    // Update polylines
    document.getElementById('chart-line').setAttribute('points', linePoints.join(' '));
    document.getElementById('chart-area').setAttribute('points', areaPolygon);
    
    // Update data points (circles) using sensor data
    const pointsGroup = document.getElementById('chart-points');
    pointsGroup.innerHTML = '';
    
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    sensorHistory.forEach(data => {
        const timeElapsed = data.time - startOfDay;
        const dayProgress = Math.min(timeElapsed / (24 * 60 * 60 * 1000), 1);
        const xPosition = startX + dayProgress * chartWidth;
        const yPosition = startY + chartHeight - (data.ml / maxMl) * chartHeight;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', xPosition);
        circle.setAttribute('cy', yPosition);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', '#275CCC');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '2');
        
        pointsGroup.appendChild(circle);
    });
    
    // Update total consumed to show SENSOR data (not user intake)
    const latestSensorReading = sensorHistory[sensorHistory.length - 1];
    document.getElementById('chart-total-ml').textContent = Math.round(latestSensorReading.ml);
    
    // Update time range
    const currentHour = now.getHours();
    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    const displayHour = currentHour % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.getElementById('chart-time-range').textContent = '12:00 AM - ' + displayHour + ':' + minutes + ' ' + ampm;
}

// Expose functions to window object for onclick handlers
window.addWater = addWater;
window.initializeDrinkingHistory = initializeDrinkingHistory;
window.updateWaterCard = updateWaterCard;
window.updateChart = updateChart;

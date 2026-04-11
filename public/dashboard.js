// Water intake data
let currentIntake = 0;
const dailyGoal = 1000;

// Drinking history throughout the day (timestamp -> ml consumed)
let drinkingHistory = [];

// Initialize with starting data point
function initializeDrinkingHistory() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Add initial entry for start of day
    drinkingHistory = [
        { time: startOfDay.getTime(), ml: 0 }
    ];
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
    
    // Add entry to drinking history with current timestamp
    const now = new Date();
    
    // Update last entry or add new one if more than 1 minute has passed
    if (drinkingHistory.length > 0) {
        const lastEntry = drinkingHistory[drinkingHistory.length - 1];
        const timeDiff = now.getTime() - lastEntry.time;
        
        if (timeDiff < 60000) { // Less than 1 minute, update existing
            lastEntry.ml = currentIntake;
        } else { // More than 1 minute, add new entry
            drinkingHistory.push({ time: now.getTime(), ml: currentIntake });
        }
    } else {
        drinkingHistory.push({ time: now.getTime(), ml: currentIntake });
    }
    
    // Update UI
    updateWaterCard();
    updateChart();
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

// Update chart
function updateChart() {
    const maxMl = dailyGoal;
    const svgWidth = 600;
    const svgHeight = 150;
    const chartWidth = svgWidth - 60;
    const chartHeight = svgHeight - 30;
    const startX = 40;
    const startY = 10;
    
    if (drinkingHistory.length === 0) {
        return;
    }
    
    // Build SVG points for line and area
    let linePoints = [];
    let areaPoints = [];
    
    // Get start of day timestamp
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const endOfDay = startOfDay + (24 * 60 * 60 * 1000);
    
    // Calculate points based on time of day
    drinkingHistory.forEach((data, index) => {
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
    
    // Update data points (circles)
    const pointsGroup = document.getElementById('chart-points');
    pointsGroup.innerHTML = '';
    
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    drinkingHistory.forEach(data => {
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
    
    // Update total consumed
    document.getElementById('chart-total-ml').textContent = currentIntake;
    
    // Update time range
    const now = new Date();
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

// Load all reports data
async function loadReports() {
    try {
        // Load all tasks for statistics
        const allTasksResponse = await fetch('/api/tasks');
        const allTasks = await allTasksResponse.json();
        
        // Load pending tasks
        const pendingResponse = await fetch('/api/reports/pending-tasks');
        const pendingTasks = await pendingResponse.json();
        
        // Load completed tasks
        const completedResponse = await fetch('/api/reports/completed-tasks');
        const completedTasks = await completedResponse.json();
        
        // Update statistics
        updateStatistics(allTasks, pendingTasks, completedTasks);
        
        // Display reports
        displayPendingTasks(pendingTasks);
        displayCompletedTasks(completedTasks);
        displayPriorityStats(allTasks);
        displayStatusStats(allTasks);
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Update statistics cards
function updateStatistics(allTasks, pendingTasks, completedTasks) {
    const inProgressTasks = allTasks.filter(t => t.status === 'IN_PROGRESS').length;
    
    document.getElementById('totalTasksCount').textContent = allTasks.length;
    document.getElementById('pendingTasksCount').textContent = pendingTasks.length;
    document.getElementById('inProgressTasksCount').textContent = inProgressTasks;
    document.getElementById('completedTasksCount').textContent = completedTasks.length;
}

// Display pending tasks
function displayPendingTasks(tasks) {
    const tbody = document.getElementById('pendingTasksBody');
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No pending tasks</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.taskId}</td>
            <td><strong>${task.title}</strong></td>
            <td>${task.userName}</td>
            <td><span class="priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
            <td>${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
            <td>${task.tags ? task.tags.map(tag => `<span class="tag">${tag.name}</span>`).join(' ') : ''}</td>
        </tr>
    `).join('');
}

// Display completed tasks
function displayCompletedTasks(tasks) {
    const tbody = document.getElementById('completedTasksBody');
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No completed tasks</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.taskId}</td>
            <td><strong>${task.title}</strong></td>
            <td>${task.userName}</td>
            <td><span class="priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
            <td>${task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td>${task.tags ? task.tags.map(tag => `<span class="tag">${tag.name}</span>`).join(' ') : ''}</td>
        </tr>
    `).join('');
}

// Display priority statistics
function displayPriorityStats(tasks) {
    const lowCount = tasks.filter(t => t.priority === 'LOW').length;
    const mediumCount = tasks.filter(t => t.priority === 'MEDIUM').length;
    const highCount = tasks.filter(t => t.priority === 'HIGH').length;
    
    document.getElementById('lowPriorityCount').textContent = lowCount;
    document.getElementById('mediumPriorityCount').textContent = mediumCount;
    document.getElementById('highPriorityCount').textContent = highCount;
}

// Display status statistics
function displayStatusStats(tasks) {
    const pendingCount = tasks.filter(t => t.status === 'PENDING').length;
    const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
    
    document.getElementById('pendingStatusCount').textContent = pendingCount;
    document.getElementById('inProgressStatusCount').textContent = inProgressCount;
    document.getElementById('completedStatusCount').textContent = completedCount;
}

// Initialize page
window.addEventListener('DOMContentLoaded', loadReports);


// Global variables
let currentEditId = null;

// Load users for dropdown
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const userSelect = document.getElementById('userId');
        userSelect.innerHTML = '<option value="">Select User</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.userId;
            option.textContent = `${user.name} (${user.email})`;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        showAlert('Error loading users', 'error');
    }
}

// Load tags for filter dropdown
async function loadTagsForFilter() {
    try {
        const response = await fetch('/api/tags');
        const tags = await response.json();
        const tagSelect = document.getElementById('filterTag');
        tagSelect.innerHTML = '<option value="">All Tags</option>';
        tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag.name;
            option.textContent = tag.name;
            tagSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading tags:', error);
    }
}

// Load all tasks
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        showAlert('Error loading tasks', 'error');
    }
}

// Display tasks in table
function displayTasks(tasks) {
    const tbody = document.getElementById('tasksTableBody');
    if (tasks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No tasks found</td></tr>';
        return;
    }
    
    tbody.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.taskId}</td>
            <td><strong>${task.title}</strong><br><small>${task.description || ''}</small></td>
            <td>${task.userName}</td>
            <td><span class="priority-${task.priority.toLowerCase()}">${task.priority}</span></td>
            <td><span class="status-${task.status.toLowerCase()}">${task.status.replace('_', ' ')}</span></td>
            <td>${task.dueDate ? new Date(task.dueDate).toLocaleString() : 'N/A'}</td>
            <td>${task.tags ? task.tags.map(tag => `<span class="tag">${tag.name}</span>`).join(' ') : ''}</td>
            <td>
                <button class="btn btn-warning" onclick="editTask(${task.taskId})" style="padding: 5px 10px; margin: 2px;">Edit</button>
                <button class="btn btn-danger" onclick="deleteTask(${task.taskId})" style="padding: 5px 10px; margin: 2px;">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Create or update task
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const taskData = {
        userId: parseInt(document.getElementById('userId').value),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        priority: document.getElementById('priority').value,
        status: document.getElementById('status').value,
        dueDate: document.getElementById('dueDate').value || null
    };
    
    try {
        let response;
        if (currentEditId) {
            response = await fetch(`/api/tasks/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
        } else {
            response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
        }
        
        if (response.ok) {
            showAlert(currentEditId ? 'Task updated successfully!' : 'Task created successfully!', 'success');
            resetForm();
            loadTasks();
        } else {
            showAlert('Error saving task', 'error');
        }
    } catch (error) {
        console.error('Error saving task:', error);
        showAlert('Error saving task', 'error');
    }
});

// Edit task
async function editTask(taskId) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`);
        const task = await response.json();
        
        currentEditId = taskId;
        document.getElementById('userId').value = task.userId;
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description || '';
        document.getElementById('priority').value = task.priority;
        document.getElementById('status').value = task.status;
        document.getElementById('dueDate').value = task.dueDate ? task.dueDate.substring(0, 16) : '';
        
        document.querySelector('.form-section h2').textContent = 'Update Task';
        document.querySelector('#taskForm button[type="submit"]').textContent = 'Update Task';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading task:', error);
        showAlert('Error loading task', 'error');
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Task deleted successfully!', 'success');
            loadTasks();
        } else {
            showAlert('Error deleting task', 'error');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showAlert('Error deleting task', 'error');
    }
}

// Reset form
function resetForm() {
    currentEditId = null;
    document.getElementById('taskForm').reset();
    document.querySelector('.form-section h2').textContent = 'Create New Task';
    document.querySelector('#taskForm button[type="submit"]').textContent = 'Create Task';
}

// Filter tasks
async function filterTasks() {
    const tag = document.getElementById('filterTag').value;
    const priority = document.getElementById('filterPriority').value;
    const status = document.getElementById('filterStatus').value;
    
    let url = '/api/tasks/search?';
    if (tag) url += `tag=${tag}&`;
    if (priority) url += `priority=${priority}&`;
    if (status) url += `status=${status}&`;
    
    try {
        const response = await fetch(url);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error filtering tasks:', error);
        showAlert('Error filtering tasks', 'error');
    }
}

// Clear filters
function clearFilters() {
    document.getElementById('filterTag').value = '';
    document.getElementById('filterPriority').value = '';
    document.getElementById('filterStatus').value = '';
    loadTasks();
}

// Show alert message
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadTagsForFilter();
    loadTasks();
});


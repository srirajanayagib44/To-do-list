// Global variables
let currentEditId = null;

// Load all users
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        showAlert('Error loading users', 'error');
    }
}

// Display users in table
function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.userId}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contact || 'N/A'}</td>
            <td>${new Date(user.joinDate).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-warning" onclick="editUser(${user.userId})" style="padding: 5px 10px; margin: 2px;">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.userId})" style="padding: 5px 10px; margin: 2px;">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Create or update user
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contact').value
    };
    
    try {
        let response;
        if (currentEditId) {
            response = await fetch(`/api/users/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }
        
        if (response.ok) {
            showAlert(currentEditId ? 'User updated successfully!' : 'User created successfully!', 'success');
            resetUserForm();
            loadUsers();
        } else {
            const error = await response.text();
            showAlert('Error: ' + error, 'error');
        }
    } catch (error) {
        console.error('Error saving user:', error);
        showAlert('Error saving user', 'error');
    }
});

// Edit user
async function editUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        
        currentEditId = userId;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('contact').value = user.contact || '';
        
        document.querySelector('.form-section h2').textContent = 'Update User';
        document.querySelector('#userForm button[type="submit"]').textContent = 'Update User';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading user:', error);
        showAlert('Error loading user', 'error');
    }
}

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user? All associated tasks will also be deleted.')) return;
    
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('User deleted successfully!', 'success');
            loadUsers();
        } else {
            showAlert('Error deleting user', 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showAlert('Error deleting user', 'error');
    }
}

// Reset form
function resetUserForm() {
    currentEditId = null;
    document.getElementById('userForm').reset();
    document.querySelector('.form-section h2').textContent = 'Create New User';
    document.querySelector('#userForm button[type="submit"]').textContent = 'Create User';
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
window.addEventListener('DOMContentLoaded', loadUsers);


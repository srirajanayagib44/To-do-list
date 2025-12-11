// Global variables
let currentEditId = null;

// Load all tags
async function loadTags() {
    try {
        const response = await fetch('/api/tags');
        const tags = await response.json();
        displayTags(tags);
    } catch (error) {
        console.error('Error loading tags:', error);
        showAlert('Error loading tags', 'error');
    }
}

// Display tags in table
function displayTags(tags) {
    const tbody = document.getElementById('tagsTableBody');
    if (tags.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No tags found</td></tr>';
        return;
    }
    
    tbody.innerHTML = tags.map(tag => `
        <tr>
            <td>${tag.tagId}</td>
            <td><span class="tag">${tag.name}</span></td>
            <td>${tag.description || 'N/A'}</td>
            <td>
                <button class="btn btn-warning" onclick="editTag(${tag.tagId})" style="padding: 5px 10px; margin: 2px;">Edit</button>
                <button class="btn btn-danger" onclick="deleteTag(${tag.tagId})" style="padding: 5px 10px; margin: 2px;">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Create or update tag
document.getElementById('tagForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const tagData = {
        name: document.getElementById('tagName').value,
        description: document.getElementById('tagDescription').value
    };
    
    try {
        let response;
        if (currentEditId) {
            response = await fetch(`/api/tags/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tagData)
            });
        } else {
            response = await fetch('/api/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tagData)
            });
        }
        
        if (response.ok) {
            showAlert(currentEditId ? 'Tag updated successfully!' : 'Tag created successfully!', 'success');
            resetTagForm();
            loadTags();
        } else {
            const error = await response.text();
            showAlert('Error: ' + error, 'error');
        }
    } catch (error) {
        console.error('Error saving tag:', error);
        showAlert('Error saving tag', 'error');
    }
});

// Edit tag
async function editTag(tagId) {
    try {
        const response = await fetch(`/api/tags/${tagId}`);
        const tag = await response.json();
        
        currentEditId = tagId;
        document.getElementById('tagName').value = tag.name;
        document.getElementById('tagDescription').value = tag.description || '';
        
        document.querySelector('.form-section h2').textContent = 'Update Tag';
        document.querySelector('#tagForm button[type="submit"]').textContent = 'Update Tag';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading tag:', error);
        showAlert('Error loading tag', 'error');
    }
}

// Delete tag
async function deleteTag(tagId) {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    
    try {
        const response = await fetch(`/api/tags/${tagId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showAlert('Tag deleted successfully!', 'success');
            loadTags();
        } else {
            showAlert('Error deleting tag', 'error');
        }
    } catch (error) {
        console.error('Error deleting tag:', error);
        showAlert('Error deleting tag', 'error');
    }
}

// Reset form
function resetTagForm() {
    currentEditId = null;
    document.getElementById('tagForm').reset();
    document.querySelector('.form-section h2').textContent = 'Create New Tag';
    document.querySelector('#tagForm button[type="submit"]').textContent = 'Create Tag';
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
window.addEventListener('DOMContentLoaded', loadTags);


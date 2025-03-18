// Updated forum.js - Post & Comment Fixes + Delete Feature

let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;
let forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];

document.addEventListener('DOMContentLoaded', displayForumPosts);

function submitPost() {
    if (!currentUser) {
        alert("You must be logged in to post.");
        return;
    }
    
    const postContent = document.getElementById('postContent').value.trim();
    if (!postContent) {
        alert("Post content cannot be empty.");
        return;
    }
    
    const newPost = {
        id: Date.now(),
        user: currentUser.username,
        content: postContent,
        timestamp: new Date().toLocaleString(),
        comments: []
    };
    
    forumPosts.push(newPost);
    localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
    document.getElementById('postContent').value = '';
    displayForumPosts();
}

function addComment(postId) {
    if (!currentUser) {
        alert("You must be logged in to comment.");
        return;
    }
    
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const commentText = commentInput.value.trim();
    if (!commentText) return;
    
    const post = forumPosts.find(p => p.id === postId);
    if (post) {
        post.comments.push({ user: currentUser.username, text: commentText });
        localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
        displayForumPosts();
    }
}

function deletePost(postId) {
    if (!currentUser) return;

    const postIndex = forumPosts.findIndex(p => p.id === postId);
    if (postIndex !== -1 && forumPosts[postIndex].user === currentUser.username) {
        forumPosts.splice(postIndex, 1);
        localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
        displayForumPosts();
    } else {
        alert("You can only delete your own posts.");
    }
}

function displayForumPosts() {
    const forumContainer = document.getElementById('forumPosts');
    forumContainer.innerHTML = forumPosts.length
        ? forumPosts.map(post => `
            <div class="post">
                <p class="user">${post.user}</p>
                <p class="timestamp">${post.timestamp}</p>
                <p class="content">${post.content}</p>
                <button onclick="toggleCommentSection(${post.id})">Comment</button>
                ${currentUser && currentUser.username === post.user ? `<button onclick="deletePost(${post.id})">Delete</button>` : ''}
                <div class="comment-section" id="commentSection-${post.id}" style="display: none;">
                    <input type="text" id="commentInput-${post.id}" placeholder="Write a comment...">
                    <button onclick="addComment(${post.id})">Post Comment</button>
                    <div class="comments">
                        ${post.comments.map(comment => `<p><strong>${comment.user}:</strong> ${comment.text}</p>`).join('')}
                    </div>
                </div>
            </div>
        `).join('')
        : '<p>No posts yet. Be the first to post!</p>';
}

function toggleCommentSection(postId) {
    const section = document.getElementById(`commentSection-${postId}`);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
      // 1. Fetch blogs from database
      const response = await fetch('/api/blogs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blogs = await response.json();
      
      // 2. Render blogs or show empty state
      if (blogs.length > 0) {
        renderBlogs(blogs);
      } else {
        showEmptyState();
      }
      
    } catch (error) {
      console.error('Failed to load blogs:', error);
      showErrorState();
    }
  
    // 3. Add Blog Button
    document.getElementById('addBlogBtn')?.addEventListener('click', () => {
      window.location.href = '/create-blog.html';
    });
  });
  
  function renderBlogs(blogs) {
    const container = document.getElementById('blogContainer');
    container.innerHTML = '';
    
    blogs.forEach(blog => {
      const blogEl = document.createElement('div');
      blogEl.className = 'blog-card';
      blogEl.innerHTML = `
        <div class="blog-image-container">
          <img src="${blog.image_url || '/images/blog-placeholder.jpg'}" 
               alt="${blog.title}" 
               class="blog-image">
        </div>
        <div class="blog-content">
          <h3 class="blog-title">${blog.title}</h3>
          <p class="blog-excerpt">${blog.content.substring(0, 120)}...</p>
          <small class="text-muted">${formatDate(blog.created_at)}</small>
        </div>
        <div class="blog-meta">
          <div class="author-info">
            <img src="${blog.author_image || '/images/profile-placeholder.png'}" 
                 alt="${blog.author_name}" 
                 class="author-img">
            <span class="author-name">${blog.author_name}</span>
          </div>
          <div class="blog-actions">
            <button class="action-btn like-btn" data-blog-id="${blog.blog_id}">
              <i class="far fa-heart"></i>
              <span class="count">${blog.like_count || 0}</span>
            </button>
          </div>
        </div>
      `;
      container.appendChild(blogEl);
    });
  }
  
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function showEmptyState() {
    const container = document.getElementById('blogContainer');
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-book-open fa-3x mb-3 text-muted"></i>
        <h4>No blogs found</h4>
        <p>Be the first to create one!</p>
      </div>
    `;
  }
  
  function showErrorState() {
    const container = document.getElementById('blogContainer');
    container.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        Failed to load blogs. Please try again later.
      </div>
    `;
  }
document.addEventListener('DOMContentLoaded', async () => {
  const blogsContainer = document.getElementById('blogContainer');
  const addBlogBtn = document.getElementById('addBlogBtn');

  async function loadBlogs() {
    try {
      const response = await fetch('/api/blogs');
      console.log('API Response:', response);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const blogs = await response.json();
      console.log('Blogs Data:', blogs);

      blogsContainer.innerHTML = blogs.map(blog => `
        <div class="blog-card">
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <small>${new Date(blog.created_at).toLocaleString()}</small>
        </div>
      `).join('');
    } catch (err) {
      console.error('Error:', err);
      blogsContainer.innerHTML = `
        <div class="error">
          <p>Error loading blogs. Check:</p>
          <ul>
            <li>Server is running</li>
            <li>Database connection</li>
            <li>Console for details (F12)</li>
          </ul>
        </div>
      `;
    }
  }

  if (addBlogBtn) {
    addBlogBtn.addEventListener('click', () => {
      // Your existing button logic
      console.log("Button is clicked")
    });
  }

  await loadBlogs();
});
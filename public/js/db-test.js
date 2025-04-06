async function testDatabaseConnection() {
    try {
      const response = await fetch('/api/db-check');
      const data = await response.json();
      console.log('Database Connection Test:', data);
      
      if (data.result === 2) {
        alert('Database is connected properly!');
      } else {
        alert('Database connection test failed');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      alert('Failed to connect to database');
    }
  }
  
  // Run test when page loads
  testDatabaseConnection();
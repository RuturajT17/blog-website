import connection from "../config/db.js";

const Blog = {
    getAll: async () => {
        try {
            const [rows] = await connection.promise().query(`
                SELECT 
                    b.*,
                    u.username as author_name,
                    u.profile_pic as author_image,
                    COUNT(l.blog_id) as like_count
                FROM blogs b
                JOIN users u ON b.author_id = u.user_id
                LEFT JOIN likes l ON b.blog_id = l.blog_id
                GROUP BY b.blog_id
                ORDER BY b.created_at DESC
                LIMIT 4
            `);
            return rows;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            throw error;
        }
    },

    toggleLike: async (blogId, userId) => {
        try {
            // Check if already liked
            const [existing] = await connection.promise().query(
                'SELECT * FROM likes WHERE blog_id = ? AND user_id = ?',
                [blogId, userId]
            );

            if (existing.length > 0) {
                await connection.promise().query(
                    'DELETE FROM likes WHERE blog_id = ? AND user_id = ?',
                    [blogId, userId]
                );
            } else {
                await connection.promise().query(
                    'INSERT INTO likes (blog_id, user_id) VALUES (?, ?)',
                    [blogId, userId]
                );
            }

            // Get updated count
            const [[{count}]] = await connection.promise().query(
                'SELECT COUNT(*) as count FROM likes WHERE blog_id = ?',
                [blogId]
            );
            return count;
        } catch (error) {
            console.error("Error toggling like:", error);
            throw error;
        }
    }
};

export default Blog;
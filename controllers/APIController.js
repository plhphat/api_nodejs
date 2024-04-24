// controllers/controller.js
const pool = require('../configs/connectDB');
const express = require('express');
const app = express();
app.use(express.json());

const getAllCategories = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM tbl_category');
        res.status(200).json({ categories: rows });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllSanpham = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM tbl_sanpham');
        res.status(200).json({ sanpham: rows });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createCategory = async (req, res) => {
    const { category_name } = req.body || {};
    if (!category_name || typeof category_name !== 'string') {
        return res.status(400).json({ message: 'Missing required params: category_name' });
    }

    try {
        const [result] = await pool.execute('INSERT INTO tbl_category (category_name) VALUES (?)', [category_name]);
        return res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateCategory = async (req, res) => {
    const { category_id, category_name } = req.body || {};

    // Check for missing and invalid parameters
    if (!category_id || typeof category_id !== 'number' || !category_name || typeof category_name !== 'string') {
        return res.status(400).json({ message: 'Missing or invalid required params' });
    }
    try {
        const [result] = await pool.execute('SELECT * FROM tbl_category WHERE category_id = ?', [category_id]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        await pool.execute('UPDATE tbl_category SET category_name = ? WHERE category_id = ?', [category_name, category_id]);
        return res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCategory = async (req, res) => {
    const { category_id } = req.body || {};
    if (!category_id) {
        return res.status(400).json({ message: 'Missing or invalid required param: category_id (must be a number)' });
    }
    try {
        const [result] = await pool.execute('DELETE FROM tbl_category WHERE category_id = ?', [category_id]);
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// const register = async (req, res) => {

// }
// // tải thêm brcyptjs, jwt
// const login = async (req, res) => {
//     // chổ này sửa lại lấy user ra
//     const user = await this.userRepository.findOne({
//         where: { email: input.email },
//     });
//     if (!user) return null;
//     const isValidPassword = await bcrypt.compare(input.password, user.password);
//     if (!isValidPassword) return null;
//     const payload = {
//         id: user.id,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//     };
//     const tokenSecretKey = process.env.TOKEN_SECRET_KEY ?? "";
//     const accessToken = jwt.sign(payload, tokenSecretKey, {
//         expiresIn: "1h",
//     });
//     return {
//         accessToken: accessToken,
//         user: mapper.map(user, User, UserDto),
//     };
// }

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory, getAllSanpham };

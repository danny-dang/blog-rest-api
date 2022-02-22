
import express from 'express';
import {
  handleLogin,
  handleRegister,
  getProfile,
  handleGetAllUsers
} from '../controllers/user'
import { isUserAuthenticated, isAdmin } from '../middleware'

const router = express.Router();
export default (app) => {
  app.use('/users', router);

  /** 
   * @swagger 
   * /users: 
   *   get: 
   *     tags:
   *     - "users"
   *     description: Get all users (admin only) 
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.get('/', isUserAuthenticated, isAdmin, handleGetAllUsers)

  /** 
   * @swagger 
   * /login: 
   *   post: 
   *     tags:
   *     - "users"
   *     parameters:
   *     - name: "username"
   *       in: "body"
   *       description: "user's username"
   *       required: true
   *       type: "string"
   *     - name: "password"
   *       in: "body"
   *       description: "user's password"
   *       required: true
   *       type: "string"
   *     description: Login
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.post('/login', handleLogin)

  /** 
   * @swagger 
   * /register: 
   *   post: 
   *     tags:
   *     - "users"
   *     parameters:
   *     - name: "username"
   *       in: "body"
   *       description: "user's username"
   *       required: true
   *       type: "string"
   *     - name: "password"
   *       in: "body"
   *       description: "user's password"
   *       required: true
   *       type: "string"
   *     - name: "name"
   *       in: "body"
   *       description: "user's name"
   *       required: true
   *       type: "string"
   *     description: Register
   *     responses:  
   *       200: 
   *         description: Success  
   */
  router.post('/register', handleRegister)

  /** 
   * @swagger 
   * /profile: 
   *   post: 
   *     tags:
   *     - "users"
   *     description: Get profile of the current logged in user
   *     responses:  
   *       200: 
   *         description: Success  
   *     security:
   *     - authorization: []
   */
  router.get('/profile', isUserAuthenticated, getProfile)
};
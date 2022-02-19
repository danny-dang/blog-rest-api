
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
  router.get('/', isUserAuthenticated, isAdmin, handleGetAllUsers)
  router.post('/login', handleLogin)
  router.post('/register', handleRegister)
  router.get('/profile', isUserAuthenticated, getProfile)
};
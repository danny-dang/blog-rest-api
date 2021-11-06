
import express from 'express';
import {
  handleLogin,
  handleRegister,
  getProfile,
} from '../controllers/user'
import { isUserAuthenticated } from '../middleware'

const router = express.Router();
export default (app) => {
  app.use('/users', router);
  router.post('/login', handleLogin)
  router.post('/register', handleRegister)
  router.get('/profile', isUserAuthenticated, getProfile)
};
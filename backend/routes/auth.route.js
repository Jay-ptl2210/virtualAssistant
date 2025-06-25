import express from 'express';
import {
  sendOtp,
  verifyOtp,
  login,
  logout
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup/send-otp', sendOtp);
router.post('/signup/verify-otp', verifyOtp);
router.post('/signin', login);
router.get('/logout', logout);

export default router;

import express from 'express';
import {
  sendOtp,
  verifyOtp,
  login,
  logout,
  requestResetOtp,
  resetPassword
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup/send-otp', sendOtp);
router.post('/signup/verify-otp', verifyOtp);
router.post('/signin', login);
router.post('/forgot-password', requestResetOtp);   // ✅ Correct
router.post('/reset-password', resetPassword);      // ✅ Correct
router.get('/logout', logout);


export default router;

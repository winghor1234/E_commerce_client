// src/utils/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ecommerceserver-production-70c3.up.railway.app', 
  withCredentials: true, // เผื่อคุณใช้ cookie ใน auth
});

export default instance;

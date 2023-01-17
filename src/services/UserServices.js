import requests from './httpServices';

const UserServices = {
  userLogin(body) {
    return requests.post('/auth/login/', body);
  },

  verifyEmailAddress(body) {
    return requests.post('/auth/send_otp_for_email/', body);
  },
  verifyOtp(body) {
    return requests.post('/auth/verify_otp_for_email/', body);
  },
  
  userRegister(body) {
    console.log("ver-em::", body);
    return requests.post('/auth/register/', body);
  },

  signUpWithProvider(body) {
    return requests.post('/user/signup', body);
  },

  forgetPassword(body) {
    return requests.put('/auth/password/forgot/', body);
  },

  resetPassword(body) {
    return requests.put('/user/reset-password', body);
  },

  changePassword(body) {
    return requests.post('/user/change-password', body);
  },

  updateUser(id, body) {
    return requests.put(`/user/${id}`, body);
  },
};

export default UserServices;

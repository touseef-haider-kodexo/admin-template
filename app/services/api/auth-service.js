/* eslint-disable */
import BaseService from "./_base-service";

class AuthService extends BaseService {
  login(data) {
    return this.post("/signin", data);
  }

  passwordEmail(data) {
    return this.post("/requestPassword", data);
  }

  passwordReset(data) {
    return this.put(`/changePassword?token=${data?.token}`, data);
  }

  getProfile() {
    return this.get(`/profile/getOwnProfile`);
  }

  validateEmail(data) {
    return this.get(`/user/email?email=${data}`);
  }

  memberLogin(data) {
    return this.post(`/member-signin/${data.claimId}`, data);
  }

  validatePasswordLink(data) {
    return this.get(`/validatePasswordLink?token=${data}`);
  }
}

export default new AuthService();

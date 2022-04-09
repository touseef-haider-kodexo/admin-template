/* eslint-disable */
import BaseService from "./_base-service";

class AppService extends BaseService {
  addCategory(data) {
    return this.post("/category", data);
  }

  getClaim(data) {
    return this.get(
      `/claim/claimsPaginated?search=${data.search}&status=${
        data.claimStatus
      }&claim_type=${data.type}&to=${data.toDate}&from=${
        data.fromDate
      }&pageSize=${data.pagination.pageSize}&current=${
        data.pagination.current
        // eslint-disable-next-line
      }${data.extraSearch}${
        // eslint-disable-next-line
        data.listed === "me" ? "&listed=" + data.listed : ""
      }`,
    );
  }

  getParticularClaim(claim_id) {
    return this.get(`/claim/${claim_id}`);
  }

  addClaim(data) {
    return this.post(`/claim`, data);
  }

  addClaimImages(data) {
    const claimId = data?.claimId;
    return this.put(`/claim/claimImages/${claimId}`, data);
  }

  updateClaim(data) {
    return this.put(`/claim/${data._id}`, data);
  }

  memberInfoClaim(data) {
    return this.put(`/claim/member/${data._id}`, data);
  }

  updateMemberReivewInClaim(data) {
    return this.put(`/claim/isReviewed/${data._id}`, data);
  }

  requestedByMemberOrTechnician(data) {
    if (data?.member) {
      return this.put(`/claim/requestedByMember/${data?._id}`, data);
    }
    return this.put(`/claim/requestedByTechnician/${data?._id}`, data);
  }

  getCategoryWithChilds() {
    return this.get(`/category/parents`);
  }

  updateCategory(data) {
    return this.put(`/category/${data.id}`, data);
  }

  deleteCategory(id) {
    return this.delete(`/category/${id}`);
  }

  getAdditinalClaimItem() {
    return this.get("/additionalClaimItems");
  }

  addAdditinalClaimItem(data) {
    return this.post("/additionalClaimItems", data);
  }

  updateAdditional(data) {
    return this.put(`/additionalClaimItems/${data.id}`, data);
  }

  deleteAdditional(id) {
    return this.delete(`/additionalClaimItems/${id}`);
  }

  pushMisCat(data) {
    return this.post(`/miscCategory`, data);
  }

  updateMisCat(data) {
    return this.put(`/miscCategory/${data._id}`, data);
  }

  deleteMisCat({ id, type }) {
    return this.delete(`/miscCategory/${id}?type=${type}`);
  }

  getUsers(data) {
    return this.get(
      `/profile/getProfiles?pageSize=${data.pageSize}&current=${data.current}`,
    );
  }

  getProfile(id) {
    return this.get(`/profile/${id}`);
  }

  getProfileTotal() {
    return this.get("/profile/total");
  }

  addUsers(data) {
    return this.post("/user", data);
  }

  updateUser(data) {
    return this.put(`user/${data._id}`, data);
  }

  updateProfile(data) {
    return this.put(`/profile/${data._id}`, data);
  }

  getTpas(data) {
    return this.get(`/tpa?pageSize=${data.pageSize}&current=${data.current}`);
  }

  getClaimData(data) {
    return this.get(
      `/claim/claimsPaginated?pageSize=${data.pageSize}&current=${data.current}`,
    );
  }

  getTpaTotal() {
    return this.get(`/tpa/total`);
  }

  getSearchTpa(current) {
    return this.get(`/tpa?current=${current}`);
  }

  addTpa(data) {
    return this.post("/tpa", data);
  }

  getTpa(id) {
    return this.get(`/tpa/${id}?populated=${true}`);
  }

  updateTpa(data) {
    return this.put(`/tpa/${data._id}`, data);
  }

  searchTpa(val) {
    return this.get(`/tpa/search?search=${val}`);
  }

  getTechnicians(data) {
    return this.get(
      `/technician?pageSize=${data.pageSize}&current=${data.current}`,
    );
  }

  getTechnicianTotal() {
    return this.get(`/technician/total`);
  }

  getSearchTechnician(current) {
    return this.get(`/technician?current=${current}`);
  }

  addTechnician(data) {
    return this.post("/technician", data);
  }

  getTechnician(id) {
    return this.get(`/technician/${id}`);
  }

  getTechnicianPopulatedCategory(id) {
    return this.get(`/technician/${id}?populateCategory=${true}`);
  }

  getTechnicianSortedByDistance(data) {
    return this.get(
      `/technician/sort_by?lat=${data?.lat}&lng=${data?.lng}&category=${data?.category}&minDistance=${data?.minDistance}&excludedIds=${data?.excludedIds}&isShowAll=${data?.isShowAllTech}`,
    );
  }

  // eslint-disable-next-line
  addTechncianRating(data) {
    return this.post(`/rating/${data?._id}`, data);
  }

  updatetechnician(data) {
    return this.put(`/technician/${data._id}`, data);
  }

  searchTechnician(val) {
    console.log(val);
    return this.get(
      `/technician/search?search=${val?.search}&searchArray=${
        val?.searchArray?.length > 0 ? JSON.stringify(val?.searchArray) : []
      }`,
    );
  }

  upload(data) {
    return this.post("/upload", data, {
      timeout: 60000,
    });
  }

  removeImage(key) {
    return this.delete(`/deleteFile/${key}`);
  }

  getAllClaimStatus(listed) {
    return this.get(`/claim/getCountOfStatus?listed=${listed}`);
  }

  deleteUser(id) {
    return this.delete(`/user/${id}`);
  }

  getNotification(data) {
    return this.get(
      `/notifications?pageSize=${data.pageSize}&current=${data.current}`,
    );
  }

  getNotificationTotal() {
    return this.get(`/notifications/total`);
  }

  addSeenNotification(id) {
    return this.put(`/notifications/seen/${id}`);
  }

  getClaimActivity(data) {
    return this.get(
      `/recentClaimActivity?pageSize=${data.pageSize}&current=${data.current}`,
    );
  }

  getClaimActivityTotal() {
    return this.get(`/recentClaimActivity/total`);
  }

  addSeenClaim(id) {
    return this.put(`/recentClaimActivity/seen/${id}`);
  }

  getClaimNotes(data) {
    return this.get(
      `notes?claim=${data?.claim}&type=notes&pageSize=${data?.pageSize}&current=${data?.current}`,
    );
  }

  getTechnicalClaimNotes(data) {
    return this.get(
      `notes?claim=${data?.claim}&type=technical_notes&pageSize=${data?.pageSize}&current=${data?.current}`,
    );
  }

  getInternalClaimNotes(data) {
    return this.get(
      `notes?claim=${data?.claim}&type=internal_notes&pageSize=${data?.pageSize}&current=${data?.current}`,
    );
  }

  updateClaimNotes(data) {
    return this.put(`/notes/${data._id}`, data);
  }

  deleteClaimNotes(id) {
    return this.delete(`/notes/${id}`);
  }

  getClaimNotesTotal() {
    return this.get(`/notes/total`);
  }

  addClaimNotes(data) {
    return this.post("/notes", data);
  }

  getParticularCategory(id) {
    return this.get(`/category/${id}`);
  }

  getTechnicianByLocationId(loc_id, location) {
    console.log(loc_id, location);
    return this.get(
      `/technician/getTechnicianByLocation/${loc_id}?lat=${location.lat}&lng=${location.lng}`,
    );
  }

  getVehicleYears() {
    return this.get(`/vehicle/year`);
  }

  importFile(data) {
    console.log(data);
    return this.post("/importExport/claims", data);
  }

  exportClaims() {
    return this.get("/importExport/claims");
  }

  addCarvanaClaim(data) {
    return this.post("/claim/carvana/addClaim", data);
  }
  verifyTpa(data) {
    return this.put(
      `/claim/carvana/verifyTpa/${data?.id}?verified=${data?.verified}`,
      data,
    );
  }

  getCarByCarTypeAndSubType(data) {
    return this.get(`/vehicleCanvas?canvasType=${data?.type}`);
  }

  manuallyRequested(data) {
    return this.put(`/claim/manuallyRequested/${data?.claim_id}`, data);
  }
}

export default new AppService();

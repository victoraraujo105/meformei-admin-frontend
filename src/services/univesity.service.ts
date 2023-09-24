import API from "@/config/api";

export const UniversityService = {
  async getUniversities() {
    return await API.get(`universities`);
  },
};

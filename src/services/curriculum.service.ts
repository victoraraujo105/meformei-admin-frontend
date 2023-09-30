import API from "@/config/API";

export const CurriculumService = {
  async getCurriculum() {
    return await API.get(`curriculum`);
  },
};
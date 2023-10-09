import { PartialUniversity, UniversityBody } from "@/components/University/validations/index";
import API from "@/config/API";


export const UniversityService = {
  async getUniversities() {
    return await API.get(`universities`);
  },
  async postUnivesity(university: UniversityBody){
    return await API.post(`universities`, university);
  },
  async updateUnivesity(id: string, data: PartialUniversity ){
    return await API.post(`universities/${id}`, data);
  },
  async deleteUnivesity(id: string){
    return await API.delete(`universities/${id}`);
  },
  async getCoursesInUniversity(id: string){
    return await API.get(`universities/${id}/courses`);
  }
};

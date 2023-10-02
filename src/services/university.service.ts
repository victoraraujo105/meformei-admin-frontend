import API from "@/config/API";
import { UniversityBody, PartialUniversity } from "@/components/University/validations/index"


export const UniversityService = {
  async getUniversities() {
    let res = await API.get(`universities`);
    console.log(res);
    return res;
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

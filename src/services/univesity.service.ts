import API from "@/config/API";
import { PartialUniversity }from "@/components/University/validations/index"


export const UniversityService = {
  async getUniversities() {
    return await API.get(`universities`);
  },
  async postUnivesity(university: BodyUniversity){
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

export interface BodyUniversity {
  name: string;
  abv: string;
  city: string;
  state: string;
}

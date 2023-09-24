import API from "@/config/API";



export const UniversityService = {
  async getUniversities() {
    return await API.get(`universities`);
  },
  async postUnivesity(university: BodyUniversity){
    return await API.post(`universities`, university);
  },
  async updateUnivesity(id: string, university: BodyUniversity){
    return await API.post(`universities/${id}`, university);
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

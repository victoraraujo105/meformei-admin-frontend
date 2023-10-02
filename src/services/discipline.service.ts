import { DisciplineBody, PartialDiscipline } from "@/components/Discipline/validations";
import API from "@/config/API";

export const DisciplineService = {
  async getDisciplines(universityId: string, curriculumId: string) {
    return await API.get(`universities/${universityId}/courses/${curriculumId}/disciplines`);
  },
  async postDiscipline(universityId: string, discipline: DisciplineBody) {
    return await API.post(`universities/${universityId}/courses`, discipline);
  },
  async updateDiscipline(universityId: string, curriculumId: string, id: string, data: PartialDiscipline): Promise<any> {
    // return await API.post(`universities/${universityId}/courses`, data);
    return null;
  },
  async deleteDiscipline(universityId: string, curriculumId: string, id: string): Promise<any> {
    // return await API.delete(`universities/${universityId}/courses/${id}`);
    return null;
  },
};
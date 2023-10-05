import { DisciplineBody, PartialDiscipline } from "@/components/Discipline/validations";
import API from "@/config/API";

export const DisciplineService = {
  async getDisciplines(curriculumId: string) {
    return await API.get(`curriculums/${curriculumId}/disciplines`);
  },
  async postDiscipline(curriculumId: string , discipline: DisciplineBody) {
    return await API.post(`curriculums/${curriculumId}/disciplines`, discipline);
  },
  async updateDiscipline(id: string, data: PartialDiscipline): Promise<any> {
    return await API.patch(`curriculums/disciplines/${id}`, data);
  },
  async deleteDiscipline(id: string): Promise<any> {
    return await API.delete(`curriculums/disciplines/${id}`);
  },
};
import { PartialDiscipline } from "@/components/Discipline/validations";
import API from "@/config/API";

export const DisciplineService = {
  async getDisciplines(curriculumId: string) {
    return await API.get(`curriculums/${curriculumId}/disciplines`);
  },
  async postDiscipline(curriculumId: string , body: CreateDisciplineBody) {
    return await API.post(`curriculums/${curriculumId}/disciplines`, body);
  },
  async updateDiscipline(id: string, data: PartialDiscipline): Promise<any> {
    return await API.patch(`curriculums/disciplines/${id}`, data);
  },
  async deleteDiscipline(id: string): Promise<any> {
    return await API.delete(`curriculums/disciplines/${id}`);
  },
};

interface CreateDisciplineBody {
  disciplines: DisciplineBody[]
}

interface DisciplineBody {
  cod: string;
  optional: boolean;
  name: string;
  courseOutline: string;
  semester: number;
  description: string;
  prerequisites: string[];
  bibliography: string[];
  hours: number;
}
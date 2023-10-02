import API from "@/config/API";
import { CourseBody, PartialCourse } from "@/components/Course/validations/index";

export const CourseService = {
  async getCourses(universityId: string) {
    return await API.get(`universities/${universityId}/courses`);
  },
  async postCourse(universityId: string, course: CourseBody) {
    return await API.post(`universities/${universityId}/courses`, course);
  },
  async updateCourse(universityId: string, id: string, data: PartialCourse): Promise<any> {
    // return await API.post(`universities/${universityId}/courses`, data);
    throw new Error("Endpoint da API não implementado.");
  },
  async deleteCourse(universityId: string, id: string): Promise<any> {
    // return await API.delete(`universities/${universityId}/courses/${id}`);
    throw new Error("Endpoint da API não implementado.");
  },
};
import { CourseBody, PartialCourse } from "@/components/Course/validations/index";
import API from "@/config/API";

export const CourseService = {
  async getCourses(universityId: string) {
    return await API.get(`universities/${universityId}/courses`);
  },
  async postCourse(universityId: string, course: CourseBody) {
    return await API.post(`universities/${universityId}/courses`, course);
  },
  async updateCourse( id: string, data: PartialCourse): Promise<any> {
    return await API.patch(`curriculums/${id}`, data);
  },
  async deleteCourse(id: string): Promise<any> {
    return await API.delete(`curriculums/${id}`);
  },
};
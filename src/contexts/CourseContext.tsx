"use client"
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { Course, University } from '@/types';
import { CourseService } from '@/services/course.service';
import { PartialCourse, CourseBody } from '@/components/Course/validations';

export const CourseContext = createContext({} as CourseContextType);

export const CourseProvider = ({ children, university }: Props) => {

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    CourseService.getCourses(university.id).then((response) => setCourses(response.data.courses))
  }, [])

  const deleteCourse = async (id: string) => {
    const response = await CourseService.deleteCourse(university.id, id)
    setCourses((prev) => prev.filter((course) => course.id !== id))
  }
  const updateCourse = async ({ id, data }: UpdateCourse) => {
    CourseService.updateCourse(university.id, id, data)
      .then((response) => 
        setCourses((prev) => prev.map((course) => course.id === id ? response.data.course : course))
      )
  }
  const createCourse = async ({ courseBody }: { courseBody: CourseBody }) => {
    CourseService.postCourse(university.id, courseBody)
      .then((response) => setCourses((prev) => [...prev, response.data.course]))
  };

  const readCourse = async (id: string) => {
    const course = courses.find((course: Course) => course.id === id)
    return course ?? null
  }

  return (
    <CourseContext.Provider value={{ courses, createCourse, updateCourse, deleteCourse, readCourse }}>
      {children}
    </CourseContext.Provider>
  );
};


type CourseContextType = {
  courses: Course[];
  deleteCourse: (id: string) => Promise<void>;
  updateCourse: (data: UpdateCourse) => Promise<void>;
  createCourse: ({ courseBody }: { courseBody: CourseBody }) => Promise<void>;
  readCourse: (id: string) => Promise<Course | null>;
}

interface Props {
  children: React.ReactNode,
  university: University,
}

interface UpdateCourse {
  id: string,
  data: PartialCourse
}


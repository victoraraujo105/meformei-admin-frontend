"use client"
import { CourseBody, PartialCourse } from '@/components/Course/validations';
import { CourseService } from '@/services/course.service';
import { Course } from '@/types';
import { createContext, useEffect, useState } from 'react';

export const CourseContext = createContext({} as CourseContextType);

export const CourseProvider = ({ children, universityId }: Props) => {

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    CourseService.getCourses(universityId).then((response) => setCourses(response.data.courses))
  }, [universityId])

  const isEmpty = async () => {
    return courses.length > 0
  }

  const deleteCourse = async (id: string) => {
    await CourseService.deleteCourse(id)
    setCourses((prev) => prev.filter((course) => course.id !== id))
  }
  const updateCourse = async ({ id, data }: UpdateCourse) => {
    CourseService.updateCourse(id, data)
      .then((response) =>
        setCourses((prev) => prev.map((course) => course.id === id ? response.data.curriculum : course))
      )
  }
  const createCourse = async ({ courseBody }: { courseBody: CourseBody }) => {
    CourseService.postCourse(universityId, courseBody)
      .then((response) => setCourses((prev) => [...prev, response.data.curriculum]))
  };

  const readCourse = async (id: string) => {
    const course = courses.find((course: Course) => course.id === id)
    return course ?? null
  }

  return (
    <CourseContext.Provider value={{ courses, createCourse, updateCourse, deleteCourse, readCourse, isEmpty }}>
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
  isEmpty: () => Promise<boolean>;
}

interface Props {
  children: React.ReactNode,
  universityId: string,
}

interface UpdateCourse {
  id: string,
  data: PartialCourse
}


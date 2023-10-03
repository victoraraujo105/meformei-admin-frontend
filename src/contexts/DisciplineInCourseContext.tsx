"use client"
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { Course, Discipline, DisciplinesResponse, DisciplineResponse, disciplineResponseToDiscipline } from '@/types';
import { DisciplineService } from '@/services/discipline.service';
import { PartialDiscipline, DisciplineBody } from '@/components/Discipline/validations';
import { DisciplineProvider, DisciplineContextType } from '@/contexts/DisciplineContext';

export const DisciplineInCourseProvider = ({ children, course }: Props) => {

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    useEffect(() => {

        DisciplineService
            .getDisciplines(course.university.id, course.id)
            .then((response) =>  {
              console.log("response: ", response.data)
              const flatten = response.data.disciplines
              .map((disciplinesResponse: DisciplinesResponse) => disciplinesResponse.disciplines.map((discipline) => disciplineResponseToDiscipline(discipline, course, disciplinesResponse.period))
              ).flat(1)
              console.log("flatten: ", flatten)
              setDisciplines(
                flatten
              )
            }
            )
            .catch((error) => console.log(error))
            console.log("disciplinas:", disciplines)
    }, [])

  return DisciplineProvider({ children, disciplines, course });
};

export interface Props {
  children: React.ReactNode,
  course: Course
}
"use client"
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { Course, Discipline } from '@/types';
import { DisciplineService } from '@/services/discipline.service';
import { PartialDiscipline, DisciplineBody } from '@/components/Discipline/validations';

export const DisciplineContext = createContext({} as DisciplineContextType);

export const DisciplineProvider = ({ children, course }: Props) => {

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    useEffect(() => {
        DisciplineService
            .getDisciplines(course.university.id, course.id)
            .then((response) => 
                setDisciplines(response.data.disciplines
                    .map((discipline: Discipline) => 
                        ({ ...discipline, course })
                    )
                )
            )
    }, [])

  const deleteDiscipline = async (id: string) => {
    const response = await DisciplineService.deleteDiscipline(course.university.id, course.id, id)
    setDisciplines((prev) => prev.filter((discipline) => discipline.id !== id))
  }
  const updateDiscipline = async ({ id, data }: UpdateDiscipline) => {
    DisciplineService.updateDiscipline(course.university.id, course.id, id,  data)
      .then((response) => 
        setDisciplines((prev) => prev.map((discipline) => discipline.id === id ? response.data.discipline : discipline))
      )
  }
  const createDiscipline = async ({ disciplineBody }: { disciplineBody: DisciplineBody }) => {
    DisciplineService.postDiscipline(course.university.id, disciplineBody)
      .then((response) => setDisciplines((prev) => [...prev, response.data.discipline]))
  };

  const readDiscipline = async (id: string) => {
    const discipline = disciplines.find((discipline: Discipline) => discipline.id === id)
    return discipline ?? null
  }

  return (
    <DisciplineContext.Provider value={{ disciplines, createDiscipline, updateDiscipline, deleteDiscipline, readDiscipline }}>
      {children}
    </DisciplineContext.Provider>
  );
};


type DisciplineContextType = {
  disciplines: Discipline[];
  deleteDiscipline: (id: string) => Promise<void>;
  updateDiscipline: (data: UpdateDiscipline) => Promise<void>;
  createDiscipline: ({ disciplineBody }: { disciplineBody: DisciplineBody }) => Promise<void>;
  readDiscipline: (id: string) => Promise<Discipline | null>;
}

interface Props {
  children: React.ReactNode,
  course: Course
}

interface UpdateDiscipline {
  id: string,
  data: PartialDiscipline
}

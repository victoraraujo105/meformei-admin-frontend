"use client"
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { Course, Discipline } from '@/types';
import { DisciplineService } from '@/services/discipline.service';
import { PartialDiscipline, DisciplineBody } from '@/components/Discipline/validations';

export const DisciplineContext = createContext({} as DisciplineContextType);

export const DisciplineProvider = ({ children, course, disciplines }: Props) => {

  const [data, setData] = useState<Discipline[]>([]);
  
  useEffect(() => {
    setData(disciplines)
  }, [disciplines])
  
  const deleteDiscipline = async (id: string) => {
    const response = await DisciplineService.deleteDiscipline(course.university.id, course.id, id)
    setData((prev) => prev.filter((discipline) => discipline.id !== id))
  }
  const updateDiscipline = async ({ id, data }: UpdateDiscipline) => {
    DisciplineService.updateDiscipline(course.university.id, course.id, id,  data)
      .then((response) => 
        setData((prev) => prev.map((discipline) => discipline.id === id ? response.data.discipline : discipline))
      )
  }
  const createDiscipline = async ({ disciplineBody }: { disciplineBody: DisciplineBody }) => {
    DisciplineService.postDiscipline(course.university.id, disciplineBody)
      .then((response) => setData((prev) => [...prev, response.data.discipline]))
  };

  const readDiscipline = async (id: string) => {
    const discipline = data.find((discipline: Discipline) => discipline.id === id)
    return discipline ?? null
  }

  return (
    <DisciplineContext.Provider value={{ disciplines: data, createDiscipline, updateDiscipline, deleteDiscipline, readDiscipline }}>
      {children}
    </DisciplineContext.Provider>
  );
};


export type DisciplineContextType = {
  disciplines: Discipline[];
  deleteDiscipline: (id: string) => Promise<void>;
  updateDiscipline: (data: UpdateDiscipline) => Promise<void>;
  createDiscipline: ({ disciplineBody }: { disciplineBody: DisciplineBody }) => Promise<void>;
  readDiscipline: (id: string) => Promise<Discipline | null>;
}

export interface Props {
  children: React.ReactNode,
  course: Course,
  disciplines: Discipline[]
}

export interface UpdateDiscipline {
  id: string,
  data: PartialDiscipline
}

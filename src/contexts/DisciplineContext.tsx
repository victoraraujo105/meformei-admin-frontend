"use client"
import { DisciplineBody, PartialDiscipline } from '@/components/Discipline/validations';
import { DisciplineService } from '@/services/discipline.service';
import { Discipline } from '@/types';
import { createContext, useEffect, useState } from 'react';

export const DisciplineContext = createContext({} as DisciplineContextType);

export const DisciplineProvider = ({ children, courseId }: Props) => {

  const [data, setData] = useState<Discipline[]>([]);

  useEffect(() => {
    DisciplineService.getDisciplines(courseId).then((response) => setData(response.data.disciplines))
  }, [])

  const deleteDiscipline = async (id: string) => {
    const response = await DisciplineService.deleteDiscipline(id)
    setData((prev) => prev.filter((discipline) => discipline.id !== id))
  }
  const updateDiscipline = async ({ id, data }: UpdateDiscipline) => {
    DisciplineService.updateDiscipline(id, data)
      .then((response) =>
        setData((prev) => prev.map((discipline) => discipline.id === id ? response.data.discipline : discipline))
      )
  }
  const createDiscipline = async ({ disciplineBody }: { disciplineBody: DisciplineBody }) => {
    DisciplineService.postDiscipline(courseId, disciplineBody)
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
  courseId: string,
}

export interface UpdateDiscipline {
  id: string,
  data: PartialDiscipline
}

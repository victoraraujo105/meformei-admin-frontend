"use client"
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { Course, Discipline, DisciplinesResponse, DisciplineResponse, disciplineResponseToDiscipline } from '@/types';
import { DisciplineService } from '@/services/discipline.service';
import { PartialDiscipline, DisciplineBody } from '@/components/Discipline/validations';
import { DisciplineProvider, DisciplineContextType } from '@/contexts/DisciplineContext';

export const PreRequisiteProvider = ({ children, discipline }: Props) => {

  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    useEffect(() => {
      setDisciplines(discipline?.preRequisites ?? [] )
    }, [discipline])

  return DisciplineProvider({ children, disciplines, course: discipline.course });
};

export interface Props {
  children: React.ReactNode,
  discipline: Discipline
}
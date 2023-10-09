"use client"
import { PartialUniversity, UniversityBody } from '@/components/University/validations';
import { UniversityService } from '@/services/university.service';
import { University } from '@/types';
import { createContext, useEffect, useState } from 'react';

export const UniversityContext = createContext({} as UniversityContextType);

export const UniversityProvider = ({ children }: Props) => {

  const [universities, setUniversities] = useState<University[]>([]);



  useEffect(() => {
    UniversityService.getUniversities().then((response) => setUniversities(response.data.universities))
  }, [])

  const deleteUniversity = async (id: string) => {
    const response = await UniversityService.deleteUnivesity(id)
    // encontrar (no universities) a universidade que foi deletada no backend
    // e remove-lo:
    setUniversities((prev) => prev.filter((university) => university.id !== id))
  }
  const updateUniversity = async ({ id, data }: UpdateUniversity) => {
    const response = await UniversityService.updateUnivesity(id, data)
    // encontrar (no universities) a universidade que foi atualizada no backend
    // e atualiza-lo: 
    setUniversities((prev) => prev.map((university) => university.id === id ? response.data.university : university))
    //setUniversities((prev) => [...prev, response.data.university])
  }
  const createUniversity = async ({ universityBody }: { universityBody: UniversityBody }) => {
    const response = await UniversityService.postUnivesity(universityBody)
    setUniversities((prev) => [...prev, response.data.university])
  };

  const readUniversity = async (id: string) => {
    const university = universities.find((university: University) => university.id === id)
    if (!university) return null
    return university
  }

  return (
    <UniversityContext.Provider value={{ universities, createUniversity, updateUniversity, deleteUniversity, readUniversity }}>
      {children}
    </UniversityContext.Provider>
  );
};


type UniversityContextType = {
  universities: University[];
  deleteUniversity: (id: string) => Promise<void>;
  updateUniversity: (data: UpdateUniversity) => Promise<void>;
  createUniversity: ({ universityBody }: { universityBody: UniversityBody }) => Promise<void>;
  readUniversity: (id: string) => Promise<University | null>;
}

interface Props {
  children: React.ReactNode
}

interface UpdateUniversity {
  id: string,
  data: PartialUniversity
}


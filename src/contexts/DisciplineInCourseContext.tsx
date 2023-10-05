// "use client"
// import { DisciplineProvider } from '@/contexts/DisciplineContext';
// import { DisciplineService } from '@/services/discipline.service';
// import { Discipline, DisciplinesResponse, disciplineResponseToDiscipline } from '@/types';
// import { useEffect, useState } from 'react';

// export const DisciplineInCourseProvider = ({ children, courseId }: Props) => {

//   const [disciplines, setDisciplines] = useState<Discipline[]>([]);

//   useEffect(() => {

//     DisciplineService
//       .getDisciplines(courseId)
//       .then((response) => {
//         console.log("response: ", response.data)
//         const flatten = response.data.disciplines
//           .map((disciplinesResponse: DisciplinesResponse) => disciplinesResponse.disciplines.map((discipline) => disciplineResponseToDiscipline(discipline, course, disciplinesResponse.period))
//           ).flat(1)
//         console.log("flatten: ", flatten)
//         setDisciplines(
//           flatten
//         )
//       }
//       )
//       .catch((error) => console.log(error))
//     console.log("disciplinas:", disciplines)
//   }, [])

//   return DisciplineProvider({ children, disciplines, courseId });
// };

// export interface Props {
//   children: React.ReactNode,
//   courseId: string
// }
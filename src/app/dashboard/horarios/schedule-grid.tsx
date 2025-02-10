import { CourseCard } from "./course-card";

// Definimos los tipos
type CourseType = "teoria" | "lab" | "pract";
type CourseName = "ia" | "arq" | "pevico" | "redes" | "ing";
type DayName = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes";
type HourSlot =
  | "07:00 - 08:00"
  | "08:00 - 09:00"
  | "09:00 - 10:00"
  | "10:00 - 11:00"
  | "11:00 - 12:00";

interface Course {
  title: string;
  professor: string;
  classroom: string;
  type: CourseType;
  course: CourseName;
}

interface DaySchedule {
  [key: string]: Course[];
}

interface ScheduleData {
  [key: string]: {
    [K in DayName]?: Course[];
  };
}

const hours: HourSlot[] = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
];

const days: DayName[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const scheduleData: ScheduleData = {
  "07:00 - 08:00": {
    Lunes: [
      {
        title: "Inteligencia Artificial I - Teoría",
        professor: "Jorge Luis Gutierrez Gutierrez",
        classroom: "Info 3",
        type: "teoria",
        course: "ia",
      },
      {
        title: "Arquitectura de Compu - Lab",
        professor: "Jose Gabriel Cruz Silva",
        classroom: "Info 2",
        type: "lab",
        course: "arq",
      },
    ],
    Jueves: [
      {
        title: "PEVICO - Teoría",
        professor: "Luz Sofia R Pedro Huaman",
        classroom: "Info 2",
        type: "teoria",
        course: "pevico",
      },
    ],
    Viernes: [
      {
        title: "Ingeniería de Software I - Teoría",
        professor: "Ricardo Manuel Guevara Ruiz",
        classroom: "Info 3",
        type: "teoria",
        course: "ing",
      },
    ],
  },
  "08:00 - 09:00": {
    Lunes: [
      {
        title: "Inteligencia Artificial I - Teoría",
        professor: "Jorge Luis Gutierrez Gutierrez",
        classroom: "Info 3",
        type: "teoria",
        course: "ia",
      },
      {
        title: "Arquitectura de Compu - Lab",
        professor: "Jose Gabriel Cruz Silva",
        classroom: "Info 2",
        type: "lab",
        course: "arq",
      },
    ],
    Martes: [
      {
        title: "PEVICO - Pract",
        professor: "Luz Sofia R Pedro Huaman",
        classroom: "Info 1",
        type: "pract",
        course: "pevico",
      },
    ],
    Miércoles: [
      {
        title: "PEVICO - Teoría",
        professor: "Luz Sofia R Pedro Huaman",
        classroom: "Info 2",
        type: "teoria",
        course: "pevico",
      },
    ],
    Viernes: [
      {
        title: "Ingeniería de Software I - Teoría",
        professor: "Ricardo Manuel Guevara Ruiz",
        classroom: "Info 3",
        type: "teoria",
        course: "ing",
      },
    ],
  },
  "09:00 - 10:00": {
    Martes: [
      {
        title: "PEVICO - Pract",
        professor: "Luz Sofia R Pedro Huaman",
        classroom: "Info 1",
        type: "pract",
        course: "pevico",
      },
    ],
    Viernes: [
      {
        title: "Ingeniería de Software I - Pract",
        professor: "Ricardo Manuel Guevara Ruiz",
        classroom: "Info 3",
        type: "pract",
        course: "ing",
      },
      {
        title: "Inteligencia Artificial I - Lab",
        professor: "Jorge Luis Gutierrez Gutierrez",
        classroom: "Laboratorio A",
        type: "lab",
        course: "ia",
      },
    ],
  },
  "10:00 - 11:00": {
    Miércoles: [
      {
        title: "Redes I - Teoría",
        professor: "Edwin Raul Mendoza Torres",
        classroom: "Info 3",
        type: "teoria",
        course: "redes",
      },
    ],
    Jueves: [
      {
        title: "Ingeniería de Software I - Pract",
        professor: "Ricardo Manuel Guevara Ruiz",
        classroom: "Info 3",
        type: "pract",
        course: "ing",
      },
    ],
    Viernes: [
      {
        title: "Inteligencia Artificial I - Lab",
        professor: "Jorge Luis Gutierrez Gutierrez",
        classroom: "Laboratorio A",
        type: "lab",
        course: "ia",
      },
    ],
  },
  "11:00 - 12:00": {
    Miércoles: [
      {
        title: "Redes I - Teoría",
        professor: "Edwin Raul Mendoza Torres",
        classroom: "Info 3",
        type: "teoria",
        course: "redes",
      },
    ],
  },
};

export function ScheduleGrid() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-4 mb-4">
          <div className="font-medium text-muted-foreground">Hora</div>
          {days.map((day) => (
            <div key={day} className="font-medium text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-[120px_repeat(5,1fr)] gap-4"
            >
              <div className="text-sm text-muted-foreground">{hour}</div>
              {days.map((day) => (
                <div key={`${hour}-${day}`} className="min-h-[100px] space-y-2">
                  {scheduleData[hour]?.[day]?.map(
                    (course: Course, index: number) => (
                      <CourseCard
                        key={`${hour}-${day}-${index}`}
                        title={course.title}
                        professor={course.professor}
                        classroom={course.classroom}
                        type={course.type}
                        course={course.course}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

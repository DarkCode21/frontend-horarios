type CourseType = "teoria" | "lab" | "pract";
type CourseName = "ia" | "arq" | "pevico" | "redes" | "ing";

interface CourseCardProps {
  title: string;
  professor: string;
  classroom: string;
  type: CourseType;
  course: CourseName;
}

const courseColors: Record<CourseName, string> = {
  ia: "bg-red-100 hover:bg-red-200",
  arq: "bg-blue-100 hover:bg-blue-200",
  pevico: "bg-purple-100 hover:bg-purple-200",
  redes: "bg-green-100 hover:bg-green-200",
  ing: "bg-yellow-100 hover:bg-yellow-200",
};

export function CourseCard({
  title,
  professor,
  classroom,
  type,
  course,
}: CourseCardProps) {
  return (
    <div
      className={`p-2 rounded-lg ${courseColors[course]} transition-colors cursor-pointer`}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{professor}</div>
      <div className="text-xs text-muted-foreground">Aula: {classroom}</div>
    </div>
  );
}

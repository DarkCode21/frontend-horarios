import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo puedo ver mi horario de clases?",
    answer:
      "Puedes ver tu horario de clases de dos formas: 1) En el menú lateral, selecciona 'Horarios' y luego 'Mi horario' para ver solo tus cursos asignados, o 2) Selecciona 'Horarios' y 'General' para ver el horario completo de la facultad.",
  },
  {
    question: "¿Cómo se manejan los conflictos de horarios?",
    answer:
      "El sistema está diseñado para prevenir conflictos de horarios automáticamente. Si detectas algún conflicto, por favor comunícate con el coordinador académico inmediatamente a través del correo institucional.",
  },
  {
    question: "¿Puedo solicitar cambios en mi horario?",
    answer:
      "Los cambios de horario deben ser solicitados al coordinador académico con al menos una semana de anticipación. La solicitud debe incluir la justificación del cambio y las alternativas de horario propuestas.",
  },
  {
    question: "¿Dónde puedo ver los detalles de mis cursos asignados?",
    answer:
      "En la sección 'Mis Cursos' encontrarás toda la información relacionada con los cursos que tienes asignados, incluyendo el ciclo, modalidad, número de créditos y estado actual.",
  },
  {
    question: "¿Cómo se notifican los cambios en el horario?",
    answer:
      "Los cambios en el horario se notifican a través de: 1) Notificaciones en el sistema (icono de campana), 2) Correo institucional, y 3) Actualizaciones automáticas en tu vista de 'Mi horario'.",
  },
  {
    question: "¿Qué significan los diferentes estados de los cursos?",
    answer:
      "Los cursos pueden tener dos estados principales: 'Activo' (curso en progreso o próximo a iniciar) e 'Inactivo' (curso finalizado o temporalmente suspendido).",
  },
  {
    question: "¿Cómo puedo reportar un problema con el sistema?",
    answer:
      "Para reportar problemas técnicos o consultas sobre el funcionamiento del sistema, puedes: 1) Contactar al soporte técnico a través del correo soporte@unitru.edu.pe, 2) Usar el formulario de reporte de problemas en la sección de ayuda.",
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <div className="space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-muted-foreground">Hola, Ricardo</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Input placeholder="Buscar" className="w-[200px]" />
        </div>
      </div>
      <Card className="p-7 rounded-3xl">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Card>
    </div>
  );
}

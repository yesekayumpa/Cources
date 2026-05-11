import { notFound } from "next/navigation";
import { LessonContent } from "./lesson-content";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { modules } from "@/lib/data/course-data";

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

function findLessonById(lessonId: string) {
  for (const module of modules) {
    for (const chapter of module.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        const lessonIndex = chapter.lessons.findIndex((l) => l.id === lessonId);
        const prevLesson =
          lessonIndex > 0 ? chapter.lessons[lessonIndex - 1] : null;
        const nextLesson =
          lessonIndex < chapter.lessons.length - 1
            ? chapter.lessons[lessonIndex + 1]
            : null;

        // Find next chapter if no more lessons
        let nextChapterFirstLesson = null;
        if (!nextLesson) {
          const chapterIndex = module.chapters.findIndex(
            (c) => c.id === chapter.id,
          );
          if (chapterIndex < module.chapters.length - 1) {
            nextChapterFirstLesson =
              module.chapters[chapterIndex + 1].lessons[0];
          } else {
            // Find next module
            const moduleIndex = modules.findIndex((m) => m.id === module.id);
            if (moduleIndex < modules.length - 1) {
              nextChapterFirstLesson =
                modules[moduleIndex + 1].chapters[0].lessons[0];
            }
          }
        }

        return {
          lesson,
          chapter,
          module,
          prevLesson,
          nextLesson: nextLesson || nextChapterFirstLesson,
          lessonNumber: lessonIndex + 1,
          totalLessons: chapter.lessons.length,
        };
      }
    }
  }
  return null;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lessonData = findLessonById(lessonId);

  if (!lessonData) {
    notFound();
  }

  return (
    <>
      <LessonContent {...lessonData} />
      <ScrollIndicator />
    </>
  );
}

export function generateStaticParams() {
  const params: { lessonId: string }[] = [];

  for (const module of modules) {
    for (const chapter of module.chapters) {
      for (const lesson of chapter.lessons) {
        params.push({ lessonId: lesson.id });
      }
    }
  }

  return params;
}

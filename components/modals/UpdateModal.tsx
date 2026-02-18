"use client";

import { useTranslations } from "next-intl";
import { updateLogs } from "@/data/updates";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateModal({ isOpen, onClose }: UpdateModalProps) {
  const t = useTranslations("home");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="sticky top-0 z-10 border-b bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
          <DialogTitle>{t("updateLog")}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px] p-6">
          <ul className="list-disc pl-5 text-gray-900 dark:text-gray-100">
            {[...updateLogs].reverse().map((log, index) => (
              <li key={index} className="mb-3 text-lg">
                <strong>{log.date}:</strong> {log.content}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

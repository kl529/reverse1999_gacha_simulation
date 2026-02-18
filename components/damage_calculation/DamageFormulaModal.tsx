"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

interface DamageFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DamageFormulaModal({ isOpen, onClose }: DamageFormulaModalProps) {
  const t = useTranslations("damageCalc");
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t("formulaTitle")}</DialogTitle>
          <DialogDescription>
            {t("formulaDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 전체 공식 */}
          <div className="rounded-lg bg-secondary/50 p-4">
            <h3 className="mb-3 text-lg font-semibold">{t("completeFormula")}</h3>
            <div className="overflow-x-auto">
              <div className="min-w-max rounded bg-muted p-4 font-mono text-sm">
                <p className="whitespace-pre-wrap break-words">
                  {t("completeFormulaText")}
                </p>
              </div>
            </div>
          </div>

          {/* 단계별 설명 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("stepByStep")}</h3>

            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step1Title")}
                </h4>
                <p className="font-mono text-sm">
                  {t("step1Text")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step1Note1")}
                  <br />• {t("step1Note2")}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step2Title")}
                </h4>
                <p className="font-mono text-sm">{t("step2Text")}</p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step3Title")}
                </h4>
                <p className="font-mono text-sm">{t("step3Text")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step3Note")}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step4Title")}
                </h4>
                <p className="font-mono text-sm">
                  {t("step4Text")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step4Note1")}
                  <br />• {t("step4Note2")}
                  <br />• {t("step4Note3")}
                  <br />• <strong>{t("warningTitle").replace("⚠️ ", "")}:</strong> {t("step4Note4")}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step5Title")}
                </h4>
                <p className="font-mono text-sm">{t("step5Text")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step5Note")}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step6Title")}
                </h4>
                <p className="font-mono text-sm">{t("step6Text")}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step6Note")}
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t("step7Title")}
                </h4>
                <p className="font-mono text-sm">
                  {t("step7Text")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • {t("step7Note1")}
                  <br />• {t("step7Note2")}
                </p>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="rounded-lg bg-yellow-500/10 p-4">
            <h3 className="mb-2 font-semibold text-yellow-600 dark:text-yellow-400">
              {t("warningTitle")}
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>{t("warning1")}</li>
              <li>{t("warning2")}</li>
              <li>{t("warning3")}</li>
              <li>{t("warning4")}</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

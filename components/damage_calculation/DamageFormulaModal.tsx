"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DamageFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DamageFormulaModal({ isOpen, onClose }: DamageFormulaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">데미지 계산 공식</DialogTitle>
          <DialogDescription>
            리버스 1999의 정확한 데미지 계산 공식입니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 전체 공식 */}
          <div className="rounded-lg bg-secondary/50 p-4">
            <h3 className="mb-3 text-lg font-semibold">완전한 공식</h3>
            <div className="overflow-x-auto">
              <div className="min-w-max rounded bg-muted p-4 font-mono text-sm">
                <p className="whitespace-pre-wrap break-words">
                  최종 데미지 = (캐릭터 공격력 - 적 방어력 × (1 - 방어 무시율) × (1 - 방어력 감소율)) × (스킬 배율) × (1 + 데미지 증가율 + 받는 피해 증가율 - 적 피해 감면율) × (1 + 마법 위력/술식 위력) × (치명타 피해 - 적 치명타 방어) × 상성일 시 1.3
                </p>
              </div>
            </div>
          </div>

          {/* 단계별 설명 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">단계별 설명</h3>

            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  1단계: 유효 방어력 계산
                </h4>
                <p className="font-mono text-sm">
                  유효 방어력 = 대상의 방어력 × (1 - 방어 무시율) × (1 - 방어력 감소율)
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 방어 무시율과 방어력 감소율은 %로 입력 (예: 15% = 15)
                  <br />• 현실 방어력 또는 정신 방어력 중 선택하여 적용
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  2단계: 기본 데미지 계산
                </h4>
                <p className="font-mono text-sm">기본 데미지 = 공격력 - 유효 방어력</p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  3단계: 스킬 계수 적용
                </h4>
                <p className="font-mono text-sm">데미지 = 기본 데미지 × (스킬 계수 / 100)</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 스킬 계수는 스킬의 배율 (예: 100% = 100, 200% = 200)
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  4단계: 데미지 증가 및 피해 감면 적용
                </h4>
                <p className="font-mono text-sm">
                  데미지 = 데미지 × (1 + 데미지 증가율 + 받는 피해 증가율 - 피해 감면율)
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 데미지 증가율: 공격자의 피해 보너스
                  <br />• 받는 피해 증가율: 공격자의 주는 피해 증가량 (또는 방어자의 받는 피해 감소량)
                  <br />• 피해 감면율: 방어자의 피해 감면
                  <br />• <strong>주의:</strong> 세 값이 모두 합산되어 적용됩니다
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  5단계: 주문/술식 위력 적용
                </h4>
                <p className="font-mono text-sm">데미지 = 데미지 × (1 + 주문/술식 위력)</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 주문 위력 또는 술식 위력 중 선택하여 적용
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  6단계: 상성 보너스 적용 (선택)
                </h4>
                <p className="font-mono text-sm">데미지 = 데미지 × 1.3</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 상성이 유리할 경우 1.3배 적용
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                  7단계: 치명타 적용 (선택)
                </h4>
                <p className="font-mono text-sm">
                  최종 데미지 = 데미지 × (치명타 피해량 - 치명타 방어력) / 100
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  • 치명타 피해량: 기본 150% (= 150)
                  <br />• 치명타 방어력: 대상의 치명타 저항
                </p>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="rounded-lg bg-yellow-500/10 p-4">
            <h3 className="mb-2 font-semibold text-yellow-600 dark:text-yellow-400">
              ⚠️ 주의사항
            </h3>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>모든 %값은 소수로 계산됩니다 (15% = 0.15)</li>
              <li>방어 무시율과 방어력 감소율은 곱연산으로 적용됩니다</li>
              <li>피해 보너스와 주는 피해는 다른 스탯입니다</li>
              <li>최종 데미지가 0보다 작을 수 없습니다</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

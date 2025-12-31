# 파밍 스테이지 알고리즘 상세 분석

## 📊 전체 데이터 흐름

```
GrowthCalculatorPage
  ↓ (materialRequirements 계산)
MaterialSummary_Growth / FarmingGuide_Growth
  ↓ (expandCraftingRequirements 호출)
expandCraftingRequirements 함수
  ↓ (expandedRequirements 반환)
groupDeficitsByStage 함수
  ↓ (recommendations 반환)
파밍 스테이지 UI 표시
```

---

## 🔍 단계별 상세 분석

### 1단계: GrowthCalculatorPage - 재료 요구사항 계산

**위치**: `components/growth_calculator/GrowthCalculatorPage.tsx` (74-77라인)

```typescript
const materialRequirements = useMemo(() => {
  const aggregated = aggregateMaterials(characterPlans, characterResonanceTypes);
  return calculateDeficit(userMaterials, aggregated);
}, [characterPlans, characterResonanceTypes, userMaterials]);
```

#### 입력

- `characterPlans`: 활성화된 캐릭터 육성 계획 배열
- `characterResonanceTypes`: 캐릭터별 공명 타입 (damage/defense)
- `userMaterials`: 사용자 보유 재료 `{ [materialId]: quantity }`

#### 처리 과정

**1.1. aggregateMaterials** (`lib/utils/growthCalculatorCalculations.ts:273`)

- 모든 활성화된 캐릭터의 필요 재료를 합산
- 레벨업, 통찰, 공명에 필요한 **직접 재료**만 계산
- 조합 재료는 고려하지 않음

**예시: 키페리나 (3통찰, 15공명)**

```typescript
// 통찰 3단계
materials: {
  1002: 200000,  // 톱니 동전
  509: 16,       // 통찰 재료
  106: 6,        // 은빛 탄환 (5성)
  2: 3,          // 미스틸테인 (6성)
}

// 공명 15단계 (defense 타입)
materials: {
  605: 1,        // 공명 재료
  603: 8,        // 공명 재료
  5: 3,          // 쌍두사 지팡이 (6성)
  108: 4,        // 에메랄드 타블렛 (5성)
}

// 공명 2~14 단계 합산
// ... 많은 재료들 ...

// aggregated 결과 (예시):
{
  106: 6,    // 은빛 탄환
  108: 4,    // 에메랄드 타블렛
  2: 3,      // 미스틸테인
  5: 3,      // 쌍두사 지팡이
  201: 5,    // 쌍두골 (공명 7단계에서 직접 필요)
  208: 11,   // 붉은 점토판 (공명 12, 13단계)
  // ... 기타 재료들 ...
}
```

**1.2. calculateDeficit** (`lib/utils/growthCalculatorCalculations.ts:288`)

- 필요량과 보유량을 비교하여 부족분 계산

```typescript
// 입력:
owned = { 201: 20, 202: 20, 207: 20, 208: 20 };
required = { 106: 6, 108: 4, 201: 5, 208: 11 }[
  // 출력: materialRequirements
  ({
    materialId: 106,
    required: 6,
    owned: 0,
    deficit: 6,
    surplus: 0,
  },
  {
    materialId: 108,
    required: 4,
    owned: 0,
    deficit: 4,
    surplus: 0,
  },
  {
    materialId: 201, // 쌍두골
    required: 5,
    owned: 20,
    deficit: 0,
    surplus: 15,
  },
  {
    materialId: 208, // 붉은 점토판
    required: 11,
    owned: 20,
    deficit: 0,
    surplus: 9,
  })
];
```

**⚠️ 핵심 포인트**:

- `materialRequirements`는 **캐릭터가 직접 필요로 하는 재료**만 포함
- 조합 재료의 하위 재료는 아직 포함되지 않음
- 사용자가 입력한 하위 재료(202, 207 등)는 `required`가 0이거나 아예 포함되지 않을 수 있음

---

### 2단계: expandCraftingRequirements - 조합 재료 펼치기

**위치**: `lib/utils/farmingHelper.ts:40-144`

```typescript
export function expandCraftingRequirements(
  requirements: MaterialRequirement[],
  userMaterials: UserMaterials
): MaterialRequirement[];
```

#### 입력

```typescript
requirements = [
  { materialId: 106, required: 6, owned: 0, deficit: 6 },
  { materialId: 108, required: 4, owned: 0, deficit: 4 },
  { materialId: 201, required: 5, owned: 20, deficit: 0 },
  { materialId: 208, required: 11, owned: 20, deficit: 0 },
];

userMaterials = {
  201: 20, // 쌍두골
  202: 20, // 맨드레이크 절임
  207: 20, // 사금 딱정벌레
  208: 20, // 붉은 점토판
};
```

#### 처리 과정

**2.1. requiredMap 초기화** (47-49라인)

```typescript
requiredMap = {
  106: 6, // 은빛 탄환
  108: 4, // 에메랄드 타블렛
  201: 5, // 쌍두골
  208: 11, // 붉은 점토판
};
```

**2.2. 조합이 필요한 재료 찾기** (52-68라인)

```typescript
// 106 (은빛 탄환): 5성, owned: 0 < required: 6
// → 조합 가능 검사
materialsToExpand = [
  { id: 106, quantity: 6 },
  { id: 108, quantity: 4 },
];
```

**2.3. 조합 재료를 하위 재료로 펼치기** (71-145라인)

##### 🔍 106 (은빛 탄환) 처리

**조합법 확인**:

```typescript
// data/material_crafting.ts
{
  materialId: 106,  // 은빛 탄환
  materials: [206, 201, 1002],  // 신성한 은괴, 쌍두골, 톱니 동전
  quantities: [3, 2, 500]
}
```

**조합 가능량 계산** (85-96라인):

```typescript
actualDeficit = 6 - 0 = 6  // 6개 필요

// 하위 재료로 조합 가능한지 확인
subMaterials = [206, 201, 1002]

// 206 (신성한 은괴)
subOwned = userMaterials[206] || 0 = 0
craftableFromThis = Math.floor(0 / 3) = 0

// 201 (쌍두골)
subOwned = userMaterials[201] || 0 = 20
craftableFromThis = Math.floor(20 / 2) = 10

// 1002 (톱니 동전) - 제외

maxCraftable = Math.min(0, 10) = 0
```

**조합 불가능 → 하위 재료 추가** (134-142라인):

```typescript
// actualDeficit = 6 - 0 = 6

// 신성한 은괴(206): 3 * 6 = 18개 필요
requiredMap.set(206, (0 || 0) + 18) = 18;

// 쌍두골(201): 2 * 6 = 12개 필요
requiredMap.set(201, (5 || 0) + 12) = 17;

// 상위 재료 제거
requiredMap.set(106, 0);
```

**현재 requiredMap**:

```typescript
{
  106: 0,    // 은빛 탄환 (하위 재료로 대체됨)
  108: 4,    // 에메랄드 타블렛
  201: 17,   // 쌍두골 (5 + 12)
  206: 18,   // 신성한 은괴 (새로 추가)
  208: 11,   // 붉은 점토판
}
```

##### 🔍 108 (에메랄드 타블렛) 처리

**조합법 확인**:

```typescript
{
  materialId: 108,  // 에메랄드 타블렛
  materials: [208, 201, 1002],  // 붉은 점토판, 쌍두골, 톱니 동전
  quantities: [3, 2, 500]
}
```

**조합 가능량 계산**:

```typescript
actualDeficit = 4 - 0 = 4

// 208 (붉은 점토판)
subOwned = userMaterials[208] || 0 = 20
craftableFromThis = Math.floor(20 / 3) = 6

// 201 (쌍두골)
subOwned = userMaterials[201] || 0 = 20
craftableFromThis = Math.floor(20 / 2) = 10

maxCraftable = Math.min(6, 10) = 6
```

**❗ 조합 가능! (maxCraftable: 6 >= actualDeficit: 4)** (99-116라인):

```typescript
// 상위 재료 제거
requiredMap.set(108, 0)

// ✅ 수정된 로직: 조합에 사용되는 하위 재료 양 차감
recipe.materials.forEach((subMatId, index) => {
  // 208 (붉은 점토판)
  neededPerCraft = 3
  totalConsumed = 3 * 4 = 12
  currentRequired = requiredMap.get(208) || 0 = 11
  requiredMap.set(208, Math.max(0, 11 - 12)) = 0  ✅

  // 201 (쌍두골)
  neededPerCraft = 2
  totalConsumed = 2 * 4 = 8
  currentRequired = requiredMap.get(201) || 0 = 17
  requiredMap.set(201, Math.max(0, 17 - 8)) = 9  ✅
});
```

**최종 requiredMap**:

```typescript
{
  106: 0,    // 은빛 탄환
  108: 0,    // 에메랄드 타블렛 (조합 가능)
  201: 9,    // 쌍두골 (17 - 8 = 9)
  206: 18,   // 신성한 은괴
  208: 0,    // 붉은 점토판 (11 - 12 = 0, Math.max로 0)
}
```

**2.4. 결과 생성** (137-156라인)

```typescript
requiredMap.forEach((required, materialId) => {
  const owned = userMaterials[materialId] || 0;
  const deficit = Math.max(0, required - owned);

  if (required > 0 || owned > 0) {
    result.push({ materialId, required, owned, deficit, surplus });
  }
});
```

**최종 expandedRequirements**:

```typescript
[
  {
    materialId: 201, // 쌍두골
    required: 9,
    owned: 20,
    deficit: 0, // ✅ 보유량 충분!
    surplus: 11,
  },
  {
    materialId: 206, // 신성한 은괴
    required: 18,
    owned: 0,
    deficit: 18, // ❌ 부족!
    surplus: 0,
  },
];
```

**🎉 결과**:

- 붉은 점토판(208): required가 0이고 owned도 입력 안 했으면 결과에서 제외
- 쌍두골(201): deficit이 0이므로 파밍 불필요!
- 신성한 은괴(206): deficit이 18이므로 파밍 필요

---

### 3단계: groupDeficitsByStage - 파밍 스테이지 추천

**위치**: `lib/utils/farmingHelper.ts:206-308`

#### 입력

```typescript
expandedRequirements = [
  { materialId: 201, required: 9, owned: 20, deficit: 0 },
  { materialId: 206, required: 18, owned: 0, deficit: 18 },
];
```

#### 처리 과정

**3.1. 부족한 재료만 필터링** (210-221라인)

```typescript
const farmableMaterials = deficitMaterials.filter((req) => {
  if (req.deficit <= 0) return false; // ✅ 201은 여기서 제외됨!

  const material = materialList.find((m) => m.id === req.materialId);
  if (!material) return false;

  return (
    material.category === "growth_material" &&
    [2, 3, 4, 5].includes(material.rarity) &&
    material.id !== 301
  );
});

// 결과:
farmableMaterials = [{ materialId: 206, required: 18, owned: 0, deficit: 18 }];
```

**3.2. 파밍 스테이지 생성**

- 신성한 은괴(206) 18개를 파밍할 최적 스테이지 추천

#### 출력

```typescript
{
  highPriority: [
    {
      stageId: XXX,
      stageName: "스테이지명",
      materials: [
        {
          materialId: 206,
          materialName: "신성한 은괴",
          deficit: 18,
          rarity: 4
        }
      ]
    }
  ],
  lowPriority: []
}
```

---

## 🐛 문제 분석: 왜 여전히 하위 재료가 표시될까?

### 가능한 원인

#### 원인 1: 다른 캐릭터나 단계에서 하위 재료를 직접 필요로 함

**확인 방법**:

```typescript
// aggregated에 하위 재료가 포함되어 있는지 확인
console.log("aggregated:", aggregated);

// 예시:
aggregated = {
  106: 6, // 은빛 탄환
  108: 4, // 에메랄드 타블렛
  201: 20, // ❌ 쌍두골을 직접 20개 필요로 함!
  202: 5, // ❌ 맨드레이크 절임을 직접 5개 필요로 함!
  207: 10, // ❌ 사금 딱정벌레를 직접 10개 필요로 함!
  208: 11, // 붉은 점토판
};
```

만약 키페리나의 공명 단계에서 쌍두골, 맨드레이크 절임, 사금 딱정벌레를 **직접** 필요로 한다면:

```typescript
// requiredMap 초기 상태
{
  106: 6,
  108: 4,
  201: 20,   // 직접 필요!
  202: 5,    // 직접 필요!
  207: 10,   // 직접 필요!
  208: 11,
}

// 108 조합 시 쌍두골 8개 차감
requiredMap.set(201, Math.max(0, 20 - 8)) = 12

// 최종
{
  201: 12,   // 여전히 부족!
  deficit: 12 - 20 = 0  ❌ 아니지, owned가 20이므로 deficit은 0!
}
```

**하지만 이것도 문제 없음!** owned가 20이므로 deficit은 0이 나와야 함.

#### 원인 2: userMaterials가 제대로 전달되지 않음

**확인 방법**:

```typescript
// FarmingGuide_Growth.tsx:29
console.log("userMaterials:", userMaterials);
console.log("requirements:", requirements);
```

혹시 `userMaterials`에 하위 재료가 포함되지 않았을 가능성:

```typescript
// 기대:
userMaterials = {
  201: 20,
  202: 20,
  207: 20,
  208: 20,
};

// 실제:
userMaterials = {
  // 비어있거나 다른 재료만 있음
};
```

#### 원인 3: 조합 재료 확인 로직에 버그

**수정 전 코드의 문제**:

- 조합 가능 확인 시 하위 재료를 `requiredMap`에서 차감하지 않음
- 따라서 하위 재료의 `required`가 그대로 남아있음

**수정 후에도 문제가 있다면**:

- 수정이 제대로 반영되지 않았거나
- 다른 부분에 문제가 있을 가능성

---

## 🔧 디버깅 방법

### 1. 콘솔 로그 추가

**`lib/utils/farmingHelper.ts`에 로그 추가**:

```typescript
// 47라인 이후
requirements.forEach((req) => {
  requiredMap.set(req.materialId, (requiredMap.get(req.materialId) || 0) + req.required);
});

console.log(
  "🔍 [expandCraftingRequirements] Initial requiredMap:",
  Object.fromEntries(requiredMap)
);

// 68라인 이후
console.log("🔍 [expandCraftingRequirements] materialsToExpand:", materialsToExpand);

// 145라인 이후
console.log("🔍 [expandCraftingRequirements] Final requiredMap:", Object.fromEntries(requiredMap));

// 156라인 이후
console.log("🔍 [expandCraftingRequirements] Result:", result);
```

**`components/growth_calculator/FarmingGuide_Growth.tsx`에 로그 추가**:

```typescript
// 28-30라인
const expandedRequirements = useMemo(() => {
  console.log("🔍 [FarmingGuide] Input requirements:", requirements);
  console.log("🔍 [FarmingGuide] Input userMaterials:", userMaterials);
  const result = expandCraftingRequirements(requirements, userMaterials);
  console.log("🔍 [FarmingGuide] expandedRequirements:", result);
  return result;
}, [requirements, userMaterials]);
```

### 2. 브라우저에서 확인

1. `npm run dev` 실행
2. 육성 계산기 페이지 열기
3. 키페리나 계획 추가
4. 개발자 도구 콘솔 확인
5. 로그 순서대로 데이터 추적

### 3. 재료 ID 매핑 확인

```typescript
// 재료 이름 → ID 매핑
맨드레이크 절임: 202
사금 딱정벌레: 207
쌍두골: 201
붉은 점토판: 208
적금 나침반: 107
은빛 탄환: 106
에메랄드 타블렛: 108
```

---

## 📋 체크리스트

확인해야 할 사항들:

- [ ] `aggregated`에 하위 재료(201, 202, 207, 208)가 포함되는가?
- [ ] `requirements`에 하위 재료가 포함되는가?
- [ ] `userMaterials`에 입력한 재료가 제대로 들어있는가?
- [ ] `expandedRequirements`에서 하위 재료의 `deficit`이 0인가?
- [ ] `farmableMaterials`에 하위 재료가 포함되는가?
- [ ] 수정한 코드가 실제로 실행되고 있는가? (빌드 재실행 필요)

---

## 🎯 예상 결과

**정상 동작 시**:

```
키페리나 3통찰, 15공명 계획

보유 재료:
- 쌍두골(201): 20개
- 맨드레이크 절임(202): 20개
- 사금 딱정벌레(207): 20개
- 붉은 점토판(208): 20개

파밍 스테이지:
- 신성한 은괴(206): 18개 부족
- (기타 조합 불가능한 재료들)

파밍 스테이지에 표시되지 않음:
- 쌍두골(201): 조합으로 충분히 사용 가능
- 맨드레이크 절임(202): 직접 필요 없거나 조합으로 충분
- 사금 딱정벌레(207): 직접 필요 없거나 조합으로 충분
- 붉은 점토판(208): 조합으로 충분히 사용 가능
```

이 문서를 참고하여 디버깅을 진행해보시고, 콘솔 로그 결과를 공유해주시면 더 정확한 원인을 찾을 수 있습니다!

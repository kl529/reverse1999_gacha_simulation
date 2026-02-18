"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Package, UserPlus, AlertCircle } from "lucide-react";
import MaterialInputModal_Growth from "./MaterialInputModal_Growth";
import CharacterSelectionModal_Growth from "./CharacterSelectionModal_Growth";
import GrowthPlanModal_Growth from "./GrowthPlanModal_Growth";
import CharacterPlanCard_Growth from "./CharacterPlanCard_Growth";
import MaterialSummary_Growth from "./MaterialSummary_Growth";
import FarmingGuide_Growth from "./FarmingGuide_Growth";
import SingleMaterialEditModal_Growth from "./SingleMaterialEditModal_Growth";
import { UserMaterials, CharacterPlan } from "@/lib/types/growthCalculatorTypes";
import {
  saveUserMaterials,
  loadUserMaterials,
  saveCharacterPlans,
  loadCharacterPlans,
} from "@/lib/utils/growthCalculatorStorage";
import { aggregateMaterials, calculateDeficit } from "@/lib/utils/growthCalculatorCalculations";
import { charactersByRarity } from "@/data/characters";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";

export default function GrowthCalculatorPage() {
  const t = useTranslations("growthCalc");
  const [userMaterials, setUserMaterials] = useState<UserMaterials>({});
  const [characterPlans, setCharacterPlans] = useState<CharacterPlan[]>([]);
  const [materialModalOpen, setMaterialModalOpen] = useState(false);
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  const [growthModalOpen, setGrowthModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<CharacterPlan | undefined>(undefined);
  const [selectedCharacterIdForGrowth, setSelectedCharacterIdForGrowth] = useState<number>(0);
  const [pendingCharacterIds, setPendingCharacterIds] = useState<number[]>([]);
  const [tempPlans, setTempPlans] = useState<
    Map<number, Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">>
  >(new Map());
  const [singleMaterialModalOpen, setSingleMaterialModalOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);

  useEffect(() => {
    const materials = loadUserMaterials();
    const plans = loadCharacterPlans();
    setUserMaterials(materials);
    setCharacterPlans(plans);
  }, []);

  useEffect(() => {
    saveUserMaterials(userMaterials);
  }, [userMaterials]);

  useEffect(() => {
    saveCharacterPlans(characterPlans);
  }, [characterPlans]);

  const allCharacters = useMemo(() => {
    return Object.values(charactersByRarity).flat();
  }, []);

  const characterResonanceTypes = useMemo(() => {
    const types: Record<number, string> = {};
    allCharacters.forEach((char) => {
      types[char.id] = char.resonanceType;
    });
    return types;
  }, [allCharacters]);

  const sortedPlans = useMemo(() => {
    return [...characterPlans].sort((a, b) => a.createdAt - b.createdAt);
  }, [characterPlans]);

  const materialRequirements = useMemo(() => {
    const aggregated = aggregateMaterials(characterPlans, characterResonanceTypes);
    const result = calculateDeficit(userMaterials, aggregated);
    return result;
  }, [characterPlans, characterResonanceTypes, userMaterials]);

  const handleSaveMaterials = (materials: UserMaterials) => {
    setUserMaterials(materials);
  };

  const handleMaterialClick = (materialId: number) => {
    setSelectedMaterialId(materialId);
    setSingleMaterialModalOpen(true);
  };

  const handleSaveSingleMaterial = (materialId: number, newQuantity: number) => {
    setUserMaterials((prev) => ({
      ...prev,
      [materialId]: newQuantity,
    }));
  };

  const handleCharactersSelected = (characterIds: number[]) => {
    if (characterIds.length > 0) {
      setPendingCharacterIds(characterIds);
      setSelectedCharacterIdForGrowth(characterIds[0]);
      setEditingPlan(undefined);
      setGrowthModalOpen(true);
    }
  };

  const handleNavigate = (
    direction: "prev" | "next",
    currentPlanData?: Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">
  ) => {
    if (currentPlanData) {
      setTempPlans((prev) => new Map(prev).set(currentPlanData.characterId, currentPlanData));
    }

    const currentIndex = pendingCharacterIds.indexOf(selectedCharacterIdForGrowth);
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < pendingCharacterIds.length) {
      setSelectedCharacterIdForGrowth(pendingCharacterIds[newIndex]);
    }
  };

  const handleSaveGrowthPlan = (
    planData: Omit<CharacterPlan, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = Date.now();

    if (editingPlan) {
      setCharacterPlans((prev) =>
        prev.map((p) =>
          p.id === editingPlan.id
            ? { ...planData, id: p.id, createdAt: p.createdAt, updatedAt: now }
            : p
        )
      );
      setEditingPlan(undefined);
      setGrowthModalOpen(false);
    } else {
      const newTempPlans = new Map(tempPlans);
      newTempPlans.set(planData.characterId, planData);

      const newPlans: CharacterPlan[] = [];
      pendingCharacterIds.forEach((charId) => {
        const tempPlan = newTempPlans.get(charId);
        if (tempPlan) {
          newPlans.push({
            ...tempPlan,
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
          });
        }
      });

      setCharacterPlans((prev) => [...prev, ...newPlans]);
      setPendingCharacterIds([]);
      setTempPlans(new Map());
      setGrowthModalOpen(false);
    }
  };

  const handleEditPlan = (plan: CharacterPlan) => {
    setEditingPlan(plan);
    setSelectedCharacterIdForGrowth(plan.characterId);
    setGrowthModalOpen(true);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm(t("confirmDelete"))) {
      setCharacterPlans((prev) => prev.filter((p) => p.id !== planId));
    }
  };

  const handleToggleActive = (planId: string) => {
    setCharacterPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const excludedCharacterIds = useMemo(() => {
    return characterPlans.map((p) => p.characterId);
  }, [characterPlans]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 px-2 text-center sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{t("title")}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="mb-6 flex flex-col justify-center gap-2 px-2 sm:flex-row sm:gap-3">
        <Button onClick={() => setMaterialModalOpen(true)} className="w-full sm:w-auto">
          <Package className="mr-2 h-4 w-4" />
          {t("materialInput")}
        </Button>
        <Button
          onClick={() => setSelectionModalOpen(true)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t("addCharacter")}
        </Button>
      </div>

      {characterPlans.length === 0 && (
        <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <AlertCircle className="mx-auto mb-3 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold">{t("noPlan")}</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {t("noPlanDesc")}
          </p>
        </div>
      )}

      {characterPlans.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">
            {t("growthList", { count: characterPlans.length })}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {sortedPlans.map((plan) => {
              const character = allCharacters.find((c) => c.id === plan.characterId);
              if (!character) return null;

              return (
                <CharacterPlanCard_Growth
                  key={plan.id}
                  plan={plan}
                  character={character}
                  onEdit={() => handleEditPlan(plan)}
                  onDelete={() => handleDeletePlan(plan.id)}
                  onToggleActive={() => handleToggleActive(plan.id)}
                />
              );
            })}
          </div>
        </div>
      )}

      {characterPlans.length > 0 && (
        <div className="mb-8 px-2">
          <FarmingGuide_Growth
            requirements={materialRequirements}
            userMaterials={userMaterials}
            onMaterialClick={handleMaterialClick}
          />
        </div>
      )}

      <div className="mb-8 px-2">
        <h2 className="mb-4 text-center text-xl font-bold sm:text-2xl">{t("materialSummary")}</h2>
        <MaterialSummary_Growth
          requirements={materialRequirements}
          userMaterials={userMaterials}
          onMaterialClick={handleMaterialClick}
        />
      </div>

      <MaterialInputModal_Growth
        open={materialModalOpen}
        onOpenChange={setMaterialModalOpen}
        initialMaterials={userMaterials}
        onSave={handleSaveMaterials}
      />

      <CharacterSelectionModal_Growth
        open={selectionModalOpen}
        onOpenChange={setSelectionModalOpen}
        onConfirm={handleCharactersSelected}
        excludeCharacterIds={excludedCharacterIds}
      />

      {selectedCharacterIdForGrowth > 0 && (
        <GrowthPlanModal_Growth
          open={growthModalOpen}
          onOpenChange={setGrowthModalOpen}
          characterId={selectedCharacterIdForGrowth}
          existingPlan={editingPlan}
          onSave={handleSaveGrowthPlan}
          currentIndex={
            pendingCharacterIds.length > 0
              ? pendingCharacterIds.findIndex((id) => id === selectedCharacterIdForGrowth)
              : undefined
          }
          totalCount={pendingCharacterIds.length > 0 ? pendingCharacterIds.length : undefined}
          onNavigate={handleNavigate}
          tempPlan={tempPlans.get(selectedCharacterIdForGrowth)}
        />
      )}

      <SingleMaterialEditModal_Growth
        open={singleMaterialModalOpen}
        onOpenChange={setSingleMaterialModalOpen}
        materialId={selectedMaterialId}
        currentQuantity={selectedMaterialId ? userMaterials[selectedMaterialId] || 0 : 0}
        onSave={handleSaveSingleMaterial}
      />
    </div>
  );
}

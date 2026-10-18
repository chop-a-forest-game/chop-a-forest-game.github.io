"use client";
import { useEffect } from "react";
const isWhole = (value: string) => /^(0|[1-9]\d*)$/.test(value.trim()) && Number.isSafeInteger(Number(value.trim()));
export function LaunchToolsRuntime() {
  useEffect(() => {
    const off: Array<() => void> = [];
    const bind = (root: Element | null, event: string, update: () => void) => {
      if (!root) return;
      root.addEventListener(event, update);
      off.push(() => root.removeEventListener(event, update));
    };
    const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
    const classRoot = $("class-picker");
    if (classRoot) {
      const balance = $<HTMLInputElement>("class-balance");
      const goal = $<HTMLSelectElement>("class-goal");
      const affordable = $<HTMLInputElement>("class-affordable");
      const result = $("class-result");
      const rows = Array.from(classRoot.querySelectorAll<HTMLTableRowElement>("tr[data-class-cost]"));
      const update = () => {
        if (!balance || !goal || !affordable || !result) return;
        if (!isWhole(balance.value)) { result.textContent = "Enter a valid nonnegative whole-number Gem balance."; rows.forEach((r) => r.hidden = false); return; }
        const budget = Number(balance.value); let visible = 0;
        for (const row of rows) {
          const cost = Number(row.dataset.classCost); const fits = cost <= budget;
          const matches = goal.value === "all" || (row.dataset.classRoles || "").split(" ").includes(goal.value);
          row.hidden = !matches || (affordable.checked && !fits);
          const cell = row.querySelector<HTMLElement>("[data-status]");
          if (cell) cell.textContent = fits ? "Reference affordable" : `Short ${(cost - budget).toLocaleString()} Gems`;
          if (!row.hidden) visible++;
        }
        result.textContent = `${visible} matching class cards shown. Dates are historical; verify price, stock and currency in Roblox.`;
      };
      bind(classRoot, "input", update); bind(classRoot, "change", update); update();
    }
    const perkRoot = $("gem-budget-planner");
    if (perkRoot) {
      const balance = $<HTMLInputElement>("perk-balance");
      const result = $("perk-result");
      const update = () => {
        if (!balance || !result) return;
        if (!isWhole(balance.value)) {result.textContent = "Incomplete prices: enter a nonnegative whole-number Gem balance."; return;}
        let total = 0; let selected = 0; let invalid = false;
        const choices = Array.from(perkRoot.querySelectorAll<HTMLInputElement>("[data-perk-choice]"));
        for (const item of choices) {
          if (!item.checked) continue;
          selected++;
          const input = perkRoot.querySelector<HTMLInputElement>(`[data-perk-price="${item.dataset.perkChoice}"]`);
          if (!input || !isWhole(input.value)) {invalid = true; continue;}
          const amount = Number(input.value);
          if (!Number.isSafeInteger(total + amount)) invalid = true;
          else total += amount;
        }
        if (invalid) {result.textContent = "Incomplete prices: selected perk costs must be nonnegative whole Gems."; return;}
        const b = Number(balance.value);
        if (!selected) {result.textContent = `Balance: ${b.toLocaleString()} Gems. Select one or more perks.`;return;}
        result.textContent = `Selected: ${selected} · Total: ${total.toLocaleString()} Gems · Remaining: ${Math.max(b-total,0).toLocaleString()} · Shortfall: ${Math.max(total-b,0).toLocaleString()} Gems.`;
      };
      const reset = $<HTMLButtonElement>("perk-reset");
      const defaults: Record<string,string> = {sell:"25", mutation:"40",gem:"50",bundle:"30"};
      const onReset = () => {
        if (balance) balance.value="100";
        perkRoot.querySelectorAll<HTMLInputElement>("[data-perk-choice]").forEach(i=>i.checked=false);
        perkRoot.querySelectorAll<HTMLInputElement>("[data-perk-price]").forEach(i=>i.value=defaults[i.dataset.perkPrice || ""] ?? "");
        update();
      };
      bind(perkRoot, "input", update);bind(perkRoot, "change", update);
      bind(reset,"click",onReset);update();
    }
    const toolRoot = $("tool-budget-planner");
    if (toolRoot) {
      const balance = $<HTMLInputElement>("tool-balance");
      const cost = $<HTMLInputElement>("tool-cost");
      const target = $<HTMLSelectElement>("tool-target");
      const result = $("tool-result");
      const gate = $("tool-gate");
      const update = () => {
        if (!balance || !cost || !target || !result || !gate) return;
        const opt = target.selectedOptions[0];
        gate.textContent = opt?.dataset.gate || "Check live unlock conditions.";
        if (opt?.dataset.currency !== "Coins") {result.textContent = "Robux or trial offer: cannot compare with a Coins balance. Check price and duration in Roblox.";return;}
        if (!isWhole(balance.value) || !isWhole(cost.value)) {result.textContent = "Needs live price and valid Coins balance (nonnegative whole numbers).";return;}
        const b=Number(balance.value), c=Number(cost.value);
        result.textContent = `Target: ${opt.textContent} · Cost: ${c.toLocaleString()} Coins · Remaining: ${Math.max(b-c,0).toLocaleString()} · Shortfall: ${Math.max(c-b,0).toLocaleString()} Coins. Check unlock separately.`;
      };
      const onTarget = () => {if(target && cost)cost.value=target.selectedOptions[0]?.dataset.cost||"";update();};
      bind(toolRoot,"input",update);bind(toolRoot,"change",update);bind(target,"change",onTarget);update();
    }
    return () => off.forEach(fn=>fn());
  },[]);
  return null;
}

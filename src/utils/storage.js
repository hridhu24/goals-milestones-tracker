/**
 * @typedef {Object} Milestone
 * @property {string} id
 * @property {string} title
 * @property {string} dueDate
 * @property {boolean} completed
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Goal
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} color
 * @property {Milestone[]} milestones
 * @property {number} progress
 */

const STORAGE_KEY = "goals-data";

/* ===========================
      CORE FUNCTIONS
=========================== */

// Load all goals (real storage function)
export function loadAllGoals() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading goals:", error);
    return [];
  }
}

// Save all goals
export function saveAllGoals(goals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (error) {
    console.error("Error saving goals:", error);
  }
}

/* ===========================
     EXPORT/IMPORT HELPERS
=========================== */

export function exportJSON() {
  const data = loadAllGoals();
  return JSON.stringify(data, null, 2);
}

export function importJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      saveAllGoals(parsed);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Invalid JSON import:", error);
    return false;
  }
}

/* ===========================
   COMPATIBILITY EXPORTS
   (For GoalsContext)
=========================== */

// These ensure GoalsContext continues to work
export const loadGoals = loadAllGoals;
export const saveGoals = saveAllGoals;

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


const STORAGE_KEY = "goals_milestones_v1";

/**
 * Load goals from LocalStorage
 * @returns {Goal[]}
 */
export function loadGoals() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Error parsing stored goals:", err);
    return [];
  }
}

/**
 * Save goals in LocalStorage
 * @param {Goal[]} goals
 */
export function saveGoals(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

/**
 * Export all data as downloadable JSON
 */
export function exportJSON() {
  const data = loadGoals();
  return JSON.stringify(data, null, 2);
}

/**
 * Replace stored data with imported JSON
 * @param {string} json
 */
export function importJSON(json) {
  try {
    const parsed = JSON.parse(json);
    saveGoals(parsed);
    return true;
  } catch (err) {
    console.error("Invalid JSON:", err);
    return false;
  }
}



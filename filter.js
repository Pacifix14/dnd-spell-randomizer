import { spells } from './spells.js';

const levelMap = { 
  0: 'Cantrip', 1: '1st-level', 2: '2nd-level', 3: '3rd-level', 4: '4th-level', 
  5: '5th-level', 6: '6th-level', 7: '7th-level', 8: '8th-level', 9: '9th-level' 
};

// Get the school select element
const schoolSelect = document.getElementById('school');
const resultDiv = document.getElementById('result');

// Populate school options dynamically from the spells array
const schools = [...new Set(spells.map(spell => spell.school))]; // Get unique school names
schools.forEach(school => {
  const option = document.createElement('option');
  option.value = school;
  option.textContent = school;
  schoolSelect.appendChild(option);
});

// Pick spell function when button is clicked
window.pickSpell = function () {
  const selectedSchool = schoolSelect.value;
  const level = parseInt(document.getElementById('level').value);
  const pick = parseInt(document.getElementById('pick').value);

  // Map level number to string
  const levelStr = levelMap[level];

  // Filter spells based on school and level
  const filtered = spells.filter(s => s.school === selectedSchool && s.level === levelStr);

  if (filtered.length === 0) {
    resultDiv.textContent = 'No spells found.';
    return;
  }

  // Calculate spell index based on input
  const index = (pick - 1) % filtered.length;
  const spell = filtered[index];

  // Display the selected spell details
  resultDiv.innerHTML = `
    <h2>${spell.name}</h2>
    <p><strong>Range:</strong> ${spell.range}</p>
    <p><strong>Components:</strong> ${spell.components}</p>
    <p><strong>Concentration:</strong> ${spell.concentration}</p>
    <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
    <p>${spell.desc}</p>
  `;
};

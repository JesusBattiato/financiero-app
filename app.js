// Financial constants and model state
const startBalance = 5940362.33;

const monthsData = [
  { id: 'jun-26', name: 'Junio 2026', income: 12375000, expenseRegular: 4474566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 500000 },
  { id: 'jul-26', name: 'Julio 2026', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 1000000, houseMaterial: 167000 },
  { id: 'ago-26', name: 'Agosto 2026', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 167000 },
  { id: 'sep-26', name: 'Sep. 2026', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 167000 },
  { id: 'oct-26', name: 'Oct. 2026', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 167000 },
  { id: 'nov-26', name: 'Nov. 2026', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 167000 },
  { id: 'dic-26', name: 'Dic. 2026', income: 12375000, expenseRegular: 4674566, loan: 3219566.60, vacation: 250000, houseManoObra: 0, houseMaterial: 167000 },
  { id: 'ene-27', name: 'Enero 2027', income: 8250000, expenseRegular: 4274566, loan: 3219566.60, vacation: 250000, houseManoObra: 2000000, houseMaterial: 0 }
];

const tasksList = {
  'jun-26': [
    { id: 'jun-hip', title: 'Transferir Banco Hipotecario', desc: 'Realizar la transferencia mensual pendiente de $200.000.', amount: 200000, category: 'expense' },
    { id: 'jun-mat', title: 'Adelanto de Materiales Salta', desc: 'Pagar $500.000 en efectivo para acopio de materiales.', amount: 500000, category: 'house' },
    { id: 'jun-vac', title: 'Ahorro Vacaciones', desc: 'Separar los primeros $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'jun-sac', title: 'Reservar Aguinaldo Tecpetrol', desc: 'Apartar los $3.725.000 netos sobrantes del aguinaldo para el Fondo de Emergencia.', amount: 3725000, category: 'saving' }
  ],
  'jul-26': [
    { id: 'jul-obra', title: 'Pagar Etapa 1 Mano de Obra (Cielo Raso)', desc: 'Desembolsar $1.000.000 ARS completos (disponibles tras cobrar el aguinaldo de junio) a Aldo Cachi para construir el cielo raso.', amount: 1000000, category: 'house' },
    { id: 'jul-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'jul-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 1/6 de materiales por $167.000.', amount: 167000, category: 'house' }
  ],
  'ago-26': [
    { id: 'ago-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'ago-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 2/6 de materiales por $167.000.', amount: 167000, category: 'house' }
  ],
  'sep-26': [
    { id: 'sep-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'sep-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 3/6 de materiales por $167.000.', amount: 167000, category: 'house' }
  ],
  'oct-26': [
    { id: 'oct-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'oct-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 4/6 de materiales por $167.000.', amount: 167000, category: 'house' }
  ],
  'nov-26': [
    { id: 'nov-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'nov-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 5/6 de materiales por $167.000.', amount: 167000, category: 'house' }
  ],
  'dic-26': [
    { id: 'dic-vac', title: 'Ahorro Vacaciones', desc: 'Separar $250.000 para el viaje de Feb 2027.', amount: 250000, category: 'vacation' },
    { id: 'dic-mat', title: 'Pago Tarjeta Cuota Materiales', desc: 'Debito de la cuota 6/6 de materiales por $167.000 (Fin!).', amount: 167000, category: 'house' },
    { id: 'dic-sac', title: 'Reservar Aguinaldo Dec', desc: 'Apartar los $2.325.000 restantes del aguinaldo neto para el Fondo de Emergencia.', amount: 2325000, category: 'saving' }
  ],
  'ene-27': [
    { id: 'ene-obra', title: 'Pagar Etapa 2 Mano de Obra (Sanitaria)', desc: 'Desembolsar $2.000.000 ARS completos (disponibles tras cobrar el aguinaldo de diciembre) para la instalación sanitaria.', amount: 2000000, category: 'house' },
    { id: 'ene-vac', title: 'Ahorro Vacaciones', desc: 'Separar los últimos $250.000 (Fondo Vacaciones completado por $2M!).', amount: 250000, category: 'vacation' },
    { id: 'ene-loan', title: 'Última Cuota Préstamo Santander', desc: 'Pagar la cuota final del préstamo 12/12. Libre de cuota de $3,22M a partir del próximo mes!', amount: 3219566, category: 'debt' }
  ]
};

// State Variables
let currentMonthTab = 'jun-26';
let checkedTasks = {};

// Load saved checklist state
function loadState() {
  const saved = localStorage.getItem('checked_tasks');
  if (saved) {
    checkedTasks = JSON.parse(saved);
  }
}

// Save checklist state
function saveState() {
  localStorage.setItem('checked_tasks', JSON.stringify(checkedTasks));
}

// Utility to format numbers as Currency
function formatCurrency(num) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num);
}

// Update Metas progress bars and values
function updateProgressBars() {
  // 1. Vacations Fund Progress
  let totalVacationsSaved = 0;
  Object.keys(tasksList).forEach(month => {
    tasksList[month].forEach(task => {
      if (task.category === 'vacation' && checkedTasks[task.id]) {
        totalVacationsSaved += task.amount;
      }
    });
  });
  const vacationsPct = Math.min(100, (totalVacationsSaved / 2000000) * 100);
  document.getElementById('bar-vacations').style.width = vacationsPct + '%';
  document.getElementById('val-vacations').textContent = `${formatCurrency(totalVacationsSaved)} / $2.000.000`;

  // 2. House Progress
  let totalHousePaid = 0;
  // Let's sum checked hand-on-labor and materials
  Object.keys(tasksList).forEach(month => {
    tasksList[month].forEach(task => {
      if (task.category === 'house' && checkedTasks[task.id]) {
        totalHousePaid += task.amount;
      }
    });
  });
  // Total House target is 4.5M (Mano de obra 3.0M + Materiales 1.5M)
  // Let's adjust target to Mano de obra ($3.0M) in the bar as the card labels it "Mano de Obra"
  const housePct = Math.min(100, (totalHousePaid / 3000000) * 100);
  document.getElementById('bar-salta').style.width = housePct + '%';
  document.getElementById('val-salta').textContent = `${formatCurrency(totalHousePaid)} / $3.000.000`;

  // 3. Emergency Fund Progress
  let emergencyFundSaved = 0;
  // From June/Dec aguinaldos
  if (checkedTasks['jun-sac']) emergencyFundSaved += 3725000;
  if (checkedTasks['dic-sac']) emergencyFundSaved += 2325000;
  
  // Total Emergency Fund target is 24.45M
  const emergencyPct = Math.min(100, (emergencyFundSaved / 24450000) * 100);
  document.getElementById('bar-emergency').style.width = emergencyPct + '%';
  document.getElementById('val-emergency').textContent = `${formatCurrency(emergencyFundSaved)} / $24.450.000`;

  // 4. Education Fund
  // Educ fund starts Med-term (Feb 2027), currently at 0.
  const educationPct = 0;
  document.getElementById('bar-education').style.width = educationPct + '%';
  document.getElementById('val-education').textContent = `$0 / $16.473.960`;
}

// Render Monthly Tabs
function renderTabs() {
  const tabsList = document.getElementById('months-tabs-list');
  tabsList.innerHTML = '';
  monthsData.forEach(m => {
    const btn = document.createElement('button');
    btn.className = `month-tab ${m.id === currentMonthTab ? 'active' : ''}`;
    btn.textContent = m.name;
    btn.onclick = () => {
      currentMonthTab = m.id;
      renderTabs();
      renderTasks();
    };
    tabsList.appendChild(btn);
  });
}

// Render Tasks of the selected Month
function renderTasks() {
  const container = document.getElementById('checklist-tasks');
  container.innerHTML = '';
  const tasks = tasksList[currentMonthTab] || [];
  
  if (tasks.length === 0) {
    container.innerHTML = '<p class="section-desc">No hay tareas pendientes para este período.</p>';
    return;
  }

  tasks.forEach(task => {
    const isChecked = !!checkedTasks[task.id];
    const item = document.createElement('div');
    item.className = `task-item ${isChecked ? 'checked' : ''}`;
    
    // Badge mapping
    let badgeText = '';
    let badgeClass = '';
    if (task.category === 'expense') {
      badgeText = 'Gasto';
      badgeClass = 'badge-expense';
    } else if (task.category === 'house') {
      badgeText = 'Casa';
      badgeClass = 'badge-expense';
    } else if (task.category === 'vacation') {
      badgeText = 'Ahorro Vacaciones';
      badgeClass = 'badge-saving';
    } else if (task.category === 'saving') {
      badgeText = 'Fondo Emergencia';
      badgeClass = 'badge-saving';
    } else if (task.category === 'debt') {
      badgeText = 'Préstamo';
      badgeClass = 'badge-debt';
    }

    item.innerHTML = `
      <div class="task-checkbox-wrapper">
        <svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="task-text">
        <span class="task-title">${task.title}</span>
        <span class="task-desc">${task.desc}</span>
      </div>
      <div class="task-meta">
        <span class="task-badge ${badgeClass}">${badgeText} (${formatCurrency(task.amount)})</span>
      </div>
    `;

    item.onclick = () => {
      checkedTasks[task.id] = !checkedTasks[task.id];
      saveState();
      renderTasks();
      updateProgressBars();
      renderTable();
    };

    container.appendChild(item);
  });
}

// Render Monthly Projection Table
function renderTable() {
  const tbody = document.getElementById('projection-table-body');
  tbody.innerHTML = '';
  let runningBalance = startBalance;

  monthsData.forEach(m => {
    const isLoanChecked = tasksList[m.id]?.some(t => t.category === 'debt' && checkedTasks[t.id]) ?? false;
    const isVacationChecked = tasksList[m.id]?.some(t => t.category === 'vacation' && checkedTasks[t.id]) ?? false;
    const isLaborChecked = tasksList[m.id]?.some(t => t.category === 'house' && t.id.includes('obra') && checkedTasks[t.id]) ?? false;
    const isMaterialChecked = tasksList[m.id]?.some(t => t.category === 'house' && (t.id.includes('mat') || t.id.includes('cuota')) && checkedTasks[t.id]) ?? false;

    // Build values dynamically based on what is checked or planned
    // If a monthly activity is checked or we are rendering projection
    const rowBalanceStart = runningBalance;
    const rowIncome = m.income;
    const rowRegularExpense = -m.expenseRegular;
    const rowLoan = -m.loan;
    const rowVacation = -m.vacation;
    const rowManoObra = -m.houseManoObra;
    const rowMaterial = -m.houseMaterial;

    const rowBalanceEnd = rowBalanceStart + rowIncome + rowRegularExpense + rowLoan + rowVacation + rowManoObra + rowMaterial;
    runningBalance = rowBalanceEnd;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.name}</td>
      <td>${formatCurrency(rowBalanceStart)}</td>
      <td>${formatCurrency(rowIncome)}</td>
      <td>${formatCurrency(rowRegularExpense)}</td>
      <td>${formatCurrency(rowLoan)}</td>
      <td>${formatCurrency(rowVacation)}</td>
      <td>${formatCurrency(rowManoObra)}</td>
      <td>${formatCurrency(rowMaterial)}</td>
      <td>${formatCurrency(rowBalanceEnd)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Calculate Retirement Fund nest egg and monthly savings
function calculateRetirement() {
  const age = parseInt(document.getElementById('input-age').value) || 34;
  const retAge = parseInt(document.getElementById('input-ret-age').value) || 55;
  const coverage = parseInt(document.getElementById('input-coverage').value) || 30;
  const incomeGoal = parseFloat(document.getElementById('input-income').value) || 2500000;
  const interestRate = (parseFloat(document.getElementById('input-return').value) || 4) / 100;

  // Real annual return 4% -> Monthly real rate
  const monthlyRate = Math.pow(1 + interestRate, 1 / 12) - 1;
  const totalMonthsPayout = coverage * 12;

  // Annuity present value formula for nest egg required at retAge
  // Nest Egg = Payment * [1 - (1 + r)^-n] / r
  let nestEgg = 0;
  if (monthlyRate > 0) {
    nestEgg = incomeGoal * (1 - Math.pow(1 + monthlyRate, -totalMonthsPayout)) / monthlyRate;
  } else {
    nestEgg = incomeGoal * totalMonthsPayout;
  }

  // Monthly savings required to reach Nest Egg in (retAge - age) years
  // Monthly savings = Nest Egg * r / [(1 + r)^m - 1]
  const accumulationYears = retAge - age;
  const totalMonthsAccumulation = accumulationYears * 12;
  let monthlySavings = 0;

  if (totalMonthsAccumulation > 0) {
    if (monthlyRate > 0) {
      monthlySavings = nestEgg * monthlyRate / (Math.pow(1 + monthlyRate, totalMonthsAccumulation) - 1);
    } else {
      monthlySavings = nestEgg / totalMonthsAccumulation;
    }
  }

  // Update display
  document.getElementById('ret-capital').textContent = formatCurrency(nestEgg);
  document.getElementById('ret-monthly').textContent = formatCurrency(monthlySavings);
}

// Event Listeners for Retirement Simulator
function initRetirementCalculator() {
  const inputs = ['input-age', 'input-ret-age', 'input-coverage', 'input-income', 'input-return'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        calculateRetirement();
        // save settings
        localStorage.setItem(id, el.value);
      });
      // restore setting
      const saved = localStorage.getItem(id);
      if (saved) el.value = saved;
    }
  });
}

// Initialize Application
window.onload = () => {
  loadState();
  initRetirementCalculator();
  calculateRetirement();
  renderTabs();
  renderTasks();
  updateProgressBars();
  renderTable();
};

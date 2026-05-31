// Financial constants and model state
const startBalance = 0; // Starts at 0, May salary is the Income of June!

const monthsData = [
  { id: 'jun-26', name: 'Junio 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 0, houseManoObra: 0, creditCard: 660000 }, 
  { id: 'jul-26', name: 'Julio 2026', income: 12375000, expenseRegular: 3974566, loan: 3219566.60, vacation: 285000, houseManoObra: 1500000, creditCard: 475020 }, 
  { id: 'ago-26', name: 'Agosto 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 285000, houseManoObra: 0, creditCard: 612054 },
  { id: 'sep-26', name: 'Sep. 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 285000, houseManoObra: 0, creditCard: 492767 },
  { id: 'oct-26', name: 'Oct. 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 285000, houseManoObra: 0, creditCard: 492767 },
  { id: 'nov-26', name: 'Nov. 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 285000, houseManoObra: 0, creditCard: 492767 },
  { id: 'dic-26', name: 'Dic. 2026', income: 8250000, expenseRegular: 3574566, loan: 3219566.60, vacation: 285000, houseManoObra: 0, creditCard: 461117 },
  { id: 'ene-27', name: 'Enero 2027', income: 12375000, expenseRegular: 3974566, loan: 3219566.60, vacation: 285000, houseManoObra: 2000000, creditCard: 461117 },
  { id: 'feb-27', name: 'Febrero 2027', income: 8250000, expenseRegular: 3574566, loan: 0, vacation: 2000000, houseManoObra: 0, creditCard: 196562 }
];

const tasksList = {
  'jun-26': [
    { id: 'jun-hip', title: 'Transferir Banco Hipotecario', desc: 'Realizar la transferencia mensual de $200.000 para el mes de junio.', amount: 200000, category: 'expense' },
    { id: 'jun-yair-extra', title: 'Transferencia Extra a Yair', desc: 'Transferencia familiar adicional de $700.000 programada.', amount: 700000, category: 'expense' },
    { id: 'jun-visa', title: 'Pago Tarjeta Visa (Junio)', desc: 'Pago del cierre de tarjeta de mayo de $660.000.', amount: 660000, category: 'expense' },
    { id: 'jun-loan', title: 'Cuota Préstamo Santander 5/12', desc: 'Pago automático de la cuota del préstamo.', amount: 3219566, category: 'debt' }
  ],
  'jul-26': [
    { id: 'jul-obra', title: 'Pagar Etapa 1 Mano de Obra (Cielo Raso)', desc: 'Abonar $1.000.000 ARS en efectivo para construir el cielo raso.', amount: 1000000, category: 'house' },
    { id: 'jul-mat-ade', title: 'Adelanto de Materiales Salta', desc: 'Pagar $500.000 en efectivo para acopio de materiales de la casa.', amount: 500000, category: 'house' },
    { id: 'jul-visa', title: 'Pago Tarjeta Visa (Julio)', desc: 'Pago del cierre de tarjeta de $475.020 (incluye $130k de suscripciones/consumos corrientes).', amount: 475020, category: 'expense' },
    { id: 'jul-vac', title: 'Ahorro Vacaciones (Cuota 1)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' },
    { id: 'jun-sac', title: 'Reservar Aguinaldo Jun (Fondo Emergencia)', desc: 'Apartar los $3.725.000 netos sobrantes del aguinaldo de junio.', amount: 3725000, category: 'saving' }
  ],
  'ago-26': [
    { id: 'ago-visa', title: 'Pago Tarjeta Visa (Agosto)', desc: 'Pago del cierre de tarjeta de $612.054 (incluye $315.054 cuotas, $130k de suscripciones y cuota 1 de materiales).', amount: 612054, category: 'expense' },
    { id: 'ago-mat', title: 'Registrar Cuota Materiales Casa 1/6', desc: 'Cuota 1/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'ago-vac', title: 'Ahorro Vacaciones (Cuota 2)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' }
  ],
  'sep-26': [
    { id: 'sep-visa', title: 'Pago Tarjeta Visa (Septiembre)', desc: 'Pago del cierre de tarjeta de $492.767 (incluye $195.767 cuotas, $130k de suscripciones y cuota 2 de materiales).', amount: 492767, category: 'expense' },
    { id: 'sep-mat', title: 'Registrar Cuota Materiales Casa 2/6', desc: 'Cuota 2/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'sep-vac', title: 'Ahorro Vacaciones (Cuota 3)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' }
  ],
  'oct-26': [
    { id: 'oct-visa', title: 'Pago Tarjeta Visa (Octubre)', desc: 'Pago del cierre de tarjeta de $492.767 (incluye $195.767 cuotas, $130k de suscripciones y cuota 3 de materiales).', amount: 492767, category: 'expense' },
    { id: 'oct-mat', title: 'Registrar Cuota Materiales Casa 3/6', desc: 'Cuota 3/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'oct-vac', title: 'Ahorro Vacaciones (Cuota 4)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' }
  ],
  'nov-26': [
    { id: 'nov-visa', title: 'Pago Tarjeta Visa (Noviembre)', desc: 'Pago del cierre de tarjeta de $492.767 (incluye $195.767 cuotas, $130k de suscripciones y cuota 4 de materiales).', amount: 492767, category: 'expense' },
    { id: 'nov-mat', title: 'Registrar Cuota Materiales Casa 4/6', desc: 'Cuota 4/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'nov-vac', title: 'Ahorro Vacaciones (Cuota 5)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' }
  ],
  'dic-26': [
    { id: 'dic-visa', title: 'Pago Tarjeta Visa (Diciembre)', desc: 'Pago del cierre de tarjeta de $461.117 (incluye $164.117 cuotas, $130k de suscripciones y cuota 5 de materiales).', amount: 461117, category: 'expense' },
    { id: 'dic-mat', title: 'Registrar Cuota Materiales Casa 5/6', desc: 'Cuota 5/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'dic-vac', title: 'Ahorro Vacaciones (Cuota 6)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' }
  ],
  'ene-27': [
    { id: 'ene-visa', title: 'Pago Tarjeta Visa (Enero)', desc: 'Pago del cierre de tarjeta de $461.117 (incluye $164.117 cuotas, $130k de suscripciones y cuota 6 de materiales).', amount: 461117, category: 'expense' },
    { id: 'ene-mat', title: 'Registrar Cuota Materiales Casa 6/6', desc: 'Cuota 6/6 de materiales por $167.000. (Ya incluida en el pago total de la tarjeta Visa de este mes).', amount: 167000, category: 'house' },
    { id: 'ene-obra', title: 'Pagar Etapa 2 Mano de Obra (Sanitaria)', desc: 'Abonar $2.000.000 ARS en efectivo para la instalación sanitaria.', amount: 2000000, category: 'house' },
    { id: 'ene-vac', title: 'Ahorro Vacaciones (Cuota 7)', desc: 'Separar los últimos $285.000 (Fondo Vacaciones completado!).', amount: 285000, category: 'vacation' },
    { id: 'ene-loan', title: 'Última Cuota Préstamo Santander 12/12', desc: 'Pago final del préstamo.', amount: 3219566, category: 'debt' },
    { id: 'dic-sac', title: 'Reservar Aguinaldo Dec (Fondo Emergencia)', desc: 'Apartar los $2.325.000 restantes del aguinaldo neto para el Fondo de Emergencia.', amount: 2325000, category: 'saving' }
  ],
  'feb-27': [
    { id: 'feb-visa', title: 'Pago Tarjeta Visa (Febrero)', desc: 'Pago del cierre de tarjeta de $196.562 (incluye $66.562 cuota Mueblería Güemes y $130.000 de suscripciones).', amount: 196562, category: 'expense' },
    { id: 'feb-viaje', title: 'Realizar Viaje de Vacaciones', desc: 'Retirar y gastar los $2.000.000 ARS acumulados para las vacaciones familiares de febrero.', amount: 2000000, category: 'expense' }
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

  // 2. House Progress (Etapa 1 Cielo Raso + Materiales)
  let totalHousePaid = 0;
  // Let's sum checked hand-on-labor and materials
  Object.keys(tasksList).forEach(month => {
    tasksList[month].forEach(task => {
      if (task.category === 'house' && checkedTasks[task.id]) {
        totalHousePaid += task.amount;
      }
    });
  });
  const housePct = Math.min(100, (totalHousePaid / 4500000) * 100);
  document.getElementById('bar-salta').style.width = housePct + '%';
  document.getElementById('val-salta').textContent = `${formatCurrency(totalHousePaid)} / $4.500.000`;

  // 3. Emergency Fund Progress
  let emergencyFundSaved = 0;
  if (checkedTasks['jun-sac']) emergencyFundSaved += 3725000;
  if (checkedTasks['dic-sac']) emergencyFundSaved += 2325000;
  if (checkedTasks['feb-viaje']) {
    emergencyFundSaved += 10000000; // Colchón base asignado en marzo 2027
  }
  const emergencyPct = Math.min(100, (emergencyFundSaved / 23250000) * 100);
  document.getElementById('bar-emergency').style.width = emergencyPct + '%';
  document.getElementById('val-emergency').textContent = `${formatCurrency(emergencyFundSaved)} / $23.250.000`;

  // 4. Education Fund
  const educationPct = 0;
  document.getElementById('bar-education').style.width = educationPct + '%';
  document.getElementById('val-education').textContent = `$0 / $16.473.960`;

  // 5. Casa Salta - Construcción Fase 2 Progress
  let constructionF2Saved = 0;
  if (checkedTasks['feb-viaje']) {
    constructionF2Saved += 1933203; // Semilla inicial asignada en marzo 2027
  }
  const constF2Pct = Math.min(100, (constructionF2Saved / 150000000) * 100);
  document.getElementById('bar-const-f2').style.width = constF2Pct + '%';
  document.getElementById('val-const-f2').textContent = `${formatCurrency(constructionF2Saved)} / $150.000.000`;

  // 6. Celebraciones & Mendoza Progress
  let celebsSaved = 0;
  const celebsPct = 0;
  document.getElementById('bar-celebs').style.width = celebsPct + '%';
  document.getElementById('val-celebs').textContent = `${formatCurrency(celebsSaved)} / $1.440.000`;
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
    // Build values dynamically based on what is checked or planned
    const rowBalanceStart = runningBalance;
    const rowIncome = m.income;
    const rowRegularExpense = -m.expenseRegular;
    const rowLoan = -m.loan;
    const rowVacation = -m.vacation;
    const rowManoObra = -m.houseManoObra;
    const rowCard = -m.creditCard;

    const rowBalanceEnd = rowBalanceStart + rowIncome + rowRegularExpense + rowLoan + rowVacation + rowManoObra + rowCard;
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
      <td>${formatCurrency(rowCard)}</td>
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
  let nestEgg = 0;
  if (monthlyRate > 0) {
    nestEgg = incomeGoal * (1 - Math.pow(1 + monthlyRate, -totalMonthsPayout)) / monthlyRate;
  } else {
    nestEgg = incomeGoal * totalMonthsPayout;
  }

  // Monthly savings required to reach Nest Egg in (retAge - age) years
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

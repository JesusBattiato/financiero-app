// Helpers for Month Handling
function parseMonthId(monthId) {
  const parts = monthId.split('-');
  const monthsShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const monthIndex = monthsShort.indexOf(parts[0]);
  const year = 2000 + parseInt(parts[1]);
  return { month: monthIndex, year: year };
}

function getMonthIdFromDate(m, y) {
  const monthsShort = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${monthsShort[m]}-${String(y).slice(-2)}`;
}

function getMonthNameLong(month, year) {
  const monthsLong = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${monthsLong[month]} ${year}`;
}

// Generate the operational 12-month rolling window starting from the current month
function getRolling12Months() {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 0-11
  
  // Start from the current month
  let startMonth = month;
  let startYear = year;

  // Clamp starting month to June 2026 (the start of the financial plan) if calendar is earlier
  if (startYear < 2026 || (startYear === 2026 && startMonth < 5)) {
    startMonth = 5; // June
    startYear = 2026;
  }

  const list = [];
  let currentM = startMonth;
  let currentY = startYear;
  
  for (let i = 0; i < 12; i++) {
    const id = getMonthIdFromDate(currentM, currentY);
    list.push(id);
    currentM++;
    if (currentM === 12) {
      currentM = 0;
      currentY++;
    }
  }
  return list;
}

// Retrieve default month data (mathematical model) before user customizations
function getDefaultMonthData(monthId) {
  const { month, year } = parseMonthId(monthId);
  
  // 1. Income (Sueldo + SAC)
  let income = 8250000;
  if (month === 0 || month === 6) { // January or July (SAC)
    income += 4125000;
  }

  // 2. Desglose Gastos Fijos (Operating expenses)
  const nanny = 800000;
  const home = 2000000;
  const kennedy = 274566;
  const mortgage = 2000000; // wait, mortgage was 200k in Hipotecario, let's keep it 200k!
  // Ah, Hipotecario is 200,000. Let's fix that!
  const mortgageFixed = 200000;
  const life = 300000;
  const nannySAC = (month === 0 || month === 6) ? 400000 : 0;
  const subsRegular = 130000; // credit card subscriptions (Personal, Starlink, MELI, etc.)
  
  let expenseRegular = nanny + home + kennedy + mortgageFixed + life + nannySAC;

  // 3. Loan (Santander) - Ends in Jan 2027
  let loan = 0;
  if (year < 2027 || (year === 2027 && month === 0)) {
    loan = 3219566.60;
  }

  // 4. Credit Card (consolidation)
  let creditCard = subsRegular; // base subscription of 130k
  if (year === 2026) {
    if (month === 5) creditCard = 660000; // June (already closed)
    else if (month === 6) creditCard = 475020; // July (installments + subscriptions)
    else if (month === 7) creditCard = 612054; // August (installments + materials + subscriptions)
    else if (month >= 8 && month <= 10) creditCard = 492767; // Sep-Nov
    else if (month === 11) creditCard = 461117; // Dec
  } else if (year === 2027) {
    if (month === 0) creditCard = 461117; // Jan
    else if (month === 1 || month === 2) creditCard = 196562; // Feb-Mar (Mueblería Güemes + subscriptions)
  }

  // 5. Vacation saving/expense
  let vacation = 0;
  if (year === 2026 && month >= 6) {
    vacation = 285000; // july to dec savings
  } else if (year === 2027 && month === 0) {
    vacation = 285000; // jan saving
  } else if (year === 2027 && month === 1) {
    vacation = 2000000; // travel outflow in February
  } else if (year > 2027 || (year === 2027 && month >= 2)) {
    // Annualized long-term vacation savings
    if (month === 1) vacation = 2000000;
    else vacation = 167000;
  }

  // 6. House Efectivo (Mano de obra y materiales en efectivo)
  let houseManoObra = 0;
  if (year === 2026 && month === 6) {
    houseManoObra = 1500000; // July Cielo Raso + Materials Cash
  } else if (year === 2027 && month === 0) {
    houseManoObra = 2000000; // January Sanitaria
  } else if (year > 2027 || (year === 2027 && month >= 2)) {
    // Long term construction fund
    houseManoObra = 1500000;
  }

  return {
    id: monthId,
    name: getMonthNameLong(month, year),
    income,
    expenseRegular,
    loan,
    creditCard,
    vacation,
    houseManoObra,
    // Breakdown fields for reloading the parameter editor
    nanny: nanny + nannySAC,
    home,
    kennedy,
    mortgage: mortgageFixed,
    life
  };
}

// Retrieve month data incorporating user overrides saved in LocalStorage
function getMonthData(monthId) {
  const defaultData = getDefaultMonthData(monthId);
  const overrides = localStorage.getItem(`override_${monthId}`);
  if (overrides) {
    return { ...defaultData, ...JSON.parse(overrides) };
  }
  return defaultData;
}

// Generate the interactive tasks list for any given month
function getTasksForMonth(monthId) {
  // Check if customized checklist is in LocalStorage
  const saved = localStorage.getItem(`tasks_${monthId}`);
  if (saved) return JSON.parse(saved);

  const { month, year } = parseMonthId(monthId);
  const data = getMonthData(monthId);
  const list = [];

  if (monthId === 'jun-26') {
    list.push({ id: 'jun-hip', title: 'Transferir Banco Hipotecario', desc: 'Realizar la transferencia mensual de $200.000.', amount: 200000, category: 'expense' });
    list.push({ id: 'jun-yair-extra', title: 'Transferencia Extra a Yair', desc: 'Transferencia familiar adicional de $700.000.', amount: 700000, category: 'expense' });
    list.push({ id: 'jun-visa', title: 'Pago Tarjeta Visa (Junio)', desc: 'Pago del cierre de tarjeta de mayo de $660.000.', amount: 660000, category: 'expense' });
    list.push({ id: 'jun-loan', title: 'Cuota Préstamo Santander 5/12', desc: 'Pago automático del préstamo.', amount: 3219566, category: 'debt' });
  } else if (monthId === 'jul-26') {
    list.push({ id: 'jul-obra', title: 'Pagar Etapa 1 Mano de Obra (Cielo Raso)', desc: 'Abonar $1.000.000 en efectivo para el cielo raso.', amount: 1000000, category: 'house' });
    list.push({ id: 'jul-mat-ade', title: 'Adelanto de Materiales Salta', desc: 'Pagar $500.000 en efectivo para acopio de materiales.', amount: 500000, category: 'house' });
    list.push({ id: 'jul-visa', title: 'Pago Tarjeta Visa (Julio)', desc: 'Pago de tarjeta de $475.020 (incluye $130k de suscripciones/corrientes).', amount: 475020, category: 'expense' });
    list.push({ id: 'jul-vac', title: 'Ahorro Vacaciones (Cuota 1)', desc: 'Separar $285.000 para el viaje de Feb 2027.', amount: 285000, category: 'vacation' });
    list.push({ id: 'jun-sac', title: 'Reservar Aguinaldo Jun (Fondo Emergencia)', desc: 'Apartar los $3.725.000 netos del aguinaldo.', amount: 3725000, category: 'saving' });
  } else if (monthId === 'ago-26') {
    list.push({ id: 'ago-visa', title: 'Pago Tarjeta Visa (Agosto)', desc: 'Pago de tarjeta de $612.054 (incluye cuotas, $130k de suscripciones y cuota 1 de materiales).', amount: 612054, category: 'expense' });
    list.push({ id: 'ago-mat', title: 'Registrar Cuota Materiales Casa 1/6', desc: 'Cuota 1/6 de materiales por $167.000. (Ya incluida en el total de la tarjeta).', amount: 167000, category: 'house' });
    list.push({ id: 'ago-vac', title: 'Ahorro Vacaciones (Cuota 2)', desc: 'Separar $285.000.', amount: 285000, category: 'vacation' });
  } else if (monthId === 'sep-26' || monthId === 'oct-26' || monthId === 'nov-26') {
    const cuotaN = monthId === 'sep-26' ? '2/6' : monthId === 'oct-26' ? '3/6' : '4/6';
    const cardVal = data.creditCard;
    list.push({ id: `${monthId}-visa`, title: 'Pago Tarjeta Visa', desc: `Pagar cierre mensual de tarjeta de ${formatCurrency(cardVal)}.`, amount: cardVal, category: 'expense' });
    list.push({ id: `${monthId}-mat`, title: `Registrar Cuota Materiales Casa ${cuotaN}`, desc: `Cuota ${cuotaN} de materiales por $167.000. (Ya incluida en el total de la tarjeta).`, amount: 167000, category: 'house' });
    list.push({ id: `${monthId}-vac`, title: 'Ahorro Vacaciones', desc: 'Separar $285.000.', amount: 285000, category: 'vacation' });
  } else if (monthId === 'dic-26') {
    list.push({ id: 'dic-visa', title: 'Pago Tarjeta Visa (Diciembre)', desc: 'Pago de tarjeta de $461.117.', amount: 461117, category: 'expense' });
    list.push({ id: 'dic-mat', title: 'Registrar Cuota Materiales Casa 5/6', desc: 'Cuota 5/6 de materiales por $167.000. (Ya incluida en el total de la tarjeta).', amount: 167000, category: 'house' });
    list.push({ id: 'dic-vac', title: 'Ahorro Vacaciones (Cuota 6)', desc: 'Separar $285.000.', amount: 285000, category: 'vacation' });
  } else if (monthId === 'ene-27') {
    list.push({ id: 'ene-visa', title: 'Pago Tarjeta Visa (Enero)', desc: 'Pago de tarjeta de $461.117.', amount: 461117, category: 'expense' });
    list.push({ id: 'ene-mat', title: 'Registrar Cuota Materiales Casa 6/6', desc: 'Cuota 6/6 de materiales por $167.000. (Ya incluida en el total de la tarjeta).', amount: 167000, category: 'house' });
    list.push({ id: 'ene-obra', title: 'Pagar Etapa 2 Mano de Obra (Sanitaria)', desc: 'Abonar $2.000.000 en efectivo para la instalación sanitaria.', amount: 2000000, category: 'house' });
    list.push({ id: 'ene-vac', title: 'Ahorro Vacaciones (Cuota 7)', desc: 'Separar $285.000.', amount: 285000, category: 'vacation' });
    list.push({ id: 'ene-loan', title: 'Última Cuota Préstamo Santander 12/12', desc: 'Pago final del préstamo.', amount: 3219566, category: 'debt' });
    list.push({ id: 'dic-sac', title: 'Reservar Aguinaldo Dec (Fondo Emergencia)', desc: 'Apartar los $2.325.000 netos del aguinaldo.', amount: 2325000, category: 'saving' });
  } else if (monthId === 'feb-27') {
    list.push({ id: 'feb-visa', title: 'Pago Tarjeta Visa (Febrero)', desc: 'Pago de tarjeta de $196.562.', amount: 196562, category: 'expense' });
    list.push({ id: 'feb-viaje', title: 'Realizar Viaje de Vacaciones', desc: 'Gastar los $2.000.000 ARS acumulados para el viaje familiar.', amount: 2000000, category: 'expense' });
  } else {
    // Dynamic checklist items for March 2027 and future months
    if (data.creditCard > 0) {
      list.push({ id: `${monthId}-visa`, title: 'Pago Tarjeta Visa', desc: `Pagar cierre mensual de tarjeta de ${formatCurrency(data.creditCard)}.`, amount: data.creditCard, category: 'expense' });
    }
    list.push({ id: `${monthId}-hip`, title: 'Transferir Banco Hipotecario', desc: 'Realizar la transferencia mensual de $200.000.', amount: 200000, category: 'expense' });
    
    if (month === 1) { // February of any year
      list.push({ id: `${monthId}-viaje`, title: 'Realizar Viaje de Vacaciones', desc: 'Gastar los $2.000.000 ARS acumulados.', amount: 2000000, category: 'expense' });
    } else {
      list.push({ id: `${monthId}-vac`, title: 'Ahorro Vacaciones Anual', desc: 'Separar $167.000 para el próximo viaje.', amount: 167000, category: 'vacation' });
    }

    if (data.houseManoObra > 0) {
      list.push({ id: `${monthId}-casa`, title: 'Ahorro Construcción Fase 2', desc: `Separar ${formatCurrency(data.houseManoObra)} para la casa de Salta.`, amount: data.houseManoObra, category: 'house' });
    }
    list.push({ id: `${monthId}-celebs`, title: 'Ahorro Celebraciones y Mendoza', desc: 'Separar $120.000 para cumpleaños, fiestas y viajes Mendoza.', amount: 120000, category: 'expense' });
    list.push({ id: `${monthId}-retiro`, title: 'Ahorro Retiro', desc: 'Separar $1.330.000 para la jubilación.', amount: 1330000, category: 'expense' });
    
    // Aguinaldos check for long-term construction saving tasks
    if (month === 0 || month === 6) {
      list.push({ id: `${monthId}-sac-const`, title: 'Ahorrar Aguinaldo en Construcción', desc: 'Inyectar $2.500.000 netos adicionales del aguinaldo al fondo de la casa.', amount: 2500000, category: 'house' });
    }
  }

  return list;
}

// State Variables
let rollingMonths = getRolling12Months();
let currentMonthTab = rollingMonths[0]; // defaults to first visible month
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

// Update Metas progress bars and values based on checked tasks and seeds
function updateProgressBars() {
  // 1. Vacations Fund Progress
  let totalVacationsSaved = 0;
  // We scan the tasksList keys stored in localStorage or default tasks
  rollingMonths.forEach(month => {
    const tasks = getTasksForMonth(month);
    tasks.forEach(task => {
      if (task.category === 'vacation' && checkedTasks[task.id]) {
        totalVacationsSaved += task.amount;
      }
    });
  });
  const vacationsPct = Math.min(100, (totalVacationsSaved / 2000000) * 100);
  document.getElementById('bar-vacations').style.width = vacationsPct + '%';
  document.getElementById('val-vacations').textContent = `${formatCurrency(totalVacationsSaved)} / $2.000.000`;

  // 2. House Progress (Etapa 1)
  let totalHousePaid = 0;
  rollingMonths.forEach(month => {
    const tasks = getTasksForMonth(month);
    tasks.forEach(task => {
      // Sum Category 'house' tasks that are within 2026/Jan 2027 cycle
      if (task.category === 'house' && checkedTasks[task.id] && (!task.id.includes('-casa') && !task.id.includes('-sac-const'))) {
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
    emergencyFundSaved += 10000000; // March 2027 base allocation
  }
  const emergencyPct = Math.min(100, (emergencyFundSaved / 23250000) * 100);
  document.getElementById('bar-emergency').style.width = emergencyPct + '%';
  document.getElementById('val-emergency').textContent = `${formatCurrency(emergencyFundSaved)} / $23.250.000`;

  // 4. Education Fund
  let educationSaved = 0;
  const educationPct = 0;
  document.getElementById('bar-education').style.width = educationPct + '%';
  document.getElementById('val-education').textContent = `${formatCurrency(educationSaved)} / $16.473.960`;

  // 5. Casa Salta - Construcción Fase 2 Progress
  let constructionF2Saved = 0;
  if (checkedTasks['feb-viaje']) {
    constructionF2Saved += 1933203; // March 2027 seed allocation
  }
  // Check any checked long-term construction tasks
  rollingMonths.forEach(month => {
    const tasks = getTasksForMonth(month);
    tasks.forEach(task => {
      if ((task.id.includes('-casa') || task.id.includes('-sac-const')) && checkedTasks[task.id]) {
        constructionF2Saved += task.amount;
      }
    });
  });
  const constF2Pct = Math.min(100, (constructionF2Saved / 150000000) * 100);
  document.getElementById('bar-const-f2').style.width = constF2Pct + '%';
  document.getElementById('val-const-f2').textContent = `${formatCurrency(constructionF2Saved)} / $150.000.000`;

  // 6. Celebraciones & Mendoza Progress
  let celebsSaved = 0;
  rollingMonths.forEach(month => {
    const tasks = getTasksForMonth(month);
    tasks.forEach(task => {
      if (task.id.includes('-celebs') && checkedTasks[task.id]) {
        celebsSaved += task.amount;
      }
    });
  });
  const celebsPct = Math.min(100, (celebsSaved / 1440000) * 100);
  document.getElementById('bar-celebs').style.width = celebsPct + '%';
  document.getElementById('val-celebs').textContent = `${formatCurrency(celebsSaved)} / $1.440.000`;
}

// Render Monthly Tab Buttons dynamically for the rolling window
function renderTabs() {
  const tabsList = document.getElementById('months-tabs-list');
  tabsList.innerHTML = '';
  rollingMonths.forEach(monthId => {
    const data = getMonthData(monthId);
    const btn = document.createElement('button');
    btn.className = `month-tab ${monthId === currentMonthTab ? 'active' : ''}`;
    // Show short month name
    btn.textContent = data.name.split(' ')[0] + ' ' + data.name.split(' ')[1].slice(-2);
    btn.onclick = () => {
      currentMonthTab = monthId;
      renderTabs();
      renderTasks();
    };
    tabsList.appendChild(btn);
  });
}

// Render Tasks checklist of the selected Month
function renderTasks() {
  const container = document.getElementById('checklist-tasks');
  container.innerHTML = '';
  const tasks = getTasksForMonth(currentMonthTab);
  
  if (tasks.length === 0) {
    container.innerHTML = '<p class="section-desc">No hay tareas pendientes para este período.</p>';
    return;
  }

  tasks.forEach(task => {
    const isChecked = !!checkedTasks[task.id];
    const item = document.createElement('div');
    item.className = `task-item ${isChecked ? 'checked' : ''}`;
    
    let badgeText = '';
    let badgeClass = '';
    if (task.category === 'expense') {
      badgeText = 'Gasto / Suscripción';
      badgeClass = 'badge-expense';
    } else if (task.category === 'house') {
      badgeText = 'Casa / Obra';
      badgeClass = 'badge-expense';
    } else if (task.category === 'vacation') {
      badgeText = 'Ahorro Vacaciones';
      badgeClass = 'badge-saving';
    } else if (task.category === 'saving') {
      badgeText = 'Reserva Emergencia';
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
      renderDecenalTable();
    };

    container.appendChild(item);
  });
}

// Render Monthly Projection Table for the 12 rolling months
function renderTable() {
  const tbody = document.getElementById('projection-table-body');
  tbody.innerHTML = '';
  
  // Calculate the starting balance of the rolling window by running a history simulation from June 2026
  let runningBalance = 0;
  
  // We generate a chronological sequence from June 2026 up to the last month of our window
  const fullSeq = [];
  let currentM = 5; // June
  let currentY = 2026;
  const targetEndMonthId = rollingMonths[11];
  const { month: endM, year: endY } = parseMonthId(targetEndMonthId);
  
  while (currentY < endY || (currentY === endY && currentM <= endM)) {
    fullSeq.push(getMonthIdFromDate(currentM, currentY));
    currentM++;
    if (currentM === 12) {
      currentM = 0;
      currentY++;
    }
  }

  // Run calculation simulation
  const visibleMonthData = {};
  fullSeq.forEach(monthId => {
    const data = getMonthData(monthId);
    const balanceStart = runningBalance;
    const income = data.income;
    const regularExpense = -data.expenseRegular;
    const loan = -data.loan;
    const card = -data.creditCard;
    
    // Check checklist items for vacation/house savings to simulate active cash outflows
    let vacation = -data.vacation;
    let house = -data.houseManoObra;
    
    const balanceEnd = balanceStart + income + regularExpense + loan + card + vacation + house;
    runningBalance = balanceEnd;
    
    // If within our rolling 12 months, save details
    if (rollingMonths.includes(monthId)) {
      visibleMonthData[monthId] = {
        balanceStart,
        income,
        regularExpense,
        loan,
        vacation,
        house,
        card,
        balanceEnd
      };
    }
  });

  // Render rows
  rollingMonths.forEach(monthId => {
    const data = getMonthData(monthId);
    const flow = visibleMonthData[monthId];
    if (!flow) return;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${data.name}</td>
      <td>${formatCurrency(flow.balanceStart)}</td>
      <td>${formatCurrency(flow.income)}</td>
      <td>${formatCurrency(flow.regularExpense)}</td>
      <td>${formatCurrency(flow.loan)}</td>
      <td>${formatCurrency(flow.vacation)}</td>
      <td>${formatCurrency(flow.house)}</td>
      <td>${formatCurrency(flow.card)}</td>
      <td>${formatCurrency(flow.balanceEnd)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 10-Year Decenal Plan simulation (2026 - 2036) with 4% compound real interest
function renderDecenalTable() {
  const tbody = document.getElementById('decenal-table-body');
  tbody.innerHTML = '';
  
  // Current date for determining if a task is in the future
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Helper to check if a task is completed or projected (in the future)
  function isTaskActive(taskId, taskMonth, taskYear) {
    if (taskYear > currentYear || (taskYear === currentYear && taskMonth >= currentMonth)) {
      return true;
    }
    return !!checkedTasks[taskId];
  }

  // Calculate 2026 starting values
  const saveJun26 = isTaskActive('jun-sac', 5, 2026) ? 3725000 : 0;
  const saveDic26 = isTaskActive('dic-sac', 11, 2026) ? 2325000 : 0;
  
  let emergency = saveJun26 + saveDic26;
  let construction = isTaskActive('jul-mat-ade', 6, 2026) ? 500000 : 0;
  let university = 0;
  let retirement = 0;

  const yearlyRecords = {};
  yearlyRecords[2026] = {
    emergency,
    construction,
    university,
    retirement
  };

  const realReturnMonthly = Math.pow(1 + 0.04, 1 / 12) - 1;

  // Run month-by-month simulation from Jan 2027 to December 2036
  let simMonth = 0; // January
  let simYear = 2027;
  
  while (simYear <= 2036) {
    // In March 2027, initialize the seeds if the transition/travel task is completed or projected
    if (simYear === 2027 && simMonth === 2) {
      if (isTaskActive('feb-viaje', 1, 2027)) {
        emergency += 10000000;
        construction += 1933203;
      }
    }

    if (simYear > 2027 || (simYear === 2027 && simMonth >= 2)) {
      if (isTaskActive('feb-viaje', 1, 2027)) {
        // 1. Emergency Fund (limit to 23.25M)
        if (emergency < 23250000) {
          emergency += 60000;
        }
        
        // 2. Construction Fund (limit to 150M)
        if (construction < 150000000) {
          construction += 1500000;
          if (simMonth === 0 || simMonth === 6) { // January / July SAC
            construction += 2500000;
          }
        }
        construction = construction * (1 + realReturnMonthly);
        if (construction > 150000000) construction = 150000000;

        // 3. University Fund
        university += 74000;
        university = university * (1 + realReturnMonthly);

        // 4. Retirement Fund
        retirement += 1330000;
        retirement = retirement * (1 + realReturnMonthly);
      }
    }

    // Save annual values at the end of December
    if (simMonth === 11) {
      yearlyRecords[simYear] = {
        emergency,
        construction,
        university,
        retirement
      };
      simYear++;
      simMonth = 0;
    } else {
      simMonth++;
    }
  }

  // Render Decenal Table Rows
  for (let y = 2026; y <= 2036; y++) {
    const rec = yearlyRecords[y];
    if (!rec) continue;
    
    const total = rec.emergency + rec.construction + rec.university + rec.retirement;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${y}</strong></td>
      <td>${formatCurrency(rec.emergency)}</td>
      <td>${formatCurrency(rec.construction)}</td>
      <td>${formatCurrency(rec.university)}</td>
      <td>${formatCurrency(rec.retirement)}</td>
      <td style="color:#34d399; font-weight:600;">${formatCurrency(total)}</td>
    `;
    tbody.appendChild(tr);
  }
}

// Populate the Select Month dropdown in the parameter editor card
function populateMonthSelector() {
  const select = document.getElementById('edit-month');
  select.innerHTML = '';
  rollingMonths.forEach(monthId => {
    const data = getMonthData(monthId);
    const opt = document.createElement('option');
    opt.value = monthId;
    opt.textContent = data.name;
    select.appendChild(opt);
  });
}

// Load month data values into form inputs of the parameter editor
function loadEditorValues() {
  const monthId = document.getElementById('edit-month').value;
  const data = getMonthData(monthId);
  
  document.getElementById('edit-income').value = data.income;
  document.getElementById('edit-loan').value = data.loan;
  document.getElementById('edit-card').value = data.creditCard;
  
  // Reload breakdown or default representation of fixed expenses
  document.getElementById('edit-exp-nanny').value = data.nanny || 800000;
  document.getElementById('edit-exp-home').value = data.home || 2000000;
  document.getElementById('edit-exp-kennedy').value = data.kennedy || 274566;
  document.getElementById('edit-exp-mortgage').value = data.mortgage || 200000;
  document.getElementById('edit-exp-life').value = data.life || 300000;
  
  document.getElementById('edit-saving-vacation').value = data.vacation;
  document.getElementById('edit-saving-house').value = data.houseManoObra;
}

// Save inputs of the parameter editor to LocalStorage and reload page data
function saveEditorValues() {
  const monthId = document.getElementById('edit-month').value;
  
  const income = parseFloat(document.getElementById('edit-income').value) || 0;
  const loan = parseFloat(document.getElementById('edit-loan').value) || 0;
  const card = parseFloat(document.getElementById('edit-card').value) || 0;
  
  const nanny = parseFloat(document.getElementById('edit-exp-nanny').value) || 0;
  const home = parseFloat(document.getElementById('edit-exp-home').value) || 0;
  const kennedy = parseFloat(document.getElementById('edit-exp-kennedy').value) || 0;
  const mortgage = parseFloat(document.getElementById('edit-exp-mortgage').value) || 0;
  const life = parseFloat(document.getElementById('edit-exp-life').value) || 0;
  
  const vacation = parseFloat(document.getElementById('edit-saving-vacation').value) || 0;
  const houseManoObra = parseFloat(document.getElementById('edit-saving-house').value) || 0;

  // Build consolidations
  const expenseRegular = nanny + home + kennedy + mortgage + life;

  const overrides = {
    income,
    loan,
    creditCard: card,
    expenseRegular,
    vacation,
    houseManoObra,
    nanny,
    home,
    kennedy,
    mortgage,
    life
  };

  localStorage.setItem(`override_${monthId}`, JSON.stringify(overrides));
  
  // Re-render everything to update values
  renderTable();
  renderTasks();
  updateProgressBars();
  renderDecenalTable();
  
  // Micro-feedback animation on button click
  const btn = document.getElementById('btn-save-params');
  const oldText = btn.textContent;
  btn.textContent = '¡Proyección Actualizada! ✓';
  btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  setTimeout(() => {
    btn.textContent = oldText;
    btn.style.background = '';
  }, 1800);
}

// Initialize Application on Window Load
window.onload = () => {
  loadState();
  
  // Populating editor controls and dropdowns
  populateMonthSelector();
  loadEditorValues();
  
  // Add listeners
  document.getElementById('edit-month').addEventListener('change', loadEditorValues);
  document.getElementById('btn-save-params').addEventListener('click', saveEditorValues);
  
  // Render views
  renderTabs();
  renderTasks();
  updateProgressBars();
  renderTable();
  renderDecenalTable();
};

document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a elementos del DOM
    const monthYearElement = document.getElementById("month-year");
    
    const daysTable = document.getElementById("days");
  
    // Obtener fecha actual
    const currentDate = new Date();
    const selectedDates = []; // Almacenar las fechas seleccionadas
    const appointments = {};
  
    // Función para actualizar el calendario
    function updateCalendar(year, month) {
      // Establecer la fecha en el primer día del mes
      const firstDay = new Date(year, month, 1);
  
      // Actualizar el encabezado con el mes y el año
      monthYearElement.textContent = new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(firstDay);
  
      // Limpiar la tabla de días
      daysTable.innerHTML = "";
  
      // Crear una fila para los nombres de los días de la semana
      const dayNamesRow = document.createElement("tr");
      ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].forEach(dayName => {
        const th = document.createElement("th");
        th.textContent = dayName;
        dayNamesRow.appendChild(th);
      });
      daysTable.appendChild(dayNamesRow);
  
      // Calcular la cantidad de días en el mes
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      // Calcular el día de la semana del primer día del mes
      const firstDayOfWeek = firstDay.getDay();
  
      // Crear filas para los días del mes
      let currentDay = 1;
      for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
  
        for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td");
  
          if (i === 0 && j < firstDayOfWeek) {
            // Celdas vacías antes del primer día del mes
            cell.textContent = "";
          } else if (currentDay <= daysInMonth) {
            // Celdas con los días del mes
            cell.textContent = currentDay;
  
            // Verificar si la fecha está seleccionada
            const cellDate = new Date(year, month, currentDay);
            if (selectedDates.some(date => date.getTime() === cellDate.getTime())) {
              cell.classList.add("selected");
            }
  
            // Agregar manejador de eventos para cambiar la selección al hacer clic
            cell.addEventListener("click", function () {
              toggleSelection(cellDate, cell);
            });
  
            currentDay++;
          }
  
          row.appendChild(cell);
        }
  
  
        daysTable.appendChild(row);
      }
  
      // Para guardar la seleccion
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  
      const monthNames = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
  
      let calendarHTML = `<h2>${monthNames[currentMonth]} ${currentYear}</h2><table><tr><th>Dom</th><th>Lun</th><th>Mar</th><th>Mie</th><th>Jue</th><th>Vie</th><th>Sáb</th></tr><tr>`;
  
      for (let i = 0; i < firstDayIndex; i++) {
          calendarHTML += "<td></td>";
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDates.includes(day);
        const appointment = appointments[day] || {};
  
        calendarHTML += `<td data-day="${day}" class="${isSelected ? 'selected' : 'unselected'}" onclick="window.openModal(${day})">${day}`;
        
        if (appointment.name) {
            calendarHTML += `<br>${appointment.name}`;
        }
  
        calendarHTML += `</td>`;
  
        if ((firstDayIndex + day) % 7 === 0) {
            calendarHTML += "</tr><tr>";
        }
      }
    }
  
    // Función para cambiar el mes
    window.changeMonth = function (delta) {
      currentDate.setMonth(currentDate.getMonth() + delta);
      updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    };
  
    // Función para alternar la selección de una fecha
    function toggleSelection(date, cell) {
      const dayOfMonth = date.getDate(); // Obtener el día del mes
    
      const dateIndex = selectedDates.findIndex(d => d === dayOfMonth);
    
      if (dateIndex !== -1) {
        // Si el día ya está seleccionado, lo eliminamos de la lista
        selectedDates.splice(dateIndex, 1);
        cell.classList.remove("selected");
      } else {
        // Si el día no está seleccionado, lo añadimos a la lista
        selectedDates.push(dayOfMonth);
        cell.classList.add("selected");
      }
    
      console.log(selectedDates);
      saveAppointment();
    }
    
  
    function saveAppointment() {
      const day = selectedDates;
      const nombre = document.getElementById("nombre").value;
      const telefono = document.getElementById("telefono").value;
      const email = document.getElementById("email").value;
      
      appointments[day] = { nombre, telefono, email, day};
      
    }
    console.log(appointments)
    window.saveAppointment = saveAppointment;
    
    function downloadData() {
      exportToExcel(appointments);
    }
    window.downloadData = downloadData;
  
    function exportToExcel(data) {
      const worksheet = XLSX.utils.json_to_sheet(Object.values(data));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveExcelFile(excelBuffer, 'userData.xlsx');
    }
    
    window.exportToExcel = exportToExcel;
  
    function saveExcelFile(buffer, filename) {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    
  
    // Inicializar el calendario con el mes actual
    updateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  
  
  });
  
  
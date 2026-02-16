let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function saveAppointments() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

const form = document.getElementById("appointmentForm");
const submitBtn = form.querySelector("button");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const date = document.getElementById("date").value;
        const doctor = document.getElementById("doctor").value;

        if (form.dataset.editIndex) { 
            const index = Number(form.dataset.editIndex); 
            appointments[index] = { name, age, date, doctor };
            delete form.dataset.editIndex; 
            submitBtn.innerText = "Add Appointment"; 
        } else {
            appointments.push({ name, age, date, doctor });
        }

        saveAppointments();
        displayAppointments();
        form.reset();
    });
}

function displayAppointments() {
    const table = document.getElementById("appointmentsTable");
    if (!table) return;

    table.innerHTML = `<tr>
        <th>Name</th><th>Age</th><th>Date</th><th>Doctor</th><th>Actions</th>
    </tr>`;

    appointments.forEach((appt, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = appt.name;
        row.insertCell(1).innerText = appt.age;
        row.insertCell(2).innerText = appt.date;
        row.insertCell(3).innerText = appt.doctor;

        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        actionsCell.querySelector(".edit-btn").addEventListener("click", () => {
            document.getElementById("name").value = appt.name;
            document.getElementById("age").value = appt.age;
            document.getElementById("date").value = appt.date;
            document.getElementById("doctor").value = appt.doctor;
            form.dataset.editIndex = index; 
            submitBtn.innerText = "Update Appointment"; 
        });

        actionsCell.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm(`Delete appointment for ${appt.name}?`)) {
                appointments.splice(index, 1);
                saveAppointments();
                displayAppointments();
            }
        });
    });
}

function displayDashboardAppointments() {
    const table = document.getElementById("appointmentsTableDashboard");
    if (!table) return;

    table.innerHTML = `<tr>
        <th>Name</th><th>Age</th><th>Date</th><th>Doctor</th>
    </tr>`;

    appointments.forEach(appt => {
        const row = table.insertRow();
        row.insertCell(0).innerText = appt.name;
        row.insertCell(1).innerText = appt.age;
        row.insertCell(2).innerText = appt.date;
        row.insertCell(3).innerText = appt.doctor;
    });
}

displayAppointments();
displayDashboardAppointments();
setInterval(displayDashboardAppointments, 500);

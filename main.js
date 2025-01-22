// Lista de usuarios
const users = [
    { name: 'Usuario 1', points: 0 },
    { name: 'Usuario 2', points: 0 }
];

let autoPointsInterval;

// Verificar contraseña
document.getElementById("loginButton").addEventListener("click", () => {
    const password = document.getElementById('password').value;
    if (password === '1234') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        loadUsers();
    } else {
        alert('Contraseña incorrecta.');
    }
});

// Cargar usuarios en pantalla
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `${user.name}: <span id="userPoints${index}">${user.points}</span>`;
        userList.appendChild(userDiv);
    });
}

// Ajustar puntos
document.getElementById("addPointsButton").addEventListener("click", () => adjustPoints(true));
document.getElementById("removePointsButton").addEventListener("click", () => adjustPoints(false));

function adjustPoints(add) {
    const amount = parseInt(document.getElementById('adjustAmount').value);
    if (isNaN(amount)) {
        alert('Ingresa un número válido.');
        return;
    }
    users.forEach((user, index) => {
        user.points += add ? amount : -amount;
        document.getElementById(`userPoints${index}`).innerText = user.points;
    });
}

// Puntos automáticos
document.getElementById("startAutoButton").addEventListener("click", startAutoPoints);
document.getElementById("stopAutoButton").addEventListener("click", stopAutoPoints);

function startAutoPoints() {
    const amount = parseInt(document.getElementById('autoAmount').value);
    const interval = parseInt(document.getElementById('autoInterval').value) * 1000;

    if (isNaN(amount) || isNaN(interval)) {
        alert('Ingresa valores válidos.');
        return;
    }

    stopAutoPoints();
    autoPointsInterval = setInterval(() => {
        users.forEach((user, index) => {
            user.points += amount;
            document.getElementById(`userPoints${index}`).innerText = user.points;
        });
    }, interval);
}

function stopAutoPoints() {
    clearInterval(autoPointsInterval);
}

// Bloquear página
document.getElementById("lockPageButton").addEventListener("click", () => {
    const pin = prompt('Introduce el PIN para bloquear la página:');
    if (pin === '1234') {
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    } else {
        alert('PIN incorrecto.');
    }
});

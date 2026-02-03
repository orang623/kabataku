document.addEventListener('DOMContentLoaded', loadLeaderboard);

function getLeaderboardData() {
    const data = localStorage.getItem('leaderboard');
    return data ? JSON.parse(data) : [];
}

function saveLeaderboardData(data) {
    localStorage.setItem('leaderboard', JSON.stringify(data));
}

function addEntry() {
    const nameInput = document.getElementById('playerName');
    const scoreInput = document.getElementById('playerScore');
    const name = nameInput.value;
    const score = parseInt(scoreInput.value);

    if (name === '' || isNaN(score)) {
        alert("Mohon isi nama dan skor dengan benar!");
        return;
    }

    const leaderboard = getLeaderboardData();
    

    leaderboard.push({ name, score });

    leaderboard.sort((a, b) => b.score - a.score);

    saveLeaderboardData(leaderboard);
    renderTable(leaderboard);

    nameInput.value = '';
    scoreInput.value = '';
}

function renderTable(data) {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = ''; 

    data.forEach((entry, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function loadLeaderboard() {
    const data = getLeaderboardData();
    data.sort((a, b) => b.score - a.score); 
    renderTable(data);
}

function clearData() {
    if(confirm("Yakin ingin menghapus semua data?")) {
        localStorage.removeItem('leaderboard');
        renderTable([]);
    }
}
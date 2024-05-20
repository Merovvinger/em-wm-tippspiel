document.addEventListener('DOMContentLoaded', () => {
    const matchSelect = document.getElementById('match');

    fetch('/games')
        .then(response => response.json())
        .then(data => {
            const matches = [];
            let matchCounter = 1;

            for (const group in data) {
                const teams = data[group];
                for (let i = 0; i < teams.length; i += 2) {
                    const team1 = Object.values(teams[i])[0];
                    const team2 = Object.values(teams[i + 1])[0];
                    matches.push({
                        match: `Spiel ${matchCounter}: ${team1} vs ${team2}`,
                        teams: [team1, team2]
                    });
                    matchCounter++;
                }
            }

            matches.forEach((match, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = match.match;
                matchSelect.appendChild(option);
            });

            matchSelect.addEventListener('change', (event) => {
                const selectedMatch = matches[event.target.value];
                document.getElementById('team1Label').textContent = `Tipp für ${selectedMatch.teams[0]}:`;
                document.getElementById('team2Label').textContent = `Tipp für ${selectedMatch.teams[1]}:`;
            });

            fetch('/tips')
                .then(response => response.json())
                .then(data => {
                    updateTipsList(data.tips);
                });
        });
});

document.getElementById('tippspielForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const participant = document.getElementById('participant').value;
    const matchIndex = document.getElementById('match').value;
    const team1Tip = document.getElementById('team1').value;
    const team2Tip = document.getElementById('team2').value;

    fetch('/games')
        .then(response => response.json())
        .then(data => {
            const matches = [];
            for (const group in data) {
                const teams = data[group];
                for (let i = 0; i < teams.length; i += 2) {
                    const team1 = Object.values(teams[i])[0];
                    const team2 = Object.values(teams[i + 1])[0];
                    matches.push({
                        match: `Spiel ${matches.length + 1}: ${team1} vs ${team2}`,
                        teams: [team1, team2]
                    });
                }
            }

            const match = matches[matchIndex].match;

            const tipObj = {
                participant: participant,
                match: match,
                tip: `${team1Tip}:${team2Tip}`
            };

            submitTip(tipObj, false);
        });
});

function submitTip(tipObj, override) {
    tipObj.override = override;

    fetch('/submit-tip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tipObj)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    if (error.allowOverride) {
                        const userConfirmed = confirm(error.error);
                        if (userConfirmed) {
                            submitTip(tipObj, true);
                        }
                    } else {
                        throw new Error(error.error);
                    }
                });
            }
            return response.json();
        })
        .then(data => {
            updateTipsList(data.tips);
            alert(data.message);
        })
        .catch(error => {
            alert(error.message);
        });
}

function updateTipsList(tips) {
    const tipsList = document.getElementById('tipsList');
    tipsList.innerHTML = '';

    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = `${tip.participant} tippte auf ${tip.tip} für ${tip.match}`;
        tipsList.appendChild(li);
    });
}

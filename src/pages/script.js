document.addEventListener('DOMContentLoaded', function () {
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const barCtx = document.getElementById('barChart').getContext('2d');

    const results = [
        { name: 'John', votes: 200 },
        { name: 'Ram', votes: 150 },
        { name: 'Sam', votes: 300 },
        { name: 'Iman', votes: 100 },
        { name: 'Lokesh', votes: 250 }
    ];

    const pieData = {
        labels: results.map(candidate => candidate.name),
        datasets: [{
            data: results.map(candidate => candidate.votes),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverOffset: 4
        }]
    };

    const barData = {
        labels: results.map(candidate => candidate.name),
        datasets: [{
            label: 'Votes',
            data: results.map(candidate => candidate.votes),
            backgroundColor: '#36A2EB'
        }]
    };

    new Chart(pieCtx, {
        type: 'pie',
        data: pieData,
    });

    new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

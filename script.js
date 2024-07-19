document.addEventListener('DOMContentLoaded', () => {
    const goals = {
        'push-ups': { current: 0, target: 100 },
        'sit-ups': { current: 0, target: 100 },
        'squats': { current: 0, target: 100 },
        'run': { current: 0, target: 10 }
    };

    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            const exercise = item.dataset.exercise;
            if (goals[exercise].current < goals[exercise].target) {
                goals[exercise].current++;
                updateGoalDisplay(item, exercise);
            }
        });
    });

    function updateGoalDisplay(item, exercise) {
        const countSpan = item.querySelector('.count');
        countSpan.textContent = `[${goals[exercise].current}/${goals[exercise].target}]`;
        if (goals[exercise].current === goals[exercise].target) {
            item.style.color = '#4ade80';
        }
    }

    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        const endTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;

            if (timeLeft > 0) {
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownElement.textContent = "Time's up!";
                // Here you could add logic for when the time is up
            }
        }

        updateCountdown();
    }

    startCountdown();
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(error => console.log('Service Worker registration failed:', error));
}

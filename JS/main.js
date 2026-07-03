// Fuck the Fear
// Main JavaScript

function initBook() {

    const steps = [
        { id: "q1", delay: 2000 },
        { id: "q2", delay: 6000 },
        { id: "q3", delay: 12000 }
    ];

    steps.forEach(step => {
        setTimeout(() => {
            const element = document.getElementById(step.id);
            if (element) {
                element.classList.add("visible");
            }
        }, step.delay);
    });

}

document.addEventListener("DOMContentLoaded", () => {

    if (document.querySelector(".reflection")) {
        initBook();
    }

});
const navItems = [
    ["Home", "../index.html"],
    ["Labyrinth", "../Labyrinth/index.html"],
    ["Breath", "../BreathGames/index.html"],
    ["Book", "../Book/index.html"],
    ["Dreamscapes", "../MindscapeWalks/index.html"],
    ["Mantra", "../Mantra/index.html"],
    ["About", "../About/index.html"]
];

document.getElementById("main-nav").innerHTML =
    navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

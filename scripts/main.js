window.addEventListener('load', () => {
    const target = document.getElementById("target");

    Temme("div#container>h1.lead-3+div#footer>div.flex.flex-gap-3>p.indent", target);
});
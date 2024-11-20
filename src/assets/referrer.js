function goToOpener() {
   
    if (window.opener) {
        // Bringt das ursprüngliche Fenster in den Vordergrund
        window.opener.focus();
    } else {
        // Öffnet die alternative URL
        window.location.href = "https://www.bjoern-bressler.de/developer/";
    }
}
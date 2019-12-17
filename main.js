$(document).ready(function(){
    // Intercettiamo il click dell'utente sul bottone.
    $("header button").click(function(){
        // Svuotiamo il contenitore delle risposte di tutti i film cercati precedentemente:
        $(".film-container").children().remove();
        // Prendiamo il testo del campo input.
        var testo_input = $("input").val();
        // Con questo if, prendiamo il valore solo se non è vuoto!
        if (testo_input.length!=0) {
// PARTE DELLA CHIAMATA API: INIZIO
            var my_url = "https://api.themoviedb.org/3";
            $.ajax({
                "url": my_url+"/search/movie/",
                "data":{
                    // Questa è la mia chiave!
                    "api_key":"b05b883f04e9f1073304ba663a32e331",
                    // Qui inserirò testo_input:
                    "query":testo_input
                },
                "method":"GET",
                "success": function(data_success){
// FUNZIONE DI SUCCESS NELLA AJAX!
                    // supponiamo di volere stampare in console il titolo dei film trovati:
                    console.log(data_success);
                    // Questo ciclo FOR è necessario per creare le mie schede film!
                    for (var i = 0; i < data_success.results.length; i++) {
// TEMPLATE HANDLEBARS
                        // Inizializzo il template handlebars
                        var template_html = $("#template-film").html();
                        var template_function = Handlebars.compile(template_html);
                        // Definiamo le variabili che verranno utilizzate nel template handlebars:
                        var current_selection = data_success.results[i];
                        // GESTIONE DEL VOTO IN STELLINE: INIZIO
                        var voto_stelline = Math.ceil(current_selection.vote_average/2);
                        var stelline = "";
                        console.log(voto_stelline);
                        for (var j = 1; j <= 5; j++) {
                            if (j <= voto_stelline) {
                                stelline += '<i class="fas fa-star"></i>'
                            } else {
                                stelline += '<i class="far fa-star"></i>'
                            };
                        };
                        // GESTIONE DEL VOTO IN STELLINE: FINE
                        var variabili = {
                            "title":current_selection.title,
                            "original_title":current_selection.original_title,
                            "original_language":current_selection.original_language,
                            "vote_average":current_selection.vote_average,
                            "stelline":stelline
                        };
                        // Ingetto le variabili nella funzione template:
                        var html_finale = template_function(variabili);
                        $(".film-container").append(html_finale);
                    };
                },
                "error": function(){
                    alert("ERROR! -.-");
                }
            });
// PARTE DELLA CHIAMATA API: FINE
            // RESET FINALE DEL VALORE NEL CAMPO INPUT
            $("input").val("");
        }
    })
})

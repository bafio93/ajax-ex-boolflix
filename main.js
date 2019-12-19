$(document).ready(function(){
    // Intercettiamo il click dell'utente sul bottone.
    $("header button").click(function(){
        // Svuotiamo il contenitore delle risposte di tutti i film cercati precedentemente:
        $(".film-container").children().remove();
        // Prendiamo il testo del campo input.
        var testo_input = $("input").val();
        // Con questo if, prendiamo il valore solo se non è vuoto!
        if (testo_input.length!=0) {
// PARTE DELLA CHIAMATA API FILM: INIZIO
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
                    stampa_film(data_success);
                },
                "error": function(){
                    alert("ERROR! -.-");
                }
            });
// PARTE DELLA CHIAMATA API FILM: FINE
// PARTE DELLA CHIAMATA API SERIE TV: INIZIO
            $.ajax({
                "url": my_url+"/search/tv/",
                "data":{
                    // Questa è la mia chiave!
                    "api_key":"b05b883f04e9f1073304ba663a32e331",
                    // Qui inserirò testo_input:
                    "query":testo_input
                },
                "method":"GET",
                "success": function(data_success){
                    stampa_serie(data_success);
                },
                "error": function(){
                    alert("ERROR! -.-");
                }
            });
// PARTE DELLA CHIAMATA API SERIE TV: FINE
            // RESET FINALE DEL VALORE NEL CAMPO INPUT
            $("input").val("");
        }
    });
    $(".film-box").hover(function(){
        $(this).css("background-color", "yellow");
    }, function(){
        $(this).css("background-color", "pink");
    });

});
//
// FUNZIONI DICHIARATE:
//
// FUNZIONE STELLINE
//
function f_stelline(voto) {
    var voto_stelline = Math.ceil(voto/2);
    var stelline = "";
    for (var j = 1; j <= 5; j++) {
        if (j <= voto_stelline) {
            stelline += '<i class="fas fa-star"></i>'
        } else {
            stelline += '<i class="far fa-star"></i>'
        };
    };
    return stelline;
}
//
// FUNZIONE BANDIERINA
//
function f_bandierina(lingua){
    var codice_bandiera = "https://www.countryflags.io/";
    // $.get(codice_bandiera).fail(function() {
    //     codice_bandiera = "";
    //     // Mezzo funziona, un po'incasinato però! :P
    // });
    if (lingua=="en") {
        codice_bandiera += "gb/flat/32.png";
    } else if (lingua=="ja") {
        codice_bandiera += "jp/flat/32.png";
    } else if (lingua=="zh") {
        codice_bandiera += "cn/flat/32.png";
    } else {
        codice_bandiera += lingua + "/flat/32.png";
    };
    return codice_bandiera;
}
//
// FUNZIONE STAMPA FILM
//
function stampa_film(data_success){
    for (var i = 0; i < data_success.results.length; i++) {
    // TEMPLATE HANDLEBARS
        // Inizializzo il template handlebars
        var template_html = $("#template-film").html();
        var template_function = Handlebars.compile(template_html);
        // Definiamo le variabili che verranno utilizzate nel template handlebars:
        var current_selection = data_success.results[i];
        var variabili = {
            "title":current_selection.title,
            "original_title":current_selection.original_title,
            "original_language":f_bandierina(current_selection.original_language),
            "stelline":f_stelline(current_selection.vote_count),
            "overview":current_selection.overview,
            "img_src":ritorno_url(current_selection.poster_path)
        };
        // Ingetto le variabili nella funzione template:
        var html_finale = template_function(variabili);
        $(".film-container").append(html_finale);
        // Inserisco una funzione che mi fa lo "switch" tra scheda del film e dettagli!
        nice_hover();
    };
}
//
// FUNZIONE STAMPA SERIE TV
//
function stampa_serie(data_success){
    for (var i = 0; i < data_success.results.length; i++) {
    // TEMPLATE HANDLEBARS
        // Inizializzo il template handlebars
        var template_html = $("#template-film").html();
        var template_function = Handlebars.compile(template_html);
        // Definiamo le variabili che verranno utilizzate nel template handlebars:
        var current_selection = data_success.results[i];
        var variabili = {
            "title":current_selection.name,
            "original_title":current_selection.original_name,
            "original_language":f_bandierina(current_selection.original_language),
            "stelline":f_stelline(current_selection.vote_count),
            "img_src":ritorno_url(current_selection.poster_path),
            "overview":current_selection.overview,
        };
        // Ingetto le variabili nella funzione template:
        var html_finale = template_function(variabili);
        $(".film-container").append(html_finale);
        // Inserisco una funzione che mi fa lo "switch" tra scheda del film e dettagli!
        nice_hover();
    };
}
//
// FUNZIONE DI RITORNO URL POSTER
//
function ritorno_url(percorso){
    var img_src = "https://image.tmdb.org/t/p/"+"w342/"+percorso;
    if (percorso == null) {
        img_src = "http://story-one.com/wp-content/uploads/2016/02/Poster_Not_Available2.jpg";
    };
    return img_src
}
//
// FUNZIONE DI EFFETTO HOVER
//
function nice_hover(){
    $(".film-box").hover(function(){
        $(this).children(".text-box").addClass("active");
        $(this).children("img").removeClass("active");
    },function(){
        $(this).children(".text-box").removeClass("active");
        $(this).children("img").addClass("active");
    })
}
//

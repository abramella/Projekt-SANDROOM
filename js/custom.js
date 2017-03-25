$(document).ready(function () {

    //Top slider
    $('#top-slider').carousel({
        interval: 4000
    });

    //menu dla nagłówka
    var links = $('.main-nav-list').find('a');

    links.on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');


        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 2000);

    });
    //menu active link
    var activeLink = $('.main-nav-list').find('a');

    activeLink.on('click', function (e) {
        e.preventDefault();
        $('li a').removeClass("menu-link-active");
        $(this).addClass("menu-link-active");
    });
    //google map blocker

    $('.maps').click(function () {
        $('.maps iframe').css("pointer-events", "auto");
    });

    $('.maps').mouseleave(function () {
        $('.maps iframe').css("pointer-events", "none");
    });
    //formularz_short
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('.reservation-row').click(function () {

        var form = $(this).closest('.mailForm');
        var email = $(form).find('[name=email]').val();
        var phone = $(form).find('[name=phone]').val();
        var intRegex = /[0-9\) -+\(]{6,12}$/;
        var d1 =  $(form).find('[name=date_from]').datepicker("getDate");
        var d2 =  $(form).find('[name=date_to]').datepicker("getDate");

        if ($(form).find('[name=name]').val().trim().length == 0) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Uzupełnij pole IMIĘ");
            return false;
        }
        if (!intRegex.test(phone)) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Niepoprawny format numeru TELEFONU");
            return false;
        }
        if (!isEmail(email)) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Niepoprawny format adresu EMAIL");
            return false;
        }
        if (d1 === null) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Uzupełnij datę PRZYJAZDU");
            return false;
        }
        if (d2 === null) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Uzupełnij datę WYJAZDU");
            return false;
        }
        if (d1>=d2) {
            $('#myDialog').dialog();
            $('#myDialogText').text("Zmień datę WYJAZDU");
            return false;
        }

        $.ajax({
            type: "POST",
            url: 'marta_form/form.php',
            data: {
                name: $(form).find('[name=name]').val(),
                phone: $(form).find('[name=phone]').val(),
                email: $(form).find('[name=email]').val(),
                date_from: $(form).find('[name=date_from]').val(),
                date_to: $(form).find('[name=date_to]').val(),
            },
            success: function () {
                $('#myDialog').dialog();
                $('#myDialogText').text("Twoja wiadomość została wysłana. Odpowiemy w ciągu 24h.");
            },
            error: function () {
                $('#myDialog').dialog();
                $('#myDialogText').text("Twoja wiadomość nie została wysłana. Skontaktuj się z nami pod numerem 501 341 277");
            }
        });



    });



    //animacja pojawiania się sekcji

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() * 0.75 > $('.photo-bar-all').offset().top) {
            $('.photo-bar-all:not(.run)').addClass('run');
        }
    });


    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() * 0.75 > $('.hotel-single:first').offset().top) {
            $('.hotel-single:not(.run)').addClass('run');
        }
    });

    $("input.dateFrom").datepicker({
        minDate: 0
    });
    $("input.dateTo").datepicker({
        minDate: 0 + 1
    });

});

// Data picker
$(function () {
    $(".datepicker").datepicker($.datepicker.regional["pl"]);
});
/* Polish initialisation for the jQuery UI date picker plugin. */
/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
}(function (datepicker) {

    datepicker.regional.pl = {
        closeText: "Zamknij",
        prevText: "&#x3C;Poprzedni",
        nextText: "Następny&#x3E;",
        currentText: "Dziś",
        monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
	"Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        monthNamesShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze",
	"Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So"],
        dayNamesMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
        weekHeader: "Tydz",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    datepicker.setDefaults(datepicker.regional.pl);

    return datepicker.regional.pl;

}));

$(document).ready(function(){

    $('tr.class_name_row').click(function(event){
        const $tds = $(this).siblings();
        $tds.toggle();
    })

});
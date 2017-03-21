$(document).ready(function() {

    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.pb-btn').on('click', function() {
        $('.pb-btn').removeClass('active');
        $(this).addClass('active');
    });

    $('tr').mouseover(function() {
        $(this).addClass('active');
    });

    $('tr').mouseleave(function() {
        $(this).removeClass('active');
    });

    $('#pb-form-leave').on('submit', function() {

        var typeLeave = 'расход';
        var dateLeave = $('#pb-date').val();
        var categoryLeave = $('#pb-tag').val();
        var descriptionLeave = $('#pb-desc').val();
        var sumLeave = $('#pb-sum').val();

        var dataLeave = {type: typeLeave, date: dateLeave, category: categoryLeave, description: descriptionLeave, sum: sumLeave};

        // console.log(sumLeave);

        $.ajax({
            type: 'POST',
            url: '/',
            data: dataLeave,
            success: function(data) {
                    location.reload();
            }
        });
        return false;
    });
});

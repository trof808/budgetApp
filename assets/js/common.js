$(document).ready(function() {

    $('.nav-item').on('click', function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.pb-btn').on('click', function() {
        $('.pb-btn').removeClass('active');
        $(this).addClass('active');

        if($('.pb-btn-profit').hasClass('active')) {
            $('.pb-tr-expens').fadeOut();
            $('.pb-tr-profit').fadeIn();
        } else if($('.pb-btn-leave').hasClass('active')){
            $('.pb-tr-profit').fadeOut();
            $('.pb-tr-expens').fadeIn();
        } else if($('.pb-btn-all').hasClass('active')) {
            $('.pb-tr-profit').fadeIn();
            $('.pb-tr-expens').fadeIn();
        }
    });

    $('tr').mouseover(function() {
        $(this).addClass('active');
    });

    $('tr').mouseleave(function() {
        $(this).removeClass('active');
    });

    function editModalData(editOptions) {
        var catExpense = ["Питание", "Развлечение", "Транспорт", "Другое"];
        var catProfit = ["Заплата", "Другое"];

        // var editOptions = editOptions;
        $('#editItem #pb-date-item').val(editOptions.date);
        $('#editItem #pb-tag-item').val(editOptions.category);
        $('#editItem #pb-desc-item').val(editOptions.description);
        $('#editItem #pb-sum-item').val(editOptions.sum);
        $('#editItem #editItemLabel').text(editOptions.type);
        $('#editItem #pb-id-item').val(editOptions._id);

        if((editOptions.type == 'расход') && ($('select[id="pb-tag-item"] option').length == 0)) {
            catExpense.forEach(function(item, i) {
                $('#editItem #pb-tag-item').prepend('<option>'+item+'</option>');
            });
        } else if((editOptions.type == 'доход') && ($('select[id="pb-tag-item"] option').length == 0)){
            catProfit.forEach(function(item, i) {
                $('#editItem #pb-tag-item').prepend('<option>'+item+'</option>');
            });
        }
    }

    $('#editItem .close').on('click', function(e) {
        $('#pb-tag-item').empty();
    });

    $('#pb-form-edit').on('submit', function() {
        var updateId = $('#pb-id-item').val();
        var updateDate = $('#pb-date-item').val();
        var updateCat = $('#pb-tag-item :selected').val();
        var updateDesc = $('#pb-desc-item').val();
        var updateSum = $('#pb-sum-item').val();

        var updateData = {date: updateDate, category:updateCat, description: updateDesc, sum: updateSum};

        $.ajax({
            type: 'PUT',
            url: '/'+updateId,
            data: updateData,
            success: function(data) {
                location.reload();
            }
        });
    });

    $('.pb-btn-edit').on('click', function() {
        var editId = $(this).data('edit');

        $.get({
            url: '/' + editId,
            success: function(data) {
                var editOptions = data;
                editModalData(editOptions);
            }
        })
    });

    $('#pb-form-leave').on('submit', function() {

        var typeLeave = 'расход';
        var dateLeave = $('#pb-date').val();
        var categoryLeave = $('#pb-tag').val();
        var descriptionLeave = $('#pb-desc').val();
        var sumLeave = $('#pb-sum').val();

        var dataLeave = {type: typeLeave, date: dateLeave, category: categoryLeave, description: descriptionLeave, sum: sumLeave};

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

    $('#pb-form-profit').on('submit', function() {

        var typeProfit = 'доход';
        var dateProfit = $('#pb-date-profit').val();
        var categoryProfit = $('#pb-tag-profit').val();
        var descriptionProfit = $('#pb-desc-profit').val();
        var sumProfit = $('#pb-sum-profit').val();

        var dataLeave = {type: typeProfit, date: dateProfit, category: categoryProfit, description: descriptionProfit, sum: sumProfit};

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

    $('.pb-btn-close').on('click', function() {
        var itemId = $(this).data('close');

        $.ajax({
            type: 'DELETE',
            url: '/'+itemId,
            success: function(data) {
                location.reload();
            }
        });
    });
});

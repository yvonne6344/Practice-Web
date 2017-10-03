$(function () {
    $('#header-icon').click(function () {
        location.reload();
    });

    $('[data-toggle=tooltip]').tooltip();

    $('.nav-btn').click(function () {
        var $this = $(this);
        var _clickTab = $this.find('a').attr('target');
        $.get(_clickTab, function (data) {
            $(".index-content").html(data);
        });
    });
})

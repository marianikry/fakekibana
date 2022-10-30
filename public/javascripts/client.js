$(document).ready(function () {

    $('#logsContainer').DataTable({
        ajax: "/api/log",
        deferRender: true,
        scrollCollapse: true,
        scroller: true
    });
});
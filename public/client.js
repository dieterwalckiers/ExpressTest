$(function() {
    $.get("/blocks", appendToList);

    $("form").on("submit", function(event) {
        event.preventDefault();
        var form = $(this);
        var blockData = form.serialize(); // transforms form data to URL-encoded notation
        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData
        }).done(function(blockName) {
            appendToList([blockName]);
            form.trigger("reset");
        });
    }); 

    function appendToList(blocks) {
        var list = [];
        var content, block;
        for (var i in blocks) {
            block = blocks[i];
            content = '<a href="/blocks/' + block + '">' + block + '</a>' +
                '<a href="#" data-block="' + block + '">X</a>';
            list.push($("<li>", {
                html: content
            })); // interesting jquery
        }
        $(".block-list").append(list); // interesting jquery
    }

    $(".block-list").on("click", "a[data-block]", function(event) { // interesting jquery
        if (!confirm("Are you sure?")) {
            return false;
        }
        var target = $(event.currentTarget); // get link that triggered it

        $.ajax({
            type: 'DELETE',
            url: '/blocks/' + target.data('block')
        }).done(function() {
            target.parents("li").remove();
        });
    });

});

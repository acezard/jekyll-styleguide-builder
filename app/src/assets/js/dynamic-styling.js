var $ = require('../../../config/node_modules/jquery');


    /* Dynamic Styling ------------------ */

    // Links
    $('.field-style a').each(function() {
        var $this = $(this);

        $this.attr(
            'style',
            $this
            .next('pre')
            .children('code')
            .text()
            .replace(/a \{|\s*(?:\r|\n|\r\n)\s*|\}/g, '')
        );
    });

    // Color box
    $('.field-style .colored').each(function() {
        var $this = $(this);

        $this.css(
            'background',
            $this
            .next('pre')
            .children('code')
            .text()
            .split(':')
            [1].trim()
            .replace(';','')
            
        );

    });

    // LESS code blocks
    var $less = $('.field-style .less');
    if ($less.length) {
        $less.html(
            $less
            .html()
            .replace(
                /(none)|(decimal)|(inside)|(hidden)/g,
                '<span class="value">$&</span>'
            )
            .replace(
                /(em)|(px)/g,
                '<span class="unit">$&</span>'
            )
        );
    }

    /* Code blocks trigger ------------------ */

    // Button markup
    var button =
        '<button type="button" href="javascript:;"' +
        'class="btn btn-primary show-code">' +
        'Voir CSS</button>';

    // Button generator
    $('pre')
        .before(button);

    // Animation
    $('.show-code').on('click', function() {
        $(this)
            .next('pre')
            .slideToggle();
        return false;
    });


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

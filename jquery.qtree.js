(function( $ ) {

    // plugin definition
    $.fn.qtree = function( options ) {

        // build main options before element iteration
        var opts = $.extend( {}, $.fn.qtree.defaults, options );

        return this.each(function() {
            var $this = $( this );

            // build element specific options
            // This changed line tests to see if the Metadata Plugin is installed,
            // and if it is, it extends our options object with the extracted metadata.
            var o = $.meta ? $.extend( {}, opts, $this.data() ) : opts;

            var test = new Question(opts.data, this).show();
        });

    };

    $.fn.qtree.defaults = {
        data: {
            "question": "You should enter your own data...",
            "choices": [
                {
                    "choice": "Yes I will!"
                }
            ]
        }
    };

    function Question(question, parent) {
        this.data = question;
        this.question = question.question;
        this.choices = new Array();

        for(var i = 0; i < this.data.choices.length; i++) {
            this.choices.push(new Choice(this.data.choices[i], parent));
        }

        this.render = function() {
            var result = '<div class="qtree-question">';
            result += '<h4>';
            result += this.question;
            result += '</h4>';
            result += '<select>';
            result += '<option value="-1">';
            result += this.data.default;
            result += '</option>'

            for(var i = 0; i < this.choices.length; i++) {
                result += '<option value="'+i+'">';
                result += this.choices[i].choice;
                result += '</option>';
            }

            result += '</select>';
            result += '</div>';
            return result;
        }

        this.show = function() {
            this.domelement.show();
        }

        this.hide = function() {
            this.domelement.hide();
            this.hide_choices();
        }

        this.hide_choices = function() {
            for(var i = 0; i < this.data.choices.length; i++) {
                this.choices[i].hide();
            }
        }

        this.domelement = $(this.render());
        $(parent).prepend(this.domelement.hide());

        var self = this;
        this.domelement.on('change',function(e) {
            var index = $(e.target).val();
            self.hide_choices();
            self.choices[index].show();
        });
    }

    function Choice(choice, parent) {
        this.data = choice;
        this.choice = choice.choice;

        if (choice.question !== undefined)
            this.question = new Question(choice.question, parent);

        if (choice.answer !== undefined)
            this.answer = new Answer(choice.answer, parent);

        this.show = function() {
            if (this.question !== undefined)
                this.question.show();

            if (this.answer !== undefined)
                this.answer.show();
        }

        this.hide = function() {
            if (this.question !== undefined)
                this.question.hide();

            if (this.answer !== undefined)
                this.answer.hide();
        }
    }

    function Answer(answer, parent) {
        this.data = answer;
        this.answer = answer;

        this.render = function() {
            var result = '<div class="qtree-answer">';
            result += this.answer;
            result += '</div>';
            return result;
        }

        this.show = function() {
            this.domelement.show();
        }

        this.hide = function() {
            this.domelement.hide();
        }

        this.domelement = $(this.render());
        $(parent).prepend(this.domelement.hide());
    }

// end of closure
})( jQuery );
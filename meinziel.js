function Question(question) {
    this.data = question;
    this.question = question.question;
    this.choices = new Array();

    for(var i = 0; i < this.data.choices.length; i++) {
        this.choices.push(new Choice(this.data.choices[i]));
    }

    this.render = function() {
        var result = '<div class="meinziel-question">';
        result += this.question;
        result += '<select>';
        result += '<option value="-1">Bitte auswählen</option>'

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
    $('body').prepend(this.domelement.hide());

    var self = this;
    this.domelement.on('change',function(e) {
        var index = $(e.target).val();
        self.hide_choices();
        self.choices[index].show();
    });
}

function Choice(choice) {
    this.data = choice;
    this.choice = choice.choice;

    if (choice.question !== undefined)
        this.question = new Question(choice.question);

    if (choice.answer !== undefined)
        this.answer = new Answer(choice.answer);

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

function Answer(answer) {
    this.data = answer;
    this.answer = answer;

    this.render = function() {
        var result = '<div class="meinziel-answer">';
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
    $('body').prepend(this.domelement.hide());
}
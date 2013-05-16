# jQuery QTree
#### Question and answer tree for jQuery

First of all I didn't know what to call this plugin, so if anyone has a good name for what is going on, feel free to help me out!
For what it does, checkout the [DEMO](http://rootman.github.io/jquery-qtree/)!

Usage
-----

Just include the script after including jQuery.

``` html
<script src='jquery.js'></script>
<script src='jquery.qtree.js'></script>
```

Create a parent element in your HTML markup

``` html
<div id="qtree"></div>
```

Initialize qtree

``` javascript
$('#qtree').qtree({data: data});
```

data is the source data object

``` javascript
var data = {
    "question": "This is the first question, right?",
    "default": "Please choose",
    "choices": [
        {
            "choice": "Sure is!",
            "question": {
                "question": "Do you want another question?",
                "default": "Please choose",
                "choices": [
                    {
                        "choice": "Sure Do!",
                        "question": {
                            "question": "Here it goes. Is it the last question?",
                            "choices": [
                                {
                                    "choice": "Guess it is",
                                    "answer": "Spot on!"
                                },
                                {
                                    "choice": "I think there is another one",
                                    "answer": "No, you were wrong. No other question for you my friend."
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            "choice": "NO",
            "question": {
                "question": "You know, it was the first question, right?",
                "default": "Please choose",
                "choices": [
                    {
                        "choice": "Yes sure...",
                        "answer": "Okay, fair enough..."
                    }
                ]
            }
        },
        {
            "choice": "Maybe",
            "answer": "Not very decisive are you?"
        }
    ]
}
```

This example should be pretty self-explanatory. You can extend the tree indefinitely!
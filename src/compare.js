(function(window, document, undefined) {
    "use strict";

    var inputParams = {
        mode : 'javascript',
        lineNumbers : true,
        matchBrackets : true
    };
    var resultParams = {
        mode : 'javascript',
        lineNumbers : true,
        readOnly : true,
        lineWrapping : true
    };

    var beforeEditor =  window.CodeMirror.fromTextArea(document.getElementById('before'), inputParams);
    var afterEditor =  window.CodeMirror.fromTextArea(document.getElementById('after'), inputParams);

    var resAdded = window.CodeMirror(document.getElementById('result_added'), resultParams);
    var resRemoved = window.CodeMirror(document.getElementById('result_removed'), resultParams);
    var resChanged = window.CodeMirror(document.getElementById('result_changed'), resultParams);

    var form = document.forms[0];

    function compare(e) {
        e.preventDefault();

        var beforeRawVal = beforeEditor.getValue();
        var afterRawVal = afterEditor.getValue();

        try {
            var beforeVal = eval('(' + beforeRawVal + ')');
        } catch (ex) {
            beforeVal = {};
        }

        try {
            var afterVal = eval('(' + afterRawVal + ')');
        } catch (ex) {
            afterVal = {};
        }

        var result = window.queryParser.compare(beforeVal, afterVal);

        resAdded.setValue(JSON.stringify(result.added, null, 4));
        resRemoved.setValue(JSON.stringify(result.removed, null, 4));
        resChanged.setValue(JSON.stringify(result.changed, null, 4));

        window.history.pushState({}, document.title,
            window.queryParser.buildQuery(
                '', {
                before: window.queryParser.buildQuery(beforeVal),
                after: window.queryParser.buildQuery(afterVal)
            })
        );
    }

    function prepare(e) {
        var qs = queryParser.parse(window.location.search);

        beforeEditor.setValue(JSON.stringify(queryParser.parse(qs.before), null, 4));
        afterEditor.setValue(JSON.stringify(queryParser.parse(qs.after), null, 4));

        compare(e);
    }


    window.addEventListener('load', prepare);

    form.addEventListener('submit', compare);
})(window, document, undefined);

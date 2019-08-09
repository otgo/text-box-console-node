const createTextBox = require('text-box');
const callback = text => console.log(text + '\n');
createTextBox({
    text: [
        'Error!',
        'This is a test of type error.'
    ],
    align: 'center',
    type: 'error'
}, callback);
createTextBox({
    text: [
        'Information',
        'This is a test of type information.'
    ],
    align: 'center',
    type: 'information'
}, callback);
createTextBox({
    text: [
        'Warning!',
        'This is a test of type information.'
    ],
    align: 'center',
    type: 'warning'
}, callback);
createTextBox({
    text: [
        'Custom',
        'This is a test of type custom.'
    ],
    align: 'center',
    type: 'custom'
}, callback);
createTextBox({
    text: [
        'Custom bold',
        'This is a test of type custom with bold.'
    ],
    align: 'center',
    type: 'custom',
    color: '1'
}, callback);

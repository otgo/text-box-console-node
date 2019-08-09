'use strict'
function longest(splitted_text) {
    var longest = 0
    splitted_text.forEach(entry => {
        var byteLength = Buffer.byteLength(entry);
        longest = longest > byteLength ? longest : byteLength;
    });
    return longest;
}
function isPair(n) {
   return n % 2 == 0;
}
function generateBox(splitted_text, align, type, color) {
    var longest_text = longest(splitted_text);
    var bars = '─'.repeat(longest_text);
    var content = []
    content.push('┌' + bars + '┐');
    splitted_text.forEach(entry => {
        switch (align) {
            case 'center':
                var diff = bars.length - entry.length;
                diff/=2;
                diff=Math.round(diff);
                var spaces = ' '.repeat(diff);
                var text =  spaces + entry;
                var last_repeat = diff;
                if (!isPair(bars.length)) {
                    if (isPair(Buffer.byteLength(entry))) {
                        last_repeat--;
                    }
                }
                text = ' '.repeat(last_repeat) + entry;
                content.push('│' + text + spaces  + '│')
                break;
            case 'right':
                var diff = bars.length - entry.length;
                var spaces = ' '.repeat(diff);
                content.push('│' + spaces + entry + '│');
                break;
            default:
            case 'left':
                var diff = bars.length - entry.length;
                var spaces = ' '.repeat(diff);
                content.push('│' + entry + spaces + '│');
                break;
        }
    });
    content.push('└' + bars + '┘');
    var output = ''
    content.forEach(element => {
        switch (type) {
            default:
            case 'custom':
                if (typeof(color) == 'string') output += `\x1b[${color}m${element}\x1b[0m\n`;
                else output += `${element}\n`;
                break;
            case 'warning':
                output += `\x1b[103;30;1m${element}\x1b[0m\n`;
                break;
            case 'information':
                output += `\x1b[44;37;1m${element}\x1b[0m\n`;
                break;
            case 'error':
                output += `\x1b[41;37;1m${element}\x1b[0m\n`;
                break;
        }
    });
    output = output.substring(0, output.length-1);
    return output;
}
async function createTextBox(dat, callback) {
    var text_array = typeof(dat.text) == 'object' ? dat.text : ['Error!', 'Array text not specified.'];
    var align = typeof(dat.align) == 'string' ? dat.align : 'center';
    var type = typeof(dat.type) == 'string' ? dat.type : 'error';
    new Promise((resolve, reject) => {
        var operatorArray = []
        text_array.forEach(text => {
            text.split(/\r?\n/).forEach(entry => {
                operatorArray.push(entry);
            });
        })
        resolve(operatorArray);
    }).then(TextArray => {
        (async textBox => { callback(textBox); } )(generateBox(TextArray, align, type, dat.color));
    })
}
module.exports = createTextBox;

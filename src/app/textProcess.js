const validate = require('./validateArg');

class TextProcess {
    parsingText(text) {
        validate.textArg(text);

        let splitToParagraph = text.split(/[\r\n|\n]/).filter(line => line !== '');
        return splitToParagraph;
    }

    splitToTextAndTime(arr) {
        validate.arrayArg(arr);

        let start_time = [];
        let finish_time = [];
        let txt = [];

        arr.forEach(item => {
            if (item.match(/[A-Za-z]/g)) {
                txt.push(item.replace("‫", ""));
            } else if (item.includes('-->')) {
                start_time.push(item.split('-->')[0].trim());
                finish_time.push(item.split('-->')[1].trim());
            }
        });

        return { start_time, finish_time, txt }
    }

    convertObjToSrtData(obj) {
        validate.objectArg(obj);

        const { txt, start_time, finish_time } = obj;
        let tempArr = [];
        if (txt.length !== start_time.length ||
            start_time.length !== finish_time.length) 
            throw Error("Check .srt file. Time length and text length should be equal.");
    
        for (let i = 0; i < txt.length; i++) {
            tempArr.push({
                start_time: start_time[i],
                finish_time: finish_time[i],
                txt: txt[i]
            });
        }
        return tempArr;
    }

    compliteSentence(arr) {
        validate.arrayArg(arr);

        let tempArr = [];
        let num = 1;
        let isExtant = false;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].txt.match(/[\.\.\.\,\?\!]$/g)) {
                tempArr.push({
                    num,
                    start_time: arr[i].start_time,
                    finish_time: arr[i].finish_time,
                    txt: arr[i].txt
                });
            } else {
                tempArr.push({
                    num,
                    start_time: arr[i].start_time,
                    finish_time: arr[i + 1].finish_time,
                    txt: arr[i].txt + ' ' + arr[i + 1].txt
                });
                isExtant = true;
                arr.splice(i + 1, 1);
            }
            num++;
        }

        if (isExtant) return this.compliteSentence(tempArr);

        return tempArr;
    }

    convertToText(arr) {
        validate.arrayArg(arr);

        return arr.reduce((text, srt) => {
            text += srt.num + '\n',
            text += srt.start_time + '-->' + srt.finish_time + '\n',
            text += srt.txt + '\n\n'

            return text;
        }, "");
    }
}

module.exports = new TextProcess();
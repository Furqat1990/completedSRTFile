const fs = require('fs');
const path = require('path');

const fullPath = path.join(process.cwd(), 'public/subtitle.srt');

const fileProcess = require('./src/app/fileProcess');
const textProcess = require('./src/app/textProcess');

fileProcess.isExist(fs, path, fullPath);

const readFile = fileProcess.read(fs, fullPath);
const splited = textProcess.parsingText(readFile);
const parsedByRowStr = textProcess.parsingByRowStr(splited);
const objFromTextAndTime = textProcess.splitToTextAndTime(parsedByRowStr);
const convertedObjToSrtDates = textProcess.convertObjToSrtData(objFromTextAndTime);
const comletedSentences = textProcess.compliteSentence(convertedObjToSrtDates);
const srtText = textProcess.convertToText(comletedSentences);

fileProcess.write(fs, path, fullPath, srtText);
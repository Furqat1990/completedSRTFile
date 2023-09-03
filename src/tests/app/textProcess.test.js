const textProcess = require('../../app/textProcess');

describe('TextProcess', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    const checkUndefinedAndNonEmptyAndTypeOfArray = method => {
        it('should throw an error when Array is an empty', () => {
            expect(() => method([])).toThrow('Array should not be an empty');
        });

        it('should throw an error when Array is undefined', () => {
            expect(() => method()).toThrow('Array should not be undefined');
        });

        it('should throw an error when Array type is not an array', () => {
            expect(() => method({name:'None array'})).toThrow('Argument must be an array');
        });
    }

    const checkUndefinedAndNonEmptyOfObject = method => {
        it('should throw an error when Object is an empty', () => {
            expect(() => method({})).toThrow('Object should not be an empty');
        });

        it('should throw an error when Object is undefined', () => {
            expect(() => method()).toThrow('Object should not be undefined');
        });
    }

    const checkUndefinedAndNonEmptyAndTypeOfText = method => {
        it('should throw an error when Text is an empty', () => {
            expect(() => method('')).toThrow('Text should not be an empty');
        });

        it('should throw an error when Text is undefined', () => {
            expect(() => method()).toThrow('Text should not be undefined');
        });

        it('should throw an error when Text type is not an string', () => {
            expect(() => method({name:'None string'})).toThrow('Argument must be a string');
        });
    }

    describe('Parsing text', () => {
        checkUndefinedAndNonEmptyAndTypeOfText(textProcess.parsingText);
    
        it("should do parsing of text", () => {
            const text = 'Text1\nText2\nText3\nText4';
            const returnedText = ['Text1', 'Text2', 'Text3', 'Text4'];
            const mock = jest.spyOn(textProcess, 'parsingText');
    
            textProcess.parsingText(text);
    
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(text);
            expect(mock).toHaveReturnedWith(returnedText);
        });
    });
    
    describe('SplitToTextAndTime', () => {
        checkUndefinedAndNonEmptyAndTypeOfArray(textProcess.splitToTextAndTime);

        it('should return splited text and time', () => {
            const arg = [  
                '1',
                '00:00:00,005 --> 00:00:04,006',
                'Unit testing requires isolation of the target code',
                '2',
                '00:00:04,006 --> 00:00:08,003',
                'However, due to the power of (faintly speaking) Modularity,'
            ];

            const obj = {
                start_time: ['00:00:00,005', '00:00:04,006'],
                finish_time: ['00:00:04,006', '00:00:08,003'],
                txt: ['Unit testing requires isolation of the target code', 
                      'However, due to the power of (faintly speaking) Modularity,']
            };

            const mock = jest.spyOn(textProcess, 'splitToTextAndTime');

            expect(textProcess.splitToTextAndTime(arg)).toEqual(obj);
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(arg);
            expect(mock).toHaveReturnedWith(obj);
        });
    });

    describe('convertObjToSrtData', () => {
        checkUndefinedAndNonEmptyOfObject(textProcess.convertObjToSrtData);

        it('should return array .srt dates', () => {
            const data = {
                start_time: ['00:00:00,005', '00:00:04,006'],
                finish_time: ['00:00:04,006', '00:00:08,003'],
                txt: ['Unit testing requires isolation of the target code', 
                      'However, due to the power of (faintly speaking) Modularity,']
            };
            const exp = [
                {
                  start_time: '00:00:00,005',
                  finish_time: '00:00:04,006',
                  txt: 'Unit testing requires isolation of the target code'
                },
                {
                  start_time: '00:00:04,006',
                  finish_time: '00:00:08,003',
                  txt: 'However, due to the power of (faintly speaking) Modularity,'
                }
            ];

            const mock = jest.spyOn(textProcess, 'convertObjToSrtData');

            expect(textProcess.convertObjToSrtData(data)).toEqual(exp);
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(data);
        });
    });

    describe('compliteSentence', () => {
        checkUndefinedAndNonEmptyAndTypeOfArray(textProcess.compliteSentence);

        it('should return completed sentences array', () => {
            const data = [
                {
                  start_time: '00:00:00,005',
                  finish_time: '00:00:04,006',
                  txt: 'Unit testing requires isolation of the target code'
                },
                {
                  start_time: '00:00:04,006',
                  finish_time: '00:00:08,003',
                  txt: 'However, due to the power of (faintly speaking) Modularity,'
                }
            ];

            const exp = [
                {
                    num: 1,
                    start_time: '00:00:00,005',
                    finish_time: '00:00:08,003',
                    txt: 'Unit testing requires isolation of the target code However, due to the power of (faintly speaking) Modularity,'
                }
            ]

            const mock = jest.spyOn(textProcess, 'compliteSentence');

            expect(textProcess.compliteSentence(data)).toEqual(exp);
            expect(mock).toHaveBeenCalledWith(data);
            expect(mock).toHaveReturnedWith(exp);
        });
    });

    describe('convertToText', () => {
        checkUndefinedAndNonEmptyAndTypeOfArray(textProcess.convertToText);

        it('should return string', () => {
            const data = [
                {
                    num: 1,
                    start_time: '00:00:00,005',
                    finish_time: '00:00:08,003',
                    txt: 'Unit testing requires isolation of the target code However, due to the power of (faintly speaking) Modularity,'
                }
            ];
            const exp = '1\n00:00:00,005-->00:00:08,003\nUnit testing requires isolation of the target code However, due to the power of (faintly speaking) Modularity,\n\n';
            
            const mock = jest.spyOn(textProcess, 'convertToText');

            expect(textProcess.convertToText(data)).toBe(exp);
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(data);
            expect(mock).toHaveReturnedWith(exp);
        });
    });
});
const fs = require('fs');
const path = require('path');

const fileProcess = require('../../app/fileProcess');

describe("FileProcess", () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    const fullPath = path.join(process.cwd(), 'public/subtitle.srt');

    function isEmptyModule(fs, path, moduleName) {
        it(`should return error if ${moduleName} module is empty`, () => {
            expect(() => fileProcess.isExist(fs, path)).toThrow(`${moduleName} should not be empty`);
        });
    }

    function isEmptyFullPath(fs, fullPath) {
        it('should return error if fullPath is empty', () => {
            expect(() => fileProcess.read(fs, fullPath)).toThrow('fullPath should not be empty');
        });   
    }

    describe("isExistFile", () => {
        isEmptyModule('', path, 'Fs');
        isEmptyModule(fs, '', 'Path');

        it("should return undefined if file is exist", () => {
            const mock = jest.spyOn(fileProcess, 'isExist');

            expect(fileProcess.isExist(fs, path, fullPath)).toBeUndefined();
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(fs, path, fullPath);
            expect(mock).toHaveReturnedWith(undefined);
        });      
    });

    describe('Read a .srt file', () => {
        isEmptyModule('', path, 'Fs');
        isEmptyFullPath(fs, '')

        it("should read a file and return file content", () => {
            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            const mock = jest.spyOn(fileProcess, 'read');

            expect(fileProcess.read(fs, fullPath)).toBe(fileContent);
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(fs, fullPath);
        });        
    });

    describe('Write to a new .srt file', () => {
        isEmptyModule('', path, 'Fs');
        isEmptyModule(fs, '', 'Path');
        isEmptyFullPath(fs, '');

        it('should write a file and log the path', () => {
            const textContent = "Hello world";
            const outputPath = path.join(path.dirname(fullPath), 'completedSrt.srt');
            const mockFs = jest.spyOn(fs, 'writeFileSync');
            const mockLog = jest.spyOn(console, 'log');

            fileProcess.write(fs, path, fullPath, textContent);

            expect(mockFs).toHaveBeenCalledTimes(1);
            expect(mockFs).toHaveBeenCalledWith(outputPath, textContent);

            const logMessage = `.srt file is created in \u001b[42m${outputPath}\u001b[0m`;

            expect(mockLog).toHaveBeenCalledWith(logMessage);
        });
    });
});
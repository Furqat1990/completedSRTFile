let fs = require('fs');
let path = require('path');

const fileProcess = require('../../app/fileProcess');

describe("FileProcess", () => {
    beforeEach(() => {
        fs = jest.createMockFromModule('fs');
    });

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
        
        it("should return true if a file is exist", () => {
            jest.spyOn(fs, 'existsSync').mockReturnValue(true);

            let mock = jest.spyOn(fileProcess, 'isExist');

            expect(fileProcess.isExist(fs, path, fullPath)).toBe(true);
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(fs, path, fullPath);
        });
        
        it("should return throw an error if file isn't exist", () => {
            jest.spyOn(fs, 'existsSync').mockReturnValue(false);

            let mock = jest.spyOn(fileProcess, 'isExist');

            expect(() => fileProcess.isExist(fs, path, fullPath)).toThrow('Subtitle file does not exist');
            expect(mock).toHaveBeenCalledTimes(1);
            expect(mock).toHaveBeenCalledWith(fs, path, fullPath);
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

        it('should write to a file and log the path', () => {
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
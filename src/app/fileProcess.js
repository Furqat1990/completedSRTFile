class FileProcess {
    isEmpty(path, name) {
        if (!path) throw new Error(`${name} should not be empty`); 
    }

    isExist(fs, path, fullPath) {
        this.isEmpty(fs, 'Fs');
        this.isEmpty(path, 'Path');
    
        const fileExist = fs.existsSync(fullPath);

        if (!fileExist) throw new Error('Subtitle file does not exist');
    }

    read(fs, fullPath) {
        this.isEmpty(fs, 'Fs');
        this.isEmpty(fullPath, 'fullPath');
        
        return fs.readFileSync(fullPath, 'utf-8');
    }

    write(fs, path, fullPath, text) {
        let outputPath = path.join(path.dirname(fullPath), 'completedSrt.srt');
        fs.writeFileSync(outputPath, text);

        console.log(`.srt file is created in \u001b[42m${outputPath}\u001b[0m`);
    }
}

module.exports = new FileProcess();
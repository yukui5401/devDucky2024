const { exec } = require('child_process');

const runJslint = async (inputFile) => {
    const command = `npx eslint ${inputFile} --format json --output-file eslint-report.json`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr ${stderr}`);
    })
}

module.exports = {
    runJslint
}



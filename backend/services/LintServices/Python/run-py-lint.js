const { exec } = require('child_process');
const fs = require('fs');

const runPylint = async (file) => {
    try {
        const command = `pylint ${file} --output-format=json`;
        exec(command, (error, stdout, stderr) => {
            fs.writeFile('pylint-report.json', stdout, (err) => {

                if (err) {
                    console.log(err);
                }
                console.log("Successfully written to file.");
            }
            );
            console.log(`stdout: ${stdout}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { runPylint };
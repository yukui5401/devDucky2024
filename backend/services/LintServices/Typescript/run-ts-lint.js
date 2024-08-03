const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const lintTypeScript = (inputDir) => {
    try {
        // Ensure the directory exists
        if (!fs.existsSync(inputDir)) {
            console.error(`Input directory does not exist: ${inputDir}`);
            return;
        }

        // Construct the command to lint TypeScript files
        const command = `npx eslint ${inputDir} --format json --output-file ts-output`;

        // Execute the command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ESLint: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`ESLint stderr: ${stderr}`);
                return;
            }
        });
    } catch (err) {
        console.error(`Failed to lint TypeScript files: ${err}`);
    }
};

module.exports = { lintTypeScript };

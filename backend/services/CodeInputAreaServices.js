const { exec } = require('child_process');
const fs = require('fs');

const lintCode = async (code) => {
    try {
        fs.writeFileSync('code.py', code);
        exec('pylint code.py', (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });
    } catch (error) {
        console.log(error);
    }
}


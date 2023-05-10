import inquirer from 'inquirer';
import isElevated from 'is-elevated';
import * as symlink from './symlink';
import * as path from 'path';
import * as fs from 'fs';
import paths from './paths';
let command = process.argv[2] || 'YOUR-COMMAND';
let isMac = process.platform === 'darwin';

// get info over existing symlink
let activeExists = fs.existsSync(paths.target);
let activeSrc = symlink.getSource(paths.target) || "";
let activeName = path.basename(activeSrc) || "";

// inquirer options (adopts to existing symlink)
let choices: Choices = {
    open: `Open existing symlink in ${isMac ? 'Finder' : 'Explorer'}}`,
    symlinkProject: `Symlink "${paths.projectName}" (start developing)`,
    symlinkDist: `Symlink "${paths.distFolderName}" (test your build)`,
    remove: `Remove symlink "${activeName}"`,
    exit: `Exit`
};
if (!activeExists) {
    delete choices.remove;
    delete choices.open;
}



// main function
async function ask() {

    let hasRights = await isElevated();
    if (!hasRights) {
        if (isMac) {
            console.log(`You need to run this script as root.Please try "sudo ${command}"`);
        } else {
            console.log(`You need to run this script as administrator.If you are using VSCode please relaunch it as administrator.If you are using the command - prompt please relaunch it as administrator.`);
        }
        return;
    }

    if (activeName) {
        console.log(` > Active symlink: "${activeName}"\n`);
    }

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'chooseAction',
                message: `Choose an action:`,
                choices: Object.values(choices)
            },
        ])
        .then(answers => {
            let target = paths.target;
            switch (answers.chooseAction) {

                case choices.symlinkProject || choices.symlinkDist:
                    let src = answers.chooseAction === choices.symlinkProject ? paths.projectFolder : paths.distFolder;
                    try {
                        symlink.link(src, target);
                    } catch (e) {
                        console.log(`\nERROR: \n${e.message} \n`);
                    }
                    break;

                case choices.remove:
                    try {
                        symlink.unlink(paths.target);
                    } catch (e) {
                        console.log(`\nERROR: \n${e.message} \n`);
                    }
                    break;

                case choices.open:
                    symlink.openFolder(activeSrc);
                    break;


            }


        }).catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log('Something went wrong');
            }
        });

}

ask();




/* ---------------------------------- */

interface Choices {
    symlinkProject: string;
    symlinkDist: string;
    remove?: string;
    open?: string;
    exit: string;
}

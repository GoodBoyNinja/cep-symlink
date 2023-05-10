// pure functions to handle symlink.

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as child_process from 'child_process';


const override = true;
const messages = {
    winSymlinkDevError: `--------------------------\nGOOD BOY NINJA SAYS:\nTo successfully create a symlink on windows, make sure you are running VSCode as admin (right click on the icon and select "Run as administrator") or turn on developer mode in windows settings, then try again.\n--------------------------`
};



export function unlink(folder: string) {
    if (fs.existsSync(folder)) {
        fs.unlinkSync(folder);
    }
}
export function link(from: string, to: string) {
    // create the symlink
    validate(to);
    fs.symlinkSync(from, to);
}

export function validate(folder: string) {
    // if the synlink exists, ask the user if they want to remove it and recreate it

    if (override) {
        unlink(folder);
    }

    if (fs.existsSync(folder)) {
        console.log(`\nERROR:\nA symlink already exists at "${folder}"\n If you are sure you want to override this folder, add "--override" to your command`);
        return false;
    }

    return true;
}

export function openFolder(folder: string) {
    if (fs.existsSync(folder)) {
        openExplorerin(folder, (err) => {
            if (err) {
                console.log('Error opening folder: ', err);
            }
        });
    }

}

export function getSource(folder: string) {
    // gets the real path of the symlink
    try {
        return fs.realpathSync(folder);
    }
    catch (e) { }

}

function openExplorerin(path, callback) {
    var cmd = ``;
    switch (os.platform().toLowerCase().replace(/[0-9]/g, ``).replace(`darwin`, `macos`)) {
        case `win`:
            path = path || '=';
            cmd = `explorer`;
            break;
        case `linux`:
            path = path || '/';
            cmd = `xdg-open`;
            break;
        case `macos`:
            path = path || '/';
            cmd = `open`;
            break;
    }
    let p = child_process.spawn(cmd, [path]);
    p.on('error', (err) => {
        p.kill();
        return callback(err);
    });
}
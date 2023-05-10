// important directories and paths for the project
import * as path from 'path';
import * as os from 'os';
let __dirname = process.cwd();
const isMacOS = os.platform() === 'darwin';

const paths = {} as Paths;

// fill it up 
paths.projectName = path.basename(path.join(__dirname, './'));
paths.uniqueProjectName = `com.${paths.projectName.toLowerCase()}.extension`;
paths.extensionsFolder = isMacOS ? path.join(os.homedir(), 'Library/Application Support/Adobe/CEP/extensions') : path.join(os.homedir(), 'AppData/Roaming/Adobe/CEP/extensions');
paths.projectFolder = __dirname;
paths.distFolder = path.join(__dirname, "dist");
paths.distFolderName = path.basename(paths.distFolder);
paths.target = path.join(paths.extensionsFolder, paths.uniqueProjectName);
export default paths;




/* ---------------------------------- */

interface Paths {
    projectName: string;
    extensionsFolder: string;
    projectFolder: string;
    distFolder: string;
    distFolderName: string;
    uniqueProjectName: string;
    target: string;

}
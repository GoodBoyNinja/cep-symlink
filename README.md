# CEP-symlink
A simple command-line tool to create, remove or manage a symlink of your extension in the Adobe CEP extensions folder. Lets you develop your extension in a folder of your choice, as well as test your build before publishing.
# Install
1. Install: `npm i -D cep-symlink`
2. In you package.json add a script: 

```json
"scripts": {
    "symlink": "node node_modules/cep-symlink/dist/cep-symlink.es.js"
  }
```

# Usage
1. Open your extension folder in VSCode (or cd into it in the terminal)
2. run `npm run symlink` to start the symlink process.

The terminal will prompt you to choose your next step:
```
? Choose an action: (Use arrow keys)
    ❯ Symlink "MyTool" (start developing)
    Symlink "dist" (test your build)
    Open existing symlink (MyTool) in Explorer
    Remove symlink (MyTool)
    Exit

  ```

The options to `open` and `remove` will only show up once you have created a symlink.

<br>

## Where is the symlink being created?
Mac: `CURRENT_USER/Library/Application Support/Adobe/CEP/extensions`

Windows: `C:/Users/CURRENT_USER/AppData/Roaming/Adobe/CEP/extensions`



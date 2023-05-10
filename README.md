# CEP-symlink
Create a symlink to the Adobe CEP folder so the host app can find the extension while you develop if from a different location.

# Install
1. Install: `npm i cep-symlink`
2. In you package.json add a script: 

```json
"scripts": {
    "symlink": "node node_modules/cep-symlink/dist/cep-symlink.es.js"
  },
```

# Usage
1. Open your extension folder in VSCode (or cd into it in the terminal)
2. run `npm run symlink` to start the symlink process.

The terminal will prompt you to choose your next step:
```json
? Choose an action: (Use arrow keys)
    ❯ Symlink "MyTool" (start developing)
    Symlink "dist" (test your build)
    Open existing symlink (MyTool) in Explorer
    Remove symlink (MyTool)
    Exit

  ```

  The options to `open` and `remove` will only show up once you have created a symlink.
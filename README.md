# Challenge #07 - Interaction with a 3D object [HTML, CSS & JS]

This project demonstrates a simple 3D scene with an interactive cube using Three.js, set up to run locally with a Node.js environment.

## Project Structure

- `index.html`: The main HTML file. Contains an import map to help the browser find the local Three.js module.
- `style.css`: CSS styles for the page.
- `main.js`: JavaScript code for the Three.js scene and interactions. Imports Three.js as a module.
- `package.json`: Defines project dependencies (Three.js) and basic project info.
- `package-lock.json`: Records exact versions of dependencies, ensuring consistent installs.
- `node_modules/`: Directory containing installed npm packages (including Three.js). **This folder is included in the zip, but it's good practice to run `npm install` if you encounter issues.**
- `README.md`: This file, with setup and troubleshooting instructions.

## IMPORTANT: How to Run Locally (Please follow carefully)

Because this project uses ES6 modules and loads Three.js from the local `node_modules` directory via an import map, you **must** run it using a local web server from the project's root directory. Opening the `index.html` file directly in your browser (e.g., via `file:///`) **will not work** and will likely result in a blank page or errors due to browser security restrictions (CORS policy) and module resolution issues.

**Step 1: Unzip the Project**

Unzip the `threejs_challenge_project_v4.zip` file into a folder on your computer.

**Step 2: Open in VS Code (or your preferred editor)**

Open the unzipped project folder in Visual Studio Code.

**Step 3: (Recommended) Ensure Dependencies are Correct**

1.  Open a terminal within VS Code (Terminal > New Terminal).
2.  In the terminal, make sure you are in the project's root directory (e.g., `threejs_project`).
3.  Run the command: 
    ```bash
    npm install
    ```
    This command will check your `package.json` and ensure all necessary files for Three.js are correctly in place within the `node_modules` folder. Even if `node_modules` was in the zip, this can fix potential issues.

**Step 4: Start a Local Web Server**

Here are a few simple ways to start a local web server from the project's root directory:

### Option A: Using VS Code Live Server Extension (Recommended for VS Code users)

1.  If you don't have it, install the "Live Server" extension by Ritwick Dey from the VS Code Extensions marketplace.
2.  Once installed, right-click on the `index.html` file in the VS Code Explorer sidebar.
3.  Select "Open with Live Server".
4.  This will automatically open the page (e.g., at an address like `http://127.0.0.1:5500/index.html`) in your default web browser. The 3D scene should load.

### Option B: Using `npx serve` (Node.js/npm required)

1.  Open a terminal within VS Code (or any other terminal).
2.  Make sure you are in the project's root directory.
3.  Run the command: 
    ```bash
    npx serve
    ```
4.  The terminal will show you the URL where the server is running (usually `http://localhost:3000` or similar). Open this URL in your web browser.

### Option C: Using Python's HTTP Server (Python required)

1.  Open a terminal within VS Code (or any other terminal).
2.  Make sure you are in the project's root directory.
3.  For Python 3, run:
    ```bash
    python -m http.server
    ```
    (For Python 2, it would be `python -m SimpleHTTPServer`)
4.  This will usually start a server on `http://localhost:8000`. Open this URL in your web browser.

## Troubleshooting a Blank Page

If you see a blank page after starting the local server:

1.  **Check the Browser's Developer Console:** Right-click on the page, select "Inspect" or "Inspect Element", and then go to the "Console" tab. Look for any error messages. Common errors might be related to:
    *   "Failed to resolve module specifier 'three'": This means the import map in `index.html` isn't working or the path is incorrect for your server setup. The current `index.html` uses `"three": "/node_modules/three/build/three.module.js"` which should work if your server root is the project directory.
    *   `404 Not Found` errors for `three.module.js`: This means the server cannot find the file at the specified path. Double-check the path in the import map and ensure `node_modules/three/build/three.module.js` exists.
    *   Other JavaScript errors in `main.js`.
2.  **Ensure `npm install` was run:** This step is crucial for making sure the `node_modules/three` folder and its contents are present and correct.
3.  **Server Root Directory:** Make sure your local server is serving files from the project's root directory (the one containing `index.html`, `node_modules`, etc.). If it's serving from a parent directory, the `/node_modules/...` path in the import map might be incorrect.
4.  **Clear Browser Cache:** Sometimes browsers cache old files. Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or clearing your browser cache for the site.

## Live Deployed Version (Unaffected)

Remember, the live deployed version of this website (currently at https://jamjdugb.manus.space) uses a CDN for Three.js for simplicity in static hosting and is not affected by these local setup steps. It should continue to work independently.


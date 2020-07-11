To add Flow to a Create React SSR App project, follow these steps:

Run npm install --save flow-bin (or yarn add flow-bin). Add "flow": "flow" to
the scripts section of your package.json. Run npm run flow init (or yarn flow
init) to create a .flowconfig file in the root directory. Add // @flow to any
files you want to type check (for example, to src/App.js). Now you can run npm
run flow (or yarn flow) to check the files for type errors.

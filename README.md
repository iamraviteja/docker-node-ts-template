# Docker Node Template

A dockerised node template using typescript, express js, and postgresql.

Please follow the below steps to create the template from scratch.

Intitalize node application with below command and fill in the respective fields
npm init -y

Add Typescript to your project
npm install typescript --save-dev

Note: set VSCode to use workspace version of typescript rather than editor version of typescript

Pull in your base typescript configurations from @tsconfig/node18 as i am on version 18.18.0
[TODO]Check how to lock the version of node in docker
npm install --save-dev @tsconfig/node18

create a file called tsconfig.json and add the below lines
{
"extends": "@tsconfig/node18/tsconfig.json",
"compilerOptions": {
"lib": ["ESNext"],
"outDir": "dist"
},
"include": ["src"],
"exclude": ["node_modules", "dist", "**/*.test.ts"],
}

Add node types
npm install --save-dev @types/node

To build the typescript we will be using swc to transpile typescript we can also use esbuild, babel and webpack also.
npm i --save-dev @swc/cli @swc/core

create .swcrc file with following config, for more details refer the documentation
[TODO]Create configs for esbuild, babel and using webpack also
[TODO]Create a wiki to explain bit more on the below config
{
"env": {
"target": {
"node": 18
}
},
"jsc": {
"parser": {
"syntax": "typescript"
}
},
"module": {
"type": "commonjs"
},
"sourceMaps": "inline"
}

Installing package to delete directories
npm i --save-dev rimraf

Add eslint to lint your files
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

eslint: ESLint core library
@typescript-eslint/parser: A parser that allows ESLint to understand TypeScript code
@typescript-eslint/eslint-plugin: Plugin with a set of recommended TypeScript rules

Create an .eslintrc file and update it with the below config
[TODO] explain the config using this ref :https://blog.logrocket.com/linting-typescript-eslint-prettier/
{
"extends": [
"eslint:recommend",
"plugin:@typescript-eslint/recommend"
],
"parser": "@typescript-eslint/parser",
"plugins": [
"@typescript-eslint"
]
}

install prettier to format your code
npm install --save-dev prettier

Add eslint ignore and prettier ignore files, in case of prettier you can use gitignore file
Update vs code settings to use prettier on save
{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
...
}
Use extensions.json in .vscode to recommend extensions in your project

Avoiding conflicts when working with ESLint and Prettier
The best solution here is to use the eslint-config-prettier plugin to disable all ESLint rules that are irrelevant to code formatting, as Prettier is already good at it:

Adding express for server application
npm install express
npm install --save-dev @types/express

Create the Dockerfile and .dockerignore file
[REF] https://adambrodziak.pl/dockerfile-good-practices-for-node-and-npm

Create docker-compose file which will be used for development only
[TODO] create reference for each compose config,
we need to be carefull with volumes so

1. the entire project can be a volume
2. keep only src as volume and kill the containers and restart for any packages or config update

To watch for changes and restart docker in dev mode we will be using watchy
npm install --save-dev watchy
watchy --no-init-spawn --debounce 1 -w src -- docker compose restart backend

For debuging with vscode create a launch.json file and give below config
[TODO] give more explanation on config
{
"version": "0.2.0",
"configurations": [
{
"type": "node",
"request": "attach",
"name": "Node (Docker)",
"port": 9229,
"restart": true,
"remoteRoot": "/usr/src/app",
"sourceMaps": true,
"skipFiles": ["/usr/src/app/node_modules/**/*.js", "<node_internals>/**"]
}
]
}

docker refrence
[REF] https://blog.kubesimplify.com/everything-you-need-to-know-about-docker-compose
compose up with detach
docker compose up --detach
remove all closed images
docker rm -v $(docker ps --filter status=exited -q)
remove all cache images
docker system prune -a

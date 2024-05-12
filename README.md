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


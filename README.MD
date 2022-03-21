# Scripts
`start`: starts `nodemon` and the server on port `3000`.

`test`: builds TypeScript and runs `Jasmine` for unit tests.

`build`: builds the project using `tsc` command.

`lint`: checks for best practices in the code, checks the format as well using `eslint` and `prettier`.

`lint:f`: lints and fixes the code.

# File structure
* `assets` contains the `images`, the folder `assets/resized` contains the images after being processed.

* `dist` contains the files after build.

* `spec` contains configuration for `Jasmine`.

* `src` contains source code.
    * `routes` contains api routes, images for this case.
    * `tests` contains unit tests using `Jasmine` and `supertest` for endpoint testing.
    * `util` contains utility functions.
    * `main.ts` main code in TypeScript.

# Usage
After running the code using `npm run start` or `yarn start` open your browser and type `localhost:3000`, you should see `Hello` on the screen.
To resize an image use the name along with desired height and width for example

`http://localhost:3000/api/resize/?name=fjord&width=200&height=200`

The new resized image will be returned in the browser and it will be saved at `assets/resized` as well.
# markdown

![banner](./banner.svg)

**WORK IN PROGRESS**

> Various tools around the Markdown language such as a markdown to doc/epub/html/odt/pdf/txt converter, from csv/html/xls to markdown, …

## Table of Contents

* [Table of Contents](#Table-of-Contents)
* [Install](#Install)
* [Usage](#Usage)
* [You are a developer and you want to modify the code?](#You-are-a-developer-and-you-want-to-modify-the-code)
* [Author](#Author)
* [License](#License)

## Install

Do you need a local copy of this script? If no, don't install anything, just use it online: [https://markdown.avonture.be](https://markdown.avonture.be).

Otherwise, if you want a copy on your own server; just clone this repository or click on the `[Clone or download](https://github.com/cavo789/markdown/archive/master.zip)` green button and get a copy of the program.

Once installed on your hard disk, open a command prompt and go to the root folder where you've copied the program and run `composer update`:

```bash
cd c:\repositories\markdown
composer update
```

## Usage

If you've a local webserver (like wamp), create an alias called f.i. `markdown` and set his root folder to the folder where you copied this repository.

This done, you can now use this program by surfing to `http://localhost/markdown/`.

Any other solution will also works like copying this repository immediately to your production environment f.i.

## Build

You're a developer and need to change something. This chapter is made for you.

Once downloaded to your computer, go to the prompt to execute the following instructions:

```bash
npm install
composer update
```

These instructions will install all dependencies needed by the program.

### You've a local apache server

Run the following instruction to generate a newer version of `/dist` files. These files are used by the program so you need to update them anytime you make a change in `css` or `js`.

```bash
npm run build
```

Now, once you've created an alias (f.i. `markdown`) to this repository, you can access the program by surfing to `http://localhost/markdown/`.

Because you've rebuild the assets, make sure you refresh the page to get the newest version.

### You don't have a local server

In that case, use the one of npm and run the following instruction:

```bash
npm run dev
```

This instruction will start a localhost site (like `http://localhost:8081/`) with hot reloading: by updating the source code, the change will be immediately reflected without the need to refresh the page.

## Author

Christophe Avonture

## License

[MIT](LICENSE)

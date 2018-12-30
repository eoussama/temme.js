<p align="center">
    <img src="docs/assets/img/logo.svg" width=150 />
    <h1 align="center">Temme JS</h1>
    <p align="center">
        <img align="center" src="https://img.shields.io/npm/v/temmejs.svg" alt="NPM package version.">
        <img align="center" src="https://img.shields.io/github/release/EOussama/temmejs.svg" alt="Latest github release.">
        <img align="center" src="https://img.shields.io/travis/com/EOussama/temmejs.svg" alt="Tarvis CI build.">
        <img align="center" src="https://img.shields.io/npm/dt/temmejs.svg" alt="NPM downloads.">
        <img align="center" src="https://img.shields.io/github/size/EOussama/temmejs/dist/temme.js.svg" alt="TemmeJS size.">
        <img align="center" src="https://img.shields.io/github/license/EOussama/temmejs.svg" alt="TemmeJS license.">
    </p>
</p>



Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, it's about time Javascript had the same quirk too.


## Install

You can get TemmeJS following either steps from [this guide](https://github.com/EOussama/temmejs/wiki/Temme-install).


## Build

Building Temme JS is fairly easy, simply run `npm install` to install all the development dependencies, and then run `npm run prod` to get the production files under the `dist` folder. More information about this process can be found [here](https://github.com/EOussama/temmejs/wiki/Temme-build).

As for testing, [this guide](https://github.com/EOussama/temmejs/wiki/Temme-tests) highlights how simple it is.


## Usage

As we've come to know, Emmet converts a select of instructions that are plain text to its logical dom skeleton, Temme does that differently, by working with javascript objects instead of plain text, and seeing how this is a javascript library it kind of makes sense.
In order for Temme to do its magic, it requires a hierarchy blueprint as a javascript object and an HTML element to append the skeleton too.


## Syntax
```js
Temme.parse(hierarchy: Object, target: HTMLElement, endCallback: (hierarchy: Hierarchy) => void, nodeCallback: (temmeId: string, hierarchy: Hierarchy) => void);
```


## Example for the browser

Given the following code snippet:
```html
<!-- The element we're going to append the HTML skeleton to. -->
<div id="target"></div>

<!-- Including Temme JS. -->
<script src="temme.js"></script>

<!-- Putting Temme to do its thing. -->
<script>
    const target = document.getElementById('target');

    Temme.parse({
        classes: ['card', 'card-dark'],
        childNodes: [
            {
                name: 'div',
                classes: ['card-header'],
                childNodes: [
                    {
                        name: 'h2',
                        content: {
                            value: 'Card header'
                        },
                        classes: ['title', 'txt-gray', 'txt-bold'],
                        attributes: [ { contenteditable: true } ]
                    }
                ]
            },
            {
                name: 'div',
                classes: ['card-body', 'container'],
                data: {
                    source: 'www.somelink.com',
                    id: 536
                },
                childNodes: [
                    {
                        name: 'p',
                        content: {
                            value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aspernatur deserunt assumenda in officiis dolore, perspiciatis nam soluta iste odit?',
                        }
                    },
                    {
                        name: 'p',
                        content: {
                            type: 'html',
                            value: 'Lorem ipsum <b>dolor sit amet consectetur <u>adipisicing</u></b> elit. Dolores aspernatur <span class="link">deserunt</span> assumenda in officiis dolore, <mark>perspiciatis</mark> nam soluta iste odit?',
                        }
                    },
                ]
            }
        ]
    }, target);
</script>
```

Simply that, giving Temme a target element and a skeleton object, it will render the following.

```html
<div id="target" class="card card-dark">
    <div class="card-header">
        <h2 class="title txt-gray txt-bold" contenteditable="true">Card header</h2>
    </div>
    <div class="card-body container" data-source="www.somelink.com" data-id="536">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aspernatur deserunt assumenda in officiis dolore, perspiciatis nam soluta iste odit?</p>
        <p>Lorem ipsum <b>dolor sit amet consectetur <u>adipisicing</u></b> elit. Dolores aspernatur <span class="link">deserunt</span> assumenda in officiis dolore, <mark>perspiciatis</mark> nam soluta iste odit?</p>
    </div>
</div>
```

### Example for a node environment.

As simple and straightforward as we saw on the browser's side of things, the only difference is how we access Temme, and that's by requiring it.

```js
// es5
var Temme = require('path/to/temme');

// es6
import Temme from 'path/to/temme';
```

As for the usages, it remains just as in the browser.

```js

// The host element.
var target = document.createEelement('div');

// The hierarchy.
var hierarchy = {
    classes: ['red']
}

// Telling Temme to do its thing.
try {

    Temme.parse(hierarchy, target);
}
catch (e) {

    console.error(e.name, e.message);
}
```

More on how to use Temme can be found [at the documentation web page](https://eoussama.github.io/temmejs/) and even more in-depth [in the wiki](https://github.com/EOussama/temmejs/wiki).


## Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com) and licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).

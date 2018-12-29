# Temme JS

Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, it's about time Javascript had the same quirk too.


# Build

Building Temme JS is fairly easy, simply run `npm install` to install all the development dependencies, and then run `npm run prod` to get the production files under the `dist` folder.


# Testing

In order to test Temme, simply run `npm run test`.
Other test cases are available at `tests/sandbox/index.html`.


# Package walkthrough

A number of npm scripts are available to use in order to ease up basic developement and testing purposes.

| Command   | Description                                     |
|-----------|-------------------------------------------------|
| clean     | Deletes the `dist` and `build` folders.         |
| build     | Compiles the typescript code into es6 modules.  |
| bundle    | Bundles the source code for production.         |
| docs      | Updates the temme.js file of the documentation. |
| prod      | Executes all of the above.                      |
| test      | Runs the unit tests                             |



# Usage

As we've come to know, Emmet converts a select of instructions that are plain text to its logical dom skeleton, Temme does that differently, by working with javascript objects instead of plain text, and seeing how this is a javascript library it kind of makes sense.
In order for Temme to do its magic, it requires a hierarchy blueprint as a javascript object and an HTML element to append the skeleton to.


# Syntax
```js
Temme.parse(hierarchy: Object, target: HTMLElement, endCallback: (hierarchy: Hierarchy) => void, nodeCallback: (temmeId: string, hierarchy: Hierarchy) => void);
```


# Example

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

More on how to use Temme can be found [here](https://eoussama.github.io/temmejs/).


# Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com) and licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).
# Demo

Click [here](https://editor.marketmuse.com) for demo, and [here](/example/src) for the source codes of the demo.

# Install

```
npm install @marketmuse/editor --save
yarn add @marketmuse/editor
```

# Basic Usage

```javascript
import React from 'react';
import MMSEditor from '@marketmuse/editor';

// import styles
import '@marketmuse/editor/dist/mms-editor.css';

const App = () => (
  <MMSEditor>
    {({ editor, toolbar }) => (
      <div>
        {toolbar()}
        {editor({ placeholder: 'Enter content...' })}
      </div>
    )}
  </MMSEditor>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

# MMSEditor component

`MMSEditor` is the Editor provider, it's responsible for keeping the state and managing the editor. It accepts the following props.

* **children** *(function)* - MMSEditor adopts the [function-as-children pattern](https://reactjs.org/docs/jsx-in-depth.html#functions-as-children) to be able to pass on some editor related data down to its children, including the api and even the editor itself. Therefor, the children provided to this component **must** be a function (see below for arguments).
* **plugins** *(array)* - An array of plugin objects that has functions to extend the libraries core api's. See [plugins](#plugins) section for details.
* **useDefaultPlugins** *(bool)* - Apply [default plugins](/src/plugins). Defaults to `true`.

### Children args

* **formats** *(object)* - Flags that provides information about the cursors location / selection (see formats section for more details).
* **functions** *(object)* - Object that contains high-level api methods with the editor instance in their closure. Useful for building custom behaviour. See functions api section for more details.
* **decors** *(object)* - see [Decorators](#decorators) section.
* **editor( config?: object )** *(function)* - A function that takes a config object returns the editor component. See next section for configuration options.
* **toolbar( config?: object )** *(function)* - A function that takes in a config object and returns the toolbar component. Note that this needs to be rendered for the toolbar to function, even for inline style. See the toolbars section for more details.


# Formats

Formats api is an object with flags that provides information about the cursors location / selection. They are useful for building custom toolbars.

### Usage

The `formats` object is passed as an argument to `MMSEditor`'s children function as well as several other api functions. It is also possible to receive it by using `useFormats` hook, as long as the component is inside `MMSEditor`'s context.

Example:

```javascript
import MMSEditor, { useFormats, useFunctions } from '@marketmuse/editor';

const MakeBoldButton = () => {
  const formats = useFormats();
  const functions = useFunctions();

  return (
    <button
      disabled={formats.isBold}
      onMouseDown={e => {
        e.preventDefault();
        functions.toggleBold();
      }}
    >
      toggle bold
    </button>
  )
}

const App = () => {
  return (
    <MMSEditor>
      {({ editor }) => (
        <div>
          <MakeBoldButton />
          {editor()}
        </div>
      )}
    </MMSEditor>
  )
}
```

### Docs

*Mark*: These are styles attached to text nodes, a block could be in multiple states at a time.

* **isBold** *(boolean)* - True if cursor / selection is over bold text.
* **isItalic** *(boolean)* - True if cursor / selection is over italic text.
* **isUnderline** *(boolean)* - True if cursor / selection is over underlined text.
* **isStrikethrough** *(boolean)* - True if cursor / selection is over strike through text.

*Block*: These indicate the type of block within the selection. A block have a single type at a time.

* **isH1** *(boolean)* - True if cursor / selection is in a h1 block.
* **isH2** *(boolean)* - True if cursor / selection is in a h2 block.
* **isH3** *(boolean)* - True if cursor / selection is in a h3 block.
* **isH4** *(boolean)* - True if cursor / selection is in a h4 block.
* **isH5** *(boolean)* - True if cursor / selection is in a h5 block.
* **isH6** *(boolean)* - True if cursor / selection is in a h6 block.
* **isHeading** *(boolean)* - True if cursor / selection is in an heading block.
* **isLink** *(boolean)* - True if cursor / selection is on a link block.
* **isParagraph** *(boolean)* - True if cursor / selection is in a paragraph block (which is the default).
* **isBlockquote** *(boolean)* - True if cursor / selection is in a blockquote block.
* **isListNumbered** *(boolean)* - True if cursor / selection is in a list item (li) block within a numbered list (ol) block.
* **isListBulleted** *(boolean)* - True if cursor / selection is in a list item (li) block within a bulleted list (ul) block.

*Misc*:

* **state** *(object)* - Internal state accessible through functions / formats api's. This is useful for building stateful logic through a plugins. Also it could be used to have multiple plugins rely on a single state.
* **isCollapsed** *(boolean / null)* - Cursor location within a text is referred to as [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection), and is indicated with an anhor point and a focus point. When a text is highlighted, anchor is where the selection begins and focus is the where it ends. A selection is [collapsed](https://developer.mozilla.org/en-US/docs/Web/API/Selection/isCollapsed) when anchor and focus are the same position, meaning, no text is selected. When there is no selection (ie. editor has no focus), this value will be null.
* **isFocused** *(boolean)* - True if editor has focus.


# Functions

Functions api consists of an object that holds methods that could be used to control the editor programmatically. These functions already has the editor instance wrapped within their closures, so they could be used directly. It exposes MMS Editor's higher-level api built on top of Slate JS, without even needing to interact with Slate editors instance.

### Usage

The `functions` object is passed as an argument to `MMSEditor`'s children function as well as several other api functions. It is also possible to receive it by using `useFunctions` hook, as long as the component is inside `MMSEditor`'s context. See example usage above under [Formats](#formats) section.

### Docs

*Focus*:

* **focus()** *(void)* - Focus on the editor programmatically
* **hasFocus()** *(boolean)* - Programmatically decide if the editor has focus

*Cursor*:

* **moveCursorToEnd()** *(void)* - Focuses the editor if not focused already, and moves the cursor to the end of the contents.
* **moveCursorToStart()** *(void)* - Focuses the editor if not focused already, and moves the cursor to the start of the contents.

*Content*:

* **selectAll()** *(void)* - Programmatically highlight all the text / contents in the editor.
* **clear()** *(void)* - Clear contents of the editor.
* **isEmpty()** *(boolean)* - True if plain text value of the editor is an empty string.
* **getPlainText()** *(string)* - Returns plain text contents of the editor.

*Links*:

* **getLink()** *(object)* - Returns link data within the current selection. If there are multiple links, the last one will be returned.
* **insertLink( url: string )** *(void)* - Inserts a link to the cursor location. If the selection is collapsed (ie. no text is selected, it's just the cursor), the link will be inserted and the anchor text will become the given url. Otherwise the selected text will become the anchor text. If there exists another link within the selection, it's link will be removed first.
* **removeLink()** *(void)* - Remove link(s) at the cursor selection. If there are multiple links within selection, all will be removed. Once removed, the anchor text will simply turn into a standard text node.

*Formatters*:

* **toggleBold( status?: bool )** *(void)* - Toggles bold state of current selection.
* **toggleItalic( status?: bool )** *(void)* - Toggles italic state of current selection.
* **toggleUnderline( status?: bool )** *(void)* - Toggles underline state of current selection.
* **toggleStrikethrough( status?: bool )** *(void)* - Toggles strikethrough state of current selection.
* **toggleHeading( level: int, status?: bool )** *(void)* - Toggles heading state of current block.
* **toggleBlockquote( status?: bool )** *(void)* - Toggles blockquote state of current block.
* **toggleListNumbered( status?: bool )** *(void)* - Toggles numbered list state of current block.
* **toggleListBulleted( status?: bool )** *(void)* - Toggles bulleted list state of current block.

*State*:

* **setState( object )** *(void)* - Set a state value accessible through functions / formats api's. This is useful for building stateful logic through a plugins. Also it could be used to have multiple plugins rely on a single state.

*Data*

* **export( options: object )** - Export raw editor data. Options are as follows:
  * **history** *(bool)* - Include history in the export (ie. use this to persist undo's and redo's).
* **exportHtml()** - Export editor data into clean HTML.
* **import( raw: object )** - Import editor data. It takes the output of `export` function. This replaces the editor content.
* **insertHtml( html: string, htmlDeserializerOptions: object )** *(void)* - Deserialize html and insert it to the location of the cursor. When `htmlDeserializerOptions` omitted, the default options provided by plugins through `MMSEditor` will be used. See (HTML Deserializer)[#html-deserializer] for options and more details.
* **insertText( text: string )** *(void)* - Insert text to the cursor location.

# editor()

A function that takes a config object returns the editor component. It is required to render this, without doing so, the editor will not be mounted which is likely to cause potential crashes. This approach is particularly useful for building toolbars / sidebars / other components that lives under the Editor provider (ie `MMSEditor`) and could consume all editor related data and utilize the api.

### config

* **id** *(string)* - Applies an ID to the editor container.
* **style** *(object)* - Apply inline styles to the editor container.
* **className** *(string)* - Apply a class name to the editor container (the render output of `component`). By default, it will already have `mms--editor`, and provided class names will be appended. This also makes styling the editor root with `styled-components` or similar libraries possible.
* **spellCheck** *(boolean)*
* **autoCorrect** *(boolean)*
* **autoCapitalize** *(boolean)*
* **autoFocus** *(boolean)*
* **readOnly** *(boolean)*
* **placeholder** *(string)*


# Plugins

Certain functionality could be provided to MMS editor via plugins. It is possible to enhance the `functions` and `formats` api's, provide configurations such as `hotkeys` and `decorators`, and hook up to native events. It's a good to pack an editor feature together and developing it in isolation. `MMSEditor` component accepts `plugins` prop, which should be an array of plugin objects.


### Plugin object

*Extensions*

* **formats** *(function( formats: object, args: object ) -> formats)* - A function that receives the current formats and args object, and returns new formats.
* **functions** *(function( functions: object, args: object ) -> functions)* - A function that receives the current functions and args object, and returns new functions.

*Configurations*

* **hotkeys** *(array)* - see [Hotkeys](#hotkeys).
* **decorators** *(array)* - see [Decorators](#decorators).
* **htmlDeserializerOptions** *(object)* - see [HTML Deserializer](#html-deserializer).
* **normalizerOptions** *(object)* - see [Normalizer](#normalizer)
* **toolbar** *(object)* - see [Toolbar](#toolbar()).

*Events*

All event functions receives two arguments. First argument, `event`, is the event object. For all functions below, second argument, `arg` object holds `functions` and `formats` api's, and `decors`.

* **onKeyUp** *(function( event: React.KeyboardEvent, args: object ))*
* **onKeyDown** *(function( event: React.KeyboardEvent, args: object ))*
* **onCut** *(function( event: React.ClipboardEvent, args: object ))*
* **onCopy** *(function( event: React.ClipboardEvent, args: object ))*
* **onBeforeInput** *(function( event: React.FormEvent, args: object ))*
* **onBlur** *(function( event: React.FocusEvent, args: object ))*
* **onFocus** *(function( event: React.FocusEvent, args: object ))*
* **onClick** *(function( event: React.MouseEvent, args: object ))*
* **onMouseUp** *(function( event: React.MouseEvent, args: object ))*
* **onMouseDown** *(function( event: React.MouseEvent, args: object ))*
* **onCompositionStart** *(function( event: React.CompositionEvent, args: object ))*
* **onCompositionEnd** *(function( event: React.CompositionEvent, args: object ))*
* **onDragOver** *(function( event: React.DragEvent, args: object ))*
* **onDragStart** *(function( event: React.DragEvent, args: object ))*
* **onDrop** *(function( event: React.DragEvent, args: object ))*

*Callbacks*

Callbacks are like events, however they do not have a synthetic event object attached to it. While some of them will have access to `args` just like the events, some are used as enhancers before the initialization of the editor object, so `args` will not be accessible. Their arguments varies.

* **onValueChange** *(function( args: object ))* - This function gets invoked on editor state change. It should be used as a replacement to the `onChange` event. Note that changes to the editor state under this callback should be made conditionally, otherwise it will cause an infinite loop.
* **onInsertData** *(function ( data: DataTransfer ))* - Runs on editor.insertData, receives the DataTransfer object as the argument.

### Example

Extend `formats` api with `isStyled`:

```javascript
plugins: [{
  formats: formats => ({
    ...formats,
    isStyled: (
      formats.isBold ||
      formats.isItalic ||
      formats.isUnderlined ||
      formats.isStrikethrough
    )
  })
}]
```

Modify behaviour of `toggleBold`:

```javascript
plugins: [{
  functions: (functions, { formats }) => ({
    ...functions,
    toggleBold: (...args) => {
      // do not make bold if link
      if (formats.isLink) return;
      // default behaviour
      functions.toggleBold(...args);
    }
  })
}]
```

Using event functions:

```javascript
plugins: [{
  onKeyDown: (event, { functions, formats }) => {
    if (event.key === 'enter') {
      // block keypress
      event.preventDefault();
      // use functions and formats like so
      if (formats.isBold) alert('This is bold!');
      else alert('This is not bold!');
    }
  }
}]
```

### Default plugins

MMS editor comes with some default plugins, which could be found [here](/src/plugins). By default, these plugins will be applied, however it is possible to selectively apply them like so:

```javascript

import { MMSEditor, plugins } from '@marketmuse/editor';

// ...

const App = () => (
  <MMSEditor
    useDefaultPlugins={false}
    plugins={[
      // Pass default options for hotkeys
      plugins.defaultHotkeys,
      // Do not pass default options for html serializer
      // plugins.defaultHtmlSerializerOptions
    ]}
  >
    {({ editor, toolbar }) => /* ... */}
  </MMSEditor>
);

```


## Decorators

Decorators are a type of text-level formatting that computes at render time based on the content. It is useful for implement things that requires dynamic highlighting, such as search or syntax highlighting. MMS editor allows you to implement your own **highlight rules**, and apply styles to or provide your own React Components to wrap around the text that matches your rule.

### config objects

* **id** *(string)*
* **match** *(string, [string] or regex)* - A string, string array, or a regular expression to match against.
* **triggers** *array*
* **component** *(ReactComponent)*
* **render** *(function( props: object ) ReactComponent)*

The highlighted items will receive data attribute `decorator-id` with the value id. Ie:


```html
<span data-decorator-id="fruits">apple</span>
```

*Example*

```javascript
const Apple = props => (
  <span style={{ color: 'red' }}>
    {props.children}
  </span>
);
```
```javascript
decorators: [
  {
    id: 'apple',
    match: /apple/i,
    component: Apple
  },
  {
    id: 'search-query',
    transform: text => text.toLowerCase();
    match: query,
    style: { backgroundColor: 'yellow' },
    triggers: [query]
  }
]
```

### decorator stats

Often times when decorators are used, it might be useful to know how many matches each decorator received, and in some cases the aggregate breakdown of matched terms. MMS Editor automatically keeps track and provides this data. There are two ways to access this, either by the `decor` argument received by MMSEditor component's children function, or by using the `useDecor` hook.

The `decor` object comes with two properties, `aggregates` and `matches`. The `aggregates` holds an object with keys being decorator id's, and values being total number of matches received by that decorator. `matches` on the other hand is a dynamic breakdown of how many times each term received a match, grouped by their decorators.

Here is a small example text editor that highlights foods and displays the statistics:

```javascript
const foodPlugin = {
  decorators: [
    {
      id: 'fruits',
      match: ['apple', 'banana', 'peach'],
      style: { backgroundColor: 'red' },
    },
    {
      id: 'vegetables',
      match: ['tomato', 'corn', 'carrot'],
      style: { backgroundColor: 'green' },
    }
  ]
}

<MMSEditor plugins={[ foodPlugin ]}>
  {({ editor, /* decors */ }) => (
    <>
      <FoodStats />
      {editor({ placeholder: "Insert food..." })}
    </>
  )}
</MMSEditor>
```

We created a simple plugin that decorates some fruits and vegetables, and applies some styles to the matches. The generated `decor` object would look something like this:

```javascript
{
  aggregates: {
    fruits: 8,
    vegetables: 5,
  }
  matches: {
    fruits: {
      apple: 5,
      banana: 1,
      peach: 2,
    },
    vegetables: {
      tomato: 1,
      corn: 3,
      carrot: 1,
    }
  },
}
```

Next, we need to create `FoodStats` component, which displays how many of each food item were found in our text editor. We can use the `decors` argument (commented out above), or since our `FoodStats` components is being rendered inside the `MMSEditor` provider, we can also use the `useDecors` hook to receive the same data.

```javascript
import { useDecors } from '@marketmuse/editor';

export default props => {

  // get decor object using `useDecors` hook.
  const decors = useDecors();

  // fruit stats
  const fTotal = decors.aggregates?.fruits || 0;
  const fMatches = decors.matches?.fruits || {};

  // vegetable stats
  const vTotal = decors.aggregates?.vegetables || 0;
  const vMatches = decors.matches?.vegetables || {};

  return (
    <>
      <h3>Fruits: {fTotal}</h3>
      <ul>
        {Object.keys(fMatches).map(fruit => (
          <li key={fruit}>{fruit}: {fMatches[fruit]}</li>
        )}
      </ul>
      <h3>Vegetables: {vTotal}</h3>
      <ul>
        {Object.keys(vMatches).map(veg => (
          <li key={veg}>{veg}: {vMatches[veg]}</li>
        )}
      </ul>
    </>
  )
}

```


## Hotkeys

Hotkeys api allows you to create custom key bindings, and assign them functionality using the `formats` and `functions` apis. It allows you to assign multiple commands to the same hotkeys, and run them in different contexts.

Hotkeys api accepts an array of keymap objects, order of execution of the commands are dictated by the order of this array. When omitted, the editor will use the [default configuration](/src/config/defaultHotkeys.js), otherwise the provided configuration.

### keymap objects

* **key** *(string)* - Natural syntax expression that describes the key bindings delaminated by `+` sign. Use `mod` to describe `cmd` on Mac, `ctrl` on Windows. This is the first argument evaluated by [is-hotkey](https://github.com/ianstormtaylor/is-hotkey) library, check out the [api](https://github.com/ianstormtaylor/is-hotkey#api) for more details.
* **when** *(function( args: object ) -> bool)* - Contextual awareness for hotkeys, commands will run only when this function returns true. If omitted, commands will run every time. The args it receives is as follows:
  * **event** *([KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent))* - The KeyboardEvent object received from `onKeyDown` event.
  * **formats** *(object)* - Formats api (see Formats api section for details).
* **command** *(function( args: object ) -> void)* - Command that fires upon `onKeyDown` event. Args are as follows:
  * **event** *([KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent))* - The KeyboardEvent object received from `onKeyDown` event.
  * **functions** *(object)* - Functions api (see Functions api section for details).
  * **formats** *(object)* - Formats api (see Formats api section for details).

Example:

```javascript
hotkeys: [
  {
    key: 'mod+b',
    when: ({ formats }) => !formats.isCollapsed(),
    command: ({ functions }) => functions.toggleBold(),
  },
  {
    key: 'mod+b',
    when: ({ formats }) => formats.isCollapsed(),
    command: () => alert('select some text for best results!'),
  },
]
```


# HTML Deserializer

MMS Editor comes with a built-in HTML deserializer. That is, if you import an HTML file or simply copy-paste a chunk of text from a website and paste it into the editor, this parser will deserialize the html markup and turn it into the editors own format. That way, basic formatting as well as some features such as links and lists could be persisted.

By default, MMS Editor will try to convert as much HTML as it can, however the behaviour of the HTML deserializer could be customized if desired. Below are the props `htmlDeserializerOptions` accepts:

* **transforms** ( array[ function( el: [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) ) -> newEl: [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) ] ) - This is a low level array of functions that lets you transform an HTMLElement into another before it or it's children gets evaluated. The return value should be the new HTMLElement. It is also possible to manipulate the children of this element via the `childNodes` property. Ex:

```javascript
htmlDeserializerOptions: {
  transforms: [
    el => {

      // if the element is a span that contains '.bold' class
      if (el.nodeName === "SPAN" && el.classList.contains('bold')) {

        // create a new <b> node
        const newEl = document.createElement('b');

        // Make sure to pass on the contents
        newEl.innerHTML = el.innerHTML;

        // or to manipulate the children:
        // el.childNodes
        //  .filter(n => /* whatever */)
        //  .forEach(n => newEl.appendChild(n.cloneNode(true)))

        // return new element
        return newEl;
      }

      return el;
    }
  ]
}

```

* **strategies** *(array)* - An array of strategy objects, where you can customize the deserialize behaviour for each individual tag. See below for more details.


## strategy object

Using this option, you can customize how MMS Editor should deserialize a given HTML tag.

* **tag** *(string)* - The tag name
* **strategy** *(string or function ( el: [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), attrs: object ) -> string)* - You can either provide a strategy as string, or a function that takes in the HTMLElement instance and returns the string. The value (or the value returned from this function) could be one of the following:
  * **normal** *(default)* - Deserialize node and children normally
  * **text** - Deserialize node and children as text.
  * **textChildren** - Deserialize node normally, children as text.
  * **continue** - Skip node, deserialize children normally.
  * **continueText** - Skip node, deserialize children (excluding text nodes) as text.
  * **skip** - Skip node and children.

For instance, let's say you don't support hyperlinks in your editor and you'd like MMS Editor to deserialize anchor text of the links as plain text nodes. Your configuration in this case would look like this:

```javascript
htmlDeserializerOptions: {
  strategies: [
    { tag: 'a', strategy: 'text' }
  ]
}
```

Let's say you wanted to customize this even further and **only allow** hyperlinks pointing to your own website. In that case, you could do the following:

```javascript
htmlDeserializerOptions: {
  strategies: [
    {
      tag: 'a',
      strategy: (el, { href }) => {
        return href.indexOf('domain.com') === -1
          ? 'text'
          : 'normal';
      }
    }
  ]
}
```

The second argument, `attributes`, is just to simplify interacting with the attributes of the DOM element, but since you have access to the `el`, the [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) instance, you could build such logic on any DOM property.


# Normalizer

MMS Editor allows you to add normalizers via plugins, using `normalizerOptions`.

### normalizerOptions

* **normalize** *(function( editor, [ node, path ] ) -> boolean)* - This function allows you to pass your own normalization rules along with the [default one](/src/plugins/defaultNormalizerOptions.js). However, this is a low level function; which requires an understanding of the editor data model and interaction with Slate's api. MMS Editor exposes slate's exports under `slate`. Please read [Slate's documentation on Normalizations](https://docs.slatejs.org/concepts/10-normalizing). The return value of this function indicates whether or not you have made a change to the editor within the normalize function.


### Example

Below is an example to implement a forced layout, which will make the first block a heading and second block a paragraph.

```javascript
import { slate, types } from '@marketmuse/editor';

const normalizePlugin = {
  normalizationOptions: {
    normalize: (editor, [ node, path ]) => {

      // details about the current path / node
      const isTopLevel = path.length === 1;
      const isFirstBlock = path[0] === 0;
      const isSecondBlock = path[0] === 1;
      const isHeading = node.type === types.h1;
      const isParagraph = node.type === types.p;

      // make first block a heading
      if (isTopLevel && isFirstBlock && !isHeading) {
        slate.Transforms.unwrapNodes(editor, { at: path });
        slate.Transforms.wrapNodes(editor, { children: [], type: types.h1 }, { at: path })
        // we made a change, return true
        return true;
      }

      // make second block a paragraph
      if (isTopLevel && isSecondBlock && !isParagraph) {
        slate.Transforms.unwrapNodes(editor, { at: path });
        slate.Transforms.wrapNodes(editor, { children: [], type: types.p }, { at: path })
        // we made a change, return true
        return true;
      }

     // no changes were made, return false
     return false;
  }
}
```



# toolbar()

MMS Editor comes with a built-in toolbar that has primary rich text editing support out of the box, and could easily by configured / extended with custom functionality.

### features

* Built with the `Formats api`, `Functions api` and `Classnames api`, meaning one could easily extend the toolbar with advanced custom features, or create functionally equivalent custom toolbars.
* Built-in inline / embedded toolbar support.
* Support for multiple screens *(for instance, the 'Link' button on the default toolbar screen could switch the active screen to the link screen that only has a text input to accept a URL)*.
* Layout configuration possible on a per screen basis (it is possible to change the layout of existing screens, create new screens, link them together, add custom buttons or components or custom functionality).

### config object

Toolbar configuration could either be provided via a plugin, or as an argument to the `toolbar()` function. The latter has presedence over the former, so arguments provided to this function will override to plugin-provided configuration.

* TODO
* Example: see the [default configuration](/src/plugins/defaultToolbar.js) as an example.


# Styling

MMS Editor comes with built-in class names aiming to make styling the editor as simple as using basic css. Base styles that comes with the provided `mms-editor.css` also uses this api to style the editor. One could either chose to import this file and extend the base styles, or omit it and create new styles from scratch.

* `mms--editor` - Classname of the editor. Helpers:
  * `mms--disabled` - When editor is read-only.

Text within the editor comes in standard html tags, so this class name could be used to style the text within the editor using those tags. ie:

```css
.mms--editor p { ... }
```

* `mms--toolbar` - Classname of the default toolbar wrapper (applies to both styles).
* `mms--toolbar-inline` - Applies to toolbar wrapper for inline style toolbar.
* `mms--toolbar-embedded` - Applies to toolbar wrapper for embedded style toolbar.
* `mms--toolbar-visible` - Applies to toolbar when it is visible (ie. reflects the visible state of the inline toolbar as a class name, applies also to embedded toolbars)
* `mms--toolbar-hidden` - Applies to toolbar when it is hidden (ie. reflects the hidden state of the inline toolbar as a class name, applies also to embedded toolbars)
* `mms--toolbar-button` - Applies to toolbar buttons. Helpers:
  * `mms--disabled` - When button is disabled
  * `mms--active` - When cursor is over mark / block indicated by the button *(ie. bold button would be appended with this class name when cursor is over bold text)*
* `mms--toolbar-input` - Applies to toolbar inputs. Helpers:
  * `mms--disabled` - When input is disabled.
* `mms--toolbar-spacer` - Applies to toolbar spacers.

*Helper classNames*: Below class names gets appended to DOM elements for indicating the state. They do not represent any particular element, so they shouldn't be styled directly. Ie:

```css
/* bad */
.mms--active {}

/* good */
.mms--toolbar-button.mms--active {}
```

* `mms--active` - Active state
* `mms--disabled` - Disabled state
* `mms--toolbar-ignore-focus` - Inline toolbar will not render if there is no selection (ie. editor has no focus). Use this class name to prevent toolbar from hiding when main editor loses focus. Currently, this class name is used in text input elements within the toolbar.

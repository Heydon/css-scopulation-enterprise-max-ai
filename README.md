# CSS Scopulation® Enterprise Max AI™

## TL;DR

A tiny ES module with a ridiculously self-aggrandizing name for emulating the _tasty_ but now unsupported `scoped` attribute for scoping embedded stylesheets to a local parent element.

### Usage

Install **CSS Scopulation® Enterprise Max AI™**:

```
npm install --save css-scopulation-enterprise-max-ai
```

Import and execute `scopedCSS.js`:

```js
import { scopeCSS } from 'scopeCSS';

scopeCSS({ revert: true });
```

## Why?? How??

The CSS cascade is a thing and it is marvelous. But it _is_ a shame that scoped CSS never took hold because it would have meant you could do this:

```html
<div class="example">
  <style scoped>
    p {
      color: red;
    }
  </style>
  <p>I am well red innit.</p>
</div>
<p>I am not even red, like, at all.</p>
```

Since `scoped` isn’t supported in any browsers (any more) you have to use JavaScript to emulate this. The trouble is, most solutions are environment/library/framework specific, meaning you can’t use them unless you are using, say, React or Vue.

**CSS Scopulation® Enterprise Max AI™** (Jesus Christ) is not only framework independent but, by foregoing CSS parsing in favor of simple token/keyword replacement, is ridiculously small (less than half a K). Honestly it’s just the most simple/naive/basic/little (apply whichever quasi-pejorative term you like) script, but it works.

And here’s how. In your page, you write something similar to the code example above:

```html
<div class="example">
  <style scoped>
    § p {
      color: red;
    }
  </style>
  <p>I am well red innit.</p>
</div>
<p>I am not even red, like, at all.</p>
```

The only difference from that first example, as you may have noticed, is the `§` part which gets replaced in the output. The output looks like this:

```html
<div class="example" data-scoped="0">
  <style scoped="">
    [data-scoped="0"] p {
      color: red;
    }
  </style>
  <p>I am well red innit.</p>
</div>
<p>I am not even red, like, at all.</p>
```

The `§` placeholder can be literally anything you like in the [options](#options) but it has to be unique or the replacement part of the script will match unwanted parts of the styles and it will all go fucky.

## Bleeding and seeping PREVENTED

Since lots of people also want that Shadow DOM kind of effect wherein styles are not just prevented from bleeding out but also seeping in, you can also switch reversion on. This just applies `all: revert` to the scoping element (`class="example"` above) and all its descendants. 

```html
<div class="example" data-scoped="0">
  <style scoped="">
    [data-scoped="0"], [data-scoped="0"] > * { 
      all: revert 
    } 
    [data-scoped="0"] p {
      color: red;
    }
  </style>
  <p>I am well red innit.</p>
</div>
<p>I am not even red, like, at all.</p>
```

Note that this will revert any styles applied directly to the elements in the scope **but** inheritance is not prevented (which is the same as how Shadow DOM works, see [Why is my Web Component inheriting styles](https://lamplightdev.com/blog/2019/03/26/why-is-my-web-component-inheriting-styles/)).

## Options

These are passed to the `scopeCSS` function as an object (see [Usage](#usage)).

* `placeholder`: _the keyword/token representing the scoping element that is replaced with the generated attribute selector_ (String) (default: `'§'`)
* `revert`: _Whether to revert styles with `all: revert`_ (Boolean) (default: `false`) 
* `context`: _Where the script looks for `<style scoped>`_ (HTMLElement) (default: `document`) 
* `dataName`: _What to call the data attribute_ (String) (default: `'scoped'`)

## Notes

1. I have been advised to point out that this ES module does not constitute a true form of Artificial Intelligence in any way and that my inclusion of the suffix “AI” should be treated with the same suspicion and contempt as any other product that conflates “artificial intelligence” with some kind of trivial code execution.
2. If you take the 'S' away from 'Scopulation' you get _copulation_, which is nice.
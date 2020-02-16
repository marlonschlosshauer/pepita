# Pepita
----

Generate placeholder text and images with simple CSS classes.

## Installation

Download the package with npm :

``` console
$ npm install pepita
```


## Usage
Go to your HTML file and load `auto-pepita.js` :
``` html
<head>
   <script src="./node_modules/pepita/dist/auto-pepita.js"></script>
</head>
```

Specify what you want by adding a class to your element :
``` html <body>
   <p class="pepita-text-words-16"></p>
</body>
```

The text will appear once you open the file in your browser :
``` html
<body>
   <p class="pepita-text-words-16">
      esse fugiat eu eiusmod eiusmod proident elit nisi nulla veniam laboris labore ipsum ullamco elit irure
   </p>
</body>
```

## Syntax

Everything in **bold** is a variable that you can change (e.g write **32** instead of **length**)

### Text

These use the default length of 16 :

>pepita-text

>pepita-text-words

>pepita-text-sentences

>pepita-text-paragraphs

The following ones allow you to specify a length :

>pepita-text-words-**length**

>pepita-text-sentences-**length**

>pepita-text-paragraphs-**length**

### Image

Default **height** and **width** for an image are 400px. Default **color** is black.

>pepita-image

>pepita-image-**size**

>pepita-image-**width**-**height**

>pepita-image-**width**-**height**-**color**

## Examples
### Text :

### No length given:


**Before :**

``` html
<p class="pepita-text"></p>
```

No length is specified here, so default of 16 is used.

**After :**
``` html
<p class="pepita-text">
   cupidatat enim ex nostrud amet fugiat do ad in elit adipisicing consequat anim nisi veniam nisi
</p>
```

----

### Length specified:

**Before :**
``` html
<p class="pepita-text-8"></p>
```

Length of 8 specified. Generates 8 words.


**After :**
``` html
<p class="pepita-text-8">
  nostrud ut proident officia laboris minim amet ipsum
</p>
```

----

### Type specified :

**Before :**
``` html
<p class="pepita-text-paragraphs-1"></p>
```

`Paragraph` is one of three options (words, sentences and paragraphs). If nothing is given, default of `words` is assumed.


**After :**
``` html
<p class="pepita-text-paragraphs-1">
   Cillum quis officia nostrud tempor eiusmod nulla labore qui occaecat. Officia mollit quis excepteur velit magna qui officia cupidatat duis. Nisi anim pariatur exercitation quis aute. Nisi nostrud ea magna nostrud ea labore irure sint sint nostrud voluptate qui. Aliqua quis id anim sunt commodo. Officia incididunt do nulla ullamco laborum ex voluptate eu excepteur aliqua. Minim Lorem qui nisi officia esse adipisicing laborum cupidatat occaecat dolor mollit sit veniam aliqua.
</p>
```

----

### Images :

### Default image:

**Before :**
``` html
<img class="pepita-image"></img>
```

Generates a 400px by 400px, black, image.

**After :**
In the code :

``` html
<img class="pepita-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAOGUlEQVR4Xu3VsQ0AIAwEsWT/oUFiA642NWmsl25n5oxHgAABAgQ+BVZAPsV8J0CAAIEnIC"></img>
```

which looks like this :

![](https://user-images.githubusercontent.com/24259317/74566053-e3817680-4f72-11ea-944e-27777e70c53b.png "black")

----

### Height, width and color :

**Before :**
``` html
<img class="pepita-image-250-150-#f4be41"></img>
```

Everything specified. Width, height and color.

**After :**

![](https://user-images.githubusercontent.com/24259317/74566056-e41a0d00-4f72-11ea-9803-03554c699130.png "#f4be41")

## Customization

Besides specifying variables directly in the class name, `/dist/pepita.js`exports the following values :

>Keyword (e.g shorten *pepita* to just *p*)

>Default length

>Default type (words, sentences, paragraphs)

>Default width

>Default height

>Default Color (for images)

If you happen to make changes to `src/pepita.js` directly, remember to later compile it with [browserify](http://browserify.org/).

## Known bugs
* Adding to a child  is not possible if the parent element also had text/image added.
* Some combination of incorrect labels does not give out a warning.
* Images can only be added to `<img>` tags.

## Thanks
Special thanks to the contributors of the [lorem-ipsum](https://www.npmjs.com/package/lorem-ipsum) package.

## Contributing
[Feedback](../../issues) (especially regarding useability and workflow) is hightly encouraged.

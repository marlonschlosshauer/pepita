const Ipsum = require("lorem-ipsum").LoremIpsum;
var $ = require("jquery");

exports.pepitaSearchTerm = "pepita";
exports.pepitaDefaultWordLength = 16;
exports.pepitaDefaultImageSize = 400;
exports.pepitaDefaultColor = "black";

/**
 * Parse elements of node and inject text/image.
 * @param {Document} node
 */
exports.run = function(node) {

	if(node == undefined) {
		return;
	}

	// Select all elements with a pepita- class
	var targets  = $("[class*='" + this.pepitaSearchTerm + "']");
	var canvas;

	for (var i = targets.length-1; i >= 0; --i) {

		var result = this.parse(targets[i].className);

		// Lazy error handling
		if(result == undefined) {
			console.log("Error at : ");
			console.log(targets[i]);
			continue;
		}

		if (result[0] == "text") {
			// Load Lorem Ipsum text
			this.injectText(targets[i], this.generateText(result[1],result[2]));
		} else {
			// Build canvas for image rendering
			if (canvas == undefined) {
				canvas = this.buildCanvas(node, result[1], result[2]);
			} else {
				this.changeCanvasSize(canvas, result[1], result[2]);
			}

			// Build and inject image
			this.injectImage(targets[i], this.generateImage(canvas, result[3]), result[1], result[2]);
		}
	}

	return node;
}

/**
 * Parse string for text options (type, length).
 * @param {Element} list
 * @return {[String, String, Number]}
 */
exports.parseText = function (list) {
	switch(list.length) {
		// pepita-text
		case 2 :
			return ['text','words',this.pepitaDefaultWordLength];
			break;
		// pepita-text-length
		case 3 :
			return ['text','words',list[2]];
			break;

		// pepita-text-type-length
		case 4 :
			return ['text',list[2],list[3]];
			break;
	}
}

/**
 * Parse string for image options (width, height, color).
 * @param {Element} list
 * @return {[String, Number, Number, String]}
 */
exports.parseImage = function (list) {
	switch(list.length) {
		// pepita-image
		case 2 :
			return ['image',this.pepitaDefaultImageSize,this.pepitaDefaultImageSize,this.pepitaDefaultColor];
			break;
		// pepita-image-size
		case 3 :
			return ['image',list[2],list[2],this.pepitaDefaultColor];
			break;
		// pepita-image-height-width
		case 4 :
			return ['image',list[2],list[3],this.pepitaDefaultColor];
			break;
		// pepita-image-height-width-color
		case 5:
			return ['image',list[2],list[3],list[4]];
			break;
	}
}

/**
 * Parse category (text/image) and options (type/length/dimensions).
 * Returns category. Either type (word, sentence, paragraph), count
 * or category, width, height and color for an image.
 * @param {Element} element
 * @return {[String, Number, Number, String]}
 */
exports.parse = function (element) {

	let res = element.slice(element.indexOf(this.pepitaSearchTerm));
	res = res.split('-');

	if(res[1] == undefined) {
		console.log("No category specified (text/image) : " + element);
	}

	if(res[1] == 'text') {
		return this.parseText(res);

	} else if(res[1] == 'image') {
		return this.parseImage(res);
	}

	return res;
}

/**
 * Generate text (uses LoremIpsum).
 * @param {String} type
 * @param {Number} length Amount of words, senteces or paragraphs
 * @param {[]} options Options for LoremIpsum
 * @return {String}
 */
exports.generateText = function(type, length=pepitaDefaultWordLength, options) {
	switch(type) {
		case "words":
			return new Ipsum(options).generateWords(parseInt(length, 10));
			break;
		case "sentences":
			return new Ipsum(options).generateSentences(parseInt(length, 10));
			break;
		case "paragraphs":
			return new Ipsum(options).generateParagraphs(parseInt(length, 10));
			break;
	}
}

/**
 * Appends text to the innerHTML of the node.
 * @param {Element} node
 * @param {String} text
 */
exports.injectText = function(node, text) {
	node.innerHTML += text;
}

/**
 * Creates a HTML5 canvas.
 * @param {Element} node
 * @param {Number} width
 * @param {Number} height
 * @return {Canvas}
 */
exports.buildCanvas = function(node, width, height) {
	let canvas = node.createElement("canvas");
	this.changeCanvasSize(canvas, width, height);
	return canvas;
}

/**
 *  Corrects canvas size
 *  @param {Canvas} canvas
 *  @param {Number} width
 *  @param {Number} height
 *  @return {Canvas}
 */
exports.changeCanvasSize = function(canvas, width, height) {
	canvas.width = width;
	canvas.height = height;
	return canvas;
}

/**
 *  Renders a image on the given canvas and returns a URL to it.
 *  @param {Canvas} canvas
 *  @param {String} color
 *  @return {URL}
 */
exports.generateImage = function(canvas, color) {
	const brush = canvas.getContext("2d");
	brush.fillStyle = color;
	brush.fillRect(0, 0, canvas.width, canvas.height);

	return canvas.toDataURL();
}

/**
 *  Sets source tag on target node element and changes size.
 *  @param {Element} node
 *  @param {URL} image
 *  @param {Number} width
 *  @param {Number} height
 *  @return {URL}
 */
exports.injectImage = function(node, image, width, height) {
	node.src = image;
	node.width = width;
	node.height = height;
}


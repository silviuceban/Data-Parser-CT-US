const jsdom = require('jsdom');
const jquery = require('jquery');

module.exports = (html) => {
    const JSDOM = jsdom.JSDOM;
    const dom = new JSDOM(html.replace(/<style.*>.*?<\/style>/ig, ''));
    const $ = jquery(dom.window);

    return $;
};

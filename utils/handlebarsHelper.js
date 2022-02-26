Handlebars.registerHelper("equals", function(string1 ,string2, options) {
    if (string1 === string2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

module.exports = Handlebars.registerHelper(); 
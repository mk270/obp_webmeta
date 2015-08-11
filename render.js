
// there should be a js object

// there should be an overridable config list of metadata fields


var get_short_doi = function() {
    return $("#description span:contains(\"DOI:\")").next().text();
};

var set_dimensions = function(dim_text) {
    $("#description").append( 
        $("<div><span style=\"font-weight: bold\">Dimensions: </span>" 
          + dim_text + "</div>"
         ) 
    );
};

var lookup_dimensions = function(doi) {
    var url = "http://obp.ucant.org/public/book/metadata.json?doi=" + doi;
    $.ajax({
        url: url,
        dataType: "json"
    }).done(function(results) {
        console.log(results);
        set_dimensions(results.dimensions);
    })
};

var loadUser = function() {
    var template = $('#template').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, {fname: "Luke"});
    $('#target').html(rendered);
};

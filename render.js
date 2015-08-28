
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

var state_online_readership(total) {
    var div = $("<div>Total online readers: " + total + "</div>");
    $("#report_total_readers").append(div);
};

var lookup_dimensions = function(doi) {
    var url = "http://obp.ucant.org/public/book/metadata.json?doi=" + doi;
    $.ajax({
        url: url,
        dataType: "json"
    }).done(function(results) {
        console.log(results);
        set_dimensions(results.dimensions);
        state_online_readership(results.total_online_readers);
    })
};

$(document).ready(function() {
    var doi = get_short_doi();
    console.log("DOI" : doi);
    lookup_dimensions(doi);
});

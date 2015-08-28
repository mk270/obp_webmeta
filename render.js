
// there should be a js object

// there should be an overridable config list of metadata fields


var get_short_doi = function() {
    return $("meta[scheme=DOI][name=DC.identifier]").first().attr("content");
};

var state_online_readership = function(total) {
    var div = "<div>Total online readers: " + total + "</div>";
    $("#description").append(div);
};

var lookup_dimensions = function(doi) {
    var url = "http://obp.ucant.org/public/book/metadata.json?doi=" + doi;
    $.ajax({
        url: url,
        dataType: "json"
    }).done(function(results) {
        state_online_readership(results.total_online_readers);
    })
};

$(document).ready(function() {
    var doi = get_short_doi();
    if(doi !== "") {
        lookup_dimensions(doi);
    }
});

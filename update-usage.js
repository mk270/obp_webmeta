// A quick tool to update the usage stats for books on the OBP website

/** The DOI is provided in a <meta> tag in the <head> thus:

       <meta name="DC.identifier" scheme="DOI"
             content="http://dx.doi.org/10.11647/OBP.0060"/>

    We retrieve this and use it in an AJAX request, whose results we
    display in the page
*/

(function() {
  var hostname = "data.openbookpublishers.com";
  var url_base = "http://" + hostname;

  var get_short_doi = function() {
    return $("meta[scheme=DOI][name=DC.identifier]").first().attr("content");
  };

  // via StackOverflow
  var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  var state_online_readership = function(doi, total) {
    if(total <= 1) {
        return;
    }
    var url = url_base + "/static/map/book-countries.html?doi=" + doi;

    var div = "<div>Since publication, this book has been viewed " +
        numberWithCommas(total) + " times " +
        "(<a href=\"" + url + "\">details</a>).</div>";
    $("#description").prepend(div);
  };

  var lookup_metadata = function(doi) {
    var url = url_base + "/public/book/metadata.json?doi=" + doi;
    $.ajax({
      url: url,
      dataType: "json"
    }).done(function(results) {
      state_online_readership(doi, results.total_online_readers);
    })
  };

  $(document).ready(function() {
    var doi = get_short_doi();
    if(doi !== "") {
      lookup_metadata(doi);
    }
  });
})();

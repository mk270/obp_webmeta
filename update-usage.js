// A quick tool to update the usage stats for books on the OBP website

/** The DOI is provided in a <meta> tag in the <head> thus:

       <meta name="DC.identifier" scheme="DOI"
             content="http://dx.doi.org/10.11647/OBP.0060"/>

    We retrieve this and use it in an AJAX request, whose results we
    display in the page
*/

(function() {
  var reports_url_base = "//reports.openbookpublishers.com";
  var api_url_base = "//data.openbookpublishers.com";

  var get_short_doi = function() {
    return $("meta[scheme=DOI][name=DC.identifier]").first().attr("content");
  };

  var state_online_readership = function(url) {
    var div = "<div>To see how this book has been read around the world ";
    div += " <a href=\"" + url + "\">click here</a>.</div>";
    $("#description").prepend(div);
  };

  var lookup_metadata = function(doi) {
    var metadata_url = api_url_base + "/public/book/metadata.json?doi=" + doi;
    $.ajax({
      url: metadata_url,
      dataType: "json"
    }).done(function(results) {
      if (results.publication_date != null) {
        var report_url = reports_url_base + "/public/report/" + doi;
        state_online_readership(report_url);
      }
    })
  };

  $(document).ready(function() {
    var doi = get_short_doi().toLowerCase();
    if(doi !== "") {
      lookup_metadata(doi);
    }
  });
})();

// A quick tool to update the usage stats for books on the OBP website

/** The DOI is provided in a <meta> tag in the <head> thus:

       <meta name="DC.identifier" scheme="DOI"
             content="http://dx.doi.org/10.11647/OBP.0060"/>

    We retrieve this and use it in an AJAX request, whose results we
    display in the page
*/

(function() {
  var reports_url_base = "//reports.openbookpublishers.com";
  var url_base = "//metrics.api.openbookpublishers.com";

  var get_short_doi = function() {
    return $("meta[scheme=DOI][name=DC.identifier]").first().attr("content");
  };

  var state_online_readership = function(doi, noOfPlatforms, noOfCountries) {
    var url = reports_url_base + "/public/report/" + doi;
    var platforms = noOfPlatforms + " platforms";
    var countries = noOfCountries + " countries";
    var div = "<div>Since publication, this book has been read for free in at least ";

    if (noOfPlatforms >= 1 && noOfCountries >= 1) {
        div += platforms + " and " + countries;
    } else if (noOfPlatforms >= 1 && noOfCountries == 0) {
        div += platforms;
    } else if (noOfPlatforms >= 1 && noOfCountries == 0) {
        div += countries;
    } else {
        return;
    }
    div += " (<a href=\"" + url + "\">details</a>).</div>";
    $("#description").prepend(div);
  };

  var lookup_metadata = function(doi) {
    var url = url_base + "/events?filter=work_uri:info:doi:" + doi;
    var countryUrl = url + "&aggregation=country_uri,measure_uri";
    var measureUrl = url + "&aggregation=measure_uri";
    $.ajax({
      url: countryUrl,
      dataType: "json"
    }).done(function(countryResults) {
        $.ajax({
          url: measureUrl,
          dataType: "json"
        }).done(function(measureResults) {
            state_online_readership(doi, measureResults.count,
                                    countryResults.count);
        })
    })
  };

  $(document).ready(function() {
    var doi = get_short_doi().toLowerCase();
    if(doi !== "") {
      lookup_metadata(doi);
    }
  });
})();

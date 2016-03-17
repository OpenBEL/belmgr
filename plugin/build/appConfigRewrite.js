function _rewriteOpenBelApiUrl(content) {
  if (process.env.OPENBEL_API_URL) {
    var openBelApiUrl = process.env.OPENBEL_API_URL;
    console.log("rewriting OPENBEL API URL to: " + openBelApiUrl);
    content = content.replace(/http:\/\/localhost:9292\/api/g, openBelApiUrl);
  }
  return content;
}

function _rewritePubMedURL(content) {
  if (process.env.PUBMED_URL) {
    var pubmedURL = process.env.PUBMED_URL;
    console.log("rewriting PubMed URL to: " + pubmedURL);
    content = content.replace(/http:\/\/www.ebi.ac.uk\/europepmc\/webservices\/rest\/search/g, pubmedURL);
  }
  return content;
}

module.exports = {
  rewriteAppConfig: function (content, done) {
    done(null, _rewriteOpenBelApiUrl(_rewritePubMedURL(content)));
  }
};


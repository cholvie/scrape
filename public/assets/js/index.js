/*global bootbox*/
$(document).ready(function() {
    // Setting a reference to the article-container div where all the dynamic content will be
    // Adding event listeners to any dynamically generated "save article"
    // "scrape new article" buttons    
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // Once the page is ready, run the initPage function to kick things off
    initPage();

    function initPage() {
        // Empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data) {
            // If there are headlines, render them to the page
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                // Otherwise render a message explaining that there are no articles
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        // This function handles appending HTML containing our article data to the page
        // passed an array of JSON containing all available articles in the database
        var articlePanels = [];
        // Pass each article JSON object to the createPanel function which returns a bootstrap with article data inside
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
    }

})
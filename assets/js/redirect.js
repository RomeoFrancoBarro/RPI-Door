document.addEventListener('DOMContentLoaded', function () {
    

    $(document).ready(function () {
        // Assuming your tabs are within a container with the ID "myTabs"
        var $tabsContainer = $('#myTabs');
    
        // Show the third tab (index 2, assuming zero-based indexing)
        $tabsContainer.find('li:eq(2) a').tab('show');
    });
});
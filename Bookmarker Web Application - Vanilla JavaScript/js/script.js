document.querySelector('#myForm').addEventListener('submit', getSiteInfo);

function getSiteInfo(e) {

    let siteName = document.querySelector('#siteName').value;
    let siteURL = document.querySelector('#siteURL').value;

    if (!validateSiteInfo(siteName, siteURL)) {
        return false;
    } else {
        let siteInfo = {
            name: siteName,
            url: siteURL
        }
        storeSiteInto(siteInfo);
        displayBookmarks(siteInfo);
        resetField();
    }

    // preventing from refreshing the page
    e.preventDefault();
}


// validating the input values of user
function validateSiteInfo(siteName, siteURL) {
    // check if user keep any field empty
    if (!siteName || !siteURL) {
        alert('Please input the fields correctly');
        return false;
    }

    //check for URL validation - Creating RegExp
    let urlRegExp = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

    if (!siteURL.match(urlRegExp)) {
        alert('Please input a valid URL')
        return false;
    }
    //return true when everything is good
    return true;
}

// Store the SiteInfo in local storage
function storeSiteInto(siteInfo) {
    //check if localstorage is empty
    let bookmarks = [];
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks.push(siteInfo);

        //Stringify the object for localStorage 
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else { // appending the bookmark
        // fetch bookmark
        fetchBookmarks(siteInfo);
    }
}

function fetchBookmarks(siteInfo) {
    let bookmarks = localStorage.getItem('bookmarks');
    //parsing string into JSON object
    bookmarks = JSON.parse(bookmarks);

    //appending the new bookmark into existing bookmarks;
    bookmarks.push(siteInfo);

    //Storing in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function displayBookmarks() {
    let displayBookmarks = document.querySelector('#displayBookmarks');
    let bookmarks = localStorage.getItem('bookmarks');
    bookmarks = JSON.parse(bookmarks);

    displayBookmarks.innerHTML = '';
    if (bookmarks !== null) {
        for (let i = 0; i < bookmarks.length; i++) {
            let name = bookmarks[i].name;
            let url = bookmarks[i].url;

            displayBookmarks.innerHTML += '<div class="card card-body">' +
                '<h3>' + name + '</h3>' +
                '<a class="btn btn-primary" target="_blank" href="' + url + '">Visit Bookmark</a>' +
                '<input type="button" class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\')" value="Delete">' +
                '</div>';
        }
    }
}

function deleteBookmark(deleteURL) {
    let bookmarks = localStorage.getItem('bookmarks');
    //parsing string into JSON object
    bookmarks = JSON.parse(bookmarks);

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == deleteURL) {
            bookmarks.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    displayBookmarks();
}

function resetField(){
    document.querySelector('#siteName').value = '';
    document.querySelector('#siteURL').value = '';
}
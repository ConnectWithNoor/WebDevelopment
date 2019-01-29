//getting Form, Search Input Field
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

// Event Lister to form submit
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // getting searchText
    const searchText = searchInput.value;

    //getting sort value by sudo selector
    const sortBy = document.querySelector('input[name = "sortby"]:checked').value;

    // getting limit
    const searchLimit = document.querySelector('#limit').value;

    // check if inputText has no string
    if (searchText === '') {
        showMessage('Please add a Search Term', 'alert-danger');
    } else {
        //fetching
        fetch(`https://www.reddit.com/search.json?q=${searchText}&sort=${sortBy}&limit=${searchLimit}`)
            .then((res) => res.json())
            .then((res) => {
                let results = res.data.children.map((index) => index.data);
                
                //output the results to DOM
                let output = '<div class="row">';
                //loop through post
                results.forEach((post) => {
                    // check for image if post.preview exist then get img else got a general image
                    const image =  post.preview ? post.preview.images[0].source.url : 'https://wearesocial-net.s3.amazonaws.com/us/wp-content/uploads/sites/7/2015/07/2A326ECA00000578-3148329-California_based_Reddit_logo_shown_has_fired_an_employee_called_-a-6_1435919411902.jpg';

                    output +=
                        `<div class="col-sm-4">
                        <div class="card">
                            <img class="card-img-top" src="${image}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${truncateText(post.title, 100)}</h5>
                                <p class="card-text">${truncateText(post.selftext, 150)}</p>
                                <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                                <hr>
                                <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                                <span class="badge badge-dark">Score: ${post.score}</span>
                            </div>
                         </div>
                    </div>`
                });
                output += `</div>`;
                document.querySelector('#results').innerHTML = output;
            })
            .catch((err) => showMessage(err, 'alert-danger'));
    }

    //clear input
    searchInput.value = '';
});

//Show Message Function
function showMessage(message, className) {
    // create a div
    const div = document.createElement('div');
    div.className = 'alert ' + className;
    div.id = 'noOutput';
    div.appendChild(document.createTextNode(message));

    //placement of messsage div
        // id of div under which message div displays: 
        const searchContainer = document.querySelector('#search-container');
        // id of div before message div should display
        const search = document.querySelector('#search');

    // insert message div
    searchContainer.insertBefore(div, search);

    // Timeout message div
    setTimeout(() => {
        document.querySelector('#noInput').remove();
    }, 3000);
};

function truncateText(text, limit) {
    const shortend = text.indexOf(' ', limit);
    if (shortend === -1) {
        return text;
    };
    return text.substring(0, shortend);
};
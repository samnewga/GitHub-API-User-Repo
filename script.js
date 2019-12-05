'use strict';

function getRepos(query) {

    const url = `https://api.github.com/users/${query}/repos`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            $('#results').find('h3').text(`GitHub Repositories For ${query}`)
            displayResults(responseJson);
        })
        .catch(err => {
            $('#error-message').text(`Something went wrong: ${err.message}`);
            $('#results').find('h3').text(`Search Results`)
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchUser = $('#user-name').val();
        $('#results-list').empty();
        $('#user-name').val('');
        $('#error-message').text('');
        getRepos(searchUser);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    responseJson.map( item => {
        $('#results-list').append(
            `<li>
                <h3>${item.full_name}</h3>
                <p><a href="${item.html_url}" target="_blank">GitHub Repo Link</a></p>
            </li>`
        );
    })

    $('#results').removeClass('hidden');
}

$(watchForm);
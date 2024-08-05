//base URL
const baseUrl = "https://soccer-news-player-profiles-api.p.rapidapi.com/news/";
window.onload = () => fetchData(baseUrl);

// Function to be called when the dropdown selection changes
function specificNewspaper() {
    const selected = document.getElementById("newspaperSelected").value;
    var url = baseUrl;
    if (selected !== "0") {
        // adds the selected newspaper to the end of the url
        url = `${url}${selected}`
        console.log(url);
        fetchData(url); 
    }
    else{ 
        fetchData(baseUrl)
    }
}

// Function to fetch data from the API
async function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd671b3ac6cmsh6b6350640968841p11a1eejsn3fc6ea309438',
            'x-rapidapi-host': 'soccer-news-player-profiles-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        displayData(result);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to display the fetched data
function displayData(data) {
    const apiNewsDiv = document.getElementById("soccer news");
    apiNewsDiv.innerHTML = ''; 
    if (Array.isArray(data)) { //checks if the data is an array, helps with if else stuff
        data.forEach(article => {
            const articleDiv = document.createElement('div'); //creating divs for each article 
            articleDiv.classList.add("articles")
            articleDiv.innerHTML = `
                <h2>Title: ${article.title}</h2>
                <a href="${article.url}" target="_blank">${article.url}</a>
                <p>Source: ${article.source}</p>
            `;
            apiNewsDiv.appendChild(articleDiv);
        });
    } else {
        apiNewsDiv.innerHTML = `<p>No data available. Please try a different input</p>`;
    }
}



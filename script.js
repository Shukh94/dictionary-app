function searchDictionary() {
    const wordInput = document.getElementById('wordInput').value.trim();
    if (wordInput === '') {
      alert('Please enter a word!');
      return;
    }
  
    // Replace 'YOUR_API_KEY' with your actual Merriam-Webster API key
    const apiKey = 'ba8208d6-da8f-4680-877e-4d194d4c0a5b';
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/learners/json/${wordInput}?key=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(data => {
        displayDefinition(data);
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }
  
  function displayDefinition(data) {
    const definitionDiv = document.getElementById('definition');
    definitionDiv.innerHTML = '';
  
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const definition = data[0].shortdef.join(', ');
      definitionDiv.innerHTML = `<h3>Definition:</h3><p>${definition}</p>`;
    } else {
      definitionDiv.innerHTML = '<p>No definition found.</p>';
    }
  }
  
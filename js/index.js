const movies = document.querySelector('#movies .container');

(async () => {

  document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    movies.innerHTML = '';

    let value = document.querySelector('input').value;
    value = value.replace(/^ +| +$/g, '');
    value = value.replace(/ +/g, ' ');
    value = value.replace(/ /g, '+');

    const response = await fetch(`http://www.omdbapi.com/?s=${value}&apikey=d15a4c6d`);
    const data     = (await response.json()).Search;

    if (data) {
      data.map(d => {
        let child = document.createElement('div');
        child.classList.add('movie');
        child.innerHTML = `
          <a href="#"><img src=${d.Poster}></a>
          <h2>${d.Title}</h2>
          <p class="type">${d.Type}</p>
          <p class="date">Released In ${d.Year}</p>
        `;
        movies.appendChild(child);
      });
    } else {
      movies.innerHTML = `<h1>404 Not Found</h1>`;
    }
  });

})();

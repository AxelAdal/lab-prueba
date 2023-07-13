fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const userIds = new Set();
    const postsMap = new Map();

    users.forEach(user => {
      userIds.add(user.id);
    });

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          if (userIds.has(post.userId)) {
            if (!postsMap.has(post.userId)) {
              postsMap.set(post.userId, []);
            }
            postsMap.get(post.userId).push(post);
          }
        });

        const postsContainer = document.getElementById('contenedor');

        users.forEach(user => {
          const userPosts = postsMap.get(user.id);

          const userElement = document.createElement('div');
          userElement.classList.add('user');

          const circuloElement = document.createElement('div');
          circuloElement.classList.add('rojo');

          const usernameElement = document.createElement('h2');
          usernameElement.textContent = user.username;

          const emailElement = document.createElement('p');
          emailElement.textContent = `Email: ${user.email}`;

          const phoneElement = document.createElement('p');
          phoneElement.textContent = `Phone: ${user.phone}`;

          const companyElement = document.createElement('p');
          companyElement.textContent = `Company: ${user.company.name}`;

          userElement.appendChild(circuloElement);
          userElement.appendChild(usernameElement);
          userElement.appendChild(emailElement);
          userElement.appendChild(phoneElement);
          userElement.appendChild(companyElement);

          

          postsContainer.appendChild(userElement);
        });
      });
  })
  .catch(error => {
    console.error('Error al obtener los usuarios y posts:', error);
  });

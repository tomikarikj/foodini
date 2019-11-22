const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function() {
  // Nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'left' });
  // Add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'right' });
});

// Render the recipe data
const renderRecipe = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/cook.svg" alt="recipe thumb"></img>
      <div class="recipe-details">
        <div class="recipe-title">${data.title}</div>
        <div class="recipe-ingredients">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="far fa-trash-alt" data-id="${id}"></i>
      </div>
    </div>
  `;

  recipes.innerHTML += html;
};

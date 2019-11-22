// Offline data
db.enablePersistence().catch(err => {
  if (err.code == 'failed-precondition') {
    // Probably multiple tabs open at the same time
    console.log('Persistence failed');
  } else if (err.code == 'unimplemented') {
    // Lack of browser support
    console.log('Persistence is not available');
  }
});

// Real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      // Add the document data to the UI
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if (change.type === 'removed') {
      // Remove the document data from the UI
      removeRecipe(change.doc.id);
    }
  });
});

// Add a new recipe
const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value
  };

  db.collection('recipes')
    .add(recipe)
    .catch(err => console.error(err));

  form.title.value = '';
  form.ingredients.value = '';
});

// Delete a recipe
const recipeContainer = document.querySelector('.recipes');
recipeContainer.addEventListener('click', e => {
  if (e.target.tagName === 'I') {
    const id = e.target.getAttribute('data-id');

    db.collection('recipes')
      .doc(id)
      .delete();
  }
});

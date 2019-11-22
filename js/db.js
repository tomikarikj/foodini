// Real-time listener
db.collection('recipes').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      // Add the document data to the UI
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if (change.type === 'removed') {
      // Remove the document data from the UI
    }
  });
});

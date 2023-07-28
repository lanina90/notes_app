import {createDate, generateUniqueId, getDatesFromString} from "./utils/functions.js";
import {notes} from "./utils/data.js";
import {
  createArchivedNoteHTML,
  createEditFormHTML,
  createNoteRowHTML,
  createSummaryRowHTML
} from "./utils/createNoteHTML.js";
import {
  archivedNotesBody,
  category,
  content,
  createNoteBtn,
  form, noteFrom,
  notesBody, summaryBody,
  title
} from "./constants/constants.js";

const renderNotes = () => {
  try {
    notesBody.innerHTML = notes
      .filter(note => !note.archived)
      .map((note) => createNoteRowHTML(note))
      .join('');
  } catch (e) {
    console.error(e)
  }
};

notesBody.addEventListener('click', (event) => {
  const button = event.target;
  const id = button.dataset.id;

  if (button.id === 'edit-note') {
    editNote(id);
  } else if (button.id === 'archive-note') {
    archiveNote(id);
  } else if (button.id === 'remove-note') {
    removeNote(id);
  }
});

const editNote = (id) => {
  try {
    const noteIndex = notes.findIndex((note) => note.id === +id);
    const editSection = document.createElement('section');
    editSection.className = 'edit-module'

    editSection.innerHTML = createEditFormHTML(notes[noteIndex]);

    const titleInput = editSection.querySelector('#title');
    const contentInput = editSection.querySelector('#content');
    const categoryInput = editSection.querySelector('#category');
    const options = Array.from(categoryInput.options);

    const optionToSelect = options.find(option => option.value === notes[noteIndex].category);
    if (optionToSelect) {
      optionToSelect.selected = true;
    }

    editSection.addEventListener('submit', (event) => {
      event.preventDefault();

      notes[noteIndex] = {
        ...notes[noteIndex],
        title: titleInput.value,
        content: contentInput.value,
        category: categoryInput.value,
        dates: getDatesFromString(contentInput.value),
      };
      editSection.remove();
      renderNotes();
      document.body.className = '';
    });

    document.body.appendChild(editSection);
    document.body.className = 'active';
  } catch (e) {
    console.error(e);
  }
};
const renderArchivedNotes = () => {

  try {
    archivedNotesBody.innerHTML = '';
    notes.forEach((note) => {
      if (note.archived) {
        const trHTML = createArchivedNoteHTML(note);
        archivedNotesBody.insertAdjacentHTML('beforeend', trHTML);

        const unarchiveButton = document.querySelector(`#unarchive-note-${note.id}`);
        unarchiveButton.addEventListener('click', () => unArchiveNote(note.id));
      }
    });
  } catch (e) {
    console.error(e);
  }
}

const createNote = () => {
  try {
    const note = {
      id: generateUniqueId(),
      title: title.value,
      created: createDate(),
      content: content.value,
      category: category.value,
      dates: getDatesFromString(content.value),
      archived: false,
    };
    notes.push(note);
    form.style.display = 'none';
    form.reset();

    renderNotes();
    renderSummaryTable();
  } catch (e) {
    console.error(e);
  }
}

createNoteBtn.addEventListener('click', () => {
  noteFrom.style.display = 'block';
});

noteFrom.addEventListener('submit', (event) => {
  event.preventDefault();
  createNote();
});

const archiveNote = (id) => {
  try {
    const foundNote = notes.find((note) => note.id === +id);
    if (foundNote) {
      foundNote.archived = true;
      renderNotes();
      renderArchivedNotes();
      renderSummaryTable();
    }
  } catch (e) {
    console.error(e);
  }
}

const removeNote = (index) => {
  notes.splice(index, 1);
  renderNotes();
  renderSummaryTable();
}

const unArchiveNote = (id) => {
  const note = notes.find((note) => note.id === id);
  if (note) {
    note.archived = false;
    renderNotes();
    renderArchivedNotes();
    renderSummaryTable();
  } else {
    console.error(`Note with id ${id} not found.`);
  }
}

function renderSummaryTable() {

  const categoriesCount = notes.reduce((acc, note) => {
    const status = note.archived ? 'archived' : 'active';
    const category = note.category;

    acc[category] = acc[category] || {active: 0, archived: 0};
    acc[category][status]++;
    return acc;
  }, {});

  summaryBody.innerHTML = '';

  for (let category in categoriesCount) {
    const rowHTML = createSummaryRowHTML(category, categoriesCount[category].active, categoriesCount[category].archived);
    summaryBody.insertAdjacentHTML('beforeend', rowHTML);
  }
}

renderSummaryTable();
renderNotes();
renderArchivedNotes();


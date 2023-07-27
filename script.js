import {trimText, createDate, getCategoryImage, getDatesFromString} from "./utils/functions.js";

let notes = [
  {
    title: 'Shopping list',
    created: 'June 21, 2023',
    content: 'Bread, cucumbers, salt',
    category: 'Task',
    dates: '',
    archived: true,
  },
  {
    title: 'The theory of evolution',
    created: 'June 29, 2023',
    content: 'The evolution theory',
    category: 'Random Thought',
    dates: '',
    archived: false,
  },
  {
    title: 'New feature',
    created: 'July 15, 2023',
    content: 'Implement new feature for app before 18/07/2023',
    category: 'Idea',
    dates: '',
    archived: false,
  },
  {
    title: 'Workout routine',
    created: 'July 20, 2023',
    content: '1. Pushups 2. Situps 3. Squats',
    category: 'Task',
    dates: '20/07/2023, 24/07/2023',
    archived: false,
  },
  {
    title: 'Book suggestions',
    created: 'July 22, 2023',
    content: '1. The Great Gatsby 2. To Kill a Mockingbird',
    category: 'Random Thought',
    dates: '',
    archived: false,
  },
  {
    title: 'Grocery shopping',
    created: 'July 23, 2023',
    content: 'Milk, Eggs, Bread, Fruits',
    category: 'Task',
    dates: '29/07/2023',
    archived: false,
  },
  {
    title: 'Car service',
    created: 'July 25, 2023',
    content: 'Need to service the car',
    category: 'Task',
    dates: '1/08/2023',
    archived: false,
  }
];

document.addEventListener('DOMContentLoaded', (event) => {

  const renderNote = (note, index, noteBody) => {
    let categoryImage = getCategoryImage(note.category);
    let titleText = trimText(note.title, 20);
    let noteText = trimText(note.content, 18);
    const tr = document.createElement('tr');
    tr.id = `note-${index}`;

    tr.innerHTML = `
       <td id="note-title-${index}">
           <div class="flex-container">
               <div class="category-image"><img src="${categoryImage}" alt="${note.category}" /></div> 
               <div>${titleText}</div>
           </div>
        </td> 
        <td>${note.created}</td>
        <td id="note-category-${index}">${note.category}</td>
        <td id="note-text-${index}">${noteText}</td>
        <td>${note.dates}</td>
        <td> <div id="edit-note" data-index="${index}" class="pic edit"/></td>
        <td> <div id="archive-note" data-index="${index}" class="pic archive"/></td>
        <td> <div id="remove-note" data-index="${index}" class="pic remove"/></td>
    `;
    noteBody.appendChild(tr);
  }

  const renderNotes = () => {

    const notesBody = document.querySelector('#notes-body');
    notesBody.innerHTML = '';
    notes.forEach((note, index) => {
      if (!note.archived) {
        renderNote(note, index, notesBody);
      }
    });

    const editButtons = document.querySelectorAll('#edit-note');
    for (let button of editButtons) {
      button.addEventListener('click', (event) => {
        editNote(event.target.dataset.index)
        event.currentTarget.className = 'pic save'
        }
      );
    }

    const archiveButtons = document.querySelectorAll('#archive-note');
    for (let button of archiveButtons) {
      button.addEventListener('click', (event) => archiveNote(event.target.dataset.index));
    }

    const removeButtons = document.querySelectorAll('#remove-note');
    for (let button of removeButtons) {
      button.addEventListener('click', (event) => removeNote(event.target.dataset.index));
    }
  }

  const editNote = (index) => {
    const note = notes[index];
    const editSection = document.createElement('section');
    const editForm = document.createElement('form');

    document.body.className = 'active'
    editSection.className = 'edit-module'
    editForm.className = 'edit-form'

    editForm.innerHTML = `

    <label for="title">Title</label>
    <input type="text" id="title" value="${note.title}"/>
    <label for="content">Content</label>
    <input type="text" id="content" value="${note.content}"/>
     <label for="category">Category</label>
      <select id="category" name="category">
        <option value="Task">Task</option>
        <option value="Random Thought">Random Thought</option>
        <option value="Idea">Idea</option>
      </select>
    <button type="submit">Save</button>
  `;

    for (let option of editForm.querySelector('#category').options) {
      if (option.value === note.category) {
        option.selected = true;
        break;
      }
    }

    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      note.title = editForm.querySelector('#title').value;
      note.content = editForm.querySelector('#content').value;
      note.category = editForm.querySelector('#category').value;

      note.dates = getDatesFromString(note.content);

      renderNotes();

      editSection.remove()
      document.body.className = ''

    });
    editSection.append(editForm);

    document.body.appendChild(editSection);

    editForm.style.display = 'flex';
  };


  const renderArchivedNotes = () => {
    const archivedNotesBody = document.querySelector('#archived-notes-body');
    archivedNotesBody.innerHTML = '';
    notes.forEach((note, index) => {
      if (note.archived) {
        const tr = document.createElement('tr');
        let categoryImage = getCategoryImage(note.category);
        tr.innerHTML = `
                <td>
                <div class="flex-container">
                    <div class="category-image"><img src="${categoryImage}" alt="${note.category}" /></div> 
                    <div>${note.title}</div>
                </div>
                </td>
                <td>${note.created}</td>
                <td>${note.category}</td>
                <td>${note.content}</td>
                <td>${note.dates}</td>
                <td> <div id="unarchive-note" data-index="${index}" class="pic unarchive"/></td>
            `;
        archivedNotesBody.appendChild(tr);
      }
    });
    const unArchiveButtons = document.querySelectorAll('#unarchive-note');
    for (let button of unArchiveButtons) {
      button.addEventListener('click', (event) => unArchiveNote(event.target.dataset.index));
    }
  }

  const createNote = () => {
    const form = document.querySelector('#note-form');
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const category = document.querySelector('#category').value;

    const note = {
      title,
      created: createDate(),
      content,
      category,
      dates: getDatesFromString(content),
      archived: false,
    };
    notes.push(note);
    form.style.display = 'none';
    form.reset();

    renderNotes();
  }

  const archiveNote = (index) => {
    notes[index].archived = true;
    renderNotes();
    renderArchivedNotes();
  }

  const removeNote = (index) => {
    notes.splice(index, 1);
    renderNotes();
  }

  const unArchiveNote = (index) => {
    notes[index].archived = false;
    renderNotes();
    renderArchivedNotes();
  }

  document.getElementById('create-note-btn').addEventListener('click', () => {
    document.getElementById('note-form').style.display = 'block';
  });

  document.getElementById('note-form').addEventListener('submit', (event) => {
    event.preventDefault();
    createNote();
  });


  renderNotes();
  renderArchivedNotes();

});
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
    dates: '18/07/2023',
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

  const getDatesFromString = (str) => {
    const matches = str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
    return matches ? matches.join(', ') : '';
  }

  const getCategoryImage = (category) => {
    let categoryImage;
    switch (category) {
      case "Task":
        categoryImage = "/images/task_icon.svg";
        break;
      case "Random Thought":
        categoryImage = "/images/thought_icon.svg";
        break;
      case "Idea":
        categoryImage = "/images/idea_icon.svg";
        break;
      default:
        categoryImage = "";
    }
    return categoryImage;
  }

  const createDate = () => {
    let date = new Date()
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  const renderNote = (note, index, noteBody) => {
    let categoryImage = getCategoryImage(note.category);
    let titleText = trimText(note.title, 20);
    let noteText = trimText(note.content, 18);
    const tr = document.createElement('tr');

    tr.innerHTML = `
       <td>
           <div class="flex-container">
               <div class="category-image"><img src="${categoryImage}" alt="${note.category}" /></div> 
               <div>${titleText}</div>
           </div>
        </td> 
        <td>${note.created}</td>
        <td>${note.category}</td>
        <td>${noteText}</td>
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

    const archiveButtons = document.querySelectorAll('#archive-note');
    for (let button of archiveButtons) {
      button.addEventListener('click', (event) => archiveNote(event.target.dataset.index));
    }

    const removeButtons = document.querySelectorAll('#remove-note');
    for (let button of removeButtons) {
      button.addEventListener('click', (event) => removeNote(event.target.dataset.index));
    }
  }
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

});
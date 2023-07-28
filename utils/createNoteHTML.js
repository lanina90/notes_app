import {getCategoryImage, trimText} from "./functions.js";

export const createNoteRowHTML = (note) => {
  let categoryImage = getCategoryImage(note.category);
  let titleText = trimText(note.title, 20);
  let noteText = trimText(note.content, 18);

  return `
     <tr id="note-${note.id}">
      <td id="note-title-${note.id}">
        <div class="flex-container">
          <div class="category-image"><img src="${categoryImage}" alt="${note.category}" /></div> 
          <div>${titleText}</div>
        </div>
      </td> 
      <td>${note.created}</td>
      <td id="note-category-${note.id}">${note.category}</td>
      <td id="note-text-${note.id}">${noteText}</td>
      <td>${note.dates}</td>
      <td> <div id="edit-note" data-id="${note.id}" class="pic edit"/></td>
      <td> <div id="archive-note" data-id="${note.id}" class="pic archive"/></td>
      <td> <div id="remove-note" data-id="${note.id}" class="pic remove"/></td>
    </tr>`;
};

export const createEditFormHTML = (note) => {
  return `
    <form class="edit-form">
    <label for="title">Title</label>
    <input type="text" id="title" value="${note.title}"/>
    <label for="content">Content</label>
    <input type="text" id="content" value="${note.content}"/>
    <label for="category">Category</label>
    <select id="category" name="category">
      <option value="Task">Task</option>
      <option value="Random Thought">Random Thought</option>
      <option value="Idea">Idea</option>
      <option value="Quote">Quote</option>
    </select>
    <button type="submit">Save</button>
    </form>
  `;
}

export const createArchivedNoteHTML = (note) => {
  let categoryImage = getCategoryImage(note.category);
  return `

    <tr>
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
    <td><div id="unarchive-note-${note.id}" data-id="${note.id}" class="pic unarchive"/></td>
</tr>

  `;
};

export const createSummaryRowHTML = (category, activeCount, archivedCount) => {
  let categoryImage = getCategoryImage(category);
  return `
    <tr>
    <td>
      <div class="flex-container">
        <div class="category-image"><img src="${categoryImage}" alt="${category}" /></div>
        ${category}
      </div>
    </td>
    <td>${activeCount}</td>
    <td>${archivedCount}</td>
    </tr>
  `;

}

export const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
}
export const getDatesFromString = (str) => {
  const matches = str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
  return matches ? matches.join(', ') : '';
}

export const getCategoryImage = (category) => {
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
    case "Quote":
      categoryImage = "/images/quotes_icon.svg";
      break;
    default:
      categoryImage = "";
  }
  return categoryImage;
}

export const createDate = () => {
  let date = new Date()
  let options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
}

export const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}



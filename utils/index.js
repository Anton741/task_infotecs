export function sortingBycolum(arr, colum_name, mode) {
  if (colum_name === 'firstName' || colum_name === 'lastName') {
    if (mode === 'up') {
      arr = arr.sort((a, b) => {
        return a.name[colum_name] > b.name[colum_name] ? 1 : -1;
      });
      mode = 'down';
    } else {
      arr = arr.sort((a, b) => {
        return a.name[colum_name] < b.name[colum_name] ? 1 : -1;
      });
      mode = 'up';
    }
  }else{
    if (mode === 'up') {
      arr = arr.sort((a, b) => {
        return a[colum_name] > b[colum_name] ? 1 : -1;
      });
      mode = 'down';
    } else {
      arr = arr.sort((a, b) => {
        return a[colum_name] < b[colum_name] ? 1 : -1;
      });
      mode = 'up';
    }
}
  return arr, mode;
}

export function separateUsers(users, pageSize, pageNumber) {
  const startIndex = (pageNumber - 1) * pageSize;
  return users.slice(startIndex, pageSize + startIndex);
}


export function getColor(color){
    const color_block = document.createElement('div')
    color_block.className = 'color__block'
    color_block.style.background = `${color}`
    return color_block
}
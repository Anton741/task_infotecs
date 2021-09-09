// модуль создания навигации по страницам 

export class Pagination {
  constructor(changePage, countPage) {
    this.changePage = changePage;
    this.currentPage;
    this.pages = [...Array(countPage).keys()]; // массив из кол-во страниц
    this.ul = document.createElement('ul');
    this.ul.className = 'pages';
  }

  #createPageList = () => {
    this.pages.map((page) => {
      const li = document.createElement('li');
      li.className = 'page';
      const button = document.createElement('button');
      button.textContent = `${page + 1}`;
      if (this.currentPage === page + 1) {
        button.className = 'btn page__btn page__btn-active';
      } else {
        button.className = 'btn page__btn';
      }
      button.id = `${page + 1}`;
      button.addEventListener('click', () => this.changePage(page + 1));
      li.append(button);
      this.ul.append(li);
      return this.ul;
    });
    return this.ul;
  };

  render(currentPage) {
    this.currentPage = currentPage;
    this.ul.innerHTML = ' ';
    this.#createPageList();
    return this.ul;
  }
}

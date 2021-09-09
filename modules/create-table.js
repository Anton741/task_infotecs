// модуль создания таблицы

export class Table {
  constructor(props, sorting, getColor, title, edit_function) {
    this.props = props; // текущее состояния страницы
    this.sorting = sorting.bind(this); // фнкция сортировки
    this.edit_function = edit_function; // фнкция редактирования 
    this.table = document.querySelector('.table__user');
    this.getColor = getColor
    this.titlesFieald = title;
  }
  #creteTableTitle = (users) => {
    const tr = document.createElement('tr');
    tr.className = 'table__column';
    Object.keys(this.titlesFieald).forEach((title) => {
      const sorting_btn = document.createElement('button');
      sorting_btn.textContent = '↑↓'; // кнопка для сортировки
      sorting_btn.className = 'table__btn-sorting';
      const th = document.createElement('th');
      const title__wrap = document.createElement('div');
      title__wrap.className = 'titels__item';
      const thContext = document.createElement('p');
      thContext.textContent = `${this.titlesFieald[title]}`;
      title__wrap.append(thContext, sorting_btn);
      th.append(title__wrap);
      tr.append(th);
      sorting_btn.addEventListener('click', () => {
        users,
          (this.props['mode_sorting'] = this.sorting(
            users,
            title,
            this.props['mode_sorting']
          ));
        this.table.innerHTML = ''; // очищаем таблицу
        this.render(users); // перересовываем отсортированными данными
      }); // ф-ия сортировки принимает массив пользователей, mode_sorting - как необходимо отсоритровать (по убыванию/возрастанию),  title, - по какому заколовку (берется по id на какой пользователь нажал)
    });
    return tr;
  };
  #createTableElement = (elements) => { // заполняетс таблица
    const tr = document.createElement('tr');
    tr.className = 'table__column';
    Object.keys(elements).map((element) => { // elements - массив с пользователями element - параметр пользователя (first_name, about ....)
      // name это объект и чтобы вытащить first_name нам нужно зайти в name вот для этого условие 
      if (typeof elements[element] === 'object') {
        elements = { ...elements, ...elements[element] };
        Object.keys(elements[element]).map((sub_element) => {
          if (Object.keys(this.titlesFieald).includes(sub_element)) {
            const td = document.createElement('td');
            const tdText = document.createElement('p');
            tdText.className = 'table__date';
            tdText.textContent = `${elements[element][sub_element]}`;
            td.append(tdText);
            tr.append(td);
          }
        });
      } else {
        if (Object.keys(this.titlesFieald).includes(element)) {
          const tdText = document.createElement('div');
          const td = document.createElement('td');
          tdText.className = 'table__date';
          tdText.id = `${element}`;
          if (element === 'eyeColor') {
            tdText.append(this.getColor(elements[element])); 
          }else{
            tdText.textContent = `${elements[element]}`;
          }
          td.append(tdText);
          tr.append(td);
        }
      }
    });
    tr.addEventListener(
      'click',
      (e) => this.edit_function(elements, elements['id']),
      false
    );
    return tr;
  };
  #createTable = (users) => {
    this.table.append(this.#creteTableTitle(users));

    users.forEach((user, index) => {
      this.table.append(this.#createTableElement(user, index));
    });
    return this.table;
  };

  render(users) {
    this.table.innerHTML = ' ';
    return this.#createTable(users);
  }
}

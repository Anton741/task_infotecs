//Основной файл, куда импортирубтся все модули 

import { Table } from './create-table.js';
import { Pagination } from './pagination.js';
import { separateUsers, getColor, sortingBycolum} from '../utils/index.js';
// import { sortingBycolum as sorting } from '../utils/index.js';
import { Edit } from './edit_str.js';

export default class App {
  constructor(date) {
    this.state = {    // Начальное состояние 
      users: date,
      pageSize: 10,
      currentPage: 1,
      mode_sorting: 'up',
    };
    this.title = { // создаем переменную, что бы в дальнейшим если изменится таблица можно было легко поминять заголовки
      firstName: 'Имя',
      lastName: 'Фамилия',
      about: 'Описание',
      eyeColor: 'Цвет глаз',
    };
    this.countPage = Math.ceil(this.state.users.length / this.state.pageSize); // количество страниц определяется исходя из того сколько записей в БД и сколько вмещает одна страница
    this.usersOnPage = separateUsers( // функция принимает все записи, а возвращает кол-во записей, которое вмещает страница
      this.state.users,
      this.state.pageSize,
      this.state.currentPage
    );
    this.tableOfUser = new Table(
      this.state,
      // передаем функции модулю т.к необходимо передавать параметры то передаем как стралочную
      (users, titles, mode_sorting) => sortingBycolum(users, titles, mode_sorting), 
      getColor,
      this.title,
      this.editTable.bind(this)
    ); // создаем таблицу с помощью заранее импортируемго модуля
    this.pagination = new Pagination(
      (page) => this.changePage(page),
      this.countPage
    ); // навигация по страницам 
    this.edit = new Edit(); // модуль редактирования записи в таблице
  }

  changePage(page) {
    this.table.innerHTML = ' '; // очищаем таблицу т7к при смене будет происходить ререйдинг и таблица должна наполнятся новым контеном 
    this.usersOnPage = separateUsers(
      this.state.users,
      this.state.pageSize,
      page
    ); // вызываем функцию, которая вернет порнцию новых данных 
    this.state.currentPage = page; // изменяем текущую страницу 
    this.run(); // перересовываем разметку и отображаем новую таблицу 
  }

  editTable(tableRow, userId) {
    this.edit.render(tableRow, this.title, userId, this.saveChanges.bind(this)); // создает на странице форму редактирования 
  }

  saveChanges(e, userId) {
    e.preventDefault(); // отменяем обновления странице по submit
    const target = e.target; // ищем по  id необходимого пользователя 
    this.state.users.forEach((user) => {
      if (user.id === userId) {
        const new_value = [];
        for (let i = 0; i < target.length - 1; i++) {
          new_value.push(target[i].value);
        }
        Object.keys(this.title).forEach((title, j) => { //отображаем в полях редактирования текущие значения 
          if (!Object.keys(user).includes(title)) { // name - объект из которого нам нужно получить Имя и Фамилию 
            user.name[title] = new_value[j];
          } else {
            user[title] = new_value[j];
          }
        });
      }
    });
    this.run();// запуск перересовки странице с новыми данными 
  }

  run() { // создание страницы со всеми необходимыми элементами 
    this.table = document.querySelector('.table__content');
    this.navBar = document.querySelector('.page__navigation');
    this.table.innerHTML = '';
    this.navBar.innerHTML = '';
    this.table.append(this.tableOfUser.render(this.usersOnPage));
    this.navBar.append(this.pagination.render(this.state.currentPage));
  }
}

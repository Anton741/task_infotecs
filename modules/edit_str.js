// В данном модуле происходит создание формы редактирования, которая открывается по клику на строку которую необходимо изменить 

export class Edit {
  constructor() {
    this.edit_str;
    this.titles;
    this.edit_form = document.querySelector('.edit__form');
  }

  #createEditForm() {
    Object.keys(this.titles).forEach((title) => { // ищем заголовки которые будут иметь поля ввода
      const label = document.createElement('label');
      label.textContent = this.titles[title];
      if (title === 'about') { // блок описание содержит много текста из-за этого его лучше делать textarea
        const textarea = document.createElement('textarea'); // создаем поле ввода 
        textarea.className = 'form-edit__textarea'; // присваиваем класс
        textarea.value = this.edit_str[title]; // значение поля ввода 
        textarea.rows = '8'; 
        label.className = 'lables form-edit__lable-big';
        label.append(textarea);
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-edit__input';
        input.value = this.edit_str[title];
        label.className = 'lables form-edit__lable';
        label.append(input);
      }

      this.edit_form.append(label); // добавляем заголовок и поле в форму
    });
    const submit = document.createElement('input'); // кнопка отправки формы 
    submit.type = 'submit';
    submit.className = 'form-edit__btn btn';
    submit.value= 'Сохранить';
    this.edit_form.append(submit);
    this.edit_form.addEventListener('submit', (e) => this.#closeForm(e));
    return this.edit_form;
  }
  #closeForm(e) { 
    this.saveChanges(e, this.userId); // вызываем ф-цию сохранения изменений 
    this.edit_form.style.display = 'none'; // делаем форму редактирования невидимой на странице
  }

  render(edit_str, titles, userId, saveChanges) { // рендеринг формы 
    this.edit_form.style.display = 'flex';
    this.edit_form.innerHTML = '';
    this.edit_str = edit_str;
    this.titles = titles;
    this.userId = userId;
    this.saveChanges = saveChanges;
    return this.#createEditForm();
  }
}

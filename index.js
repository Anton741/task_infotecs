import App from './modules/app.js';

const usersDate = await fetch('./date.json').then((response) => {
  return response.json();
}); // загружаем данные 

const app = new App(usersDate); // создаем экземпляр приложения 
app.run();

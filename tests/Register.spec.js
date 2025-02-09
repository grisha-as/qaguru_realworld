import { test, expect } from '@playwright/test';
import { faker, ne } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';

const URL_UI = 'https://realworld.qa.guru/';

test('Пользователь может авторизоваться используя логин пароль', async ({
	page,
}) => {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password({ length: 10 }),
		username: faker.person.firstName(),
	};

	const mainPage = new MainPage(page);
	const registerPage = new RegisterPage(page);
	const yourfeedPage = new YourfeedPage(page);

	await mainPage.open(URL_UI);
	await mainPage.gotoRegister();
	await registerPage.register(user.username, user.email, user.password);

	await expect(yourfeedPage.profileNameField).toBeVisible();
	await expect(yourfeedPage.profileNameField).toContainText(user.username);
});
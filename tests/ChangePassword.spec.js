import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { AuthPage } from '../src/pages/authPage';
import { ProfileSettingsPage } from '../src/pages/profilesettingsPage';




// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

test.describe('User actions with profile', () => {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        username: faker.person.firstName(),
    };

	test.beforeEach(async ({ page }) => {
		//todo подготовка состояния
		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);

		await mainPage.open(URL_UI);
		await mainPage.gotoRegister();
		await registerPage.register(user.username, user.email, user.password);
	});

	test('Пользователь может  изменить пароль', async ({ page }) => {
	    const authPage = new AuthPage(page);
	    const mainPage = new MainPage(page);
        const yourfeedPage = new YourfeedPage(page);
	    const profilesettingsPage = new ProfileSettingsPage(page);
	    

        const newpassword = faker.internet.password({ length: 10 });

        await yourfeedPage.gotoProfileSettings();
        await profilesettingsPage.changePassword(newpassword);
        await yourfeedPage.logout();
        await mainPage.gotoAuth();
        await authPage.auth(user.email, newpassword);
        await expect(yourfeedPage.profileNameField).toBeVisible();

	});
});

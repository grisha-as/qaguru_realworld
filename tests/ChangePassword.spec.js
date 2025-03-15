import { test, expect } from '@playwright/test';
import { MainPage, RegisterPage, YourfeedPage, AuthPage, ProfileSettingsPage } from '../src/pages/index';
import { UserBuilder, NewPasswordBuilder } from '../src/helpers/builders/index';



// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

test.describe('User actions with profile', () => {
    const userBuilder = new UserBuilder()
			.addEmail()
			.addUsername()
			.addPassword(10)
			.generate();

	test.beforeEach(async ({ page }) => {
		//todo подготовка состояния
		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);

		await mainPage.open(URL_UI);
		await mainPage.gotoRegister();
		await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);
	});

	test('Пользователь может  изменить пароль', async ({ page }) => {
	    const authPage = new AuthPage(page);
	    const mainPage = new MainPage(page);
        const yourfeedPage = new YourfeedPage(page);
	    const profilesettingsPage = new ProfileSettingsPage(page);
	    
		const newPasswordBuilder = new NewPasswordBuilder()
			.addNewPassword(10)
			.generate();
        
        await yourfeedPage.gotoProfileSettings();
        await profilesettingsPage.changePassword(newPasswordBuilder.newpassword);
        await yourfeedPage.logout();
        await mainPage.gotoAuth();
        await authPage.auth(userBuilder.email, newPasswordBuilder.newpassword);
        await expect(yourfeedPage.profileNameField).toBeVisible();

	});
});

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { NewArticlePage } from '../src/pages/newarticlePage';
import { ArticlePage } from '../src/pages/articlePage';
import { GlobalFeedPage } from '../src/pages/globalfeedPage';
import { AuthPage } from '../src/pages/authPage';
import { ProfileSettingsPage } from '../src/pages/profilesettingsPage';



// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

test.describe('User action', () => {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        username: faker.person.firstName(),
    };

	test.beforeEach(async ({ page }) => {
		//todo подготовка состояния
		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
		const yourfeedPage = new YourfeedPage(page);

		await mainPage.open(URL_UI);
		await mainPage.gotoRegister();
		await registerPage.register(user.username, user.email, user.password);
		await expect(yourfeedPage.profileNameField).toBeVisible();
		await expect(yourfeedPage.profileNameField).toContainText(user.username);
	});

	test('Пользователь может опубликовать статью', async ({ page }) => {
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);
        const articlePage = new ArticlePage(page);

        const article = {
			title: faker.book.title(),
			description: faker.book.genre(),
			text: faker.string.alpha(50),
            tags: faker.book.publisher()
		};

		await yourfeedPage.createArticle();
        await newarticlePage.publishArticle(article.title, article.description, article.text, article.tags);
        await expect(articlePage.titleField).toContainText(article.title);
        await expect(articlePage.textArticleField).toContainText(article.text);
   	});

       test('Пользователь может оставить комментарий к статье', async ({ page }) => {
	    const articlePage = new ArticlePage(page);
	    const globalfeedPage = new GlobalFeedPage(page);

        const comment = faker.string.alpha(20);

		await globalfeedPage.gotoGlobalFeedTab();
		await globalfeedPage.openFirstArticle();
        await articlePage.postComment(comment);
        await expect(articlePage.commentField).toBeVisible();
        await expect(articlePage.commentField).toContainText(comment);
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

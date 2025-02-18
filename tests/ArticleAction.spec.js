import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { NewArticlePage } from '../src/pages/newarticlePage';
import { ArticlePage } from '../src/pages/articlePage';
import { GlobalFeedPage } from '../src/pages/globalfeedPage';
import { ProfilePage } from '../src/pages/profilePage';



// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

test.describe('User actions with article', () => {
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

	test('Пользователь может опубликовать статью', async ({ page }) => {
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);
        const articlePage = new ArticlePage(page);

        const article = {
			title: `${faker.book.title()}+${faker.string.alpha(10)}`,
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
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);

        const comment = faker.string.alpha(20);
		const article = {
			title: `${faker.book.title()}+${faker.string.alpha(10)}`,
			description: faker.book.genre(),
			text: faker.string.alpha(50),
            tags: faker.book.publisher()
		};

		// Публикуем статью
		await yourfeedPage.createArticle();
        await newarticlePage.publishArticle(article.title, article.description, article.text, article.tags);
		await expect(articlePage.titleField).toBeVisible(); //нужно дождаться успешной публикации
        // Добавляем в избранное и оставляем комментарий
		await articlePage.goToHome();
		await globalfeedPage.gotoGlobalFeedTab();
		await expect(globalfeedPage.favoriteButton).toBeVisible();//чтобы убедиться, что страница успела прогрузиться;
		await globalfeedPage.addToFavoritesArticle();
		await globalfeedPage.openFirstArticle();
		await articlePage.postComment(comment);
        await expect(articlePage.commentField).toBeVisible();
        await expect(articlePage.commentField).toContainText(comment);
		
   	});
    
	//todo не стабильный вариант сценария
	test('Пользователь может оставить комментарий к статье из Избранного', async ({ page }) => {
	    const articlePage = new ArticlePage(page);
		const globalfeedPage = new GlobalFeedPage(page);
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);
		const profilePage = new ProfilePage(page);

        const comment = faker.string.alpha(20);
		const article = {
			title: `${faker.book.title()}+${faker.string.alpha(10)}`,
			description: faker.book.genre(),
			text: faker.string.alpha(50),
            tags: faker.book.publisher()
		};

		// Публикуем статью
		await yourfeedPage.createArticle();
        await newarticlePage.publishArticle(article.title, article.description, article.text, article.tags);
		await expect(articlePage.titleField).toBeVisible(); //нужно дождаться успешной публикации
        // Добавляем в избранное
		await articlePage.goToHome();
		await globalfeedPage.gotoGlobalFeedTab();
		await globalfeedPage.addToFavoritesArticle();
		
		//Переходим к статье в Избранном и оставляем комментарий
		await yourfeedPage.goToProfile();
		await profilePage.goToFavoritedArticles();
		await profilePage.openFirstFavoriteArticle();
		await articlePage.postComment(comment);
        await expect(articlePage.commentField).toBeVisible();
        await expect(articlePage.commentField).toContainText(comment);
			
   	});

});

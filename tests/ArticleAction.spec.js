import { test, expect } from '@playwright/test';
import { MainPage, RegisterPage, YourfeedPage, NewArticlePage, ArticlePage, GlobalFeedPage, ProfilePage } from '../src/pages/index';
import { ArticleBuilder, CommentBuilder, UserBuilder } from '../src/helpers/builders/index';



// todo вынести в отдельное место
const URL_UI = 'https://realworld.qa.guru/';

test.describe('User actions with article', () => {
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

	test('Пользователь может опубликовать статью', async ({ page }) => {
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);
    const articlePage = new ArticlePage(page);

    const articleBuilder = new ArticleBuilder()
			.addTitle()
			.addDescription()
			.addText(50)
			.addTags()
			.generate();

		await yourfeedPage.createArticle();
    await newarticlePage.publishArticle(articleBuilder.title, articleBuilder.description, articleBuilder.text, articleBuilder.tags);
		await expect(articlePage.titleField).toContainText(articleBuilder.title);
    await expect(articlePage.textArticleField).toContainText(articleBuilder.text);
   	});

    test('Пользователь может оставить комментарий к статье', async ({ page }) => {
	    const articlePage = new ArticlePage(page);
		  const globalfeedPage = new GlobalFeedPage(page);
		  const yourfeedPage = new YourfeedPage(page);
		  const newarticlePage = new NewArticlePage(page);

      const commentBuilder = new CommentBuilder()
			  .addComment()
			  .generate();
		  const articleBuilder = new ArticleBuilder()
			  .addTitle()
			  .addDescription()
			  .addText(50)
			  .addTags()
			  .generate();

		// Публикуем статью
      await yourfeedPage.createArticle();
      await newarticlePage.publishArticle(articleBuilder.title, articleBuilder.description, articleBuilder.text, articleBuilder.tags);
      await expect(articlePage.titleField).toBeVisible(); //нужно дождаться успешной публикации
          // Добавляем в избранное и оставляем комментарий
      await articlePage.goToHome();
      await globalfeedPage.gotoGlobalFeedTab();
      await expect(globalfeedPage.favoriteButton).toBeVisible();//чтобы убедиться, что страница успела прогрузиться
      await globalfeedPage.addToFavoritesArticle();
      await globalfeedPage.openFirstArticle();
      await articlePage.postComment(commentBuilder.comment);
      await expect(articlePage.commentField).toBeVisible();
      await expect(articlePage.commentField).toContainText(commentBuilder.comment);
		
   	});
    
	//todo не стабильный вариант сценария
	test('Пользователь может оставить комментарий к статье из Избранного', async ({ page }) => {
	  const articlePage = new ArticlePage(page);
		const globalfeedPage = new GlobalFeedPage(page);
		const yourfeedPage = new YourfeedPage(page);
		const newarticlePage = new NewArticlePage(page);
		const profilePage = new ProfilePage(page);

    const commentBuilder = new CommentBuilder()
			.addComment()
			.generate();
		const articleBuilder = new ArticleBuilder()
			.addTitle()
			.addDescription()
			.addText(50)
			.addTags()
			.generate();

		// Публикуем статью
		await yourfeedPage.createArticle();
    await newarticlePage.publishArticle(articleBuilder.title, articleBuilder.description, articleBuilder.text, articleBuilder.tags);
		await expect(articlePage.titleField).toBeVisible(); //нужно дождаться успешной публикации
        // Добавляем в избранное
		await articlePage.goToHome();
		await globalfeedPage.gotoGlobalFeedTab();
		await globalfeedPage.addToFavoritesArticle();
		
		//Переходим к статье в Избранном и оставляем комментарий
		await yourfeedPage.goToProfile();
		await profilePage.goToFavoritedArticles();
		await profilePage.openFirstFavoriteArticle();
		await articlePage.postComment(commentBuilder.comment);
    await expect(articlePage.commentField).toBeVisible();
    await expect(articlePage.commentField).toContainText(commentBuilder.comment);
			
   	});

});

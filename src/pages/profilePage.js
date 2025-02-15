export class ProfilePage {
	constructor(page) {
		this.page = page;
		this.favoritedArticlesTab = page.getByRole('link', { name: 'Favorited Articles' });

		this.firstFavoriteArticleTitle = page.locator('h1').first();
	}

	async goToFavoritedArticles() {
		await this.favoritedArticlesTab.click();
	}

    async openFirstFavoriteArticle() {
        await this.firstFavoriteArticleTitle.click();
	}
}
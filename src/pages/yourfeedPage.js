export class YourfeedPage {
	constructor(page) {
		this.page = page;
		this.newArticleButton = page.getByRole('link', { name: 'New Article' });
		this.logoutButton = page.getByRole('link', { name: 'Logout' });
		this.settingsButton = page.getByRole('link', { name: 'Settings' });

		this.profileNameField = page.locator('li.nav-item.dropdown');		
	}

	async createArticle() {
		await this.newArticleButton.click();
	}
    async logout() {
		await this.profileNameField.click();
        await this.logoutButton.click();
	}
    async gotoProfileSettings() {
		await this.profileNameField.click();
		await this.settingsButton.click();

	}

}

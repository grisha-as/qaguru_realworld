export class NewArticlePage {
	constructor(page) {
		this.page = page;

		this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });

		this.titleField = page.getByRole('textbox', { name: 'Article Title' });
		this.descriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
		this.textField = page.getByRole('textbox', { name: 'Write your article (in' });
        this.tagsField = page.getByRole('textbox', { name: 'Enter tags' });
        
	}
	
	async publishArticle(title, description, text, tags) {
		await this.titleField.click();
		await this.titleField.fill(title);
		await this.descriptionField.click();
		await this.descriptionField.fill(description);
		await this.textField.click();
		await this.textField.fill(text);
        await this.tagsField.click();
        await this.tagsField.fill(tags);
		await this.publishArticleButton.click();
	}
}

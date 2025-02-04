export class ArticlePage {
	constructor(page) {
		this.page = page;

		this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });

		this.titleField = page.getByRole('heading');
		this.textArticleField = page.getByRole('paragraph');
		this.commentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
		this.commentField = page.getByRole('main');
	}

	async postComment(text) {
		await this.commentTextbox.click();
		await this.commentTextbox.fill(text);
		await this.postCommentButton.click();
	}

}
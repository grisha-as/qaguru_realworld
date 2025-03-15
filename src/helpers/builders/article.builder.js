import { faker } from '@faker-js/faker';

export class ArticleBuilder {
	addTitle() {
		this.title =  `${faker.book.title()}+${faker.string.alpha(10)}`;
		return this;
	}
	addDescription() {
		this.description = faker.book.genre();
		return this;
	}
    addText(symbol = 50) {
		this.text = faker.string.alpha(symbol);
		return this;
	}
	addTags() {
		this.tags = faker.book.publisher();
		return this;
	}
	generate() {
		return {
			title: this.title,
			description: this.description,
			text: this.text,
			tags: this.tags,
		};
	}
};

export class CommentBuilder {
	addComment (symbol = 20) {
		this.comment = faker.string.alpha(symbol);
		return this;
	}
	generate() {
		return {
			comment: this.comment,
		};
	}
}


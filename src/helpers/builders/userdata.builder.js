import { faker } from '@faker-js/faker';

export class UserBuilder {
	addEmail() {
		this.email = faker.internet.email();
		return this;
	}
	addPassword(symbol = 10) {
		this.password = faker.internet.password({ length: symbol });
		return this;
	}
	addUsername() {
		this.username = faker.person.firstName();
		return this;
	}
	generate() {
		return {
			email: this.email,
			username: this.username,
			password: this.password,
		};
	}
}


export class NewPasswordBuilder {
	addNewPassword(symbol = 10) {
		this.newpassword = faker.internet.password({ length: symbol });
		return this;
	}
	generate() {
		return {
			newpassword: this.newpassword,
		};
	}	
}
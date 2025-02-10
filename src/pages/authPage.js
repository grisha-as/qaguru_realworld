export class AuthPage {
	constructor(page) {
		this.page = page;

		this.loginButton = page.getByRole('button', { name: 'Login' });

		this.emailField = page.getByRole('textbox', { name: 'Email' });
		this.passwordField = page.getByRole('textbox', { name: 'Password' });
	}
	
	async auth(email, password) {
		await this.emailField.click();
		await this.emailField.fill(email);
		await this.passwordField.click();
		await this.passwordField.fill(password);
		await this.loginButton.click();
	}
}

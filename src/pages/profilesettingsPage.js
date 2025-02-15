export class ProfileSettingsPage {
	constructor(page) {
		this.page = page;

		this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });

		this.passwordField = page.getByRole('textbox', { name: 'Password' });
	}
	
	async changePassword(password) {
	    await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateSettingsButton.click();

	}
    async getEmail() {
	    await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateSettingsButton.click();

	}
	
}

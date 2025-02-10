export class GlobalFeedPage {
	constructor(page) {
		this.page = page;
		this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
		//this.favoriteButton = page.getByRole('button', { name: '( 0 )' }).first();
		this.favoriteButton = page.locator('//*[@id="root"]/main/div/div/div/div/div[2]/div/button');
		
		this.firstArticleTitle = page.locator('h1').first();
	}	
	    
	async gotoGlobalFeedTab() {
			await this.globalFeedTab.click();
		}  
	
	async openFirstArticle() {
			await this.firstArticleTitle.click();
		} 

	async addToFavoritesArticle() {
			await this.favoriteButton.click();
		} 	
	}	

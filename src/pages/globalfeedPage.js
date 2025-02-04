export class GlobalFeedPage {
	constructor(page) {
		this.page = page;

		this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
		this.firstArticleTitle = page.locator('h1').first();
	}	
	    
	async gotoGlobalFeedTab() {
			await this.globalFeedTab.click();
		}  
	
	async openFirstArticle() {
			await this.firstArticleTitle.click();
		} 
	}	



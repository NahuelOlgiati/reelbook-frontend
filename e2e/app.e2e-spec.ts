import { ReelbookFrontendPage } from './app.po';

describe('reelbook-frontend App', () => {
  let page: ReelbookFrontendPage;

  beforeEach(() => {
    page = new ReelbookFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rb works!');
  });
});

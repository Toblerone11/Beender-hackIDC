import { BeenderPage } from './app.po';

describe('beender App', () => {
  let page: BeenderPage;

  beforeEach(() => {
    page = new BeenderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

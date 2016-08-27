import { MediacmsPage } from './app.po';

describe('mediacms App', function() {
  let page: MediacmsPage;

  beforeEach(() => {
    page = new MediacmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

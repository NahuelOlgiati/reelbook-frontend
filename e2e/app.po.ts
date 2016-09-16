import { browser, element, by } from 'protractor/globals';

export class ReelbookFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rb-root h1')).getText();
  }
}

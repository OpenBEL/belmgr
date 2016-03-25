import {BindingEngine} from 'aurelia-binding';
import {Container} from 'aurelia-dependency-injection';
import {TemplatingEngine} from 'aurelia-templating';
import {BelNanopub} from 'src/bel-nanopub';

describe('testing html behaviors', () => {
  let templatingEngine;
  let container;
  let bindingEngine;

  beforeEach(() => {
    container = new Container();
    templatingEngine = container.get(TemplatingEngine);
    bindingEngine = container.get(BindingEngine);
  });

  it('should set simple custom attribute value', () => {
    var att = templatingEngine.createViewModelForUnitTest(BelNanopub);
    att.value = 'foo';
    expect(att.value).toBe('foo');
  });
});
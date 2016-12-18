define('app',['exports', 'aurelia-framework', './resources/openbelapi-service', './components/User', 'aurelia-router'], function (exports, _aureliaFramework, _openbelapiService, _User, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('app');

  var App = exports.App = (_temp = _class = function () {
    function App(user, router) {
      _classCallCheck(this, App);

      this.userData = user;
      logger.debug('Router: ', router);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      logger.debug("Configuring router");
      config.title = 'BEL Manager';
      config.map([{ route: ['', 'welcome'], moduleId: './pages/welcome', name: 'home', nav: true, title: 'Welcome' }, { route: 'search', moduleId: './pages/search', name: 'search', nav: true, title: 'Search' }, { route: 'edit/:id', moduleId: './pages/edit', name: 'edit', activationStrategy: 'replace', nav: false, title: 'Edit BEL' }, { route: 'create', moduleId: './pages/edit', name: 'create', activationStrategy: 'replace', nav: true, title: 'Compose' }, { route: 'import', moduleId: './pages/import', name: 'import', nav: true, title: 'Datasets' }, { route: 'apilist', moduleId: './pages/apilist', name: 'apilist', nav: false, title: 'API Endpoints' }]);

      config.mapUnknownRoutes(function (instruction) {
        router.navigateToRoute('home');
      });

      this.router = router;
    };

    return App;
  }(), _class.inject = [_User.User, _aureliaRouter.Router], _temp);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', 'aurelia-framework', './environment'], function (exports, _aureliaFramework, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  _aureliaFramework.LogManager.setLevel(_aureliaFramework.LogManager.logLevel.debug);
  var logger = _aureliaFramework.LogManager.getLogger('webeditor-main');

  function configure(aurelia) {

    logger.debug('Before Aureli.use');

    aurelia.use.standardConfiguration().plugin('aurelia-gravatar').plugin('aurelia-animator-css').plugin('aurelia-configuration');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
      logger.debug('Here in main.js');
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }
    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }
});
define('components/User',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.User = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('User');
  logger.debug('In User.js');

  var User = exports.User = function User() {
    _classCallCheck(this, User);

    this.test = 1;
  };
});
define('components/bel-citation',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/openbelapi-service', '../resources/pubmed-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _openbelapiService, _pubmedService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelCitation = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class, _class2, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('bel-citation');

  var BelCitation = exports.BelCitation = (_dec = (0, _aureliaFramework.bindable)({
    name: 'nanopub',
    attribute: 'nanopub',
    changeHandler: 'nanopubChanged',
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
    defaultValue: undefined }), _dec2 = (0, _aureliaFramework.customElement)('bel-citation'), _dec(_class = _dec2(_class = (_temp = _class2 = function () {
    function BelCitation(openbelapiService, pubmedService, eventAggregator) {
      _classCallCheck(this, BelCitation);

      this.api = openbelapiService;
      this.pubmedService = pubmedService;
      this.ea = eventAggregator;
    }

    BelCitation.prototype.refreshNanopubObjBinding = function refreshNanopubObjBinding() {
      var temp = this.nanopub;
      this.nanopub = {};
      this.nanopub = temp;
    };

    BelCitation.prototype.publish = function publish(payload) {
      this.ea.publish('pubmed', payload);
      logger.debug('Publish pubmed data');
    };

    BelCitation.prototype.attached = function attached() {
      logger.debug('Nanopub: ', this.nanopub);
      if (this.nanopub.citation) {
        if (this.nanopub.citation.id) {
          this.citationId = this.nanopub.citation.id;
        }
      } else {
        this.nanopub.citation = {};
        this.nanopub.citation.type = 'PubMed';
      }

      if (this.citationId && this.nanopub.citation.type === 'PubMed') {
        this.collectPubmed();
      }
    };

    BelCitation.prototype.copyCitationId = function copyCitationId() {
      this.lastCitationId = JSON.parse(JSON.stringify(this.citationId));
      logger.debug('Copying CitationId to Last', this.lastCitationId);
    };

    BelCitation.prototype.nanopubChanged = function nanopubChanged(value) {
      logger.debug('CitationChanged: ', this.nanopub);
    };

    BelCitation.prototype.collectPubmed = function collectPubmed() {
      var _this = this;

      this.nanopub.citation.id = this.citationId;

      logger.debug('Id: ', this.citationId, 'Last', this.lastCitationId, ' Type: ', this.nanopub.citation.type);

      if (this.citationId && this.nanopub.citation.type === 'PubMed') {
        logger.debug('Id2: ', this.citationId, 'Last2', this.lastCitationId, ' Type: ', this.nanopub.citation.type);
        this.pubmedService.getPubmed(this.citationId).then(function (pubmed) {
          _this.pubmed = pubmed;
          if (_this.citationId === _this.lastCitationId) {
            _this.citationPubmedChecks();
          } else {
            _this.nanopub.citation.date = _this.pubmed.journalInfo.printPublicationDate;
            _this.nanopub.citation.authors = _this.pubmed.bel.authors;
            _this.nanopub.citation.name = _this.pubmed.bel.refString;
          }
          _this.copyCitationId();
          _this.refreshNanopubObjBinding();
          _this.publish(pubmed);
        }).catch(function (reason) {
          _this.pubmed = {};
          logger.error('Collect pubmed data', reason);
        });
      } else {
        this.pubmed = {};
        this.$parent.pubmed = {};
      }
    };

    BelCitation.prototype.citationPubmedChecks = function citationPubmedChecks() {
      if (this.nanopub.citation.type === 'PubMed') {
        if (!this.nanopub.citation.date) {
          this.nanopub.citation.date = this.pubmed.journalInfo.printPublicationDate;
        } else if (this.nanopub.citation.date !== this.pubmed.journalInfo.printPublicationDate) {
          this.pubmed.bel.mismatch.date = true;
        }

        if (!this.nanopub.citation.authors) {
          this.nanopub.citation.authors = this.pubmed.bel.authors;
        } else if (this.nanopub.citation.authors !== this.pubmed.bel.authors) {
          this.pubmed.bel.mismatch.authors = true;
        }

        if (!this.nanopub.citation.name) {
          this.nanopub.citation.name = this.pubmed.bel.refString;
        } else if (this.nanopub.citation.name !== this.pubmed.bel.refString) {
          this.pubmed.bel.mismatch.refString = true;
        }
      }
    };

    BelCitation.prototype.replaceCitationDate = function replaceCitationDate(newval) {
      this.nanopub.citation.date = newval;
      this.pubmed.bel.mismatch.date = false;
      this.refreshNanopubObjBinding();
    };

    BelCitation.prototype.replaceCitationName = function replaceCitationName(newval) {
      this.nanopub.citation.name = newval;
      this.pubmed.bel.mismatch.refString = false;
      this.refreshNanopubObjBinding();
    };

    BelCitation.prototype.replaceCitationAuthors = function replaceCitationAuthors(newval) {
      this.nanopub.citation.authors = newval;
      this.pubmed.bel.mismatch.authors = false;
      this.refreshNanopubObjBinding();
    };

    return BelCitation;
  }(), _class2.inject = [_openbelapiService.OpenbelapiService, _pubmedService.PubmedService, _aureliaEventAggregator.EventAggregator], _temp)) || _class) || _class);
});
define('components/bel-context-item',['exports', 'aurelia-framework', '../resources/openbelapi-service', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _openbelapiService, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelContextItem = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('contextitem');

  var BelContextItem = exports.BelContextItem = (_dec = (0, _aureliaFramework.customElement)('bel-context-item'), _dec(_class = (_class2 = (_temp = _class3 = function () {
    function BelContextItem(openbelapiService, compositionTransaction, eventAggregator) {
      _classCallCheck(this, BelContextItem);

      _initDefineProp(this, 'type', _descriptor, this);

      _initDefineProp(this, 'annotation', _descriptor2, this);

      _initDefineProp(this, 'index', _descriptor3, this);

      _initDefineProp(this, 'last', _descriptor4, this);

      _initDefineProp(this, 'debounceTime', _descriptor5, this);

      _initDefineProp(this, 'hasTypeFocus', _descriptor6, this);

      _initDefineProp(this, 'hasAnnotationFocus', _descriptor7, this);

      _initDefineProp(this, 'showResults', _descriptor8, this);

      this.api = openbelapiService;
      this.compositionTransaction = compositionTransaction;
      this.ea = eventAggregator;
      this.compositionTransactionNotifier = null;
    }

    BelContextItem.prototype.created = function created() {
      var _this = this;

      this.compositionTransactionNotifier = this.compositionTransaction.enlist();

      this.api.getBelAnnotationTypes().then(function (types) {
        _this.types = types;
        logger.debug('AnnotationTypes: ', _this.types);
        _this.compositionTransactionNotifier.done();
      }).catch(function (reason) {
        logger.error('GET AnnotationTypes Error: ', reason);
      });
    };

    BelContextItem.prototype.attached = function attached() {
      logger.debug('Index: ', this.index);
      logger.debug('Last: ', this.last);
      logger.debug('Type ', this.type);
      logger.debug('Anno ', this.annotation);
      logger.debug('Types: ', this.types);
    };

    BelContextItem.prototype.notifyAddBlank = function notifyAddBlank() {
      this.ea.publish('addContextItemBlank');
    };

    BelContextItem.prototype.hasTypeFocusChanged = function hasTypeFocusChanged(newValue) {
      this.filterTypes();
      logger.debug('Type focus changed: ', newValue);
      logger.debug('Types: ', this.types);
      this.showTypes = newValue;
    };

    BelContextItem.prototype.typeChanged = function typeChanged() {
      if (this.type && this.types) {
        this.filterTypes();
      }
    };

    BelContextItem.prototype.filterTypes = function filterTypes() {
      var _this2 = this;

      if (this.types) {
        this.filteredTypes = this.types.filter(function (item) {
          return item.annotation.name.toLowerCase().indexOf(_this2.type.toLowerCase()) > -1;
        });
        logger.debug('FT: ', this.filteredTypes);
      }
    };

    BelContextItem.prototype.selectType = function selectType(type) {
      this.type = type.annotation.name;
      this.showTypes = false;
    };

    BelContextItem.prototype.typeClear = function typeClear() {
      this.selectedType = null;
      this.searchType = '';
      this.showTypes = false;
    };

    BelContextItem.prototype.hasAnnotationFocusChanged = function hasAnnotationFocusChanged(newValue) {
      this.filterAnnotations();
      logger.debug('Annotation focus changed: ', newValue);
      this.showAnnotations = newValue;
    };

    BelContextItem.prototype.annotationChanged = function annotationChanged() {
      logger.debug('Annotation changing');
      if (this.hasAnnotationFocus && this.annotation && this.annotation.length > 1) {
        this.filterAnnotations();
      }
    };

    BelContextItem.prototype.filterAnnotations = function filterAnnotations() {
      var _this3 = this;

      if (this.annotation.length > 1) {
        this.api.getBELAnnotationValues(this.annotation, this.type).then(function (data) {
          _this3.filteredAnnotations = data;
          _this3.compositionTransactionNotifier.done();
        }).catch(function (reason) {
          logger.error('Filter annotations error: ', reason);
        });
      }
    };

    BelContextItem.prototype.selectAnnotation = function selectAnnotation(annotation) {
      this.annotation = annotation.annotation_value.name;
      this.type = annotation.annotation_value.annotation.name;
      this.showAnnotations = false;
    };

    BelContextItem.prototype.annotationClear = function annotationClear() {
      this.showAnnotations = false;
    };

    return BelContextItem;
  }(), _class3.inject = [_openbelapiService.OpenbelapiService, _aureliaFramework.CompositionTransaction, _aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'type', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'annotation', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'index', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'last', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'debounceTime', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 100;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'hasTypeFocus', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'hasAnnotationFocus', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'showResults', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class);
});
define('components/bel-context',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelContext = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _class2, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('context');

  var BelContext = exports.BelContext = (_class = (_temp = _class2 = function () {
    function BelContext(eventAggregator) {
      _classCallCheck(this, BelContext);

      _initDefineProp(this, 'nanopub', _descriptor, this);

      this.ea = eventAggregator;
    }

    BelContext.prototype.attached = function attached() {
      var _this = this;

      this.addBlank();

      this.subscription = this.ea.subscribe('addContextItemBlank', function () {
        _this.addBlank();
        logger.debug('Checking to add Blank', _this.nanopub.experiment_context);
      });
    };

    BelContext.prototype.detached = function detached() {
      this.subscription.dispose();
    };

    BelContext.prototype.nanopubChanged = function nanopubChanged(value) {
      logger.debug('Experiment Context changes: ', this.nanopub.experiment_context);
      this.experiment_context = this.nanopub.experiment_context;
    };

    BelContext.prototype.addBlank = function addBlank() {
      if (this.nanopub.experiment_context && this.nanopub.experiment_context.length > 0) {
        var last_item_idx = this.nanopub.experiment_context.length - 1;
        if (this.nanopub.experiment_context[last_item_idx].value) {
          this.nanopub.experiment_context.push({ 'name': '', 'value': '' });
        }
      } else {
        this.nanopub.experiment_context = [];
        this.nanopub.experiment_context.push({ 'name': '', 'value': '' });
      }
    };

    BelContext.prototype.removeItem = function removeItem(idx) {
      this.nanopub.experiment_context.splice(idx, 1);
    };

    return BelContext;
  }(), _class2.inject = [_aureliaEventAggregator.EventAggregator], _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'nanopub', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('components/bel-metadata',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelMetadata = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var logger = _aureliaFramework.LogManager.getLogger('metadata');

  var BelMetadata = exports.BelMetadata = (_dec = (0, _aureliaFramework.bindable)({
    name: 'nanopub',
    attribute: 'nanopub',
    changeHandler: 'nanopubChanged',
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
    defaultValue: undefined }), _dec2 = (0, _aureliaFramework.customElement)('bel-metadata'), _dec(_class = _dec2(_class = (_class2 = function () {
    function BelMetadata() {
      _classCallCheck(this, BelMetadata);

      _initDefineProp(this, 'metadata', _descriptor, this);
    }

    BelMetadata.prototype.nanopubChanged = function nanopubChanged(value) {
      logger.debug('Metadata Changed: ', this.nanopub);
    };

    return BelMetadata;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'metadata', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('components/bel-nanopub',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator', 'toastr', '../resources/openbelapi-service'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator, _toastr, _openbelapiService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelNanopub = undefined;

  var toastr = _interopRequireWildcard(_toastr);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var logger = _aureliaFramework.LogManager.getLogger('bel-nanopub');

  var BelNanopub = exports.BelNanopub = (_dec = (0, _aureliaFramework.bindable)({ name: "nanopubId", attribute: "nanopub-id" }), _dec2 = (0, _aureliaFramework.inject)(_openbelapiService.OpenbelapiService, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
    BelNanopub.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.replace;
    };

    function BelNanopub(openbelapiService, router, eventAggregator) {
      _classCallCheck(this, BelNanopub);

      this.metadata = {
        'nanopub_notes': '', 'nanopub_status': '', 'author': '',
        'creation_date': '', 'reviewer': '', 'review_date': '',
        'nanopub_source': '' };
      this.submitNanopub = {};
      this.annotations = [];

      this.api = openbelapiService;
      this.router = router;
      this.ea = eventAggregator;
    }

    BelNanopub.prototype.bind = function bind() {
      this.loadFormData();
    };

    BelNanopub.prototype.attached = function attached() {
      var _this = this;

      this.subscription = this.ea.subscribe('pubmed', function (payload) {
        _this.pubmed = payload;
        _this.showPubmed = true;
      });
    };

    BelNanopub.prototype.detached = function detached() {
      this.subscription.dispose();
    };

    BelNanopub.prototype.loadFormData = function loadFormData() {
      var _this2 = this;

      logger.debug('In load form data');
      if (this.nanopubId) {
        logger.debug('Inside loadFormData -- NanopubID: ', this.nanopubId);

        return this.api.getBelNanopub(this.nanopubId).then(function (nanopub) {
          _this2.nanopub = nanopub;
          logger.debug('Nanopub: ', _this2.nanopub);
          _this2.extractFormMetadata();
          return _this2.api.getBelComponents(_this2.nanopub.bel_statement);
        }).then(function (comp) {
          _this2.belSubject = comp.subject;
          _this2.belObject = comp.object;
          _this2.belRelationship = comp.relationship;
          logger.debug('Subj: ', _this2.belSubject);
        }).catch(function (reason) {
          logger.error('Process BEL Nanopub Error: ', reason);
        });
      } else {
        this.nanopub = new Nanopub();

        return this.api.getBelAnnotationTypes().then(function (types) {
          _this2.types = types;
          logger.debug('AnnotationTypes: ', _this2.types);
        }).catch(function (reason) {
          logger.error('GET Annotation Types: ' + reason);
        });
      }
    };

    BelNanopub.prototype.refreshNanopubObjBinding = function refreshNanopubObjBinding() {
      var temp = this.nanopub;
      this.nanopub = {};
      this.nanopub = temp;
    };

    BelNanopub.prototype.prepareNanopub = function prepareNanopub() {
      var submitNanopub = {};

      this.nanopub.bel_statement = this.belSubject + ' ' + this.belRelationship + ' ' + this.belObject;

      logger.debug('Cleaning nanopub -- context items');
      this.nanopub.experiment_context = this.nanopub.experiment_context.filter(function (obj) {
        return obj.value;
      });

      this.addFormMetadata();

      submitNanopub = { 'nanopub': this.nanopub };
      return submitNanopub;
    };

    BelNanopub.prototype.addFormMetadata = function addFormMetadata() {
      var _this3 = this;

      if (this.nanopub.metadata) {
        var _loop = function _loop(key) {
          var idx = _this3.nanopub.metadata.findIndex(function (obj) {
            return obj.name === key;
          });
          if (idx >= 0) {
            _this3.nanopub.metadata[idx].value += _this3.metadata.key;
          } else {
            _this3.nanopub.metadata.push({
              'name': key,
              'value': _this3.metadata[key]
            });
          }
        };

        for (var key in this.metadata) {
          _loop(key);
        }
      }
    };

    BelNanopub.prototype.extractFormMetadata = function extractFormMetadata() {
      var _this4 = this;

      var _loop2 = function _loop2(k) {
        var idx = _this4.nanopub.metadata.findIndex(function (obj) {
          return obj.name === k;
        });
        if (idx >= 0) {
          _this4.metadata[k] = _this4.nanopub.metadata[idx].value;
        }
      };

      for (var k in this.metadata) {
        _loop2(k);
      }
    };

    BelNanopub.prototype.submitUpdate = function submitUpdate() {
      logger.debug('Prior to prepare update nanopub', JSON.stringify(this.nanopub, null, 2));
      var submitNanopub = this.prepareNanopub();
      logger.debug('Update nanopub', JSON.stringify(submitNanopub, null, 2));
      this.api.loadBelNanopub(submitNanopub, this.nanopubId).then(function (response) {
        toastr.success('', 'Updated Nanopub');
      }).catch(function (reason) {
        toastr.options = { "timeOut": "15000" };
        toastr.error('', 'Cannot update Nanopub');
        toastr.options = { "timeOut": "5000" };
        logger.error('Problem updating Nanopub ', reason);
      });

      return true;
    };

    BelNanopub.prototype.submitNew = function submitNew() {
      var _this5 = this;

      logger.debug('Prior to prepare new nanopub', JSON.stringify(this.nanopub, null, 2));
      var submitNanopub = this.prepareNanopub();
      logger.debug('Submit new nanopub', JSON.stringify(submitNanopub, null, 2));

      this.api.loadBelNanopub(submitNanopub).then(function (response) {
        return response.headers.get('Location');
      }).then(function (location) {
        logger.debug('Loc: ', location);
        var nanopubId = _this5.api.getIdFromUrl(location);
        logger.debug('Router: ', _this5.router);
        toastr.success('', 'Created New Nanopub');
        _this5.router.navigateToRoute('edit', { id: nanopubId });
      }).catch(function (reason) {
        toastr.options = { "timeOut": "15000" };
        toastr.error('', 'Cannot create new Nanopub');
        toastr.options = { "timeOut": "5000" };
        logger.error('Problem creating Nanopub ', reason);
      });

      return true;
    };

    return BelNanopub;
  }()) || _class) || _class);

  var Nanopub = function Nanopub(data) {
    _classCallCheck(this, Nanopub);

    Object.assign(this, data);
  };
});
define('components/bel-statement',['exports', 'aurelia-framework', '../resources/openbelapi-service'], function (exports, _aureliaFramework, _openbelapiService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelStatement = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _class, _desc, _value, _class2, _descriptor, _class3, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('statement');

  var BelStatement = exports.BelStatement = (_dec = (0, _aureliaFramework.bindable)({
    name: 'nanopub',
    attribute: 'nanopub',
    changeHandler: 'nanopubChanged',
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay,
    defaultValue: undefined }), _dec2 = (0, _aureliaFramework.bindable)({ name: "belSubject", attribute: "bel-subject", defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec3 = (0, _aureliaFramework.bindable)({ name: "belRelationship", attribute: "bel-relationship", defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec4 = (0, _aureliaFramework.bindable)({ name: "belObject", attribute: "bel-object", defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec5 = (0, _aureliaFramework.customElement)('bel-statement'), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = (_temp = _class3 = function () {
    function BelStatement(openbelapiService, compositionTransaction) {
      _classCallCheck(this, BelStatement);

      _initDefineProp(this, 'nanopub', _descriptor, this);

      this.relationships = [];

      this.api = openbelapiService;
      this.compositionTransaction = compositionTransaction;
    }

    BelStatement.prototype.created = function created() {
      var _this = this;

      this.compositionTransactionNotifier = this.compositionTransaction.enlist();
      this.api.getRelationships().then(function (relationships) {
        _this.relationships = relationships;
        logger.debug('Relationships: ', _this.relationships);
        _this.compositionTransactionNotifier.done();
      }).catch(function (reason) {
        logger.error('GET Relationships Error: ', reason);
      });
    };

    BelStatement.prototype.bind = function bind(context) {
      this.$parent = context;
    };

    BelStatement.prototype.belSubjectChanged = function belSubjectChanged(value) {
      logger.debug('BELsubject changed: ', this.belsubject);
    };

    BelStatement.prototype.nanopubChanged = function nanopubChanged(value) {
      logger.debug('StatementChanged: ', this.nanopub);
    };

    return BelStatement;
  }(), _class3.inject = [_openbelapiService.OpenbelapiService, _aureliaFramework.CompositionTransaction], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'nanopub', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class) || _class) || _class);
});
define('components/bel-term',['exports', 'aurelia-framework', '../resources/openbelapi-service'], function (exports, _aureliaFramework, _openbelapiService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BelTerm = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var logger = _aureliaFramework.LogManager.getLogger('bel-completion');

  var BelTerm = exports.BelTerm = (_dec = (0, _aureliaFramework.inject)(_openbelapiService.OpenbelapiService), _dec2 = (0, _aureliaFramework.customElement)('bel-term'), _dec(_class = _dec2(_class = (_class2 = function () {
    function BelTerm(OpenbelapiService) {
      _classCallCheck(this, BelTerm);

      _initDefineProp(this, 'bel', _descriptor, this);

      _initDefineProp(this, 'debounceTime', _descriptor2, this);

      _initDefineProp(this, 'hasTermFocus', _descriptor3, this);

      _initDefineProp(this, 'hasAnnotationFocus', _descriptor4, this);

      _initDefineProp(this, 'showResults', _descriptor5, this);

      this.loading = false;
      this.focused = false;

      this.api = OpenbelapiService;
    }

    BelTerm.prototype.hasFocus = function hasFocus() {
      this.focused = true;
    };

    BelTerm.prototype.belChanged = function belChanged() {
      var _this = this;

      logger.debug('BEL Term changing ', this.bel);

      if (this.selectedTerm) {
        this.selectedTerm = false;
        return;
      }

      if (this.focused && this.bel && this.bel.length > 0) {
        this.cursor = this.belinput.selectionEnd;
        this.loading = true;
        this.api.getBelCompletions(this.bel, this.cursor).then(function (results) {
          _this.filteredTerms = results;
          _this.showTerms = true;
          _this.loading = false;
        }).catch(function (reason) {
          logger.error('Filter BEL Completions error ', reason);
        });
      }
    };

    BelTerm.prototype.blurred = function blurred() {
      this.showTerms = false;
      this.loading = false;
      this.focused = false;
    };

    BelTerm.prototype.selectTerm = function selectTerm(item) {
      logger.debug('Item: ', item);

      this.bel = item.term;
      this.cursor = this.bel.length;
      logger.debug('BEL: ', this.bel, ' Cursor: ', this.cursor);

      this.showTerms = false;
      this.selectedTerm = true;
      this.belinput.setSelectionRange(this.cursor, this.cursor);
      this.belinput.focus();
    };

    return BelTerm;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'bel', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'debounceTime', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 400;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'hasTermFocus', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'hasAnnotationFocus', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'showResults', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('components/footer',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Footer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('footer');
  logger.debug('In footer.js');

  var Footer = exports.Footer = function Footer() {
    _classCallCheck(this, Footer);
  };
});
define('components/nav-bar',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/authentication', './User', '../resources/openbelapi-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _authentication, _User, _openbelapiService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var logger = _aureliaFramework.LogManager.getLogger('nav-bar');

  logger.debug('In nav-bar.js');

  var NavBar = exports.NavBar = (_class = function () {
    NavBar.inject = function inject() {
      return [_openbelapiService.OpenbelapiService, _User.User, _authentication.Authentication, _aureliaEventAggregator.EventAggregator];
    };

    function NavBar(api, user, auth, ea) {
      var _this = this;

      _classCallCheck(this, NavBar);

      _initDefineProp(this, 'router', _descriptor, this);

      this.api = api;
      this.userData = user;
      this.auth = auth;
      this.ea = ea;

      this.authEnabled = this.userData.authEnabled;

      logger.debug('NavBar AuthEnabled: ', this.authEnabled);

      if (this.authEnabled && this.auth.checkToken()) {
        this.action = 'Logout';
      } else {
        this.action = 'Login';
      }
      this.getSelectedOpenbelApiUrl();
      this.api.getBelVersion().then(function (version) {
        _this.belVersion = version;
      });
    }

    NavBar.prototype.attached = function attached() {
      var _this2 = this;

      var selectedCB = function selectedCB(obj) {
        _this2.endpointName = obj.name;
      };
      this.subscription1 = this.ea.subscribe('selectedOpenbelApiUrl', selectedCB);
      var updatedClientCB = function updatedClientCB(obj) {
        _this2.api.getBelVersion().then(function (version) {
          _this2.belVersion = version;
        });
      };
      this.subscription2 = this.ea.subscribe('updatedAPIClient', updatedClientCB);
    };

    NavBar.prototype.detached = function detached() {
      this.subscription1.dispose();
      this.subscription2.dispose();
    };

    NavBar.prototype.navbarAction = function navbarAction() {
      if (this.action === 'Logout') {
        this.auth.removeToken();
        logger.info('Logged out.');
        window.location.href = window.location.origin;
      } else if (this.action === 'Login') {
        this.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
      }
    };

    NavBar.prototype.getSelectedOpenbelApiUrl = function getSelectedOpenbelApiUrl() {
      this.selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedAPI'));
      this.endpointName = this.selectedOpenbelApiUrl.name;
    };

    return NavBar;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('components/pubmed',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../resources/pubmed-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _pubmedService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pubmed = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var logger = _aureliaFramework.LogManager.getLogger('pubmed-customelement');
  logger.debug('In pubmed.js');

  var Pubmed = exports.Pubmed = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _pubmedService.PubmedService), _dec(_class = function () {
    function Pubmed(eventAggregator, pubmedService) {
      _classCallCheck(this, Pubmed);

      this.ea = eventAggregator;
      this.pubmedService = pubmedService;
    }

    Pubmed.prototype.attached = function attached() {
      var _this = this;

      this.subscription = this.ea.subscribe('pubmed', function (payload) {
        _this.pubmed = payload;
        if (!_this.pubmed.title) {
          _this.pubmed = _this.pubmedService.getPubMed(_this.pubmed.id);
        }
      });
    };

    Pubmed.prototype.detached = function detached() {
      this.subscription.dispose();
    };

    return Pubmed;
  }()) || _class);
});
define('components/search-export',['exports', 'aurelia-framework', '../resources/openbelapi-service', '../resources/authentication', './User'], function (exports, _aureliaFramework, _openbelapiService, _authentication, _User) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchExport = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var logger = _aureliaFramework.LogManager.getLogger('search-export');

  var SearchExport = exports.SearchExport = (_class = function () {
    SearchExport.inject = function inject() {
      return [_openbelapiService.OpenbelapiService, _authentication.Authentication, _User.User];
    };

    function SearchExport(openbelapiService, authentication, user) {
      _classCallCheck(this, SearchExport);

      _initDefineProp(this, 'searchUrl', _descriptor, this);

      this.dataType = {
        id: 'bel',
        name: 'BEL Script',
        media_type: 'application / bel',
        extension: 'bel'
      };
      this.dataTypes = [{
        id: 'bel',
        name: 'BEL Script',
        media_type: 'application / bel',
        extension: 'bel'
      }, {
        id: 'xbel',
        name: 'XBEL',
        media_type: 'application / xml',
        extension: 'xbel'
      }, {
        id: 'json_nanopub',
        name: 'JSON Nanopub',
        media_type: 'application / json',
        extension: 'json'
      }, {
        id: 'nquads',
        name: 'N-quads RDF',
        media_type: 'application / n - quads',
        extension: 'nq'
      }, {
        id: 'turtle',
        name: 'Turtle RDF',
        media_type: 'application / turtle OR application / x - turtle',
        extension: 'ttl'
      }];

      this.openbelapiService = openbelapiService;
      this.auth = authentication;
      this.userData = user;
      this.authEnabled = this.userData.authEnabled;
      logger.debug("AuthEnabled: ", this.authEnabled);
    }

    SearchExport.prototype.updateExportUrl = function updateExportUrl() {
      this.exportUrl = this.updateQueryString(this.exportUrl, 'format', this.dataType.id);

      if (this.authEnabled) {
        this.exportUrl = this.updateQueryString(this.exportUrl, 'token', this.auth.getToken());
      }
    };

    SearchExport.prototype.searchUrlChanged = function searchUrlChanged(newvalue) {
      logger.debug('1 searchUrl: ', this.searchUrl);
      if (!!this.searchUrl) {
        this.exportUrl = JSON.parse(JSON.stringify(this.searchUrl));
        this.updateExportUrl();
        logger.debug('1 ExportUrl: ', this.exportUrl);
      }
      logger.debug('Missing searchUrl');
    };

    SearchExport.prototype.setDataType = function setDataType(type) {
      this.dataType = type;

      this.updateExportUrl();

      logger.debug('2 ExportUrl: ', this.exportUrl);
    };

    SearchExport.prototype.updateQueryString = function updateQueryString(url, key, value) {

      url = url.replace(/&$/, '');
      var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
          hash = void 0;

      if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null) return url.replace(re, '$1' + key + "=" + value + '$2$3');else {
          hash = url.split('#');
          url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
          return url;
        }
      } else {
        if (typeof value !== 'undefined' && value !== null) {
          var separator = url.indexOf('?') !== -1 ? '&' : '?';
          hash = url.split('#');
          url = hash[0] + separator + key + '=' + value;
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) url += '#' + hash[1];
          return url;
        } else return url;
      }
    };

    return SearchExport;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'searchUrl', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/authentication',['exports', 'aurelia-framework', 'aurelia-configuration'], function (exports, _aureliaFramework, _aureliaConfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Authentication = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('Authentication');
  logger.debug('In authentication.js');

  var Authentication = exports.Authentication = function () {
    Authentication.inject = function inject() {
      return [_aureliaConfiguration.Configure];
    };

    function Authentication(config) {
      _classCallCheck(this, Authentication);

      logger.debug('In Authentication class');
      this.config = config;
      this.loginUrl = this.config.get('loginUrl');
      logger.debug('LoginUrl: ', this.loginUrl);
    }

    Authentication.prototype.authenticate = function authenticate(protocol, host, pathname, hash) {
      var cleanHash = hash.replace('#/', '');
      if (!cleanHash) {
        cleanHash = 'home';
      }
      logger.debug('Protocol: ', protocol, ' Host: ', host, ' Pathname: ', pathname, ' State: ', cleanHash);
      window.location.href = this.loginUrl + '&redirect_uri=' + protocol + '//' + host + pathname + '?state=' + cleanHash;
    };

    Authentication.prototype.setToken = function setToken(token) {
      localStorage.setItem('BELMgrToken', token);
    };

    Authentication.prototype.getToken = function getToken() {
      return localStorage.getItem('BELMgrToken');
    };

    Authentication.prototype.removeToken = function removeToken() {
      localStorage.removeItem('BELMgrToken');
    };

    Authentication.prototype.checkToken = function checkToken() {
      var token = this.getToken();
      if (!token) {
        return false;
      }
      return true;
    };

    Authentication.prototype.getPayload = function getPayload() {
      var token = this.getToken();

      if (token && token.split('.').length === 3) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
      } else {
        return false;
      }
    };

    Authentication.prototype.isAuthenticated = function isAuthenticated() {
      var token = this.getToken();

      if (token) {
        return true;
      }

      return false;
    };

    Authentication.prototype.isString = function isString(value) {
      return typeof value === 'string';
    };

    Authentication.prototype.logout = function logout(redirect) {
      var _this = this;

      var tokenName = this.tokenName;
      return new Promise(function (resolve, reject) {
        _this.storage.remove(tokenName);

        if (_this.Config.logoutRedirect && !redirect) {
          window.location.href = _this.Config.logoutRedirect;
        } else if (_this.isString(redirect)) {
          window.location.href = redirect;
        }

        resolve();
      });
    };

    return Authentication;
  }();
});
define('resources/openbelapi-client',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-configuration', './authentication'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaConfiguration, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OpenbelApiClient = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('openbelapi-client');

  var OpenbelApiClient = exports.OpenbelApiClient = function () {
    OpenbelApiClient.inject = function inject() {
      return [_authentication.Authentication, _aureliaRouter.Router, _aureliaConfiguration.AureliaConfiguration];
    };

    function OpenbelApiClient(auth, router, config) {
      _classCallCheck(this, OpenbelApiClient);

      this.auth = auth;
      this.router = router;

      this.config = config;
      this.selectedOpenbelApiUrl = this.getApiUrl();
      this.client = this.configureClient(this.selectedOpenbelApiUrl);
    }

    OpenbelApiClient.prototype.configureClient = function configureClient(selectedOpenbelApiUrl) {
      var self = this;
      var client = new _aureliaFetchClient.HttpClient().configure(function (config) {
        config.withBaseUrl(selectedOpenbelApiUrl.api).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/hal+json',
            'X-Requested-With': 'Fetch'
          }
        }).rejectErrorResponses().withInterceptor({
          request: function request(req) {
            logger.debug('Requesting ' + req.method + ' ' + req.url);

            var urlParams = location.href.split(/[?&#]/).slice(1).map(function (paramPair) {
              return paramPair.split(/=(.+)?/).slice(0, 2);
            }).reduce(function (obj, pairArray) {
              obj[pairArray[0]] = pairArray[1];
              return obj;
            }, {});

            if (urlParams.id_token) {
              self.auth.setToken(urlParams.id_token);
            }

            var token = self.auth.getToken();
            req.headers.append('Authorization', 'Bearer ' + token);

            return req;
          },
          response: function response(resp) {
            logger.debug('Received ' + resp.status + ' ' + resp.url);
            if (resp.status === 401) {
              var rejection = Promise.reject(resp);
              return rejection;
            }
            return resp;
          },
          responseError: function responseError(resp) {
            if (resp.status === 401) {
              logger.info('Backend returned HTTP 401, redirecting to loginUrl.');

              self.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
            }
            logger.debug('Received ' + resp.status + ' ' + resp.url);
            var rejection = Promise.reject(resp);
            return rejection;
          }
        });
      });

      return client;
    };

    OpenbelApiClient.prototype.getApiUrl = function getApiUrl() {
      var openbelApiUrls = this.config.get('openbelApiUrls');
      var selectedOpenbelApiUrl = JSON.parse(localStorage.getItem('selectedAPI'));
      if (!selectedOpenbelApiUrl) {
        localStorage.setItem('selectedAPI', JSON.stringify(openbelApiUrls[0]));
        return openbelApiUrls[0];
      }
      return selectedOpenbelApiUrl;
    };

    return OpenbelApiClient;
  }();
});
define('resources/openbelapi-service',['exports', 'aurelia-framework', 'aurelia-fetch-client', './openbelapi-client', './authentication', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _openbelapiClient, _authentication, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OpenbelapiService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('openbelApi');

  var OpenbelapiService = exports.OpenbelapiService = function () {
    OpenbelapiService.inject = function inject() {
      return [_openbelapiClient.OpenbelApiClient, _authentication.Authentication, _aureliaEventAggregator.EventAggregator];
    };

    function OpenbelapiService(openbelApiClient, authentication, ea) {
      var _this = this;

      _classCallCheck(this, OpenbelapiService);

      this.openbelApiClient = openbelApiClient;
      this.apiClient = this.openbelApiClient.client;
      this.auth = authentication;
      this.ea = ea;
      this.ea.subscribe('selectedOpenbelApiUrl', function (obj) {
        _this.updateClient(obj);
        _this.ea.publish('updatedAPIClient');
      });
    }

    OpenbelapiService.prototype.updateClient = function updateClient(selectedOpenbelApiUrl) {
      this.apiClient = this.openbelApiClient.configureClient(selectedOpenbelApiUrl);
    };

    OpenbelapiService.prototype.processFacets = function processFacets(facets) {
      var newFacets = {};

      for (var _iterator = facets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var facet = _ref;

        if (facet.category === 'experiment_context' || facet.name === 'Status' || facet.category === 'citation' || facet.name === 'dataset' || facet.name === 'nanopub_status') {
          var facetName = facet.name;

          if (facet.category === 'citation') {
            facetName = 'Reference ID';
          }
          if (facet.name === 'dataset') {
            facetName = 'Datasets';
          }
          if (facet.name === 'nanopub_status') {
            facetName = 'Nanopub Status';
          }

          newFacets[facetName] = [];
          for (var _iterator2 = facet.values, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var value = _ref2;

            var name = value.value;
            newFacets[facetName].push({
              'name': name,
              'count': value.count,
              'filter': value.filter
            });
          }
        }
      }

      return newFacets;
    };

    OpenbelapiService.prototype.search = function search() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

      var _this2 = this;

      var faceted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'yes';
      var filters = arguments[3];

      var max_values_per_facet = 10;
      var getstring = '/nanopubs?start=' + start + '&size=' + size + '&faceted=' + faceted + '&max_values_per_facet=' + max_values_per_facet;


      if (filters) {
        for (var _iterator3 = filters, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var filter = _ref3;

          getstring += '&filter=' + filter;
        }
      }

      logger.debug('Getstring1: ', getstring);

      return this.apiClient.fetch(getstring).then(function (response) {
        return response.json();
      }).then(function (data) {
        logger.debug('Data: ', data);
        var newData = {};
        newData.nanopubs = data.nanopub_collection;
        newData.facets = _this2.processFacets(data.facets);
        newData.metadata = data.metadata;
        newData.searchUrl = data._links.self.href;
        return newData;
      }).catch(function (reason) {
        if (reason.status === 404) {
          return {
            'nanopubs': null,
            'facets': {}
          };
        }
        if (reason.status === 401) {
          logger.info('Unauthorized request');
        }
        logger.error('Search API Error: ', reason);
      });
    };

    OpenbelapiService.prototype.getBelComponents = function getBelComponents(belStatement) {
      if (belStatement) {
        return this.apiClient.fetch('/expressions/' + belStatement + '/components?flatten=1').then(function (response) {
          return response.json();
        }).then(function (data) {
          return data.expression_components;
        }).catch(function (reason) {
          logger.error('GET BEL Components Error: ' + reason);
        });
      }
      var comp = {};
      return comp;
    };

    OpenbelapiService.prototype.getBelNanopub = function getBelNanopub(id) {

      var token = this.auth.getToken();

      return this.apiClient.fetch('/nanopubs/' + id).then(function (response) {
        return response.json();
      }).then(function (data) {
        var nanopub = data.nanopub;
        return nanopub;
      }).catch(function (reason) {
        logger.error('GET BEL Nanopub Error: ' + reason);
      });
    };

    OpenbelapiService.prototype.loadBelNanopub = function loadBelNanopub(nanopub, id) {
      if (id) {
        return this.apiClient.fetch('/nanopubs/' + id, {
          method: 'put',
          headers: {
            'Accept': 'application/hal+json',
            'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'

          },
          body: JSON.stringify(nanopub)
        }).catch(function (response) {
          logger.error('PUT Nanopub error ', response);
        });
      }

      return this.apiClient.fetch('/nanopubs', {
        method: 'post',
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'
        },
        body: JSON.stringify(nanopub)
      }).catch(function (response) {
        logger.error('POST Nanopub error ', response);
      });
    };

    OpenbelapiService.prototype.deleteBelNanopub = function deleteBelNanopub(nanopubId) {

      return this.apiClient.fetch('/nanopubs/' + nanopubId, {
        method: 'delete',
        headers: {
          'Accept': 'application/hal+json',
          'Content-Type': 'application/json; profile=http://next.belframework.org/schema/nanopub.schema.json'
        }
      }).catch(function (reason) {
        logger.error('DELETE BEL Nanopub Error: ', reason);
      });
    };

    OpenbelapiService.prototype.getBelAnnotationTypes = function getBelAnnotationTypes() {
      return this.apiClient.fetch('/annotations').then(function (response) {
        return response.json();
      }).then(function (data) {
        return data.annotation_collection;
      }).catch(function (reason) {
        logger.error('GET BEL Annotation Types Error: ' + reason);
      });
    };

    OpenbelapiService.prototype.getBELAnnotationValues = function getBELAnnotationValues(query, annotation_type) {
      var numResults = 10;
      var query_string = '';

      if (annotation_type) {
        query_string = '/annotations/' + annotation_type + '/values?filter={"category":"fts","name":"search","value":"' + query + '"}&start=0&size=' + numResults;
      } else {
        query_string = '/annotations/values?filter={"category":"fts","name":"search","value":"' + query + '"}&start=0&size=' + numResults;
      }

      return this.apiClient.fetch(query_string).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data.annotation_value_collection;
      }).catch(function (reason) {
        logger.error('GET BEL Annotation Values Error: ' + reason);
      });
    };

    OpenbelapiService.prototype.getBelCompletions = function getBelCompletions(query, cursor) {
      var _this3 = this;

      return this.apiClient.fetch('/expressions/' + query + '/completions?caret_position=' + cursor).then(function (response) {
        return response.json();
      }).then(function (json) {
        var data = json.completion_collection;

        var completions = _this3.processBelCompletions(query, data);

        return completions;
      }).catch(function (reason) {
        logger.error('GET Bel Completions error: ', reason);
      });
    };

    OpenbelapiService.prototype.processBelCompletions = function processBelCompletions(query, data) {
      var results = [];

      for (var _iterator4 = data, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref4 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref4 = _i4.value;
        }

        var d = _ref4;

        var bel = query.slice(0);
        var cursor = 0;
        if (d.completion.actions) {
          for (var _iterator5 = d.completion.actions, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray5) {
              if (_i5 >= _iterator5.length) break;
              _ref5 = _iterator5[_i5++];
            } else {
              _i5 = _iterator5.next();
              if (_i5.done) break;
              _ref5 = _i5.value;
            }

            var action = _ref5;

            var len = bel.length;
            var front = '';
            var back = '';
            if (action.delete) {
              if (action.delete.start_position > 0) {
                front = bel.slice(0, action.delete.start_position);
              }
              if (action.delete.end_position < len) {
                back = bel.slice(action.delete.end_position + 1);
              }
              bel = front + back;
            }

            if (action.insert) {
              if (action.insert.position > 0) {
                front = bel.slice(0, action.insert.position);
              }
              if (action.insert.position < len) {
                back = bel.slice(action.insert.position);
              }
              bel = front + d.completion.value + back;
            }

            if (action.move_cursor) {
              cursor = action.move_cursor.position;
            }
          }

          var classType = '';
          if (d.completion.type === 'namespace_value') {
            classType = 'nsval';
          } else if (d.completion.type === 'namespace_identifier') {
            classType = 'nsid';
          } else if (d.completion.type === 'function') {
            classType = 'function';
          }

          if (d.completion.label !== d.completion.value) {
            results.push({ term: bel, type: classType, label: d.completion.label, value: d.completion.value, cursor: cursor });
          } else {
            results.push({ term: bel, type: classType, value: d.completion.value, cursor: cursor });
          }
        }
      }
      return results;
    };

    OpenbelapiService.prototype.uploadDataset = function uploadDataset(file) {
      var data = new FormData();
      data.append('file', file);

      return this.apiClient.fetch('/datasets', {
        method: 'post',
        body: data
      });
    };

    OpenbelapiService.prototype.getNanopubId = function getNanopubId(url) {
      var matches = url.match(/\/(\w+?)$/);

      return matches[1];
    };

    OpenbelapiService.prototype.getIdFromUrl = function getIdFromUrl(url) {
      var matches = url.match(/\/([\-\w]*)$/);

      return matches[1];
    };

    OpenbelapiService.prototype.getDatasets = function getDatasets() {
      return this.apiClient.fetch('/datasets').then(function (response) {
        return response.json();
      }).then(function (data) {
        return data.dataset_collection;
      }).catch(function (reason) {
        logger.error('GET Datasets Error: ', reason);
      });
    };

    OpenbelapiService.prototype.getRelationships = function getRelationships() {
      return this.apiClient.fetch('/language/relationships').then(function (response) {
        return response.json();
      }).then(function (data) {
        logger.debug('Relationships: ', data.relationship_collection);
        return data.relationship_collection;
      }).catch(function (reason) {
        logger.error('GET Relationships Error: ', reason);
      });
    };

    OpenbelapiService.prototype.getBelVersion = function getBelVersion() {
      return this.apiClient.fetch('/language/version').then(function (response) {
        return response.json();
      }).then(function (data) {
        return data.bel_version.string;
      }).catch(function (reason) {
        logger.error('GET BEL Version Error: ', reason);
      });
    };

    OpenbelapiService.prototype.deleteDataset = function deleteDataset(url) {
      var dId = this.getIdFromUrl(url);
      return this.apiClient.fetch('/datasets/' + dId, { method: 'DELETE' }).then(function (response) {
        return response;
      }).catch(function (reason) {
        logger.error('Delete Datasets Error: ', reason);
      });
    };

    OpenbelapiService.prototype.authEnabled = function authEnabled() {
      var authEnabledAPI = '/authentication-enabled';
      return this.apiClient.fetch(authEnabledAPI).then(function (data) {
        return data.json();
      }).then(function (data) {
        return data.enabled;
      }).catch(function (reason) {
        logger.error('authentication-enabled error: ', reason);
      });
    };

    return OpenbelapiService;
  }();
});
define('resources/pubmed-client',['exports', 'aurelia-fetch-client', 'aurelia-framework', 'aurelia-configuration'], function (exports, _aureliaFetchClient, _aureliaFramework, _aureliaConfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PubmedClient = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('pubmed-client');

  var PubmedClient = exports.PubmedClient = (_temp = _class = function PubmedClient(config) {
    var _this = this;

    _classCallCheck(this, PubmedClient);

    this.config = config;
    this.pubmedBaseUrl = this.config.get('pubmedBaseUrl');

    this.client = new _aureliaFetchClient.HttpClient();
    this.client.configure(function (config) {
      config.withBaseUrl(_this.pubmedBaseUrl).withDefaults({
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'Fetch'
        }
      }).rejectErrorResponses().withInterceptor({
        request: function request(req) {
          logger.debug('Requesting ' + req.method + ' ' + req.url);
          return req;
        },
        response: function response(resp) {
          logger.debug('Received ' + resp.status + ' ' + resp.url);
          return resp;
        }
      });
    });
  }, _class.inject = [_aureliaConfiguration.Configure], _temp);
});
define('resources/pubmed-service',['exports', 'aurelia-framework', './pubmed-client'], function (exports, _aureliaFramework, _pubmedClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PubmedService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var logger = _aureliaFramework.LogManager.getLogger('pubmed');

  var PubmedService = exports.PubmedService = (_dec = (0, _aureliaFramework.inject)(_pubmedClient.PubmedClient), _dec(_class = function () {
    function PubmedService(PubmedClient) {
      _classCallCheck(this, PubmedService);

      this.client = PubmedClient.client;
    }

    PubmedService.prototype.getPubmed = function getPubmed(id) {
      var _this = this;

      var getstring = '?resulttype=core&format=json&query=ext_id:' + id + ' src:med';

      return this.client.fetch(getstring).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data.resultList.result[0];
      }).then(function (pubmed) {
        if (pubmed) {
          pubmed = _this.enhancePubmed(pubmed);
        }
        return pubmed;
      }).catch(function (response) {
        logger.error('GET Pubmed Error: ', response);
      });
    };

    PubmedService.prototype.enhancePubmed = function enhancePubmed(pubmed) {
      pubmed.bel = { 'mismatch': { 'date': false, 'refString': false, 'authors': false, 'comment': false } };

      pubmed.bel.refString = pubmed.journalInfo.journal.isoabbreviation;
      pubmed.bel.refString += ', ' + pubmed.journalInfo.dateOfPublication + ',';
      pubmed.bel.refString += ' ' + pubmed.journalInfo.volume;
      if (pubmed.journalInfo.issue) {
        pubmed.bel.refString += '(' + pubmed.journalInfo.issue + ')';
      }
      pubmed.bel.refString += ' p:' + pubmed.pageInfo;

      pubmed.bel.authors = pubmed.authorList.author.map(function (obj) {
        return obj.fullName;
      });

      return pubmed;
    };

    return PubmedService;
  }()) || _class);
});
define('resources/relations-list',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var relationsList = exports.relationsList = [{
    label: 'increases',
    value: 'increases'
  }, {
    label: 'decreases',
    value: 'decreases'
  }, {
    label: 'directlyIncreases',
    value: 'directlyIncreases'
  }, {
    label: 'directlyDecreases',
    value: 'directlyDecreases'
  }, {
    label: 'causesNoChange',
    value: 'causesNoChange'
  }, {
    label: 'positiveCorrelation',
    value: 'positiveCorrelation'
  }, {
    label: 'negativeCorrelation',
    value: 'negativeCorrelation'
  }, {
    label: 'translatedTo',
    value: 'translatedTo'
  }, {
    label: 'transcribedTo',
    value: 'transcribedTo'
  }, {
    label: 'isA',
    value: 'isA'
  }, {
    label: 'subProcessOf',
    value: 'subProcessOf'
  }, {
    label: 'rateLimitingStepOf',
    value: 'rateLimitingStepOf'
  }, {
    label: 'biomarkerFor',
    value: 'biomarkerFor'
  }, {
    label: 'prognosticBiomarkerFor',
    value: 'prognosticBiomarkerFor'
  }, {
    label: 'orthologous',
    value: 'orthologous'
  }, {
    label: 'analogous',
    value: 'analogous'
  }, {
    label: 'association',
    value: 'association'
  }, {
    label: 'hasMembers',
    value: 'hasMembers'
  }, {
    label: 'hasComponents',
    value: 'hasComponents'
  }, {
    label: 'hasMember',
    value: 'hasMember'
  }, {
    label: 'hasComponent',
    value: 'hasComponent'
  }, {
    label: 'actsIn',
    value: 'actsIn'
  }, {
    label: 'includes',
    value: 'includes'
  }, {
    label: 'translocates',
    value: 'translocates'
  }, {
    label: 'hasProduct',
    value: 'hasProduct'
  }, {
    label: 'reactantIn',
    value: 'reactantIn'
  }, {
    label: 'hasModification',
    value: 'hasModification'
  }, {
    label: 'hasVariant',
    value: 'hasVariant'
  }];
});
define('pages/about',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.About = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('aboutuspage');
  logger.debug('In about.js');

  var About = exports.About = function About() {
    _classCallCheck(this, About);

    this.builders = [{ 'name': 'Anthony Bargnesi', 'email': 'abargnesi@selventa.com' }, { 'name': 'Nick Bargnesi', 'email': 'nbargnesi@selventa.com' }, { 'name': 'William Hayes', 'email': 'whayes@selventa.com' }, { 'name': 'Kelly McCann', 'email': 'kmccann@selventa.com' }];
    this.consultants = [{ 'name': 'Anselmo Di Fabio', 'email': 'adifabio@ads-llc.com', 'org': 'ADS Consulting' }, { 'name': 'Grant Shih', 'email': 'gshih@ads-llc.com', 'org': 'ADS Consulting' }, { 'name': 'Patrick Walters', 'email': 'patrickwaltersc21@gmail.com', 'org': 'Durandal Inc' }];
  };
});
define('pages/apilist',['exports', 'aurelia-configuration', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaConfiguration, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ApiList = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var logger = _aureliaFramework.LogManager.getLogger('apilist');
  logger.debug('In apilist.js');

  var ApiList = exports.ApiList = (_temp = _class = function () {
    function ApiList(config, ea) {
      _classCallCheck(this, ApiList);

      this.config = config;
      this.ea = ea;

      this.presetAPIs = this.config.get('openbelApiUrls');
      this.userAPIs = [];
      var storedUserAPIs = localStorage.getItem('userAPIs');
      if (storedUserAPIs) {
        try {
          this.userAPIs = JSON.parse(storedUserAPIs);
        } catch (e) {
          localStorage.removeItem('userAPIs');
        }
      }

      var storedSelectedAPIJSON = localStorage.getItem('selectedAPI');
      var storedSelectedAPI = null;
      if (storedSelectedAPIJSON) {
        try {
          storedSelectedAPI = JSON.parse(storedSelectedAPIJSON);
        } catch (e) {
          localStorage.removeItem('selectedAPI');
        }
      }

      if (storedSelectedAPI === null) {
        this.selectedAPI = this.presetAPIs[0];
      } else {
        var selectedName = storedSelectedAPI.name;
        var selectedURL = storedSelectedAPI.api;

        var _arr = [].concat(this.presetAPIs, this.userAPIs);

        for (var _i = 0; _i < _arr.length; _i++) {
          var apiobj = _arr[_i];
          var aoName = apiobj.name;
          var aoURL = apiobj.api;
          if (aoName == selectedName && aoURL == selectedURL) {
            this.selectedAPI = apiobj;
            break;
          }
        }
      }
      this.store();
    }

    ApiList.prototype.changedAPI = function changedAPI(apiobj) {
      this.store();
      this.ea.publish('selectedOpenbelApiUrl', apiobj);
    };

    ApiList.prototype.addUserAPI = function addUserAPI() {
      var api = { api: this.userEnteredURL, name: this.userEnteredAPIName };
      this.userAPIs.push(api);
      this.store();
      this.userEnteredURL = '';
      this.userEnteredAPIName = '';
    };

    ApiList.prototype.removeUserAPI = function removeUserAPI(index) {
      this.userAPIs.splice(index, 1);
      this.store();
    };

    ApiList.prototype.store = function store() {
      localStorage.setItem('userAPIs', JSON.stringify(this.userAPIs));
      localStorage.setItem('selectedAPI', JSON.stringify(this.selectedAPI));
    };

    return ApiList;
  }(), _class.inject = [_aureliaConfiguration.Configure, _aureliaEventAggregator.EventAggregator], _temp);
});
define('pages/edit',['exports', 'aurelia-framework', '../components/User', '../resources/authentication'], function (exports, _aureliaFramework, _User, _authentication) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Edit = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('edit');
  logger.debug('In edit.js');

  var Edit = exports.Edit = function () {
    Edit.inject = function inject() {
      return [_User.User, _authentication.Authentication];
    };

    function Edit(user, auth) {
      _classCallCheck(this, Edit);

      this.nanopubId = null;
      this.authEnabled = false;

      this.userData = user;
      this.auth = auth;

      if (this.userData.authEnabled && !this.auth.checkToken()) {
        this.auth.authenticate(window.location.protocol, window.location.host, window.location.pathname, window.location.hash);
      }
    }

    Edit.prototype.activate = function activate(params) {
      if (params.id) {
        this.nanopubId = params.id;
      }
    };

    return Edit;
  }();
});
define('pages/help',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Help = exports.Help = function Help() {
    _classCallCheck(this, Help);
  };
});
define('pages/import',['exports', 'aurelia-framework', '../resources/openbelapi-service', '../resources/authentication', 'toastr'], function (exports, _aureliaFramework, _openbelapiService, _authentication, _toastr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Import = undefined;

    var toastr = _interopRequireWildcard(_toastr);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var logger = _aureliaFramework.LogManager.getLogger('import');
    logger.debug('In import.js');

    var Import = exports.Import = function () {
        Import.inject = function inject() {
            return [_openbelapiService.OpenbelapiService, _authentication.Authentication];
        };

        function Import(openbelapiService, authentication) {
            _classCallCheck(this, Import);

            this.heading = 'Upload your BEL Script into the BEL Nanopub Repository';
            this.loading = false;
            this.uploadFn = '';

            this.api = openbelapiService;
            this.auth = authentication;
        }

        Import.prototype.activate = function activate() {
            var _this = this;

            var token = null;
            if (this.auth) {
                token = this.auth.getToken();
            }

            if (token) {
                this.tokenParam = '&token=' + token;
            }

            return this.api.getDatasets().then(function (data) {
                _this.datasets = data;
                logger.debug('Datasets: ', _this.datasets);
            }).catch(function (reason) {
                logger.error('GET import datasets Error: ' + reason);
            });
        };

        Import.prototype.upload = function upload() {
            var _this2 = this;

            this.loading = true;
            logger.debug('Loading: ', this.loading);

            this.api.uploadDataset(this.belFiles[0]).then(function (response) {
                var data = { "location": null, "msg": '' };
                if (response.ok) {
                    data.location = response.headers.get("Location");

                    toastr.success('', 'Dataset Loaded');

                    _this2.api.getDatasets().then(function (data) {
                        _this2.datasets = data;
                    });
                }
                _this2.loading = false;
            }).catch(function (response) {
                if (response.status === 409) {
                    var json = response.json();

                    toastr.options = { "timeOut": "15000" };
                    toastr.error(json.msg, 'Duplicate Dataset');
                    toastr.options = { "timeOut": "5000" };
                } else {
                    logger.error('Problem loading dataset ', response);
                    var _json = response.json();
                    toastr.error(_json.msg, 'Failed to upload dataset (status ' + response.status + ')');
                }
                _this2.loading = false;
            });
            logger.debug('Loading: ', this.loading);
        };

        Import.prototype.delete = function _delete(url, idx) {
            this.api.deleteDataset(url);
            this.datasets.splice(idx, 1);
            var deleteModal = document.getElementById('deleter');
            deleteModal.setAttribute('class', 'modal fade');
        };

        Import.prototype.belFilesChanged = function belFilesChanged() {
            logger.debug('belFilesChanged belfiles ', this.belFiles);
            if (this.belFiles) {
                this.uploadFn = this.belFiles[0].name;
                logger.debug('fn: ', this.uploadFn);
            } else {
                this.uploadFn = 'select files:';
                logger.debug('Upload file DB', this.uploadFn);
            }
        };

        Import.prototype.deleteConfiramtion = function deleteConfiramtion() {
            var getModal = document.getElementById(deleter);
            var deleteModal = document.getElementById('deleter');
            deleteModal.setAttribute('class', 'modal fade in');
        };

        Import.prototype.closeDeleter = function closeDeleter() {
            var deleteModal = document.getElementById('deleter');
            deleteModal.setAttribute('class', 'modal fade');
        };

        return Import;
    }();
});
define('pages/search',['exports', '../resources/openbelapi-service', 'aurelia-framework'], function (exports, _openbelapiService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Search = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('search');
  logger.debug('In search.js');

  var Search = exports.Search = function () {
    Search.inject = function inject() {
      return [_openbelapiService.OpenbelapiService];
    };

    function Search(openbelapiService) {
      _classCallCheck(this, Search);

      this.searchUrl = null;
      this.searching = false;

      this.api = openbelapiService;
      this.results = null;
      this.selectedFacets = {};
      this.searchTerms = null;
      this.searchStart = 0;
      if (!localStorage.getItem('belMgrSearchSize')) {
        this.searchSize = "10";
      } else {
        this.searchSize = localStorage.getItem('belMgrSearchSize');
      }
      this.searchFaceted = 1;

      this.nanopubs = [];
      this.facetSets = {};
    }

    Search.prototype.activate = function activate() {
      this.search();
    };

    Search.prototype.search = function search(start) {
      var _this = this;

      if (typeof start != 'undefined') {
        this.searchStart = start;
      }

      this.filters = [];
      if (this.selectedFacets) {
        var keys = Object.keys(this.selectedFacets);
        for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var key = _ref;

          if (this.selectedFacets[key]) {
            this.filters.push(key);
          }
        }
      }

      if (this.searchTerms) {
        this.filters.push('{"category":"fts","name":"search","value":"' + this.searchTerms + '"}');
      }
      logger.debug('Filters: ', this.filters);

      this.searching = true;
      return this.api.search(this.searchStart, this.searchSize, this.searchFaceted, this.filters).then(function (data) {
        logger.debug('Search result data: ', data);
        _this.searchUrl = data.searchUrl;
        _this.nanopubs = data.nanopubs;
        _this.facetSets = data.facets;
        _this.search_metadata = data.metadata.collection_paging;
        var start_page = _this.search_metadata.current_page;
        var end_page = _this.search_metadata.total_pages;

        _this.pagerPrevious = _this.pagerNext = '';
        if (!!_this.search_metadata) {
          if (_this.search_metadata.current_page === 1) {
            _this.pagerPrevious = 'disabled';
          }
          if (_this.search_metadata.current_page === _this.search_metadata.total_pages) {
            _this.pagerNext = 'disabled';
          }
          _this.searchStart = (Number(_this.search_metadata.current_page) - 1) * Number(_this.search_metadata.current_page_size) + 1;
          _this.searchResultsRange = start_page + ' of ' + end_page;
        } else {
          _this.searching = false;
          return data = {};
        }

        logger.debug("Search results: ", _this.nanopubs);
        logger.debug("Search facets: ", _this.facetSets);

        _this.searching = false;
        return data;
      }).catch(function (reason) {
        logger.error('Search error ', reason);
      });
    };

    Search.prototype.saveSearchSize = function saveSearchSize() {
      if (this.searchSize <= 100) {
        localStorage.setItem('belMgrSearchSize', this.searchSize.toString());
      }
      this.search();
    };

    Search.prototype.pageSearchResults = function pageSearchResults(direction) {
      this.searchStart += Number(this.searchSize) * direction;
      this.search();
    };

    Search.prototype.deleteNanopub = function deleteNanopub(nanopubUrl, idx) {
      var nanopubId = this.api.getNanopubId(nanopubUrl);
      this.api.deleteBelNanopub(nanopubId);
      this.nanopubs.splice(idx, 1);
      var deleteModal = document.getElementById("deleter");
      deleteModal.setAttribute("class", "modal fade");
    };

    Search.prototype.deleteConfiramtion = function deleteConfiramtion() {
      var deleteModal = document.getElementById("deleter");
      var modalFade = document.getElementByClassName("modal-backdrop");
      deleteModal.setAttribute("class", "modal fade in");
      modalFade.setAttribute("class", "modal-backdrop fade");
    };

    Search.prototype.closeDeleter = function closeDeleter() {
      var deleteModal = document.getElementById("deleter");
      var modalFade = document.getElementByClassName("modal-backdrop");
      deleteModal.setAttribute("class", "modal fade");
      odalFade.setAttribute("class", "modal-backdrop fade");
    };

    Search.prototype.getSpeciesIcon = function getSpeciesIcon(item) {
      var organisms = {
        "Mus musculus": "mouse-icon",
        "10090": "mouse-icon",
        "Rattus norvegicus": "rat-icon",
        "10116": "rat-icon",
        "Homo sapiens": "human-icon",
        "9606": "human-icon",
        "Unknown": "unknown-icon"
      };
      var result = item.nanopub.experiment_context.find(function (x) {
        return x.name === 'Species';
      });
      if (result) {
        return organisms[result.value];
      }
      return organisms.Unknown;
    };

    Search.prototype.getExperimentContextItems = function getExperimentContextItems(nanopub) {
      var items = nanopub.experiment_context.filter(function (x) {
        return x.name !== 'Ncbi Taxonomy';
      }).map(function (x) {
        return x.name + '::' + x.value;
      });
      return items;
    };

    return Search;
  }();
});
define('pages/welcome',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Welcome = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('welcomepage');
  logger.debug('In welcome.js');

  var Welcome = exports.Welcome = function Welcome() {
    _classCallCheck(this, Welcome);

    this.builders = [{ 'name': 'Anthony Bargnesi', 'email': 'abargnesi@selventa.com' }, { 'name': 'Nick Bargnesi', 'email': 'nbargnesi@selventa.com' }, { 'name': 'William Hayes', 'email': 'whayes@selventa.com' }, { 'name': 'Kelly McCann', 'email': 'kmccann@selventa.com' }];
    this.consultants = [{ 'name': 'Anselmo Di Fabio', 'email': 'adifabio@ads-llc.com', 'org': 'ADS Consulting' }, { 'name': 'Grant Shih', 'email': 'gshih@ads-llc.com', 'org': 'ADS Consulting' }, { 'name': 'Patrick Walters', 'email': 'patrickwaltersc21@gmail.com', 'org': 'Durandal Inc' }];
  };
});
define('valueConverters/arrayify',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ArrayifyValueConverter = exports.ArrayifyValueConverter = function () {
    function ArrayifyValueConverter() {
      _classCallCheck(this, ArrayifyValueConverter);
    }

    ArrayifyValueConverter.prototype.toView = function toView(array) {
      var text = "";
      if (array) {
        text = array.join('; ');
      }
      return text;
    };

    ArrayifyValueConverter.prototype.fromView = function fromView(text) {
      var array = [];
      if (text) {
        array = text.split('; ');
      }
      return array;
    };

    return ArrayifyValueConverter;
  }();
});
define('valueConverters/keys-to-list',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var KeysValueConverter = exports.KeysValueConverter = function () {
    function KeysValueConverter() {
      _classCallCheck(this, KeysValueConverter);
    }

    KeysValueConverter.prototype.toView = function toView(object) {
      return Object.keys(object).sort();
    };

    return KeysValueConverter;
  }();
});
define('valueConverters/pipe-to-semicolon',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SemiToPipeValueConverter = exports.SemiToPipeValueConverter = function () {
    function SemiToPipeValueConverter() {
      _classCallCheck(this, SemiToPipeValueConverter);
    }

    SemiToPipeValueConverter.prototype.toView = function toView(text) {
      if (text) {
        text = text.replace(/\|/g, ';');
      }
      return text;
    };

    SemiToPipeValueConverter.prototype.fromView = function fromView(text) {
      if (text) {
        text = text.replace(/\;/g, '|');
      }
      return text;
    };

    return SemiToPipeValueConverter;
  }();
});
define('valueConverters/sort-array',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SortValueConverter = exports.SortValueConverter = function () {
    function SortValueConverter() {
      _classCallCheck(this, SortValueConverter);
    }

    SortValueConverter.prototype.toView = function toView(array) {
      console.log('Array: ', array);
      return array.sort();
    };

    return SortValueConverter;
  }();
});
define('valueConverters/stringify',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var StringifyValueConverter = exports.StringifyValueConverter = function () {
    function StringifyValueConverter() {
      _classCallCheck(this, StringifyValueConverter);
    }

    StringifyValueConverter.prototype.toView = function toView(object) {
      return JSON.stringify(object, null, 2);
    };

    return StringifyValueConverter;
  }();
});
define('aurelia-configuration/aurelia-configuration',["require", "exports", "aurelia-path", "./deep-extend"], function (require, exports, aurelia_path_1, deep_extend_1) {
    "use strict";
    var AureliaConfiguration = (function () {
        function AureliaConfiguration() {
            this.environment = 'default';
            this.environments = null;
            this.directory = 'config';
            this.config_file = 'config.json';
            this.cascade_mode = true;
            this._config_object = {};
            this._config_merge_object = {};
        }
        /**
         * Set Directory
         *
         * Sets the location to look for the config file
         *
         * @param path
         */
        AureliaConfiguration.prototype.setDirectory = function (path) {
            this.directory = path;
        };
        /**
         * Set Config
         *
         * Sets the filename to look for in the defined directory
         *
         * @param name
         */
        AureliaConfiguration.prototype.setConfig = function (name) {
            this.config_file = name;
        };
        /**
         * Set Environment
         *
         * Changes the environment value
         *
         * @param environment
         */
        AureliaConfiguration.prototype.setEnvironment = function (environment) {
            this.environment = environment;
        };
        /**
         * Set Environments
         *
         * Specify multiple environment domains to allow for
         * dynamic environment switching.
         *
         * @param environments
         */
        AureliaConfiguration.prototype.setEnvironments = function (environments) {
            if (environments === void 0) { environments = null; }
            if (environments !== null) {
                this.environments = environments;
                // Check the hostname value and determine our environment
                this.check();
            }
        };
        /**
         * Set Cascade Mode
         *
         * By default if a environment config value is not found, it will
         * go looking up the config file to find it (a la inheritance style). Sometimes
         * you just want a config value from a specific environment and nowhere else
         * use this to disabled this functionality
         *
         * @param bool
         */
        AureliaConfiguration.prototype.setCascadeMode = function (bool) {
            if (bool === void 0) { bool = true; }
            this.cascade_mode = bool;
        };
        Object.defineProperty(AureliaConfiguration.prototype, "obj", {
            /**
             * Get Config
             * Returns the entire configuration object pulled and parsed from file
             *
             * @returns {V}
             */
            get: function () {
                return this._config_object;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AureliaConfiguration.prototype, "config", {
            /**
             * Get Config
             *
             * Get the config file name
             *
             * @returns {V}
             */
            get: function () {
                return this.config_file;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Is
         *
         * A method for determining if the current environment
         * equals that of the supplied environment value*
         * @param environment
         * @returns {boolean}
         */
        AureliaConfiguration.prototype.is = function (environment) {
            return (environment === this.environment);
        };
        /**
         * Check
         * Looks for a match of the hostName to any of the domain
         * values specified during the configuration bootstrapping
         * phase of Aurelia.
         *
         */
        AureliaConfiguration.prototype.check = function () {
            var hostname = window.location.hostname;
            // Check we have environments we can loop
            if (this.environments) {
                // Loop over supplied environments
                for (var env in this.environments) {
                    // Get environment hostnames
                    var hostnames = this.environments[env];
                    // Make sure we have hostnames
                    if (hostnames) {
                        // Loop the hostnames
                        for (var _i = 0, hostnames_1 = hostnames; _i < hostnames_1.length; _i++) {
                            var host = hostnames_1[_i];
                            if (hostname.search(host) !== -1) {
                                this.setEnvironment(env);
                                // We have successfully found an environment, stop searching
                                return;
                            }
                        }
                    }
                }
            }
        };
        /**
         * Environment Enabled
         * A handy method for determining if we are using the default
         * environment or have another specified like; staging
         *
         * @returns {boolean}
         */
        AureliaConfiguration.prototype.environmentEnabled = function () {
            return (!(this.environment === 'default' || this.environment === '' || !this.environment));
        };
        /**
         * Environment Exists
         * Checks if the environment section actually exists within
         * the configuration file or defaults to default
         *
         * @returns {boolean}
         */
        AureliaConfiguration.prototype.environmentExists = function () {
            return this.environment in this.obj;
        };
        /**
         * Get
         * Gets a configuration value from the main config object
         * with support for a default value if nothing found
         *
         * @param key
         * @param defaultValue
         * @returns {*}
         */
        AureliaConfiguration.prototype.get = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = null; }
            // By default return the default value
            var returnVal = defaultValue;
            // Singular non-namespaced value
            if (key.indexOf('.') === -1) {
                // Using default environment
                if (!this.environmentEnabled()) {
                    return this.obj[key] ? this.obj[key] : defaultValue;
                }
                if (this.environmentEnabled()) {
                    // Value exists in environment
                    if (this.environmentExists() && this.obj[this.environment][key]) {
                        returnVal = this.obj[this.environment][key];
                    }
                    else if (this.cascade_mode && this.obj[key]) {
                        returnVal = this.obj[key];
                    }
                    return returnVal;
                }
            }
            if (key.indexOf('.') !== -1) {
                var splitKey = key.split('.');
                var parent_1 = splitKey[0];
                var child = splitKey[1];
                if (!this.environmentEnabled()) {
                    if (this.obj[parent_1]) {
                        return this.obj[parent_1][child] ? this.obj[parent_1][child] : defaultValue;
                    }
                }
                else {
                    if (this.environmentExists() && this.obj[this.environment][parent_1] && this.obj[this.environment][parent_1][child]) {
                        returnVal = this.obj[this.environment][parent_1][child];
                    }
                    else if (this.cascade_mode && this.obj[parent_1] && this.obj[parent_1][child]) {
                        returnVal = this.obj[parent_1][child];
                    }
                    return returnVal;
                }
            }
            return returnVal;
        };
        /**
         * Set
         * Saves a config value temporarily
         *
         * @param key
         * @param val
         */
        AureliaConfiguration.prototype.set = function (key, val) {
            if (key.indexOf('.') === -1) {
                this.obj[key] = val;
            }
            else {
                var splitKey = key.split('.');
                var parent_2 = splitKey[0];
                var child = splitKey[1];
                if (this.obj[parent_2] === undefined) {
                    this.obj[parent_2] = {};
                }
                this.obj[parent_2][child] = val;
            }
        };
        /**
         * Merge
         *
         * Allows you to merge in configuration options.
         * This method might be used to merge in server-loaded
         * configuration options with local ones.
         *
         * @param obj
         *
         */
        AureliaConfiguration.prototype.merge = function (obj) {
            var currentConfig = this._config_object;
            this._config_object = deep_extend_1.default(currentConfig, obj);
        };
        /**
         * Lazy Merge
         *
         * Allows you to merge in configuration options.
         * This method might be used to merge in server-loaded
         * configuration options with local ones. The merge
         * occurs after the config has been loaded.
         *
         * @param obj
         *
         */
        AureliaConfiguration.prototype.lazyMerge = function (obj) {
            var currentMergeConfig = (this._config_merge_object || {});
            this._config_merge_object = deep_extend_1.default(currentMergeConfig, obj);
        };
        /**
         * Set All
         * Sets and overwrites the entire configuration object
         * used internally, but also can be used to set the configuration
         * from outside of the usual JSON loading logic.
         *
         * @param obj
         */
        AureliaConfiguration.prototype.setAll = function (obj) {
            this._config_object = obj;
        };
        /**
         * Get All
         * Returns all configuration options as an object
         *
         * @returns {V}
         */
        AureliaConfiguration.prototype.getAll = function () {
            return this.obj;
        };
        /**
         * Load Config
         * Loads the configuration file from specified location,
         * merges in any overrides, then returns a Promise.
         *
         * @returns {Promise}
         */
        AureliaConfiguration.prototype.loadConfig = function () {
            var _this = this;
            return this.loadConfigFile(aurelia_path_1.join(this.directory, this.config), function (data) { return _this.setAll(data); })
                .then(function () {
                if (_this._config_merge_object) {
                    _this.merge(_this._config_merge_object);
                    _this._config_merge_object = null;
                }
            });
        };
        /**
         * Load Config File
         * Loads the configuration file from the specified location
         * and then returns a Promise.
         *
         * @returns {Promise}
         */
        AureliaConfiguration.prototype.loadConfigFile = function (path, action) {
            return new Promise(function (resolve, reject) {
                var pathClosure = path.toString();
                var xhr = new XMLHttpRequest();
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json');
                }
                xhr.open('GET', pathClosure, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var data = JSON.parse(this.responseText);
                        action(data);
                        resolve(data);
                    }
                };
                xhr.onloadend = function () {
                    if (xhr.status == 404) {
                        reject('Configuration file could not be found: ' + path);
                    }
                };
                xhr.onerror = function () {
                    reject("Configuration file could not be found or loaded: " + pathClosure);
                };
                xhr.send(null);
            });
        };
        /**
         * Merge Config File
         *
         * Allows you to merge in configuration options from a file.
         * This method might be used to merge in server-loaded
         * configuration options with local ones.
         *
         * @param path      The path to the config file to load.
         * @param optional  When true, errors encountered while loading the config file will be ignored.
         *
         */
        AureliaConfiguration.prototype.mergeConfigFile = function (path, optional) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this
                    .loadConfigFile(path, function (data) {
                    _this.lazyMerge(data);
                    resolve();
                })
                    .catch(function (error) {
                    if (optional === true) {
                        resolve();
                    }
                    else {
                        reject(error);
                    }
                });
            });
        };
        return AureliaConfiguration;
    }());
    exports.AureliaConfiguration = AureliaConfiguration;
});

/*!
 * @description Recursive object extending
 * @author Viacheslav Lotsmanov <lotsmanov89@gmail.com>
 * @license MIT
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2015 Viacheslav Lotsmanov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
define('aurelia-configuration/deep-extend',["require", "exports"], function (require, exports) {
    "use strict";
    'use strict';
    function isSpecificValue(val) {
        return (val instanceof Buffer
            || val instanceof Date
            || val instanceof RegExp) ? true : false;
    }
    function cloneSpecificValue(val) {
        if (val instanceof Buffer) {
            var x = new Buffer(val.length);
            val.copy(x);
            return x;
        }
        else if (val instanceof Date) {
            return new Date(val.getTime());
        }
        else if (val instanceof RegExp) {
            return new RegExp(val);
        }
        else {
            throw new Error('Unexpected situation');
        }
    }
    /**
     * Recursive cloning array.
     */
    function deepCloneArray(arr) {
        var clone = [];
        arr.forEach(function (item, index) {
            if (typeof item === 'object' && item !== null) {
                if (Array.isArray(item)) {
                    clone[index] = deepCloneArray(item);
                }
                else if (isSpecificValue(item)) {
                    clone[index] = cloneSpecificValue(item);
                }
                else {
                    clone[index] = deepExtend({}, item);
                }
            }
            else {
                clone[index] = item;
            }
        });
        return clone;
    }
    /**
     * Extening object that entered in first argument.
     *
     * Returns extended object or false if have no target object or incorrect type.
     *
     * If you wish to clone source object (without modify it), just use empty new
     * object as first argument, like this:
     *   deepExtend({}, yourObj_1, [yourObj_N]);
     */
    var deepExtend;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = deepExtend = function () {
        if (arguments.length < 1 || typeof arguments[0] !== 'object') {
            return false;
        }
        if (arguments.length < 2) {
            return arguments[0];
        }
        var target = arguments[0];
        // convert arguments to array and cut off target object
        var args = Array.prototype.slice.call(arguments, 1);
        var val, src;
        args.forEach(function (obj) {
            // skip argument if it is array or isn't object
            if (typeof obj !== 'object' || Array.isArray(obj)) {
                return;
            }
            Object.keys(obj).forEach(function (key) {
                src = target[key]; // source value
                val = obj[key]; // new value
                // recursion prevention
                if (val === target) {
                    return;
                }
                else if (typeof val !== 'object' || val === null) {
                    target[key] = val;
                    return;
                }
                else if (Array.isArray(val)) {
                    target[key] = deepCloneArray(val);
                    return;
                }
                else if (isSpecificValue(val)) {
                    target[key] = cloneSpecificValue(val);
                    return;
                }
                else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                    target[key] = deepExtend({}, val);
                    return;
                }
                else {
                    target[key] = deepExtend(src, val);
                    return;
                }
            });
        });
        return target;
    };
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from='./components/nav-bar'></require>\n  <require from='./components/footer'></require>\n\n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <div class=\"page-host\">\n    <router-view></router-view>\n    <footer></footer>\n  </div>\n\n\n\n</template>\n"; });
define('text!components/bel-citation.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./valueConverters/arrayify\"></require>\n\n  <div class=\"row edit-belForm\" id=\"bel-citation\">\n    <div id=\"citation\" class=\"edit-header\">\n      <div class=\"col-xs-12\"> <h3>Citation</h3> </div>\n      <!-- .col-xs-12 -->\n\n      <div class=\"col-xs-2\">\n        <div class=\"form-group\">\n          <label for=\"citation_type\">Type</label>\n          <select class=\"form-control fc-normal selectDrop\" id=\"citation_type\" value.bind=\"nanopub.citation.type\">\n            <option value=\"PubMed\">PubMed</option>\n            <option value=\"Journal\">Journal</option>\n            <option value=\"Book\">Book</option>\n            <option value=\"Online Resource\">Online Resource</option>\n            <option value=\"Other\">Other</option>\n          </select>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-2 -->\n      <div class=\"col-xs-7\">\n        <div class=\"form-group\">\n          <label for=\"citation_ref\">Reference ID</label>\n          <input type=\"text\" class=\"form-control fc-normal\" id=\"citation_ref\" value.bind=\"citationId\"\n                 blur.trigger=\"collectPubmed()\" placeholder=\"Citation Reference - e.g. PubmedID, ISBN, or URL\">\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-8 -->\n      <div class=\"col-xs-3\">\n        <div class=\"form-group\">\n          <label for=\"citation_ref\">Publication Date</label>\n          <input type=\"date\" class=\"form-control fc-normal selectDrop\" id=\"citation_pubdate\" value.bind=\"nanopub.citation.date\"\n                 placeholder=\"YYYY-MM-DD\">\n\n          <p class=\"warning\" if.bind=\"pubmed.bel.mismatch.date\">${pubmed.firstPublicationDate} <button class=\"btn btn-replace\" click.delegate=\"replaceCitationDate(pubmed.firstPublicationDate)\">Replace</button></p>\n        </div>\n        <!-- .form-group -->\n      </div>\n    </div>\n  </div>\n  <!-- col-xs-2 -->\n  <div class=\"panel-group accordion-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n    <div class=\"panel acForm\">\n      <div class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n        <h5 class=\"panel-title edit-acTitle\">\n          <a class=\"accordionAnchor collapsed col-xs-12\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n            <div>\n                      <span class=\"accordionTitle col-xs-11 floatLeft\">Reference Name\n                      </span>\n              <i class=\"accordionArrow col-xs-1 floatRight fa fa-caret-down\"></i>\n            </div>\n          </a>\n        </h5>\n      </div>\n      <div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n        <div class=\"panel-body edit-acPanelBody\">\n\n          <div class=\"form-group edit-acFormGroup\">\n            <!-- <label for=\"citation_name\">Reference Name</label> -->\n            <textarea type=\"text\" class=\"form-control authorCitation\" id=\"citation_name\" value.bind=\"nanopub.citation.name\" placeholder=\"Citation Name - e.g. journal or book reference\"></textarea>\n\n            <button class=\"btn-bel btn-replace col-xs-1\" if.bind=\"pubmed.bel.mismatch.refString\" click.delegate=\"replaceCitationName(pubmed.bel.refString)\">Replace</button>\n            <p class=\"text-warning col-xs-10\" if.bind=\"pubmed.bel.mismatch.refString\">PubMed Citation: <span class=\"text-warningCitation\">${pubmed.bel.refString}</span></p>\n            <!-- .form-group -->\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"panel acForm\">\n      <div class=\"panel-heading\" role=\"tab\" id=\"headingTwo\">\n        <h5 class=\"panel-title edit-acTitle\">\n          <a class=\"accordionAnchor collapsed col-xs-12\" role=\"button\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\n            <div>\n              <span class=\"accordionTitle col-xs-11 floatLeft\">Authors</span>\n              <i class=\"accordionArrow col-xs-1 floatRight fa fa-caret-down\"></i>\n            </div>\n          </a>\n        </h5>\n      </div>\n      <div id=\"collapseTwo\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\n        <div class=\"panel-body edit-acPanelBody\">\n\n          <div class=\"form-group edit-acFormGroup\">\n            <!--<label for=\"citation_ref\">Authors</label>-->\n            <textarea type=\"text\" class=\"form-control authorCitation\" id=\"citation_authors\" value.bind=\"nanopub.citation.authors | arrayify\" placeholder=\"separate authors with a semicolon ';'\"></textarea>\n\n            <button class=\"btn-bel btn-replace col-xs-1\" if.bind=\"pubmed.bel.mismatch.authors\" click.delegate=\"replaceCitationAuthors(pubmed.bel.authors)\">Replace</button>\n            <p class=\"text-warning col-xs-10\" if.bind=\"pubmed.bel.mismatch.authors\">Authors listed on PubMed: <span class=\"text-warningCitation\">${pubmed.bel.authors | arrayify}</span></p>\n\n            <!-- .form-group -->\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/bel-context-item.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-xs-3\">\n\n    <input type=\"text\" class=\"form-control ci-ctListingInput\" name=\"context-type\"\n      value.bind=\"type\" change.trigger=\"filterTypes()\" focus.bind=\"hasTypeFocus\"/>\n\n    <!-- <a href=\"#\" click.trigger=\"typeClear()\"><i class=\"fa fa-close\"></i></a> -->\n\n    <ul class=\"ci-aNameUl\" show.bind=\"showTypes\">\n      <li class=\"ci-aNameLi\" repeat.for=\"type of filteredTypes\" click.trigger=\"selectType(type)\" mousedown.trigger=\"selectType(type)\">\n        <a href=\"#\">\n          <span class=\"ci-ctListing\">${type.annotation.name}</span>\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class=\"ci-aValDiv col-xs-8\">\n    <input type=\"text\" class=\"form-control ci-valListingInput\" name=\"context-value\"\n      value.bind=\"annotation & debounce:300\" blur.trigger=\"notifyAddBlank()\" focus.bind=\"hasAnnotationFocus\"\n      placeholder=\"Enter experimental context value\">\n\n    <ul class=\"ci-aValUl row\" show.bind=\"showAnnotations\">\n      <li class=\"ci-aValLi\" repeat.for=\"annotation of filteredAnnotations\" click.trigger=\"selectAnnotation(annotation)\" mousedown.trigger=\"selectAnnotation(annotation)\">\n        <a href=\"#\">\n          <span class=\"ci-ctListing\">${annotation.annotation_value.annotation.name}</span>;\n          <span class=\"ci-valListing\">${annotation.annotation_value.name}</span>\n          <!-- ==> ${annotation.annotation_value.match_text} -->\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class=\"col-xs-1\">\n    <a class=\"btn ci-deleteBtn\" show.bind=\"!last\" href=\"#\" click.delegate=\"removeItem(index)\">\n      <i class=\"fa fa-trash-o fa-lg\"></i>\n    </a>\n  </div>\n</template>\n"; });
define('text!components/bel-context.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./bel-context-item\"></require>\n  <div id=\"context\" class=\"edit-context \">\n    <div class=\"row edit-belForm\">\n      <div class=\"col-xs-12 edit-header\">\n        <h3>Experimental Context</h3>\n      </div>\n\n      <!--Context List Header-->\n      <div class=\"row col-xs-12\">\n        <div class=\"col-xs-3\">\n          <label class=\"edit-annotationType\">Context Type</label>\n        </div>\n        <div class=\"col-xs-7\">\n          <label class=\"edit-annotation\">Value</label>\n        </div>\n      </div>\n\n      <!--List Context-->\n      <template repeat.for=\"context of nanopub.experiment_context\">\n        <div class=\"row col-xs-12\">\n          <bel-context-item type.two-way=\"context.name\" annotation.two-way=\"context.value\" types.bind=\"types\" index.bind=\"$index\" last.bind=\"$last\">\n          </bel-context-item>\n        </div>\n\n      </template>\n\n<!--     <div class=\"row\">\n          <div class=\"col-xs-12 edit-header\">\n\n            <h3>Typeahead test</h3>\n\n            <type-ahead selected-option.two-way=\"selectedPlanet\"\n            text=\"name\"></type-ahead>\n          </div>\n\n    </div> -->\n\n  </div>\n\n</template>\n"; });
define('text!components/bel-metadata.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"row edit-belForm\">\n    <div id=\"bel-metadata\" class=\"bottom30\">\n      <div class=\"col-xs-12\">\n        <h3>BEL Nanopub Metadata</h3>\n      </div>\n\n      <!-- .col-xs12 -->\n      <div class=\"col-xs-3\">\n        <div class=\"form-group\">\n          <label for=\"\">Review Status</label>\n          <select class=\"form-control fc-normal selectDrop\" id=\"reviews\" value.bind=\"metadata.nanopub_status\">\n            <option value=\"Draft\">Draft</option>\n            <option value=\"Review\">Review</option>\n            <option value=\"Approved\">Approved</option>\n            <option value=\"Rejected\">Rejected</option>\n          </select>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-3 -->\n      <div class=\"col-xs-6\">\n        <div class=\"form-group\">\n          <label for=\"\">Author</label>\n          <input type=\"text\" class=\"form-control fc-normal\" value.bind=\"metadata.author\"></input>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-6 -->\n      <div class=\"col-xs-3\">\n        <div class=\"form-group\">\n          <label for=\"\">Date Created</label>\n          <input class=\"form-control fc-normal selectDrop\" type=\"date\" value.bind=\"metadata.creation_date\"></input>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-3 -->\n\n      <div class=\"col-xs-6 col-xs-offset-3\">\n        <div class=\"form-group\">\n          <label for=\"\">Reviewer</label>\n          <input type=\"text\" class=\"form-control fc-normal\" value.bind=\"metadata.reviewer\"></input>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-6.col-xs-offset-3 -->\n\n      <div class=\"col-xs-3\">\n        <div class=\"form-group\">\n          <label for=\"\">Date Reviewed</label>\n          <input class=\"form-control fc-normal selectDrop\" type=\"date\" value.bind=\"metadata.review_date\"></input>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-3 -->\n\n      <div class=\"col-xs-6 col-xs-offset-3\">\n        <div class=\"form-group\">\n          <label for=\"\">BEL Nanopub Source</label>\n          <input id=\"source\" type=\"text\" class=\"form-control fc-normal\" value.bind=\"metadata.nanopub_source\"></input>\n        </div>\n        <!-- .form-group -->\n      </div>\n      <!-- .col-xs-6.col-xs-offset-3 -->\n\n    </div>\n  </div>\n</template>\n"; });
define('text!components/bel-nanopub.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./pubmed\"></require>\n  <require from=\"./bel-statement\"></require>\n  <require from=\"./bel-citation\"></require>\n  <require from=\"./bel-context\"></require>\n  <require from=\"./bel-metadata\"></require>\n  <div class=\"edit-html\">\n    <div class=\"col-xs-5 edit-belEditorTitle\">\n        <h1>BEL Nanopub Editor</h1>\n    </div>\n\n    <div class=\"container-fluid\">\n      <pubmed class=\"${showPubmed ? 'col-xs-4 col-md-3' : 'noShow'}\"></pubmed>\n\n      <div class=\"${showPubmed ? 'col-xs-8 col-xs-offset-4 col-md-9 col-md-offset-3' : 'col-xs-11 col-xs-offset-1'}\">\n\n        <!-- If.bind is used below to wait for nanopub before allowing the subcomponents, bel-citation, etc to be instantiated. -->\n        <div name=\"newBelForm\" if.bind=\"nanopub\">\n\n          <!-- Citation -->\n          <bel-citation nanopub.bind=\"nanopub\"> </bel-citation>\n\n          <!-- BEL Statement -->\n          <bel-statement nanopub.bind=\"nanopub\"\n            bel-subject.bind=\"belSubject\" bel-relationship.bind=\"belRelationship\"\n            bel-object.bind=\"belObject\">\n          </bel-statement>\n\n          <!-- BEL Support -->\n          <div id=\"bel-support\" class=\"row edit-belForm\">\n            <div id=\"support\">\n              <div class=\"col-xs-12 edit-header\">\n                <h3>Support</h3>\n              </div>\n              <!-- .col-xs-12 -->\n\n              <div class=\"col-xs-12\">\n                <div class=\"form-group\">\n                  <textarea class=\"form-control fc-normal textBlocks\" value.bind=\"nanopub.support\" id=\"summary-text-textarea\" rows=\"3\" placeholder=\"Extract from source text supporting this BEL Statement\"></textarea>\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- End BEL Support -->\n\n          <!-- BEL Nanopub Notes -->\n          <div id=\"bel-nanopub-notes\" class=\"row edit-belForm\">\n            <div id=\"nanopub-notes\">\n              <div class=\"col-xs-12 edit-header\">\n                <h3>Nanopub Notes</h3>\n              </div>\n              <div class=\"col-xs-12\">\n                <div class=\"form-group\">\n                  <textarea rows=\"3\" class=\"form-control fc-normal textBlocks\" id=\"nanopub-notes-textarea\" value.bind=\"metadata.nanopub_notes\"></textarea>\n                </div>\n                <!-- .form-group -->\n              </div>\n              <!-- .col-xs-12 -->\n            </div>\n          </div>\n          <!-- End BEL Nanopub Notes -->\n\n          <!-- Experiment Context -->\n          <bel-context nanopub.two-way=\"nanopub\"> </bel-context>\n\n          <!--Metadata-->\n          <bel-metadata nanopub.two-way=\"nanopub\" metadata.two-way='metadata'> </bel-metadata>\n\n          <div class=\"row edit-editBtns\">\n\n            <div class=\"col-xs-6 col-md-4\" show.bind=\"nanopubId\">\n              <button type=\"button\" click.trigger=\"submitUpdate()\" class=\"col-xs-10 btn-edit btn-saveUpdates btn form-control\")>Update Current BEL</button>\n            </div>\n\n            <div class=\"${nanopubId ? 'col-xs-6 col-md-4 col-md-offset-4' : 'col-xs-6 col-xs-offset-6 col-sm-4 col-sm-offset-8'}\">\n              <button type=\"button\" click.trigger=\"submitNew()\" class=\"col-xs-10 btn btn-edit btn-progress form-control\">${nanopubId ? 'Save as New' : 'Save'}</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/bel-statement.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./bel-term\"></require>\n  <div id=\"bel-statement\" class=\"edit-belForm edit-belStatement edit-header\">\n    <div class=\"row col-xs-12\">\n      <h3>BEL Statement</h3>\n    </div>\n    <!-- .col-xs-12 -->\n    <div class=\"row\">\n      <div id=\"bel-source-div\" class=\"edit-belStatementDivs col-xs-5\">\n        <div class=\"form-group\">\n          <label class=\"sr-only\" for=\"belSubject\">BEL Source</label>\n\n          <bel-term bel.two-way=\"belSubject\"></bel-term>\n\n        </div>\n\n        <div id=\"source-searchbox\" class=\"search-box\" style=\"display: none;\">\n          <h3>Entity Search</h3>\n        </div>\n      </div>\n\n      <div id=\"bel-relation-div\" class=\"edit-belStatementDivs col-xs-2\">\n        <label class=\"sr-only\" for=\"belRelation\">BEL Relation</label>\n        <select class=\"form-control selectDrop selectDrop-relation\" id=\"bel-relation\" value.bind=\"belRelationship\">\n          <option>--Relation--</option>\n          <option repeat.for=\"relation of relationships\" model.bind=\"relation.relation.long_form\">${relation.relation.long_form}</option>\n        </select>\n      </div>\n\n      <div id=\"bel-target-div\" class=\"edit-belStatementDivs col-xs-5\">\n        <div class=\"form-group input-block-level\">\n          <label class=\"sr-only\" for=\"belObject\">BEL Object</label>\n          <bel-term bel.two-way=\"belObject\"></bel-term>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n"; });
define('text!components/bel-term.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"et-termdiv\">\n\n    <div class=\"input-group et-input-group\">\n\n      <span show.bind=\"loading\" class=\"input-group-addon et-spinner\">\n        <i class=\"fa fa-refresh fa-spin\"></i>\n      </span>\n      <input id=\"bel-term\" ref='belinput' type=\"text\" class=\"form-control et-statementfield\"\n      focus.trigger=\"hasFocus()\" name=\"statement_term\"\n      value.bind=\"bel & debounce:400\" blur.trigger=\"blurred()\"/>\n    </div>\n\n    <ul class=\"et-termUl row\" show.bind=\"showTerms\">\n      <li class=\"et-termLi\" repeat.for=\"item of filteredTerms\">\n        <a click.trigger=\"selectTerm(item)\" mousedown.trigger=\"selectTerm(item)\">\n          <span class=\"et-termlisting et-${item.type}\">${item.term}\n            <span class=\"et-termlabel\">${item.label}</span>\n          </span>\n        </a>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
define('text!components/footer.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container footer-body\"> \n      <div class=\"row\">\n        <!-- <img class=\"footerImg\" src=\"/media/bel-transparent.png\" alt=\"\"> -->\n        <div class=\"col-xs-8 col-xs-offset-4 col-sm-4 col-sm-offset-8 col-md-3 col-md-offset-9\">\n          <ul class=\"footerUl\">\n            <li><a href=\"http://www.openbel.org/\">OpenBel.org</a></li>\n            <li><a href=\"http://wiki.openbel.org/\">OpenBel Wiki Page</a></li>\n          </ul>\n      </div>\n    </div>\n\n</template>\n"; });
define('text!components/nav-bar.html', ['module'], function(module) { module.exports = "<template>\n    <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\" id=\"nav-stick\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#openBelNavbar\">\n                <span class=\"sr-only\">Toggle Navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">\n                <img class=\"navbar-logo\" src=\"./media/bel300x.png\">\n                <span class=\"navbar-header-title\">Manager</span>\n            </a>\n            <!-- <div class=\"nav-apisettings\">\n                <div class=\"nav-belversion\">BEL Version: ${userData.belVersion}</div>\n                <div class=\"nav-apiendpt ${ endpointName ? 'testing' : 'disp-none' } \">\n                    <a route-href=\"route: apilist\">API Endpoint: ${endpointName}</a>\n                </div>\n        \n            </div> -->\n        </div>\n        <div class=\"collapse navbar-collapse\" id=\"openBelNavbar\">\n            <!-- <div class=\"navbar-links\"> -->\n                <ul class=\"nav navbar-nav\">\n                    <li repeat.for=\"row of router.navigation\" class=\"navbar-title ${row.isActive ? 'active' : ''}\">\n                        <a data-toggle=\"collapse\" data-target=\"#openBelNavbar.in\" href.bind=\"row.href\">${row.title}</a>\n                    </li>\n                </ul>\n            <!-- </div> -->\n            <div class=\"navbar-user-box\">\n                <div class=\"col-xs-12 col-md-12 navbar-ub-item ub-auth\">\n                    <div if.bind='authEnabled' class=\"navbar-userdiv\">\n                        <a class=\"pointer\" click.delegate=\"navbarAction()\">${action}</a>\n                    </div>\n                </div>\n                <div class=\"col-xs-12 col-md-12 navbar-ub-item ub-version\">\n                    <!-- <div class=\"nav-apisettings\"> -->\n                        <div class=\"nav-belversion\">BEL Version: ${belVersion}</div>\n                    <!-- </div> -->\n                </div>\n                <div class=\"col-xs-12 navbar-ub-item ub-api\">\n                    <!-- <div class=\"nav-apiendpt ${ endpointName ? 'testing' : 'disp-none' } \"> -->\n                        <a route-href=\"route: apilist\">\n                        API Endpoint: \n                        <br>\n                        ${endpointName}</a>\n                    <!-- </div> -->\n                </div>\n            </div>\n            <!-- <ul>\n                <li class=\"loader navbar-loader\" if.bind=\"router.isNavigating\">\n                    <i class=\"fa fa-circle-o-notch fa-spin\"></i>\n                </li>\n            </ul> -->\n        </div>\n    </nav>\n\n</template>\n"; });
define('text!components/pubmed.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"container\">\n      <div class=\"row\">\n        <section class=\"pubmedContent ${pubmed.title ? 'col-xs-4 col-md-3' : 'noShow'}\">\n            <div class=\"row\">\n              <div class=\"col-xs-6 btn-euPMC-pubmed-div\">\n                <a href=\"http://europepmc.org/abstract/MED/${pubmed.id}\" class=\"col-xs-12 btn btn-bel btn-euPMC-pubmed form-control\" role=\"button\" target=\"_blank\"><img class=\"euPMC-pubmed-logo\" src=\"./media/EuropePMC.png\" alt=\"\"></a>\n              </div>\n              <div class=\"col-xs-6 btn-euPMC-pubmed-div\">\n                <a href=\"http://www.ncbi.nlm.nih.gov/pubmed/?term=${pubmed.id}[uid]\" class=\"col-xs-12 btn btn-bel btn-euPMC-pubmed form-control\" role=\"button\" target=\"_blank\"><img class=\"euPMC-pubmed-logo\" src=\"./media/pubmed-logo.png\" alt=\"\"></a>\n              </div>\n            </div>\n            <h3 class=\"col-xs-12\">Pubmed Title</h3>\n            <p class=\"col-xs-12\">${pubmed.title}</p>\n            <h3 class=\"col-xs-12\">Abstract</h3>\n            <p class=\"col-xs-12\">${pubmed.abstractText}</p>\n        </section>\n      </div>\n    </div>\n</template>\n"; });
define('text!components/search-export.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"btn-group\">\n        <a href=\"${exportUrl}\" type=\"button\" class=\"btn btn-default btn-search-export\" download>${ dataType ? \"Export \" + dataType.name : \"Select Export Data Type\" }</a>\n        <button type=\"button\" class=\"btn btn-default btn-search-export  dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <span class=\"caret\"></span>\n            <span class=\"sr-only\">Toggle Dropdown</span>\n        </button>\n        <ul class=\"dropdown-menu\" dataType.bind=\"type.id\">\n            <li repeat.for=\"type of dataTypes\" click.trigger=\"setDataType(type)\">${type.name}</li>\n        </ul>\n    </div>\n</template>\n<!-- Pre-styled Export button - styling components can be reused. -->\n<!-- <a type=\"button\" class=\"table-item2 btn btn-export btn-edit\" href=\"#\" onClick=\"return confirm('Not implemented yet.')\">Export <i class=\"fa fa-download fa-lg\"></i></a> -->\n"; });
define('text!pages/about.html', ['module'], function(module) { module.exports = "<require from=\"../styles.css\"></require>\n\n<template>\n    <div class=\"container about-html ds-html\">\n        <div class=\"row ds-pgRow\">\n            <h1>About</h1>\n            <h4 class=\"margintop30\">The BEL Manager application was built by:</h4>\n            <ul class=\"li-nobullets\" repeat.for=\"builder of builders\">\n              <li>\n                <gravatar id=\"some-gravatar-element\" class=\"avatar-frame\"\n                             credential.bind=\"builder.email\" size=\"50\"\n                             default-image=\"wavatar\" is-secure=\"true\" rating=\"g\" >\n                </gravatar>\n                ${builder.name}\n              </li>\n            </ul>\n\n            <h4 class=\"margintop10\">with design and development support from:</h4>\n          <ul class=\"li-nobullets\" repeat.for=\"consultant of consultants\">\n            <li>\n              <gravatar id=\"some-gravatar-element\" class=\"avatar-frame\"\n                        credential.bind=\"consultant.email\" size=\"50\"\n                        default-image=\"wavatar\" is-secure=\"true\" rating=\"g\" >\n              </gravatar>\n              ${consultant.name} (${consultant.org})\n            </li>\n          </ul>\n\n            <h4 class=\"margintop30\">...and lots of pointed comments from our users <i class=\"fa fa-smile-o\"></i></h4>\n            <p class=\"margintop10\">The application is built using Aurelia as a SPA front-end (Single Page Application) with a REST API backend supported by the OpenBEL Platform (https://github.com/OpenBEL/openbel-server)</p>\n        </div>\n    </div>\n</template>\n"; });
define('text!pages/apilist.html', ['module'], function(module) { module.exports = "<require from=\"../styles.css\"></require>\n\n<template>\n    <div class=\"container api-html\">\n        <div class=\"row margintop30 marginbtm10\">\n            <h2>Select your API Endpoint</h2>\n        </div>\n        <div class=\"\">\n            <p>Select the OpenBEL API endpoint you want to use with the BEL Manager</p>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-xs-12 col-md-5\">\n                <input type=\"text\" value.bind=\"userEnteredURL\" class=\"form-control fc-normal\" placeholder=\"Enter OpenBEL API Url\" />\n            </div>\n            <div class=\"col-xs-12 col-md-5\">\n                <input type=\"text\" value.bind=\"userEnteredAPIName\" class=\"form-control fc-normal\" placeholder=\"Enter OpenBEL API Endpoint name\" />\n            </div>\n            <div class=\"col-xs-4 col-xs-offset-8 col-sm-3 col-sm-offset-9 col-md-2 col-md-offset-0\">\n                <button type=\"button\" class=\"btn btn-edit btn-progress form-control\" click.trigger=\"addUserAPI()\">Add</button>\n            </div>\n        </div>\n        <div class=\"row margintop20\" if.bind=\"userAPIs\">\n            <h3>User entered OpenBEL API endpoints</h3>\n        </div>\n        <div class=\"row api-api-item\" repeat.for=\"apiobj of userAPIs\">\n            <div class=\"col-xs-10\">\n                <input id=\"user-${apiobj.api}\"\n                       name=\"field\"\n                       class=\"col-xs-1\"\n                       type=\"radio\"\n                       model.bind=\"apiobj\"\n                       checked.bind=\"$parent.selectedAPI\"\n                       change.delegate=\"changedAPI(apiobj)\"\n                       aria-hidden=\"true\">\n                <label for=\"user-${apiobj.api}\" class=\"col-xs-12 \">\n                    <span><span></span></span>\n                    <div class=\"col-xs-5 api-api-listitem\">${apiobj.api}</div>\n                    <div class=\"col-xs-5 api-api-listitem\"> ${apiobj.name}</div>\n                </label>\n            </div>\n            <a class=\"col-xs-2 table-delete\" href=\"#\" click.trigger=\"removeUserAPI($index)\">\n                <i class=\"fa fa-trash-o fa-lg\"></i>\n            </a>\n        </div>\n        <div class=\"row margintop20\">\n            <h3>BELMgr default OpenBEL API endpoints</h3>\n        </div>\n        <div class=\"row api-api-item\" repeat.for=\"apiobj of presetAPIs\">\n            <div class=\"col-xs-12\">\n                <input id=\"preset-${apiobj.api}\"\n                       name=\"field\"\n                       class=\"col-xs-1\"\n                       type=\"radio\"\n                       model.bind=\"apiobj\"\n                       checked.bind=\"$parent.selectedAPI\"\n                       change.delegate=\"changedAPI(apiobj)\"\n                       aria-hidden=\"true\">\n                <label for=\"preset-${apiobj.api}\" class=\"col-xs-10\">\n                    <span><span></span></span>\n                    <div class=\"col-xs-7 api-api-listitem\">${apiobj.api}</div>\n                    <div class=\"col-xs-4 api-api-listitem\"> ${apiobj.name}</div>\n                </label>\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('text!pages/edit.html', ['module'], function(module) { module.exports = "<require from=\"../styles.css\"></require>\n\n<template>\n  <bel-nanopub nanopub-id.bind=\"nanopubId\"></bel-nanopub>\n</template>\n"; });
define('text!pages/help.html', ['module'], function(module) { module.exports = "<require from=\"../styles.css\"></require>\n\n<template>\n    <div class=\"container ds-html\">\n        <div class=\"row ds-pgRow\">\n            <h1>Help</h1>\n            <ul>\n              <li><a target=\"_blank\" href=\"/help/BEL-Manager-User-Guide.html\">User Guide</a></li>\n              <li><a target=\"_blank\" href=\"/help/BEL-Manager-User-Guide.pdf\">User Guide (pdf)</a></li>\n            </ul>\n        </div>\n    </div>\n</template>\n"; });
define('text!pages/import.html', ['module'], function(module) { module.exports = "<require from=\"../styles.css\"></require>\n\n<template>\n    <div class=\"container ds-html\">\n        <div class=\"row ds-pgRow\">\n            <div class=\"col-xs-12\">\n                <h1>Import/Export BEL Datasets</h1>\n                <!--  <div class=\"col-xs-12\">\n                    <p class=\"\">This page is for importing and exporting BEL Scripts and XBEL files.</p>\n                </div> -->\n            </div>\n        </div>\n        <div class=\"ds-filediv col-xs-12 col-sm-10 col-md-8\">\n            <h3 class=\"col-xs-12 col-sm-5\">Import Files</h3>\n\n            <div class=\"ds-fileUploadDiv col-xs-12 col-sm-7\">\n\n                <div class=\"ds-importdiv col-xs-7 col-sm-12 col-md-8\">\n                        <input type=\"file\" name=\"file\" id=\"file\" class=\"inputfile\" files.bind=\"belFiles\" change.trigger=\"belFilesChanged()\" >\n                        <!-- alt. import labels/btns -->\n                        <label class=\"form-control btn-import ${uploadFn} ${uploadFn ? 'noShow' : ' '}\" for=\"file\"><i class=\"fa fa-upload\"></i> Select Files</label>\n                        <label class=\"form-control btn-import ${uploadFn} ${uploadFn ? ' ' : 'noShow'}\" for=\"file\"><i class=\"fa fa-upload\"></i> ${uploadFn}</label>\n                        <!-- end alt. import labels/btns -->\n                        <p>Filetypes: BEL Script and XBEL</p>\n                </div>\n                <div class=\"ds-uploaddiv col-xs-5 col-sm-12 col-md-4\">\n                    <button type=\"button\" class=\"form-control btn-upload ${uploadFn} ${uploadFn ? ' ' : 'noShow'}\" name=\"submit\" mousedown.trigger=\"upload()\">Upload\n                        <span show.bind=\"loading\">\n                            <i class=\"fa fa-refresh fa-spin\"></i>\n                        </span>\n                    </button>\n\n                </div>\n\n            </div>\n\n        </div>\n        <table class=\"ds-table col-xs-12\">\n            <tbody>\n                <thead>\n                    <tr>\n                        <h3 class=\"ds-exportTitle col-xs-12\">Export Files</h3>\n                    </tr>\n                </thead>\n                <tr repeat.for=\"dataset of datasets\">\n\n                    <td class=\"ds-td col-xs-12\">\n                        <div class=\"ds-aDiv col-xs-8 col-sm-9\">\n                            <a href=\"${dataset._links.nanopub_collection.href}\">\n                                <span class=\"ds-title\">${dataset.dataset.title} </span>\n                            </a>\n                           <!-- HOW TO INDEX FOR MODAL -->\n                              <!-- <li>${datasets.indexOf(dataset)}</li> -->\n\n                            <p class=\"ds-dsDetail\">${dataset.dataset.description}</p>\n                        </div>\n                        <div class=\"col-xs-3 col-sm-2\">\n                              <a href=\"${dataset._links.nanopub_collection.href}?format=bel_script${tokenParam}\" class=\"btn form-control btn-dlFiles\" role=\"button\" title=\"Download BEL Script formatted file\"><i class=\"ds-downloadIcon fa fa-download\"></i><span class=\"ds-btnText\"> BEL</span></a>\n\n<!--                               <a href=\"${dataset._links.nanopub_collection.href}?format=json_nanopub${tokenParam}\" class=\"btn form-control btn-dlFiles\" role=\"button\" title=\"Download JSON BEL formatted file\"><i class=\"ds-downloadIcon fa fa-download\"></i><span class=\"ds-btnText\"> JSON</span></a> -->\n\n                              <a href=\"${dataset._links.nanopub_collection.href}?format=xbel${tokenParam}\" class=\"btn form-control btn-dlFiles\" role=\"button\" title=\"Download XBEL formatted file\">\n                                <i class=\"ds-downloadIcon fa fa-download\"></i><span class=\"ds-btnText\"> XBEL</span></a>\n                        </div>\n\n                        <div class=\"col-xs-1\">\n                            <a class=\"ds-delete\"> <i class=\"fa fa-trash-o fa-lg\" id=\"\" click.trigger=\"deleteConfiramtion()\"></i></a>\n                            <!-- ${datasets.indexOf(dataset)} -->\n                        </div>\n                         <!-- DELETION MODAL SNIPPIT -->\n\n                        <div class=\"modal fade\" id=\"deleter\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n                            <div class=\"modal-dialog\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header\">\n                                        <button type=\"button\" class=\"close\" aria-hidden=\"true\" click.trigger=\"closeDeleter()\">×</button>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        <p>Are you sure you'd like to delete <strong>${dataset.dataset.title}?</strong></p>\n                                        <button class=\"deleter-btn deleter-confirm-btn\" href=\"#\" click.trigger=\"delete(dataset._links.self.href, $index)\" type=\"button\">Yes, delete</button>\n                                        <button type=\"button\" class=\"deleter-btn deleter-close-btn\" aria-hidden=\"true\" click.trigger=\"closeDeleter()\">Do not delete</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n\n    <!-- END MODAL SNIPPIT -->\n    <!-- DELETION MODAL JS  -->\n\n    <!-- END DELETION MODAL JS  -->\n\n\n</template>\n"; });
define('text!pages/search.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../styles.css\"></require>\n  <require from=\"valueConverters/keys-to-list\"></require>\n  <require from=\"valueConverters/sort-array\"></require>\n  <require from='../components/search-export'></require>\n\n\n\n<i show.bind=\"searching\" class=\"search-spinner fa fa-circle-o-notch fa-spin\" aria-hidden=\"true\"></i>\n<div show.bind=\"searching\" class=\"search-background-overlay\"></div>\n\n\n  <div class=\"container margintop80 search-html\">\n    <div class=\"row\">\n      <div id=\"dportalsearchbar\" class=\"col-xs-3 paddingNone\">\n        <form role=\"form\" submit.delegate=\"search()\">\n          <div class=\"form-group\">\n            <div class=\"input-group search-searchBar\">\n              <input type=\"text\" onblur.delegate=\"search()\" value.bind=\"searchTerms\" class=\"search-searchForm form-control fc-normal\" id=\"searchToken\" placeholder=\"search\">\n                <span class=\"input-group-btn btn-bel highlight\">\n                  <button type=\"submit\" class=\"btn btn-search btn-searchfind\">\n                    <i class=\"fa fa-search\"></i>\n                  </button>\n                </span>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <template if.bind=\"facetSets\">\n        <div class=\"search-filterFacets col-xs-3 heightct${searchResultsRange}\">\n          <div class=\"search-filtercol\" id=\"filtercolumn\" if.bind=\"nanopubs\">\n            <!-- Loop through facet sets -->\n            <div class=\"col-xs-12 filterbox\"  repeat.for=\"facetSet of facetSets | keys | sort\">\n              <h4 class=\"filter-facetTitle\">${facetSet}</h4>\n              <div class=\"filter-boxcontent\">\n                <!-- Loop through facet set values -->\n                <div class=\"row filter-facetRow\" repeat.for=\"facet of facetSets[facetSet]\">\n                  <input id=\"option\" type=\"checkbox\" name=\"field\" value=\"facet\" value.bind=\"facet.filter\" checked.bind=\"selectedFacets[facet.filter]\" change.delegate=\"search(0)\" class=\"col-xs-1\">\n\n                  <label for=\"option\" class=\"filter-boxlabel\"><span><span></span></span> ${facet.name} (${facet.count})</label>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </template>\n\n      <div class=\"col-xs-9 paddingNone\" id=\"resultscolumn\">\n        <template if.bind=\"nanopubs\">\n          <table class=\"table table-hover\">\n            <tr>\n              <th class=\"table-range tableTopSpacer\">\n                <div class=\"col-xs-4 col-sm-6 paddingNone table-item1\">\n                  <div class=\"table-displayFlex\">\n\n                    <h5 class=\"table-display1 table-showing\">Showing </h5>\n                    <select class=\"table-display2 table-pgcountddown paddingNone form-control fc-normal selectDrop\" id=\"search_size\" value.bind=\"searchSize\" change.delegate=\"saveSearchSize()\">\n                        <option value=\"10\" > 10</option>\n                        <option value=\"20\" > 20</option>\n                        <option value=\"50\" > 50</option>\n                        <option value=\"100\">100</option>\n                        <option value=\"${search_metadata.total_filtered}\">All</option>\n                    </select>\n                    <h5 id=\"search-result-cnt\" class=\"table-display3 table-totalResults\">   of ${search_metadata.total_filtered} results</h5>\n\n                  </div>\n                </div>\n\n                <search-export search-url.bind=\"searchUrl\" ></search-export>\n\n                <nav class=\"table-item3 paddingNone\">\n                    <ul class=\"paddingNone pager pager-top\">\n                      <li class=\"col-xs-1 paddingNone previous ${pagerPrevious}\">\n                        <a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(-1)\">\n                          <span aria-hidden=\"true\">\n                            <i class=\"fa fa-angle-left fa-2x\"></i>\n                          </span>\n                        </a>\n                      </li>\n\n                      <p class=\"search-pageCount col-xs-10 paddingNone \">${searchResultsRange}</p>\n                      <li class=\"col-xs-1 paddingNone next ${pagerNext}\">\n                        <a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(1)\">\n                          <i class=\"fa fa-angle-right fa-2x\"></i>\n                        </a>\n                      </li>\n                    </ul>\n                  </nav>\n                <!--<nav class=\"table-item3 paddingNone\">\n                  <ul class=\"paddingNone pager pager-top\">\n                    <li class=\"col-xs-1 paddingNone previous ${pagerPrevious}\"><a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(-1)\"><span aria-hidden=\"true\"><i class=\"fa fa-angle-left fa-2x\"></i></a></li>\n                    <p class=\"search-pageCount col-xs-10 paddingNone \">${searchResultsRange}</p>\n                    <li class=\"col-xs-1 paddingNone next ${pagerNext}\"><a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(1)\"><i class=\"fa fa-angle-right fa-2x\"></i></a></li>\n                  </ul>\n                </nav> -->\n\n              </th>\n            </tr>\n\n\n            <tbody>\n              <tr class=\"table-tr\" repeat.for=\"item of nanopubs\">\n                <td class=\"table-td\">\n                  <div class=\"col-xs-2 col-sm-1 table-speciesHolder\">\n                    <div class=\"table-speciesIcon ${$parent.getSpeciesIcon(item)}\"></div>\n                  </div>\n                  <div class=\"col-xs-9 col-sm-10\">\n                    <a route-href=\"route: edit; params.bind: { id: api.getNanopubId(item._links.self.href) }\" target=\"editbel\" a href=\"#\" data-toggle=\"tooltip\" title=\"${item.nanopub.summary_text}\">${item.nanopub.bel_statement ? item.nanopub.bel_statement : 'Missing BEL Statement'}\n                    </a>\n                    <div class=\"table-expContextDiv\">\n                      <p class=\"table-expContext value\" repeat.for=\"value of $parent.getExperimentContextItems(item.nanopub)\">${value}</p>\n                    </div>\n                  </div>\n                  <a class=\"col-xs-1 table-delete\" data-toggle=\"modal\" data-target=\"#deleter\"> <i class=\"fa fa-trash-o fa-lg\"></i></a>\n\n                  <!-- deletion js call: click.delegate=\"deleteNanopub(item._links.self.href, $index)\" -->\n\n                  <!-- modal for delete -->\n                  <div class=\"modal fade\" id=\"deleter\" tabindex=\"-1\" role=\"dialog\">\n                    <div class=\"modal-dialog\">\n                      <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                          <h4 class=\"modal-title\">Delete Endpoint?</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                          <p>Are you sure you would like to delete this endpoint?</p>\n                        </div>\n                        <div class=\"modal-footer\">\n                          <div class=\"delete-endpt-btn col-xs-6 col-sm-4 col-sm-offset-4\">\n                            <button type=\"button\" click.delegate=\"deleteNanopub(item._links.self.href, $index)\" class=\"btn form-control btn-saveUpdates\" data-dismiss=\"modal\">Confirm Deletion</button>\n                          </div>\n                          <div class=\"delete-endpt-btn col-xs-6 col-sm-4 \">\n                            <button type=\"button\" class=\"btn form-control btn-reset\" data-dismiss=\"modal\">Cancel</button>\n                          </div>\n                        </div>\n                      </div><!-- /.modal-content -->\n                    </div><!-- /.modal-dialog -->\n                  </div><!-- /.modal -->\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </template>\n\n\n        <template if.bind=\"! nanopubs\">\n          <h2 class=\"col-xs-offset-1\">No search results</h2>\n        </template>\n\n        <div class=\"marginrt10\" if.bind=\"nanopubs\">\n\n            <nav class=\"search-bottomPager\">\n              <ul class=\"col-xs-12 paddingNone pager pager-top\">\n                <li class=\"col-xs-2 paddingNone previous ${pagerPrevious}\"><a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(-1)\"><span aria-hidden=\"true\"><i class=\"fa fa-angle-left fa-2x\"></i></a></li>\n                <p class=\"search-pageCount col-xs-8 paddingNone \">${searchResultsRange}</p>\n                <li class=\"col-xs-2 paddingNone next ${pagerNext}\"><a href=\"#\" class=\"pagerArrow paddingNone\" click.delegate=\"pageSearchResults(1)\"><i class=\"fa fa-angle-right fa-2x\"></i></a></li>\n              </ul>\n            </nav>\n        </div>\n    </div>\n  </div>\n\n\n</template>\n"; });
define('text!pages/welcome.html', ['module'], function(module) { module.exports = "<template class=\"welcome-html\">\n    <require from=\"../styles.css\"></require>\n\n    <div class=\"container au-animate\">\n        <div class=\"row\">\n            <div class=\"col-xs-12 conversational margintop60\">\n                <h2>Welcome to the BEL Manager Demo Site.</h2>\n            </div>\n            <div class=\"col-xs-12 margintop20\">\n                <div class=\"col-xs-7 testing-msg\">\n                    <h4 class=\"col-xs-12\"><em>Note: This is a demo site. You can deploy your own production BELMgr or wait for our public server, which is planned for release in May 2016.</em></h4>\n                    <h5>- The Bel Manager Development Team</h5>\n                </div>\n                <div class=\"col-xs-4 col-xs-offset-1\">\n                    <h2 class=\"conversational\">Resources:</h2>\n                    <ul>\n                        <li><a target=\"_blank\" href=\"/help/BEL-Manager-User-Guide.html\">User Guide</a></li>\n                        <li><a target=\"_blank\" href=\"/help/BEL-Manager-User-Guide.pdf\">User Guide (pdf)</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"col-xs-10 col-xs-offset-1 margintop30\">\n                <ul>\n                    <li>Use the BEL Nanopub repository to search for BEL Nanopubs</li>\n                    <li>Create or edit BEL Nanopubs using the BEL Manager</li>\n                    <li class=\"\">What is a BEL Nanopub?\n                        <ul>\n                            <li>It is the BEL Statement, Citation information, Summary Text and Metadata associated with a BEL Statement\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"\">How can I edit a BEL Statement?\n                        <ul>\n                            <li>By searching for it in the search page and then selecting it to open up the Compose page</li>\n                        </ul>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class=\"welcome-about margintop40\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <h1 class=\"col-xs-12 conversational\">About the Project</h1>\n\n                <div class=\"col-xs-12\">\n                    <p class=\"margintop10\">The application is built using Aurelia as a SPA front-end (Single Page Application) with a REST API backend supported by the OpenBEL Platform (https://github.com/OpenBEL/openbel-server)</p>\n                </div>\n                <div class=\"col-xs-6\">\n                    <h4 class=\"\">built by:</h4>\n                    <ul class=\"li-nobullets\" repeat.for=\"builder of builders\">\n                        <li>\n                            <gravatar id=\"some-gravatar-element\" class=\"avatar-frame\" credential.bind=\"builder.email\" size=\"50\" default-image=\"wavatar\" is-secure=\"true\" rating=\"g\">\n                            </gravatar>\n                            ${builder.name}\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"col-xs-6\">\n                    <h4 class=\"margintop10\">and:</h4>\n                    <ul class=\"li-nobullets\" repeat.for=\"consultant of consultants\">\n                        <li>\n                            <gravatar id=\"some-gravatar-element\" class=\"avatar-frame\" credential.bind=\"consultant.email\" size=\"50\" default-image=\"wavatar\" is-secure=\"true\" rating=\"g\">\n                            </gravatar>\n                            ${consultant.name} (${consultant.org})\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"col-xs-offset-1 col-xs-10\">\n                    <h4 class=\"margintop30 conversational\"><em>...and a special thanks to our users and their feedback. </em><i class=\"fa fa-smile-o\"></i></h4>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map
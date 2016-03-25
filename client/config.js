System.config({
  defaultJSExtensions: true,
  transpiler: "–latest",
  babelOptions: {
    "stage": 2,
    "optional": [
      "es7.decorators",
      "es7.classProperties",
      "es7.asyncFunctions",
      "runtime"
    ]
  },
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "resources/*": "dist/resources/*",
    "local-plugin/*": "dist/plugin/*",
    "value-converters/*": "dist/value-converters/*"
  },
  bundles: {
    "app-build-338cf7f225.js": [
      "UserState.js",
      "app.html!github:systemjs/plugin-text@0.0.3.js",
      "app.js",
      "github:CodeSeven/toastr@2.1.2.js",
      "github:CodeSeven/toastr@2.1.2/build/toastr.css!github:systemjs/plugin-css@0.1.20.js",
      "github:CodeSeven/toastr@2.1.2/toastr.js",
      "github:blueimp/JavaScript-MD5@1.1.1.js",
      "github:blueimp/JavaScript-MD5@1.1.1/js/md5.js",
      "github:components/jquery@2.2.1.js",
      "github:components/jquery@2.2.1/jquery.js",
      "github:twbs/bootstrap@3.3.6.js",
      "github:twbs/bootstrap@3.3.6/css/bootstrap.css!github:systemjs/plugin-text@0.0.3.js",
      "github:twbs/bootstrap@3.3.6/js/bootstrap.js",
      "github:wshayes/aurelia-gravatar@0.1.0.js",
      "github:wshayes/aurelia-gravatar@0.1.0/generator/gravatar-url-generator.js",
      "github:wshayes/aurelia-gravatar@0.1.0/helpers/type-helper.js",
      "github:wshayes/aurelia-gravatar@0.1.0/index.js",
      "main.js",
      "npm:font-awesome@4.5.0.js",
      "npm:font-awesome@4.5.0/css/font-awesome.css!github:systemjs/plugin-css@0.1.20.js"
    ],
    "aurelia-104a7535fc.js": [
      "github:github/fetch@0.10.1.js",
      "github:github/fetch@0.10.1/fetch.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.0.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.0/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.0.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.0/aurelia-framework.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0.js",
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser.js",
      "npm:aurelia-history@1.0.0-beta.1.2.0.js",
      "npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0.js",
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.0.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.0/aurelia-polyfills.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0.js",
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer.js",
      "npm:aurelia-router@1.0.0-beta.1.2.0.js",
      "npm:aurelia-router@1.0.0-beta.1.2.0/aurelia-router.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.0/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compile-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compose.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/focus.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/hide.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/if.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/show.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/view-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/with.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader.js",
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.0.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.0/aurelia-templating.js"
    ],
    "app-build-aff8f63488.js": [
      "UserState.js",
      "app.html!github:systemjs/plugin-text@0.0.7.js",
      "app.js",
      "github:CodeSeven/toastr@2.1.2.js",
      "github:CodeSeven/toastr@2.1.2/build/toastr.css!github:systemjs/plugin-css@0.1.20.js",
      "github:CodeSeven/toastr@2.1.2/toastr.js",
      "github:blueimp/JavaScript-MD5@1.1.1.js",
      "github:blueimp/JavaScript-MD5@1.1.1/js/md5.js",
      "github:components/jquery@2.2.1.js",
      "github:components/jquery@2.2.1/jquery.js",
      "github:twbs/bootstrap@3.3.6.js",
      "github:twbs/bootstrap@3.3.6/css/bootstrap.css!github:systemjs/plugin-text@0.0.7.js",
      "github:twbs/bootstrap@3.3.6/js/bootstrap.js",
      "github:wshayes/aurelia-gravatar@0.1.0.js",
      "github:wshayes/aurelia-gravatar@0.1.0/generator/gravatar-url-generator.js",
      "github:wshayes/aurelia-gravatar@0.1.0/helpers/type-helper.js",
      "github:wshayes/aurelia-gravatar@0.1.0/index.js",
      "main.js",
      "npm:font-awesome@4.5.0.js",
      "npm:font-awesome@4.5.0/css/font-awesome.css!github:systemjs/plugin-css@0.1.20.js"
    ]
  },
  depCache: {
    "github:components/jquery@2.2.1.js": [
      "github:components/jquery@2.2.1/jquery"
    ],
    "npm:font-awesome@4.5.0.js": [
      "npm:font-awesome@4.5.0/css/font-awesome.css!"
    ],
    "github:twbs/bootstrap@3.3.6.js": [
      "github:twbs/bootstrap@3.3.6/js/bootstrap"
    ],
    "github:twbs/bootstrap@3.3.6/js/bootstrap.js": [
      "jquery"
    ],
    "github:wshayes/aurelia-gravatar@0.1.0.js": [
      "github:wshayes/aurelia-gravatar@0.1.0/index"
    ],
    "github:wshayes/aurelia-gravatar@0.1.0/index.js": [
      "./generator/gravatar-url-generator"
    ],
    "github:wshayes/aurelia-gravatar@0.1.0/generator/gravatar-url-generator.js": [
      "../helpers/type-helper",
      "md5"
    ],
    "github:blueimp/JavaScript-MD5@1.1.1.js": [
      "github:blueimp/JavaScript-MD5@1.1.1/js/md5"
    ],
    "github:CodeSeven/toastr@2.1.2.js": [
      "github:CodeSeven/toastr@2.1.2/toastr"
    ],
    "github:CodeSeven/toastr@2.1.2/toastr.js": [
      "jquery",
      "./build/toastr.css!"
    ],
    "app.js": [
      "babel-runtime/helpers/create-class",
      "babel-runtime/helpers/class-call-check",
      "aurelia-framework",
      "local-plugin/resources/openbelapi-service",
      "./UserState",
      "aurelia-router"
    ],
    "main.js": [
      "aurelia-framework",
      "local-plugin/AppConfig"
    ],
    "UserState.js": [
      "babel-runtime/helpers/class-call-check",
      "aurelia-framework"
    ],
    "github:github/fetch@0.10.1.js": [
      "github:github/fetch@0.10.1/fetch"
    ],
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator"
    ],
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator.js": [
      "aurelia-logging"
    ],
    "npm:aurelia-logging@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging"
    ],
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console"
    ],
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0/aurelia-logging-console.js": [
      "aurelia-pal",
      "aurelia-logging"
    ],
    "npm:aurelia-pal@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-pal@1.0.0-beta.1.2.0/aurelia-pal"
    ],
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser"
    ],
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0/aurelia-history-browser.js": [
      "aurelia-pal",
      "aurelia-history"
    ],
    "npm:aurelia-history@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-history@1.0.0-beta.1.2.0/aurelia-history"
    ],
    "npm:aurelia-loader-default@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0/aurelia-loader-default"
    ],
    "npm:aurelia-loader-default@1.0.0-beta.1.2.0/aurelia-loader-default.js": [
      "aurelia-loader",
      "aurelia-pal",
      "aurelia-metadata"
    ],
    "npm:aurelia-loader@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader"
    ],
    "npm:aurelia-metadata@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata"
    ],
    "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader.js": [
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-path@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-path@1.0.0-beta.1.2.0/aurelia-path"
    ],
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router"
    ],
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0/aurelia-templating-router.js": [
      "aurelia-router",
      "./route-loader",
      "./router-view",
      "./route-href"
    ],
    "npm:aurelia-router@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-router@1.0.0-beta.1.2.0/aurelia-router"
    ],
    "npm:aurelia-router@1.0.0-beta.1.2.0/aurelia-router.js": [
      "aurelia-logging",
      "aurelia-route-recognizer",
      "aurelia-dependency-injection",
      "aurelia-history",
      "aurelia-event-aggregator"
    ],
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer"
    ],
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0/aurelia-dependency-injection"
    ],
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0/aurelia-route-recognizer.js": [
      "aurelia-path"
    ],
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0/aurelia-dependency-injection.js": [
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-loader.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-path",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0/router-view.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-router",
      "aurelia-metadata",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0/route-href.js": [
      "aurelia-templating",
      "aurelia-dependency-injection",
      "aurelia-router",
      "aurelia-pal",
      "aurelia-logging"
    ],
    "npm:aurelia-templating@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-templating@1.0.0-beta.1.2.0/aurelia-templating"
    ],
    "npm:aurelia-templating@1.0.0-beta.1.2.0/aurelia-templating.js": [
      "aurelia-logging",
      "aurelia-pal",
      "aurelia-metadata",
      "aurelia-path",
      "aurelia-loader",
      "aurelia-binding",
      "aurelia-dependency-injection",
      "aurelia-task-queue"
    ],
    "npm:aurelia-binding@1.0.0-beta.1.3.0.js": [
      "npm:aurelia-binding@1.0.0-beta.1.3.0/aurelia-binding"
    ],
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue"
    ],
    "npm:aurelia-binding@1.0.0-beta.1.3.0/aurelia-binding.js": [
      "aurelia-pal",
      "aurelia-task-queue",
      "aurelia-metadata"
    ],
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/aurelia-templating-resources"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/aurelia-templating-resources.js": [
      "./compose",
      "./if",
      "./with",
      "./repeat",
      "./show",
      "./hide",
      "./sanitize-html",
      "./replaceable",
      "./focus",
      "./compile-spy",
      "./view-spy",
      "aurelia-templating",
      "./dynamic-element",
      "./css-resource",
      "aurelia-pal",
      "./html-sanitizer",
      "./binding-mode-behaviors",
      "./throttle-binding-behavior",
      "./debounce-binding-behavior",
      "./signal-binding-behavior",
      "./binding-signaler",
      "./update-trigger-binding-behavior",
      "./abstract-repeater"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/signal-binding-behavior.js": [
      "./binding-signaler"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compose.js": [
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/if.js": [
      "aurelia-templating",
      "aurelia-dependency-injection"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/with.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-templating",
      "./repeat-strategy-locator",
      "./repeat-utilities",
      "./analyze-view-factory",
      "./abstract-repeater"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/hide.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/sanitize-html.js": [
      "aurelia-binding",
      "aurelia-dependency-injection",
      "./html-sanitizer"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/show.js": [
      "aurelia-dependency-injection",
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/replaceable.js": [
      "aurelia-dependency-injection",
      "aurelia-templating"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/focus.js": [
      "aurelia-templating",
      "aurelia-binding",
      "aurelia-dependency-injection",
      "aurelia-task-queue",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/dynamic-element.js": [
      "aurelia-templating"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/css-resource.js": [
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-dependency-injection",
      "aurelia-path",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/view-spy.js": [
      "aurelia-templating",
      "aurelia-logging"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/compile-spy.js": [
      "aurelia-templating",
      "aurelia-dependency-injection",
      "aurelia-logging",
      "aurelia-pal"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/throttle-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-mode-behaviors.js": [
      "aurelia-binding",
      "aurelia-metadata"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/debounce-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/update-trigger-binding-behavior.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/binding-signaler.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-strategy-locator.js": [
      "./null-repeat-strategy",
      "./array-repeat-strategy",
      "./map-repeat-strategy",
      "./set-repeat-strategy",
      "./number-repeat-strategy"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/repeat-utilities.js": [
      "aurelia-binding"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/map-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/set-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/number-repeat-strategy.js": [
      "./repeat-utilities"
    ],
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0/array-repeat-strategy.js": [
      "./repeat-utilities",
      "aurelia-binding"
    ],
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.0/aurelia-templating-binding"
    ],
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.0/aurelia-templating-binding.js": [
      "aurelia-logging",
      "aurelia-binding",
      "aurelia-templating"
    ],
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0/aurelia-animator-css"
    ],
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0/aurelia-animator-css.js": [
      "aurelia-templating",
      "aurelia-pal"
    ],
    "npm:aurelia-fetch-client@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0/aurelia-fetch-client"
    ],
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper"
    ],
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper.js": [
      "aurelia-pal",
      "aurelia-pal-browser",
      "aurelia-polyfills"
    ],
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser"
    ],
    "npm:aurelia-polyfills@1.0.0-beta.1.1.0.js": [
      "npm:aurelia-polyfills@1.0.0-beta.1.1.0/aurelia-polyfills"
    ],
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-polyfills@1.0.0-beta.1.1.0/aurelia-polyfills.js": [
      "aurelia-pal"
    ],
    "npm:aurelia-framework@1.0.0-beta.1.2.0.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.0/aurelia-framework"
    ],
    "npm:aurelia-framework@1.0.0-beta.1.2.0/aurelia-framework.js": [
      "aurelia-dependency-injection",
      "aurelia-binding",
      "aurelia-metadata",
      "aurelia-templating",
      "aurelia-loader",
      "aurelia-task-queue",
      "aurelia-path",
      "aurelia-pal",
      "aurelia-logging"
    ]
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.2.0",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.2.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.0",
    "aurelia-gravatar": "github:wshayes/aurelia-gravatar@0.1.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
    "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.0",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.0",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "clean-css": "npm:clean-css@3.4.10",
    "core-js": "npm:core-js@1.2.6",
    "fetch": "github:github/fetch@0.10.1",
    "font-awesome": "npm:font-awesome@4.5.0",
    "jquery": "github:components/jquery@2.2.1",
    "text": "github:systemjs/plugin-text@0.0.7",
    "toastr": "github:CodeSeven/toastr@2.1.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.92",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.92",
    "–latest": "npm:babel-core@5.8.38",
    "–latest-runtime": "npm:babel-runtime@5.8.38",
    "github:CodeSeven/toastr@2.1.2": {
      "css": "github:systemjs/plugin-css@0.1.20",
      "jquery": "github:components/jquery@2.2.1"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "github:wshayes/aurelia-gravatar@0.1.0": {
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.0",
      "md5": "github:blueimp/JavaScript-MD5@1.1.1"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-binding@1.0.0-beta.1.3.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.0",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.0",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.0",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.10": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
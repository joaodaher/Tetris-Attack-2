require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _typeof2 = __webpack_require__(1);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _toConsumableArray2 = __webpack_require__(3);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _extends2 = __webpack_require__(4);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _set = __webpack_require__(5);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/server.js'; /**
                                                                                              * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                              *
                                                                                              * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                              *
                                                                                              * This source code is licensed under the MIT license found in the
                                                                                              * LICENSE.txt file in the root directory of this source tree.
                                                                                              */
  
  // eslint-disable-line import/no-unresolved
  
  __webpack_require__(7);
  
  var _path = __webpack_require__(8);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(9);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(10);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(11);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(12);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(13);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(14);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(16);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(17);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(18);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _App = __webpack_require__(19);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Html = __webpack_require__(25);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(27);
  
  var _ErrorPage2 = __webpack_require__(29);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _passport = __webpack_require__(36);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _models = __webpack_require__(39);
  
  var _models2 = _interopRequireDefault(_models);
  
  var _schema = __webpack_require__(46);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(61);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(79);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  app.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var _ret;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, context, route, data, html;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = new _set2.default();
  
                        // Global (context) variables that can be easily accessed from any React component
                        // https://facebook.github.io/react/docs/context.html
  
                        context = {
                          // Enables critical path CSS rendering
                          // https://github.com/kriasoft/isomorphic-style-loader
                          insertCss: function insertCss() {
                            for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                              styles[_key] = arguments[_key];
                            }
  
                            // eslint-disable-next-line no-underscore-dangle
                            styles.forEach(function (style) {
                              return css.add(style._getCss());
                            });
                          }
                        };
                        _context.next = 4;
                        return _universalRouter2.default.resolve(_routes2.default, {
                          path: req.path,
                          query: req.query
                        });
  
                      case 4:
                        route = _context.sent;
  
                        if (!route.redirect) {
                          _context.next = 8;
                          break;
                        }
  
                        res.redirect(route.status || 302, route.redirect);
                        return _context.abrupt('return', {
                          v: void 0
                        });
  
                      case 8:
                        data = (0, _extends3.default)({}, route);
  
                        data.children = _server2.default.renderToString(_react2.default.createElement(
                          _App2.default,
                          { context: context, __source: {
                              fileName: _jsxFileName,
                              lineNumber: 112
                            },
                            __self: undefined
                          },
                          route.component
                        ));
                        data.style = [].concat((0, _toConsumableArray3.default)(css)).join('');
                        data.script = _assets2.default.main.js;
                        data.chunk = _assets2.default[route.chunk] && _assets2.default[route.chunk].js;
                        html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, (0, _extends3.default)({}, data, {
                          __source: {
                            fileName: _jsxFileName,
                            lineNumber: 116
                          },
                          __self: undefined
                        })));
  
  
                        res.status(route.status || 200);
                        res.send('<!doctype html>' + html);
  
                      case 16:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _ret = _context2.t0;
  
              if (!((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")) {
                _context2.next = 5;
                break;
              }
  
              return _context2.abrupt('return', _ret.v);
  
            case 5:
              _context2.next = 10;
              break;
  
            case 7:
              _context2.prev = 7;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
      _Html2.default,
      {
        title: 'Internal Server Error',
        description: err.message,
        style: _ErrorPage3.default._getCss() // eslint-disable-line no-underscore-dangle
        , __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: undefined
      },
      _server2.default.renderToString(_react2.default.createElement(_ErrorPage.ErrorPageWithoutStyle, { error: err, __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: undefined
      }))
    ));
    res.status(err.status || 500);
    res.send('<!doctype html>' + html);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  _models2.default.sync().catch(function (err) {
    return console.error(err.stack);
  }).then(function () {
    app.listen(_config.port, function () {
      console.log('The server is running at http://localhost:' + _config.port + '/');
    });
  });
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 14 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: _react.PropTypes.func.isRequired
  };
  
  /**
   * The top-level React component setting context (global) variables
   * that can be accessed from all the child components.
   *
   * https://facebook.github.io/react/docs/context.html
   *
   * Usage example:
   *
   *   const context = {
   *     history: createBrowserHistory(),
   *     store: createStore(),
   *   };
   *
   *   ReactDOM.render(
   *     <App context={context}>
   *       <Layout>
   *         <LandingPage />
   *       </Layout>
   *     </App>,
   *     container,
   *   );
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_React$PureComponent) {
    (0, _inherits3.default)(App, _React$PureComponent);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return this.props.context;
      }
    }, {
      key: 'render',
      value: function render() {
        // NOTE: If you need to add or modify header, footer etc. of the app,
        // please do that inside the Layout component.
        return _react2.default.Children.only(this.props.children);
      }
    }]);
    return App;
  }(_react2.default.PureComponent);
  
  App.propTypes = {
    context: _react.PropTypes.shape(ContextType).isRequired,
    children: _react.PropTypes.element.isRequired
  };
  App.childContextTypes = ContextType;
  exports.default = App;

/***/ },
/* 20 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/components/Html.js'; /**
                                                                                                       * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                       *
                                                                                                       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                       *
                                                                                                       * This source code is licensed under the MIT license found in the
                                                                                                       * LICENSE.txt file in the root directory of this source tree.
                                                                                                       */
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Html = function (_React$Component) {
    (0, _inherits3.default)(Html, _React$Component);
  
    function Html() {
      (0, _classCallCheck3.default)(this, Html);
      return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Html, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            title = _props.title,
            description = _props.description,
            style = _props.style,
            script = _props.script,
            chunk = _props.chunk,
            children = _props.children;
  
        return _react2.default.createElement(
          'html',
          { className: 'no-js', lang: 'en', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          _react2.default.createElement(
            'head',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              },
              __self: this
            },
            _react2.default.createElement('meta', { charSet: 'utf-8', __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: this
            }),
            _react2.default.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge', __source: {
                fileName: _jsxFileName,
                lineNumber: 29
              },
              __self: this
            }),
            _react2.default.createElement(
              'title',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                },
                __self: this
              },
              title
            ),
            _react2.default.createElement('meta', { name: 'description', content: description, __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              },
              __self: this
            }),
            _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
                fileName: _jsxFileName,
                lineNumber: 32
              },
              __self: this
            }),
            _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              },
              __self: this
            }),
            _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              },
              __self: this
            }),
            _react2.default.createElement('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/flat-ui/2.3.0/css/flat-ui.min.css', __source: {
                fileName: _jsxFileName,
                lineNumber: 35
              },
              __self: this
            }),
            style && _react2.default.createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: style }, __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              },
              __self: this
            })
          ),
          _react2.default.createElement(
            'body',
            { style: { background: "#2C3E50", color: "#ECF0F1" }, __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              },
              __self: this
            },
            _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children }, __source: {
                fileName: _jsxFileName,
                lineNumber: 39
              },
              __self: this
            }),
            script && _react2.default.createElement('script', { src: script, __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              },
              __self: this
            }),
            chunk && _react2.default.createElement('script', { src: chunk, __source: {
                fileName: _jsxFileName,
                lineNumber: 41
              },
              __self: this
            }),
            _config.analytics.google.trackingId && _react2.default.createElement('script', {
              dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + ('ga(\'create\',\'' + _config.analytics.google.trackingId + '\',\'auto\');ga(\'send\',\'pageview\')') },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 43
              },
              __self: this
            }),
            _config.analytics.google.trackingId && _react2.default.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 50
              },
              __self: this
            })
          )
        );
      }
    }]);
    return Html;
  }(_react2.default.Component);
  
  Html.propTypes = {
    title: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.string,
    script: _react.PropTypes.string,
    chunk: _react.PropTypes.string,
    children: _react.PropTypes.string
  };
  exports.default = Html;

/***/ },
/* 26 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: {
      trackingId: process.env.GOOGLE_TRACKING_ID }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorPageWithoutStyle = undefined;
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/routes/error/ErrorPage.js'; /**
                                                                                                              * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                              *
                                                                                                              * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                              *
                                                                                                              * This source code is licensed under the MIT license found in the
                                                                                                              * LICENSE.txt file in the root directory of this source tree.
                                                                                                              */
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(29);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ErrorPage = function (_React$Component) {
    (0, _inherits3.default)(ErrorPage, _React$Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (ErrorPage.__proto__ || (0, _getPrototypeOf2.default)(ErrorPage)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'render',
      value: function render() {
        if (true) {
          var error = this.props.error;
  
          return _react2.default.createElement(
            'div',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 23
              },
              __self: this
            },
            _react2.default.createElement(
              'h1',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                },
                __self: this
              },
              error.name
            ),
            _react2.default.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 25
                },
                __self: this
              },
              error.message
            ),
            _react2.default.createElement(
              'pre',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 26
                },
                __self: this
              },
              error.stack
            )
          );
        }
  
        return _react2.default.createElement(
          'div',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          },
          _react2.default.createElement(
            'h1',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 33
              },
              __self: this
            },
            'Error'
          ),
          _react2.default.createElement(
            'p',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 34
              },
              __self: this
            },
            'Sorry, a critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react2.default.Component);
  
  ErrorPage.propTypes = {
    error: _react.PropTypes.object.isRequired
  };
  exports.ErrorPageWithoutStyle = ErrorPage;
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(30);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,aAAa;CACd;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  padding: 2em;\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 31 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _stringify = __webpack_require__(33);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(34);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(35);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$replace = _ref.replace,
        replace = _ref$replace === undefined ? false : _ref$replace,
        _ref$prepend = _ref.prepend,
        prepend = _ref$prepend === undefined ? false : _ref$prepend;
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
          moduleId = _styles$i[0],
          css = _styles$i[1],
          media = _styles$i[2],
          sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap && btoa) {
        // skip IE9 and below, see http://caniuse.com/atob-btoa
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(37);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(38);
  
  var _models = __webpack_require__(39);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailConfirmed: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(40);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(42);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(43);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(44);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(45);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("sequelize");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(40);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(255),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(40);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(40);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(41);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(40);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(255)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(255)
    }
  
  });
  
  exports.default = UserProfile;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(47);
  
  var _me = __webpack_require__(48);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(50);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(57);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(49);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(47);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(51);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, i, extension, maybeFileName;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.md', '.html'];
              i = 0;
  
            case 2:
              if (!(i < extensions.length)) {
                _context2.next = 12;
                break;
              }
  
              extension = extensions[i];
              _context2.next = 6;
              return resolveExtension(path, extension);
  
            case 6:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 9;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 9:
              i += 1;
              _context2.next = 2;
              break;
  
            case 12:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(52);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(8);
  
  var _bluebird = __webpack_require__(53);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _frontMatter = __webpack_require__(54);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(55);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(47);
  
  var _ContentType = __webpack_require__(56);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var md = new _markdownIt2.default();
  
  // A folder with Markdown/HTML content pages
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    return (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 51 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 52 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 53 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 54 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 55 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(47);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(47);
  
  var _fetch = __webpack_require__(58);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(60);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 60 * 10 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(53);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(59);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(26);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(47);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable global-require */
  
  // The top-level (parent) route
  exports.default = {
  
    path: '/',
  
    // Keep in mind, routes are evaluated in order
    children: [__webpack_require__(62).default, __webpack_require__(75).default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var route;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                route = _context.sent;
  
  
                // Provide default values for title, description etc.
                route.title = (route.title || 'Untitled Page') + ' - www.reactstarterkit.com';
                route.description = route.description || '';
  
                return _context.abrupt('return', route);
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(2);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/routes/home/index.js';
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(63);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', {
                  title: 'Tetris Attack',
                  component: _react2.default.createElement(_Home2.default, {
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 11
                    },
                    __self: _this
                  })
                });
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/routes/home/Home.js'; /**
                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                        *
                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                        *
                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                        */
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(64);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Navigation = __webpack_require__(66);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _List = __webpack_require__(70);
  
  var _List2 = _interopRequireDefault(_List);
  
  var _RoomListItem = __webpack_require__(72);
  
  var _RoomListItem2 = _interopRequireDefault(_RoomListItem);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ROOM_MOCK = [{ name: "Joaozin nunca ganha", slots: 4, kind: 'public', owner: 'Guilherme Diego', players: [{ name: 'Guilherme Diego', photo: 'https://scontent.fplu1-1.fna.fbcdn.net/v/t1.0-9/14717211_1179280952158814_4296727703080457537_n.jpg?oh=80a54dbdf575bc364df1d2ae3b658780&oe=58CE80FE' }, { name: 'X' }] }, { name: "Exemplo de sala private", slots: 4, kind: 'private', owner: 'Rafael Cassau', players: [{ name: 'Y' }, { name: 'Z' }, { name: 'A' }] }, { name: "Exemplo de sala cheia pa carai", slots: 4, kind: 'public', owner: 'Hugo Pena', players: [{ name: 'B' }, { name: 'AS' }, { name: 'EE' }, { name: 'YY' }] }];
  
  var SEARCH_CONFIG = {
      placeholder: "Search by name, owner or kind",
      fields: ['name', 'owner', 'kind']
  };
  
  var Home = function (_React$Component) {
      (0, _inherits3.default)(Home, _React$Component);
  
      function Home() {
          (0, _classCallCheck3.default)(this, Home);
          return (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).apply(this, arguments));
      }
  
      (0, _createClass3.default)(Home, [{
          key: 'render',
          value: function render() {
              return _react2.default.createElement(
                  'main',
                  { className: 'container', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 48
                      },
                      __self: this
                  },
                  _react2.default.createElement(_Navigation2.default, {
                      __source: {
                          fileName: _jsxFileName,
                          lineNumber: 49
                      },
                      __self: this
                  }),
                  _react2.default.createElement(
                      'div',
                      { className: 'row', __source: {
                              fileName: _jsxFileName,
                              lineNumber: 50
                          },
                          __self: this
                      },
                      _react2.default.createElement(
                          'div',
                          { className: 'col-md-8', __source: {
                                  fileName: _jsxFileName,
                                  lineNumber: 51
                              },
                              __self: this
                          },
                          _react2.default.createElement(_List2.default, {
                              renderedItem: _RoomListItem2.default,
                              items: ROOM_MOCK,
                              search: SEARCH_CONFIG,
                              __source: {
                                  fileName: _jsxFileName,
                                  lineNumber: 52
                              },
                              __self: this
                          })
                      )
                  )
              );
          }
      }]);
      return Home;
  }(_react2.default.Component);
  
  Home.propTypes = {};
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {/*\n   * Typography\n   * ======================================================================== *//*\n   * Layout\n   * ======================================================================== *//*\n   * Media queries breakpoints\n   * ======================================================================== *//* Extra small screen / phone *//* Small screen / tablet *//* Medium screen / desktop *//* Large screen / wide desktop */\n}\n\n.Home-root-2IMq2 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home-container-2Yejq {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.Home-news-oTyGp {\n  padding: 0;\n}\n\n.Home-newsItem-3Ob1N {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.Home-newsTitle-1yWVz {\n  font-size: 1.125em;\n}\n\n.Home-newsTitle-1yWVz,\n.Home-newsDesc-21LXz {\n  display: block;\n}\n", "", {"version":3,"sources":["/./routes/home/Home.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH,OACE;;gFAE8E;;gFAMA;;gFAMA,gCAErB,2BACL,6BACE,iCACI;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC;;AAED;EACE,WAAW;CACZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CACrB;;AAED;EACE,mBAAmB;CACpB;;AAED;;EAEE,eAAe;CAChB","file":"Home.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n\n.news {\n  padding: 0;\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.newsTitle {\n  font-size: 1.125em;\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home-root-2IMq2",
  	"container": "Home-container-2Yejq",
  	"news": "Home-news-oTyGp",
  	"newsItem": "Home-newsItem-3Ob1N",
  	"newsTitle": "Home-newsTitle-1yWVz",
  	"newsDesc": "Home-newsDesc-21LXz"
  };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/components/Navigation/index.js'; /**
                                                                                                                   * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                   *
                                                                                                                   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                   *
                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                   * LICENSE.txt file in the root directory of this source tree.
                                                                                                                   */
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(67);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(68);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Navigation = function (_React$Component) {
      (0, _inherits3.default)(Navigation, _React$Component);
  
      function Navigation() {
          (0, _classCallCheck3.default)(this, Navigation);
          return (0, _possibleConstructorReturn3.default)(this, (Navigation.__proto__ || (0, _getPrototypeOf2.default)(Navigation)).apply(this, arguments));
      }
  
      (0, _createClass3.default)(Navigation, [{
          key: 'render',
          value: function render() {
              return _react2.default.createElement(
                  'nav',
                  { style: { marginTop: 20 }, className: 'navbar navbar-inverse', role: 'navigation', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 22
                      },
                      __self: this
                  },
                  _react2.default.createElement(
                      'div',
                      { className: 'navbar-header', __source: {
                              fileName: _jsxFileName,
                              lineNumber: 23
                          },
                          __self: this
                      },
                      _react2.default.createElement(
                          'button',
                          { type: 'button', className: 'navbar-toggle', 'data-toggle': 'collapse', 'data-target': '#navbar-collapse-01', __source: {
                                  fileName: _jsxFileName,
                                  lineNumber: 24
                              },
                              __self: this
                          },
                          _react2.default.createElement(
                              'span',
                              { className: 'sr-only', __source: {
                                      fileName: _jsxFileName,
                                      lineNumber: 25
                                  },
                                  __self: this
                              },
                              'Toggle navigation'
                          )
                      ),
                      _react2.default.createElement(
                          'a',
                          { className: 'navbar-brand', href: '#', __source: {
                                  fileName: _jsxFileName,
                                  lineNumber: 27
                              },
                              __self: this
                          },
                          'Tetris Attack'
                      )
                  ),
                  _react2.default.createElement(
                      'div',
                      { className: 'collapse navbar-collapse', id: 'navbar-collapse-01', __source: {
                              fileName: _jsxFileName,
                              lineNumber: 29
                          },
                          __self: this
                      },
                      _react2.default.createElement(
                          'ul',
                          { className: 'nav navbar-nav navbar-right', action: '#', role: 'search', __source: {
                                  fileName: _jsxFileName,
                                  lineNumber: 30
                              },
                              __self: this
                          },
                          _react2.default.createElement(
                              'li',
                              {
                                  __source: {
                                      fileName: _jsxFileName,
                                      lineNumber: 31
                                  },
                                  __self: this
                              },
                              _react2.default.createElement(
                                  'a',
                                  { href: '/create/user', __source: {
                                          fileName: _jsxFileName,
                                          lineNumber: 31
                                      },
                                      __self: this
                                  },
                                  'Register'
                              )
                          ),
                          _react2.default.createElement(
                              'li',
                              {
                                  __source: {
                                      fileName: _jsxFileName,
                                      lineNumber: 32
                                  },
                                  __self: this
                              },
                              _react2.default.createElement(
                                  'a',
                                  { href: '/login', __source: {
                                          fileName: _jsxFileName,
                                          lineNumber: 32
                                      },
                                      __self: this
                                  },
                                  'Login'
                              )
                          )
                      )
                  )
              );
          }
      }]);
      return Navigation;
  }(_react2.default.Component);
  
  Navigation.propTypes = {
      className: _react.PropTypes.string
  };
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 67 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(69);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.Navigation-root-Kev6U {\n  margin: 0;\n}\n\n.Navigation-link-1-rhI {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.Navigation-link-1-rhI,\n.Navigation-link-1-rhI:active,\n.Navigation-link-1-rhI:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.Navigation-link-1-rhI:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.Navigation-highlight-g6k6K {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.Navigation-highlight-g6k6K:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.Navigation-spacer-2KA91 {\n  color: rgba(255, 255, 255, 0.3);\n}\n", "", {"version":3,"sources":["/./components/Navigation/Navigation.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;CACX;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,gCAAgC;CACjC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,gCAAgC;CACjC","file":"Navigation.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n.root {\n  margin: 0;\n}\n\n.link {\n  display: inline-block;\n  padding: 3px 8px;\n  text-decoration: none;\n  font-size: 1.125em; /* ~18px */\n}\n\n.link,\n.link:active,\n.link:visited {\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.link:hover {\n  color: rgba(255, 255, 255, 1);\n}\n\n.highlight {\n  margin-right: 8px;\n  margin-left: 8px;\n  border-radius: 3px;\n  background: rgba(0, 0, 0, 0.15);\n  color: #fff;\n}\n\n.highlight:hover {\n  background: rgba(0, 0, 0, 0.3);\n}\n\n.spacer {\n  color: rgba(255, 255, 255, 0.3);\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation-root-Kev6U",
  	"link": "Navigation-link-1-rhI",
  	"highlight": "Navigation-highlight-g6k6K",
  	"spacer": "Navigation-spacer-2KA91"
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _getIterator2 = __webpack_require__(35);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _getPrototypeOf = __webpack_require__(20);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(21);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(22);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(23);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(24);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/components/List/index.js';
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _uid = __webpack_require__(71);
  
  var _uid2 = _interopRequireDefault(_uid);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var List = function (_React$Component) {
      (0, _inherits3.default)(List, _React$Component);
  
      function List(props) {
          (0, _classCallCheck3.default)(this, List);
  
          var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));
  
          _this.state = { searchText: '' };
  
          _this.searchInput = _this.searchInput.bind(_this);
          _this.onChange = _this.onChange.bind(_this);
          _this.filterItems = _this.filterItems.bind(_this);
          _this.mapItem = _this.mapItem.bind(_this);
          return _this;
      }
  
      (0, _createClass3.default)(List, [{
          key: 'searchInput',
          value: function searchInput() {
              return _react2.default.createElement(
                  'div',
                  { className: 'todo-search', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 17
                      },
                      __self: this
                  },
                  _react2.default.createElement('input', { style: { width: "100%" }, className: 'todo-search-field', onChange: this.onChange,
                      type: 'search', value: this.state.searchText,
                      placeholder: this.props.search.placeholder, __source: {
                          fileName: _jsxFileName,
                          lineNumber: 18
                      },
                      __self: this
                  })
              );
          }
      }, {
          key: 'onChange',
          value: function onChange(e) {
              this.setState({ searchText: e.target.value });
          }
      }, {
          key: 'filterItems',
          value: function filterItems(i) {
              if (!this.props.search) return i;
  
              var hasInFields = false;
  
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;
  
              try {
                  for (var _iterator = (0, _getIterator3.default)(this.props.search.fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var key = _step.value;
  
                      var rxp = new RegExp(this.state.searchText, "gi");
                      if (i[key].match(rxp)) hasInFields = true;
                  }
              } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
              } finally {
                  try {
                      if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                      }
                  } finally {
                      if (_didIteratorError) {
                          throw _iteratorError;
                      }
                  }
              }
  
              if (hasInFields) return i;
          }
      }, {
          key: 'mapItem',
          value: function mapItem(i) {
              return _react2.default.createElement(this.props.renderedItem, { key: (0, _uid2.default)(), item: i, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 43
                  },
                  __self: this
              });
          }
      }, {
          key: 'render',
          value: function render() {
              var filteredItems = this.props.items.filter(this.filterItems);
  
              return _react2.default.createElement(
                  'div',
                  { className: 'todo', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 50
                      },
                      __self: this
                  },
                  this.props.search ? this.searchInput() : null,
                  _react2.default.createElement(
                      'ul',
                      {
                          __source: {
                              fileName: _jsxFileName,
                              lineNumber: 52
                          },
                          __self: this
                      },
                      filteredItems.map(this.mapItem)
                  )
              );
          }
      }]);
      return List;
  }(_react2.default.Component);
  
  exports.default = List;

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("uid");

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/components/Room/RoomListItem.js';
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _RoomListItem = __webpack_require__(73);
  
  var _RoomListItem2 = _interopRequireDefault(_RoomListItem);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var getPlayerPhotos = function getPlayerPhotos(_ref) {
      var photo = _ref.photo,
          name = _ref.name;
  
      var children = _react2.default.createElement(
          'span',
          {
              __source: {
                  fileName: _jsxFileName,
                  lineNumber: 6
              },
              __self: undefined
          },
          ' ',
          name[0],
          ' '
      );
      if (photo) children = _react2.default.createElement('img', { src: photo, alt: name, __source: {
              fileName: _jsxFileName,
              lineNumber: 7
          },
          __self: undefined
      });
  
      return _react2.default.createElement(
          'div',
          { className: _RoomListItem2.default.photo, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 9
              },
              __self: undefined
          },
          children
      );
  };
  
  var RoomListItem = function RoomListItem(_ref2) {
      var item = _ref2.item;
      return _react2.default.createElement(
          'li',
          { className: _RoomListItem2.default['room-item'], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 13
              },
              __self: undefined
          },
          _react2.default.createElement(
              'div',
              { className: 'todo-content ' + item.kind + ' ' + _RoomListItem2.default.content, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 14
                  },
                  __self: undefined
              },
              _react2.default.createElement(
                  'h4',
                  { className: 'todo-name', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 15
                      },
                      __self: undefined
                  },
                  item.name
              ),
              _react2.default.createElement(
                  'strong',
                  {
                      __source: {
                          fileName: _jsxFileName,
                          lineNumber: 18
                      },
                      __self: undefined
                  },
                  ' Created by: '
              ),
              ' ',
              item.owner,
              ' ',
              _react2.default.createElement('br', {
                  __source: {
                      fileName: _jsxFileName,
                      lineNumber: 18
                  },
                  __self: undefined
              }),
              _react2.default.createElement(
                  'strong',
                  {
                      __source: {
                          fileName: _jsxFileName,
                          lineNumber: 19
                      },
                      __self: undefined
                  },
                  ' Slots'
              ),
              ': ',
              item.players.length,
              '/',
              item.slots
          ),
          _react2.default.createElement(
              'div',
              { className: _RoomListItem2.default.controls, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 21
                  },
                  __self: undefined
              },
              _react2.default.createElement(
                  'a',
                  { className: 'btn btn-info', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 22
                      },
                      __self: undefined
                  },
                  'SPEC'
              ),
              _react2.default.createElement(
                  'a',
                  { className: 'btn btn-primary ' + (item.players.length == item.slots && 'disabled'), href: '', __source: {
                          fileName: _jsxFileName,
                          lineNumber: 23
                      },
                      __self: undefined
                  },
                  'JOIN'
              )
          ),
          _react2.default.createElement(
              'div',
              { className: _RoomListItem2.default.photos, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 25
                  },
                  __self: undefined
              },
              item.players.map(getPlayerPhotos)
          )
      );
  };
  
  exports.default = (0, _withStyles2.default)(_RoomListItem2.default)(RoomListItem);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(74);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./RoomListItem.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./RoomListItem.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, ".RoomListItem-room-item-2GeRF:after {\n    content: none!important\n}\n\n.RoomListItem-room-item-2GeRF {\n    min-height: 95px;\n}\n\n.RoomListItem-room-item-2GeRF h4 {\n    font-size: 20px;\n    margin: 0;\n}\n\n.RoomListItem-photos-2cz7y, .RoomListItem-controls-20-54 {\n    float: right\n}\n\n.RoomListItem-search-1O6VW {\n    width: 100%\n}\n\n.RoomListItem-controls-20-54 a {\n    margin-left: 10px\n}\n\n.RoomListItem-photos-2cz7y {\n    margin-right: 40px\n}\n\n.RoomListItem-content-1s6-L {\n    float: left\n}\n\n.RoomListItem-photo-5vOSF {\n    width: 50px;\n    height: 50px;\n    background: #2C3E50;\n    border: 2px solid #34495E;\n    border-radius: 5px;\n    overflow: hidden;\n    float: left;\n    margin-left: -10px;\n}\n\n.RoomListItem-photo-5vOSF img {\n    width: 100%\n}\n\n.RoomListItem-photo-5vOSF span {\n    text-align: center;\n    font-weight: 700;\n    width: 100%;\n    display: block;\n    line-height: 49px;\n}\n", "", {"version":3,"sources":["/./components/Room/RoomListItem.css"],"names":[],"mappings":"AAAA;IACI,uBAAuB;CAC1B;;AAED;IACI,iBAAiB;CACpB;;AAED;IACI,gBAAgB;IAChB,UAAU;CACb;;AAED;IACI,YAAY;CACf;;AAED;IACI,WAAW;CACd;;AAED;IACI,iBAAiB;CACpB;;AAED;IACI,kBAAkB;CACrB;;AAED;IACI,WAAW;CACd;;AAED;IACI,YAAY;IACZ,aAAa;IACb,oBAAoB;IACpB,0BAA0B;IAC1B,mBAAmB;IACnB,iBAAiB;IACjB,YAAY;IACZ,mBAAmB;CACtB;;AAED;IACI,WAAW;CACd;;AAED;IACI,mBAAmB;IACnB,iBAAiB;IACjB,YAAY;IACZ,eAAe;IACf,kBAAkB;CACrB","file":"RoomListItem.css","sourcesContent":[".room-item:after {\n    content: none!important\n}\n\n.room-item {\n    min-height: 95px;\n}\n\n.room-item h4 {\n    font-size: 20px;\n    margin: 0;\n}\n\n.photos, .controls {\n    float: right\n}\n\n.search {\n    width: 100%\n}\n\n.controls a {\n    margin-left: 10px\n}\n\n.photos {\n    margin-right: 40px\n}\n\n.content {\n    float: left\n}\n\n.photo {\n    width: 50px;\n    height: 50px;\n    background: #2C3E50;\n    border: 2px solid #34495E;\n    border-radius: 5px;\n    overflow: hidden;\n    float: left;\n    margin-left: -10px;\n}\n\n.photo img {\n    width: 100%\n}\n\n.photo span {\n    text-align: center;\n    font-weight: 700;\n    width: 100%;\n    display: block;\n    line-height: 49px;\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"room-item": "RoomListItem-room-item-2GeRF",
  	"photos": "RoomListItem-photos-2cz7y",
  	"controls": "RoomListItem-controls-20-54",
  	"search": "RoomListItem-search-1O6VW",
  	"content": "RoomListItem-content-1s6-L",
  	"photo": "RoomListItem-photo-5vOSF"
  };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/routes/room/index.js'; /**
                                                                                                         * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                         *
                                                                                                         * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                         *
                                                                                                         * This source code is licensed under the MIT license found in the
                                                                                                         * LICENSE.txt file in the root directory of this source tree.
                                                                                                         */
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Room = __webpack_require__(76);
  
  var _Room2 = _interopRequireDefault(_Room);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration';
  
  exports.default = {
  
    path: '/room',
  
    action: function action() {
      return {
        title: title,
        component: _react2.default.createElement(_Room2.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        })
      };
    }
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var _jsxFileName = '/home/guilherme-diego/Workspace/Tetris-Attack-2/client/src/routes/room/Room.js';
  
  var _react = __webpack_require__(15);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(28);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Room = __webpack_require__(77);
  
  var _Room2 = _interopRequireDefault(_Room);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Room = function Room() {
      return _react2.default.createElement(
          'div',
          {
              __source: {
                  fileName: _jsxFileName,
                  lineNumber: 6
              },
              __self: undefined
          },
          ' Test '
      );
  };
  
  exports.default = (0, _withStyles2.default)(_Room2.default)(Room);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(78);
      var insertCss = __webpack_require__(32);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getContent = function() { return content; };
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
      
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Room.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"importLoaders\":1,\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]-[local]-[hash:base64:5]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Room.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(31)();
  // imports
  
  
  // module
  exports.push([module.id, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Room.css","sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 79 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map
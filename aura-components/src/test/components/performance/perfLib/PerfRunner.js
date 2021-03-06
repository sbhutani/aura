function PerfRunner(COQL, Memory) {
    return (function () {
        var CONFIG = {},
            classFinishTest = 'testFinish',
            componentReady  = false,
            setupComplete   = false,
            runInProgress   = false,
            callbackComponentLoaded,
            callbackSetupComplete;
        
        return {
            COQL    : COQL,
            Memory  : Memory,
            results : {},

            setContainer: function (container) {
                var valid = container instanceof HTMLElement || $A.util.isComponent(container);
                $A.assert(valid, 'Container needs to be an Aura Component or an HTML Element');
                if ($A.util.isComponent(container)) {
                    this.containerComponent = container;
                } else {
                    this.containerDOM = container;    
                }

                return this;
            },
            getContainerDOM: function () {
                return this.containerDOM || this.containerComponent && this.containerComponent.getElement();
            },
            setConfig: function (config) {
                $A.assert(config.componentConfig, 'Setup: componentConfig is required');
                this.componentConfig = config.componentConfig;
                this.options = config.options || {};
                return this;
            },
            clearRun: function () {
                componentReady = false;
                setupComplete  = false;
                runInProgress  = false;
                var dom = this.getContainerDOM();
                if (dom) {
                    $A.util.removeClass(dom, classFinishTest);
                }
                this.results   = {};
                return this;
            },
            loadComponent: function () {
                var self        = this,
                    cmpDef      = this.componentConfig.componentDef,
                    resolvedDef = $A.componentService.getDef(cmpDef, true);

                $A.assert(cmpDef, 'No def has been found, call setup first');
                if (resolvedDef) {
                    return setTimeout(function(){
                        componentReady = true;
                        self._onComponentReady();
                    }, 0);
                } else {
                    var action = $A.get("c.aura://ComponentController.getComponentDef");
                    action.setParams({
                        name: cmpDef
                    });

                    action.setCallback(this, function (action) {
                        $A.assert(action.getState() === 'SUCCESS', 'Def not found...');
                        componentReady = true;
                        self._onComponentReady();
                    });

                    $A.enqueueAction(action);
                }
                return this;
            },
            _onComponentReady: function () {
                if (callbackComponentLoaded) {
                    callbackComponentLoaded.call(this);
                }
            },
            onComponentLoaded: function (callback) {
                if (componentReady) {
                    callback.call(this);
                } else {
                    callbackComponentLoaded = callback;
                }
            },
            setup: function () {
                $A.assert(componentReady, 'You need to load the component first');
                var asyncSetup = false,
                    cmpConfig  = this.componentConfig,
                    cmpDef     = $A.componentService.getDef(cmpConfig.componentDef),
                    perfIntf   = cmpDef.isInstanceOf('performance:test'),
                    setupDone  = (function () {
                        setupComplete = true; 
                        this._onSetupComplete();
                    }).bind(this);

                
                if (perfIntf) {
                    // Create and render the wrapper
                    this.component = $A.newCmp(cmpConfig, this.containerComponent)
                    $A.render(this.component, this.getContainerDOM()); 

                    this.component.setup({
                        async: function () {
                            asyncSetup = true;
                            return function done() {
                                setupDone();
                            };
                        }
                    });
                }

                if (!asyncSetup) {
                    setupDone();
                }

                return this;
            },
            _onSetupComplete: function () {
                if (callbackSetupComplete) {
                    callbackSetupComplete.call(this);
                }
            },
            onSetupComplete: function (callback) {
                if (setupComplete) {
                    callback.call(this);
                } else {
                    callbackSetupComplete = callback;
                }
            },
            startMetricsCollection: function () {
                $A.metricsService.transactionStart('PERFRUNNER', 'run');
                COQL.snapshot('start');
            },
            stopMetricsCollection: function () {
                var transaction;
                COQL.snapshot('end');
                $A.metricsService.transactionEnd('PERFRUNNER', 'run', function (t) {
                    transaction = t;
                }); // sync

                if (COQL.enabled) {
                    this.results.coql = COQL.diff('end', 'start');
                }

                this.results.transaction = transaction;
            },
            _runComponentTest: function (cmpConfig, done) {
                this.component = $A.newCmp(cmpConfig, this.containerComponent)
                $A.render(this.component, this.getContainerDOM()); 
                done.immediate();
            },
            run: function (sandboxRun) {
                var asyncRun     = false,
                    immediateRun = false,
                    wrapperTest  = this.component,
                    finishRun    = (function () {this._finish();}).bind(this),
                    doneObject   = {
                        async: function () {
                            asyncRun = true;
                            return function done() {
                                finishRun();
                            };
                        },
                        immediate: function () {
                            immediateRun = true;
                        }
                    }, runner;

                // The runner is the wrapper.run or the provided sandbox call or the fallback is a simple component
                runner = (wrapperTest && wrapperTest.run) || sandboxRun || this._runComponentTest.bind(this, this.componentConfig)

                // Set Internal state for running
                runInProgress = true; 

                this.startMetricsCollection();
                runner(doneObject);

                // After this check if the run is async or manual (inmediate)
                if (immediateRun && !asyncRun) {
                    finishRun();
                }
            },
            _finish: function () {
                runInProgress = false;
                this.stopMetricsCollection();
                var dom = this.getContainerDOM();
                if (dom) {
                    $A.util.addClass(dom, classFinishTest);
                }
            },
            finish: function () {
                $A.assert(runInProgress, 'No run in progress');
                this._finish();
            },
            getResults: function () {
                $A.assert(!runInProgress, 'A run hasn\'t finish yet');
                return this.results;
            }
        };
    }());
}
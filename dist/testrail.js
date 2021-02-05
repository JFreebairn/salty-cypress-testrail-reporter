"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
var axios_1 = require("axios");
var chalk_1 = require("chalk");
var TestRail = /** @class */ (function () {
    function TestRail(options) {
        this.options = options;
        this.base = "https://" + options.domain + "/index.php?/api/v2";
    }
    // public isRunToday() {
    //   return axios({
    //     method: "get",
    //     url: `${this.base}/get_runs/${this.options.projectId}`,
    //     headers: { "Content-Type": "application/json" },
    //     auth: {
    //       username: this.options.username,
    //       password: this.options.password,
    //     },
    //   }).then((response) => {
    //     this.lastRunDate = moment
    //       .unix(response.data[0].created_on)
    //       .format("MM/DD/YYYY");
    //     // set current date with same format as this.lastRunDate
    //     this.currentDate = moment(new Date()).format("L");
    //     if (this.lastRunDate === this.currentDate) {
    //       console.log(
    //         `Test Run already created today. Posting results to Test Run ID: R${response.data[0].id}`
    //       );
    //       return true;
    //     }
    //     return false;
    //   });
    //   // .catch(error => console.error(error));
    // }
    TestRail.prototype.createRun = function (name, description) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // If the lastRunDate of the most current test run is equal to today's date, don't create a new test run.
                axios_1.default({
                    method: "post",
                    url: this.base + "/add_run/" + this.options.projectId,
                    headers: { "Content-Type": "application/json" },
                    auth: {
                        username: this.options.username,
                        password: this.options.password,
                    },
                    data: JSON.stringify({
                        suite_id: this.options.suiteId,
                        name: name,
                        description: description,
                        include_all: true,
                    }),
                }).then(function (response) {
                    console.log("Creating Test Run... ---> Run id is:  ", response.data.id);
                    _this.runId = response.data.id;
                });
                return [2 /*return*/];
            });
        });
    };
    TestRail.prototype.publishResults = function (results) {
        var _this = this;
        return axios_1.default({
            method: "post",
            url: this.base + "/add_results_for_cases/" + this.runId,
            headers: { "Content-Type": "application/json" },
            auth: {
                username: this.options.username,
                password: this.options.password,
            },
            data: JSON.stringify({ results: results }),
        })
            .then(function (response) {
            console.log("\n", chalk_1.default.magenta.underline.bold("(TestRail Reporter)"));
            console.log("\n", " - Results are published to " + chalk_1.default.magenta("https://" + _this.options.domain + "/index.php?/runs/view/" + _this.runId), "\n");
        })
            .catch(function (error) { return console.error(error); });
    };
    // if (!this.options.createTestRun) {
    //   this.runId = this.options.runId;
    //   console.log(`Publishing results to existing run: ${this.runId}`);
    //   publishToAPI();
    // } else {
    //   axios({
    //     method: "get",
    //     url: `${this.base}/get_runs/${this.options.projectId}`,
    //     headers: { "Content-Type": "application/json" },
    //     auth: {
    //       username: this.options.username,
    //       password: this.options.password,
    //     },
    //   }).then((response) => {
    //     this.runId = response.data[0].id;
    //     console.log(`Publishing results to latest run: ${this.runId}`);
    //     publishToAPI();
    //   });
    TestRail.prototype.closeRun = function () {
        axios_1.default({
            method: "post",
            url: this.base + "/close_run/" + this.runId,
            headers: { "Content-Type": "application/json" },
            auth: {
                username: this.options.username,
                password: this.options.password,
            },
        })
            .then(function () { return console.log("- Test run closed successfully"); })
            .catch(function (error) { return console.error(error); });
    };
    return TestRail;
}());
exports.TestRail = TestRail;
//# sourceMappingURL=testrail.js.map
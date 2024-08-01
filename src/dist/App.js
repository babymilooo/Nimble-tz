"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
var react_1 = require("react");
var avatar_1 = require("./Components/Ui/avatar");
function App() {
    var _this = this;
    var _a = react_1.useState([]), contacts = _a[0], setContacts = _a[1];
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    var sort = "created:desc";
    var url = "https://thingproxy.freeboard.io/fetch/https://live.devnimble.com/api/v1/contacts?sort=created:desc";
    var token = process.env.REACT_APP_TOKEN;
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(
                            // `https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts`,
                            url, {
                                method: "GET",
                                headers: {
                                    Authorization: "Bearer " + token,
                                    "Content-Type": "application/json"
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Network response was not ok " + response.statusText);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log(data.resources);
                        setContacts(data.resources);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        setError(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    // useEffect(() => {
    //   console.log(contacts);
    // }, [contacts]);
    return (React.createElement("div", { className: "w-full mt-[200px] flex flex-col justify-center items-center" },
        React.createElement("h1", { className: "text-5xl font-bold lg:w-[500px] w-full px-4" }, "Contacts"),
        React.createElement("div", { className: "lg:w-3/5 w-full p-4 grid grid-cols-5" },
            React.createElement("div", { className: "col-span-3" }, contacts === null || contacts === void 0 ? void 0 : contacts.map(function (contact) {
                var _a, _b, _c, _d, _e, _f;
                return (React.createElement("div", { key: contact.id, className: "border p-2 my-2 " },
                    React.createElement("div", { className: "flex items-center gap-1 font-bold" },
                        React.createElement(avatar_1.Avatar, { className: "mr-2" },
                            React.createElement(avatar_1.AvatarImage, { src: contact.avatar_url, alt: "@shadcn" }),
                            React.createElement(avatar_1.AvatarFallback, null, "CN")),
                        React.createElement("p", null, (_b = (_a = contact.fields) === null || _a === void 0 ? void 0 : _a["first name"]) === null || _b === void 0 ? void 0 : _b.map(function (value) { return value.value; })),
                        React.createElement("p", null, (_d = (_c = contact.fields) === null || _c === void 0 ? void 0 : _c["last name"]) === null || _d === void 0 ? void 0 : _d.map(function (value) { return value.value; }))),
                    React.createElement("p", null, (_e = contact.fields.email) === null || _e === void 0 ? void 0 : _e.map(function (value) { return value.value; })),
                    React.createElement("div", { className: "flex items-center" }, (_f = contact.tags) === null || _f === void 0 ? void 0 : _f.map(function (tag) { return (React.createElement("span", { key: tag.id, className: "bg-gray-200 p-1 m-1" }, tag.tag)); }))));
            })),
            React.createElement("div", { className: "col-span-2 w-full h-full bg-green-500" },
                React.createElement("p", null, "create new")))));
}
exports["default"] = App;

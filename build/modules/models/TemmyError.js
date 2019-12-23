"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemmyError extends Error {
    constructor(message) {
        super();
        this.name = 'TemmyError';
        this.message = "Temme isn't feeling good";
        this.message = message.length > 0 ? message : this.message;
    }
}
exports.default = TemmyError;
//# sourceMappingURL=TemmyError.js.map
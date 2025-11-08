"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Placeholder route(s)
router.get('/', (req, res) => {
    res.json({ message: 'Auth routes placeholder' });
});
exports.default = router;

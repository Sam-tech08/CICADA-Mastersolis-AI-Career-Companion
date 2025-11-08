"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applications_controller_1 = require("../controllers/applications.controller");
const router = (0, express_1.Router)();
// GET /api/applications/ - list recent applications (admin/dev)
router.get('/', applications_controller_1.listApplications);
// POST /api/applications/ - create new application
router.post('/', applications_controller_1.createApplication);
exports.default = router;

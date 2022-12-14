"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const category_model_1 = require("./category.model");
const platform_express_1 = require("@nestjs/platform-express");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        imports: [platform_express_1.MulterModule.register({
                dest: './files',
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: category_model_1.CategorySchema }]),
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=category.module.js.map
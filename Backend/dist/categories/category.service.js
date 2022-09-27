"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    insertCategory(title, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new this.categoryModel({
                title,
                img,
            });
            const result = yield newCategory.save();
            return result.id;
        });
    }
    getCategorys() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorys = yield this.categoryModel.find().exec();
            return categorys.map(prod => ({
                id: prod.id,
                title: prod.title,
                img: prod.img,
            }));
        });
    }
    getSingleCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.findCategory(categoryId);
            return {
                id: category.id,
                title: category.title,
                img: category.img,
            };
        });
    }
    updateCategory(categoryId, title, img) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield this.findCategory(categoryId);
            if (title) {
                updatedCategory.title = title;
            }
            if (img) {
                updatedCategory.img = img;
            }
            updatedCategory.save();
        });
    }
    deleteCategory(prodId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.categoryModel.deleteOne({ _id: prodId }).exec();
            if (result.n === 0) {
                throw new common_1.NotFoundException('Could not find category.');
            }
        });
    }
    findCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let category;
            try {
                category = yield this.categoryModel.findById(id).exec();
            }
            catch (error) {
                throw new common_1.NotFoundException('Could not find category.');
            }
            if (!category) {
                throw new common_1.NotFoundException('Could not find category.');
            }
            return category;
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map
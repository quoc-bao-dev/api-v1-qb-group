import { log } from 'console';
import { BaseService } from '../interface/service';
import AddressModel from '../model/addressModel';
import ReviewModel from '../model/reviewModel';
import UserModel, { UserDocument } from '../model/userModel';

const userService: BaseService<UserDocument> = {
    create: async (data) => {
        try {
            const result = await UserModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await UserModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await UserModel.findById(id).populate('addressDetail');
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await UserModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            // delete comment of user
            await ReviewModel.deleteMany({ userId: id });

            const result = await UserModel.findByIdAndDelete(id);
            if (result?.addressDetail) {
                await AddressModel.findByIdAndDelete(result.addressDetail);
            }
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;

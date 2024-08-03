import { BaseService } from '../interface/service';
import AddressModel, { AddressDocument } from '../model/addressModel';
import UserModel from '../model/userModel';

const addressService: BaseService<AddressDocument> & {
    getbyUserId: (id: string) => Promise<AddressDocument[]>;
} = {
    create: async (data) => {
        try {
            const result = await AddressModel.create(data);
            await UserModel.findByIdAndUpdate(data.userId, { addressDetail: result._id });
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await AddressModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await AddressModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getbyUserId: async (id) => {
        try {
            const result = await AddressModel.find({ userId: id });
            return result;
        } catch (error) {
            throw error;
        }
    },
    update: async (id, data) => {
        try {
            const result = await AddressModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await AddressModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default addressService;

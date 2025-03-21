import ItemBorrowingAndLending from "../models/itemborrowingandlending.model.js";
import { errorHandler } from "../utils/error.js";

export const createitemBorrowingAndLending = async (req, res, next) => {
    try {
        const itemBorrowingAndLending = await ItemBorrowingAndLending.create(req.body);
        return res.status(201).json(itemBorrowingAndLending);
      } catch (error) {
        next(error);
      }
};

export const deleteitemBorrowingAndLending = async (req, res, next) => {
    const itemBorrowingAndLending = await ItemBorrowingAndLending.findById(req.params.id);
  
    if (!itemBorrowingAndLending) {
      return next(errorHandler(404, 'Item not found!'));
    }
  
    if (req.user.id !== itemBorrowingAndLending.userRef) {
      return next(errorHandler(401, 'You can only delete your own Item!'));
    }
  
    try {
      await ItemBorrowingAndLending.findByIdAndDelete(req.params.id);
      res.status(200).json('Item has been deleted!');
    } catch (error) {
      next(error);
    }
  };

  export const updateitemBorrowingAndLending = async (req, res, next) => {
    const itemBorrowingAndLending = await ItemBorrowingAndLending.findById(req.params.id);
    if (!itemBorrowingAndLending) {
      return next(errorHandler(404, 'Item not found!'));
    }
    if (req.user.id !== itemBorrowingAndLending.userRef) {
      return next(errorHandler(401, 'You can only update your own items!'));
    }
  
    try {
      const updateitemBorrowingAndLending = await ItemBorrowingAndLending.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updateitemBorrowingAndLending);
    } catch (error) {
      next(error);
    }
  };

  export const getitemBorrowingAndLending = async (req, res, next) => {
    try {
      const itemBorrowingAndLending = await ItemBorrowingAndLending.findById(req.params.id);
      if (!itemBorrowingAndLending) {
        return next(errorHandler(404, 'item not found!'));
      }
      res.status(200).json(itemBorrowingAndLending);
    } catch (error) {
      next(error);
    }
  };

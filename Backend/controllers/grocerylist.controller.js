import GroceryListing from '../models/grocerylist.model.js';
import { errorHandler } from '../utils/error.js';

export const creategroceryListing = async (req, res, next) => {
    try {
      const grocerylisting = await GroceryListing.create(req.body);
      return res.status(201).json(grocerylisting);
    } catch (error) {
      next(error);
    }
  };
  
  export const deletegroceryListing = async (req, res, next) => {
    const grocerylisting = await GroceryListing.findById(req.params.id);
  
    if (!grocerylisting) {
      return next(errorHandler(404, 'grocery not found!'));
    }
  
    if (req.user.id !== grocerylisting.userRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await GroceryListing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
  export const updategroceryListing = async (req, res, next) => {
    const grocerylisting = await GroceryListing.findById(req.params.id);
    if (!grocerylisting) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== grocerylisting.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updategroceryListing = await GroceryListing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updategroceryListing);
    } catch (error) {
      next(error);
    }
  };

  export const getgroceryListing = async (req, res, next) => {
    try {
      const grocerylisting = await GroceryListing.findById(req.params.id);
      if (!grocerylisting) {
        return next(errorHandler(404, 'grocery not found!'));
      }
      res.status(200).json(grocerylisting);
    } catch (error) {
      next(error);
    }
  };
  
  export const getExpiringListingsFiveDays = async (req, res, next) => {
    try {
      const now = new Date();
      const fiveDaysFromNow = new Date();
      fiveDaysFromNow.setDate(now.getDate() + 5);
  
      const userId = req.user.id;
  
      const expiringListings = await GroceryListing.find({
        userRef: userId,
        date: {
          $gte: now,
          $lte: fiveDaysFromNow,
        },
      });
  
      if (expiringListings.length === 0) {
        return next(errorHandler(404, 'No groceries expiring in the next 5 days.'));
      }
  
      res.status(200).json(expiringListings);
    } catch (error) {
      next(error);
    }
  };
  
  
  
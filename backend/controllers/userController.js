import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc    Get users with search, filter, sort & pagination
 * @route   GET /api/users
 * @access  Public
 *
 * Query params supported:
 *   page, limit        -> pagination (defaults 1 / 10)
 *   search              -> matches against firstName, lastName, email, department
 *   firstName, lastName, email, department -> exact-field filters (case-insensitive, partial match)
 *   sortBy              -> field to sort by (default: firstName)
 *   sortOrder            -> 'asc' | 'desc' (default: asc)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
  const { search, firstName, lastName, email, department, sortBy, sortOrder } = req.query;

  const query = {};

  // Global search across all visible fields
  if (search) {
    const regex = new RegExp(search, 'i');
    query.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { department: regex },
    ];
  }

  // Per-field filters (from the filter popup)
  if (firstName) query.firstName = new RegExp(firstName, 'i');
  if (lastName) query.lastName = new RegExp(lastName, 'i');
  if (email) query.email = new RegExp(email, 'i');
  if (department) query.department = new RegExp(department, 'i');

  const allowedSortFields = ['firstName', 'lastName', 'email', 'department', 'createdAt'];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'firstName';
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const totalCount = await User.countDocuments(query);
  const users = await User.find(query)
    .sort({ [sortField]: sortDirection })
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
    },
  });
});

/**
 * @desc    Get a single user by id
 * @route   GET /api/users/:id
 * @access  Public
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    Create a new user
 * @route   POST /api/users
 * @access  Public
 */
export const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, department } = req.body;
  const user = await User.create({ firstName, lastName, email, department });
  res.status(201).json({ success: true, data: user });
});

/**
 * @desc    Update an existing user
 * @route   PUT /api/users/:id
 * @access  Public
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, department } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email, department },
    { new: true, runValidators: true }
  );

  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Public
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json({ success: true, data: { id: req.params.id } });
});

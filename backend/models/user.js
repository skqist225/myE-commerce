const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your login name'],
            maxLength: [20, 'Your username can not exceed 20 characters'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLength: [8, 'Your password must be at least 8 characters.'],
            maxLength: [25, 'Your password can not exceed 25 characters'],
            trim: true,
            select: false,
        },
        firstName: {
            type: String,
            maxLength: [30, 'Your first name can not exceed 30 characters'],
            required: [true, 'Please enter your first name'],
        },
        lastName: {
            type: String,
            maxLength: [10, 'Your last name can not exceed 10 characters'],
            required: [true, 'Please enter your last name'],
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'Email address is required'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone numer is required'],
            minLength: 10,
        },
        bio: {
            type: String,
            default: 'No bio',
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            default: 'male',
        },
        birthday: {
            type: Date,
            default: null,
        },
        timeShopRequestSent: Date,
        avatar: {
            type: String,
            trim: true,
            default: null,
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'user', 'shop'],
                message: `{VALUE} role is not supported`,
            },
            default: 'user',
        },
        vouchers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Voucher',
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        favoriteProduct: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        identityCard: {
            number: {
                type: String,
                minLength: 9,
                maxLength: 12,
                required: true,
            },
            cardImage: [
                {
                    type: String,
                    required: true,
                },
            ],
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isShopRequestSent: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.path('email').validate(email => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}, 'Invalid Email');

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    async comparePassword(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    getJwtToken() {
        return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_TIME,
        });
    },
    getResetPasswordToken() {
        const resetToken = crypto.randomBytes(20).toString('hex');

        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30minutes

        return resetToken;
    },
};

module.exports = mongoose.model('User', userSchema);

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    screenName: String,
    email: String,
    password: String,
    activity: [{
        description: String,
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

// Hash the password before saving
UserSchema.pre('save', async function() {
    try{
        this.password = await bcrypt.hash(this.password, 10)
        const action = {
            description: "User Created"
        }
        this.activity.push(action)
    } catch(e) {
        return console.error(e.message)
    }
})

// register user
UserSchema.statics.register = async function(data) {
    try {
        let member = await this.find({ $or: [{ email: data.email }, { screenName: data.screenName }] }).limit(1)
        var reasons = []
        if(member.length < 1) {
            return await this.create(data)
        } else {
            if(member[0].email == data.email) {
                reasons.push(`Email already registered! If you have forgotten your password, please contact the administrator.`)
            }
            if(member[0].screenName == data.screenName) {
                reasons.push(`That Screen Name is already taken!`)
            }
        }
        return { reasons: reasons }
    } catch(e) {
        return console.error(e.message)
    }
}

// authenticate user
UserSchema.statics.authenticate = async function(email, password) {
    try {
        let member = await this.find({ email: email }).limit(1)
        if (member.length < 1) {
            return { reason: `Email not found. Maybe you mistyped something?` }
        } else {
            const match = await bcrypt.compare(password, member[0].password)
            if(match) {
                return member[0]
            } else {
                return { reason: `Invalid Password. Please try again!` }
            }
        }

    } catch(e) {
        return console.error(e.message)
    }
}

module.exports = mongoose.model('User', UserSchema)

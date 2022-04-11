import mongoose from "mongoose";

const User = mongoose.model("user", new mongoose.Schema({
    discord_id: String,
    username: String,
    discriminator: String,
    avatarURL: String,
    guilds: [
      {
        discord_id: String,
        name: String,
        iconURL: String,
      },
    ],
    refresh_token: String,
  })
);

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ discord_id: id })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

export const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
  User.findOneAndUpdate({ discord_id: id }, data)
    .then(() => resolve(true))
    .catch((err) => reject(err))
    });
};

export const createUser = (data) => {
  return new Promise((resolve, reject) => {
    const user = new User(data);
    user.save()
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

export default { getUser, updateUser, createUser }
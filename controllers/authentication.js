import "dotenv/config";

import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import { permissions as reslovePermissions } from "discord-bitfield-calculator";
import userModel from "../models/user.js";
const { BOT_ID, BOT_SECRET, JWT_SECRET, CLIENT_ORIGIN } = process.env;
const REDIRECT_ROUTE = "/login";
const accessTokenBase = "https://discord.com/api/v9/oauth2/token";
const usersBase = "https://discordapp.com/api/v9/users/@me";

export const login = (req, res) => {
  const { codeGrant } = req.body;

  if (!codeGrant)
    return res.status(401).json({ error: "missing user code grant" });

  let userObject = {
    discord_id: null,
    username: null,
    discriminator: null,
    avatarURL: null,
    guilds: [],
    refresh_token: null,
  };
  let authorization = "";

  const params = new URLSearchParams();
  params.append("client_id", BOT_ID);
  params.append("client_secret", BOT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", codeGrant);
  params.append("redirect_uri", CLIENT_ORIGIN + REDIRECT_ROUTE);

  fetch(accessTokenBase, {
    method: "post",
    body: params,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        res.status(data.code);
        throw new Error(data.message);
      }
      return data;
    })
    .then((accessData) => {
      authorization = `${accessData.token_type} ${accessData.access_token}`;
      userObject.refresh_token = accessData.refresh_token;
      return fetch(usersBase, {
        headers: {
          Authorization: authorization,
        },
      });
    })
    .then((res) => res.json())
    .then((user) => {
      Object.assign(userObject, {
        discord_id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatarURL: user.avatar
          ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
          : null,
      });
      return fetch(usersBase + "/guilds", {
        headers: {
          Authorization: authorization,
        },
      });
    })
    .then((res) => res.json())
    .then((guilds) => {
      userObject.guilds = guilds.map((guild) => {
          if (reslovePermissions(guild.permissions).includes("ADMINISTRATOR")) {
            return {
              discord_id: guild.id,
              name: guild.name,
              iconURL: guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
                : null,
              isOwner: guild.owner,
            };
          }
        })
        .filter(Boolean);
    })
    .then(() => userModel.getUser(userObject.discord_id))
    .then(isUserExist => {
      const data = userObject;
      return isUserExist ? userModel.updateUser(data.discord_id, data) : userModel.createUser(data);
    })
    .then(() => {
      const token = jwt.sign(
        {id: userObject.discord_id},
        JWT_SECRET,
        { expiresIn: 7 * 24 * 60 * 60 }
      );

      res.status(200).json({ message: "success", token: `Bearer ${token}`});
    })
    .catch((error) => {
      res.json({ error: error.message });
      console.log(error);
    });
};

export const getUser = (req, res) => {
  const { userId } = req;
  userModel.getUser(userId)
  .then(user => res.json({ 
    isLoggedIn: true,
    user: {
      id: user.discord_id,
      username: user.username,
      discriminator: user.discriminator,
      avatar: user.avatarURL
    }
  }))
  .catch(err => res.status(500).json({ error: err }));
}
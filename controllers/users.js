import { getUser, updateUser } from "../models/user.js";
import fetch from "node-fetch";
import { permissions as reslovePermissions } from "discord-bitfield-calculator";
const { BOT_TOKEN, BOT_ID, BOT_SECRET } = process.env;
const guildsBase = "https://discordapp.com/api/v9/guilds/";
const usersBase = "https://discordapp.com/api/v9/users/@me/";
const accessTokenBase = "https://discord.com/api/v9/oauth2/token";

export const getUserGuilds = async (req, res) => {
  const { userId } = req;
  const { refetch } = req.query;
  const user = await getUser(userId);

  let fetchedGuilds;
  let new_refresh_token;
  if (refetch && refetch == "true") {
    const refresh_token = user.refresh_token;

    // update refesh_tokent to fetch user guilds
    const params = new URLSearchParams();
    params.append("client_id", BOT_ID);
    params.append("client_secret", BOT_SECRET);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refresh_token);

    await fetch(accessTokenBase, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((response) => response.json())
      .then(({ refresh_token, token_type, access_token }) => {
        
        new_refresh_token = refresh_token;
        return fetch(usersBase + "guilds", {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        });
      })
      .then((response) => response.json())
      .then((guilds) => {
        fetchedGuilds = guilds
          .map((guild) => {
            if (
              reslovePermissions(guild.permissions).includes("ADMINISTRATOR")
            ) {
              return {
                discord_id: guild.id,
                name: guild.name,
                iconURL: guild.icon
                  ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
                  : null,
              };
            }
          })
          .filter(Boolean);

          return updateUser(userId, { guilds: fetchedGuilds, refresh_token: new_refresh_token });
      })
      .then(() => true);
}

  // check if bot in guild and update guild
    const userGuilds = fetchedGuilds ?? user.guilds;
    const guilds = [];
    for (const guild of userGuilds) {
      const response = await fetch(
        guildsBase + guild.discord_id,
        {
          headers: {
            Authorization: `Bot ${BOT_TOKEN}`,
          },
        }
      );
      const fetchedGuild = await response.json();
      if (fetchedGuild.id) {
        guilds.push({
          discord_id: fetchedGuild.id,
          name: fetchedGuild.name,
          iconURL: fetchedGuild.icon
            ? `https://cdn.discordapp.com/icons/${fetchedGuild.id}/${fetchedGuild.icon}.webp`
            : null,
          botInGuild: true,
        });
      } else guilds.push(guild);
    }

    res.json({
      guilds: guilds.sort((guild, nextGuild) =>
        guild.botInGuild === nextGuild.botInGuild
          ? 0
          : guild.botInGuild
          ? -1
          : 1
      ),
    });
};
